import { flow, identity } from 'fp-ts/es6/function';
import { pipe } from 'fp-ts/es6/pipeable';
import * as R from 'fp-ts/es6/Reader';
import * as OE from './ObservableEither';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 0.6.10
 */
export const fromObservableEither = R.of;
/**
 * @category constructors
 * @since 2.0.0
 */
export const right = 
/*#__PURE__*/
flow(OE.right, fromObservableEither);
/**
 * @category constructors
 * @since 2.0.0
 */
export const left = 
/*#__PURE__*/
flow(OE.left, fromObservableEither);
/**
 * @category constructors
 * @since 0.6.10
 */
export const ask = () => OE.right;
/**
 * @category constructors
 * @since 0.6.10
 */
export const asks = f => flow(OE.right, OE.map(f));
/**
 * @category constructors
 * @since 0.6.10
 */
export const fromReader = ma => flow(ma, OE.right);
/**
 * @category constructors
 * @since 0.6.10
 */
export const fromIO = ma => () => OE.rightIO(ma);
/**
 * @category constructors
 * @since 0.6.10
 */
export const fromTask = ma => () => OE.fromTask(ma);
/**
 * @category constructors
 * @since 0.6.10
 */
export const fromObservable = ma => () => OE.rightObservable(ma);
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 0.6.10
 */
export const local = R.local;
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * @category MonadThrow
 * @since 0.6.10
 */
export const throwError = e => () => OE.left(e);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.10
 */
export const map = f => fa => flow(fa, OE.map(f));
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.10
 */
export const ap = fa => fab => r => pipe(fab(r), OE.ap(fa(r)));
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.10
 */
export const apFirst = fb => flow(map(a => () => a), ap(fb));
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.10
 */
export const apSecond = (fb) => flow(map(() => (b) => b), ap(fb));
/**
 * @category Applicative
 * @since 0.6.10
 */
export const of = right;
/**
 * @category Bifunctor
 * @since 0.6.10
 */
export const bimap = (f, g) => fea => r => OE.bimap(f, g)(fea(r));
/**
 * @category Bifunctor
 * @since 0.6.10
 */
export const mapLeft = f => fea => r => OE.mapLeft(f)(fea(r));
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.6.12
 */
export const chainW = (f) => (ma) => r => pipe(ma(r), OE.chainW(a => f(a)(r)));
/**
 * @category Monad
 * @since 0.6.10
 */
export const chain = chainW;
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.10
 */
export const flatten = 
/*#__PURE__*/
chain(identity);
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.10
 */
export const chainFirst = f => chain(a => pipe(f(a), map(() => a)));
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export const filterOrElse = (predicate, onFalse) => chain(a => (predicate(a) ? of(a) : throwError(onFalse(a))));
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export const fromEither = ma => ma._tag === 'Left' ? throwError(ma.left) : of(ma.right);
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export const fromOption = (onNone) => (ma) => ma._tag === 'None' ? throwError(onNone()) : of(ma.value);
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export const fromPredicate = (predicate, onFalse) => (a) => predicate(a) ? of(a) : throwError(onFalse(a));
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
const map_ = (fa, f) => pipe(fa, map(f));
/* istanbul ignore next */
const ap_ = (fab, fa) => pipe(fab, ap(fa));
/* istanbul ignore next */
const chain_ = (ma, f) => pipe(ma, chain(f));
/* istanbul ignore next */
const bimap_ = (fea, f, g) => pipe(fea, bimap(f, g));
/* istanbul ignore next */
const mapLeft_ = (fea, f) => pipe(fea, mapLeft(f));
/**
 * @category instances
 * @since 0.6.10
 */
export const URI = 'ReaderObservableEither';
/**
 * @category instances
 * @since 0.6.12
 */
export const Functor = {
    URI,
    map: map_
};
/**
 * @category instances
 * @since 0.6.12
 */
export const Apply = {
    URI,
    map: map_,
    ap: ap_
};
/**
 * @category instances
 * @since 0.6.12
 */
export const Applicative = {
    URI,
    map: map_,
    ap: ap_,
    of
};
/**
 * @category instances
 * @since 0.6.12
 */
export const Monad = {
    URI,
    map: map_,
    ap: ap_,
    of,
    chain: chain_
};
/**
 * @category instances
 * @since 0.6.12
 */
export const Bifunctor = {
    URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
/**
 * @category instances
 * @since 0.6.12
 */
export const MonadIO = {
    URI,
    map: map_,
    ap: ap_,
    of,
    chain: chain_,
    fromIO
};
/**
 * @category instances
 * @since 0.6.12
 */
export const MonadTask = {
    URI,
    map: map_,
    of,
    ap: ap_,
    chain: chain_,
    fromIO,
    fromTask
};
/**
 * @category instances
 * @since 0.6.12
 */
export const MonadObservable = {
    URI,
    map: map_,
    of,
    ap: ap_,
    chain: chain_,
    fromIO,
    fromObservable,
    fromTask
};
/**
 * @category instances
 * @since 0.6.12
 */
export const MonadThrow = {
    URI,
    map: map_,
    of,
    ap: ap_,
    chain: chain_,
    throwError
};
/**
 * @category instances
 * @since 0.6.10
 * @deprecated
 */
export const readerObservableEither = {
    URI,
    ap: ap_,
    map: map_,
    of,
    chain: chain_,
    fromIO,
    fromObservable,
    fromTask,
    throwError,
    bimap: bimap_,
    mapLeft: mapLeft_
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 0.6.12
 */
export const Do = 
/*#__PURE__*/
of({});
/**
 * @since 0.6.11
 */
export const bindTo = (name) => map(a => ({ [name]: a }));
/**
 * @since 0.6.11
 */
export const bind = (name, f) => chain(a => pipe(f(a), map(b => (Object.assign(Object.assign({}, a), { [name]: b })))));
/**
 * @since 0.6.12
 */
export const bindW = bind;
