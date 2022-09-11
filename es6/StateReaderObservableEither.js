import * as E from 'fp-ts/es6/Either';
import { flow, identity } from 'fp-ts/es6/function';
import { pipe } from 'fp-ts/es6/pipeable';
import * as OB from './Observable';
import * as ROE from './ReaderObservableEither';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 0.6.10
 */
export const fromReaderObservableEither = fa => s => pipe(fa, ROE.map(a => [a, s]));
/**
 * @category constructors
 * @since 0.6.10
 */
export const get = () => s => ROE.right([s, s]);
/**
 * @category constructors
 * @since 0.6.10
 */
export const gets = f => s => ROE.right([f(s), s]);
/**
 * @category constructors
 * @since 0.6.10
 */
export const modify = f => s => ROE.right([undefined, f(s)]);
/**
 * @category constructors
 * @since 0.6.10
 */
export const put = s => () => ROE.right([undefined, s]);
/**
 * @category constructors
 * @since 0.6.10
 */
export const right = a => s => ROE.right([a, s]);
/**
 * @category constructors
 * @since 0.6.10
 */
export const left = e => () => ROE.left(e);
/**
 * @category constructors
 * @since 0.6.10
 */
export const fromIO = ma => fromObservable(OB.fromIO(ma));
/**
 * @category constructors
 * @since 0.6.10
 */
export const fromTask = ma => fromObservable(OB.fromTask(ma));
/**
 * @category constructors
 * @since 0.6.10
 */
export const fromObservable = ma => s => () => pipe(ma, OB.map(a => E.right([a, s])));
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
const map_ = (fa, f) => pipe(fa, map(f));
/* istanbul ignore next */
const ap_ = (fab, fa) => pipe(fab, ap(fa));
/* istanbul ignore next */
const chain_ = (ma, f) => pipe(ma, chain(f));
/**
 * @category MonadThrow
 * @since 0.6.10
 */
export const throwError = left;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.10
 */
export const map = f => fa => s1 => pipe(fa(s1), ROE.map(([a, s2]) => [f(a), s2]));
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.10
 */
export const ap = fa => fab => s1 => pipe(fab(s1), ROE.chain(([f, s2]) => pipe(fa(s2), ROE.map(([a, s3]) => [f(a), s3]))));
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
 * @category Bifunctor
 * @since 0.6.10
 */
export const bimap = (f, g) => fea => pipe(map_(fea, g), mapLeft(f));
/**
 * @category Bifunctor
 * @since 0.6.10
 */
export const mapLeft = f => fea => flow(fea, ROE.mapLeft(f));
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.6.12
 */
export const chainW = (f) => (ma) => s1 => pipe(ma(s1), ROE.chainW(([a, s2]) => f(a)(s2)));
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
/**
 * @since 0.6.12
 */
export const of = right;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
const bimap_ = (fea, f, g) => pipe(fea, bimap(f, g));
/* istanbul ignore next */
const mapLeft_ = (fea, f) => pipe(fea, mapLeft(f));
/**
 * @since 0.6.10
 */
export const URI = 'StateReaderObservableEither';
/**
 * @since 0.6.12
 */
export const Functor = {
    URI,
    map: map_
};
/**
 * @since 0.6.12
 */
export const Apply = {
    URI,
    map: map_,
    ap: ap_
};
/**
 * @since 0.6.12
 */
export const Applicative = {
    URI,
    map: map_,
    ap: ap_,
    of
};
/**
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
 * @since 0.6.12
 */
export const Bifunctor = {
    URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
/**
 * @since 0.6.12
 */
export const MonadIO = {
    URI,
    map: map_,
    of,
    ap: ap_,
    chain: chain_,
    fromIO
};
/**
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
 * @since 0.6.10
 * @deprecated
 */
export const stateReaderObservableEither = {
    URI,
    ap: ap_,
    chain: chain_,
    map: map_,
    of,
    mapLeft: mapLeft_,
    bimap: bimap_,
    throwError,
    fromIO,
    fromObservable,
    fromTask
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 0.6.11
 */
export const bindTo = (name) => (fa) => pipe(fa, map(value => ({ [name]: value })));
/**
 * @since 0.6.11
 */
export const bind = (name, f) => chain(a => pipe(f(a), map(b => (Object.assign(Object.assign({}, a), { [name]: b })))));
/**
 * @since 0.6.12
 */
export const bindW = bind;
/**
 * @since 0.6.10
 */
export const evaluate = (s) => (ma) => pipe(ma(s), ROE.map(([a]) => a));
/**
 * @since 0.6.10
 */
export const execute = (s) => (ma) => pipe(ma(s), ROE.map(([_, s]) => s));
