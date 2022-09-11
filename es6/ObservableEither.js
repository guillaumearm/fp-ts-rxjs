import * as E from 'fp-ts/es6/Either';
import { flow, identity } from 'fp-ts/es6/function';
import { pipe } from 'fp-ts/es6/pipeable';
import { catchError } from 'rxjs/operators';
import * as R from './Observable';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 0.6.8
 */
export const left = 
/*#__PURE__*/
flow(E.left, R.of);
/**
 * @category constructors
 * @since 0.6.8
 */
export const right = 
/*#__PURE__*/
flow(E.right, R.of);
/**
 * @category constructors
 * @since 0.6.8
 */
export const rightObservable = 
/*#__PURE__*/
R.map(E.right);
/**
 * @category constructors
 * @since 0.6.8
 */
export const leftObservable = 
/*#__PURE__*/
R.map(E.left);
/**
 * @category constructors
 * @since 0.6.8
 */
export const fromIOEither = R.fromIO;
/**
 * @category constructors
 * @since 0.6.8
 */
export const rightIO = 
/*#__PURE__*/
flow(R.fromIO, rightObservable);
/**
 * @category constructors
 * @since 0.6.8
 */
export const leftIO = 
/*#__PURE__*/
flow(R.fromIO, leftObservable);
/**
 * @category constructors
 * @since 0.6.8
 */
export const fromTaskEither = R.fromTask;
/**
 * @category constructors
 * @since 0.6.12
 */
export const fromIO = rightIO;
/**
 * @category constructors
 * @since 0.6.8
 */
export const fromTask = 
/*#__PURE__*/
flow(R.fromTask, rightObservable);
/**
 * @category constructors
 * @since 0.6.12
 */
export const fromObservable = rightObservable;
/**
 * @category constructors
 * @since 0.6.12
 */
export const tryCatch = 
/*#__PURE__*/
flow(R.map(E.right), catchError(flow(E.left, R.of)));
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 0.6.8
 */
export const fold = 
/*#__PURE__*/
flow(E.fold, R.chain);
/**
 * @category destructors
 * @since 0.6.8
 */
export const getOrElse = (onLeft) => (ma) => pipe(ma, R.chain(E.fold(onLeft, R.of)));
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 0.6.8
 */
export const orElse = f => R.chain(E.fold(f, right));
/**
 * @category combinators
 * @since 0.6.8
 */
export const swap = 
/*#__PURE__*/
R.map(E.swap);
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.8
 */
export const map = f => R.map(E.map(f));
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.0
 */
export const ap = (fa) => flow(R.map(gab => (ga) => E.ap(ga)(gab)), R.ap(fa));
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.8
 */
export const apFirst = fb => flow(map(a => () => a), ap(fb));
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.8
 */
export const apSecond = (fb) => flow(map(() => (b) => b), ap(fb));
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 0.6.8
 */
export const alt = (that) => R.chain(E.fold(that, right));
/**
 * @category Bifunctor
 * @since 0.6.8
 */
export const bimap = 
/*#__PURE__*/
flow(E.bimap, R.map);
/**
 * @category Bifunctor
 * @since 0.6.8
 */
export const mapLeft = f => R.map(E.mapLeft(f));
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.6.12
 */
export const chainW = (f) => (ma) => pipe(ma, R.chain(E.fold(a => left(a), f)));
/**
 * @category Monad
 * @since 0.6.8
 */
export const chain = chainW;
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.0
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
 * @since 0.6.8
 */
export const chainFirst = f => chain(a => pipe(f(a), map(() => a)));
/**
 * @since 0.6.12
 */
export const of = right;
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
 * @category MonadThrow
 * @since 0.6.12
 */
export const throwError = left;
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
/* istanbul ignore next */
const alt_ = (fx, fy) => pipe(fx, alt(fy));
/**
 * @category instances
 * @since 0.6.8
 */
export const URI = 'ObservableEither';
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
export const Alt = {
    URI,
    map: map_,
    alt: alt_
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
    ap: ap_,
    of,
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
    ap: ap_,
    of,
    chain: chain_,
    fromIO,
    fromTask,
    fromObservable
};
/**
 * @category instances
 * @since 0.6.12
 */
export const MonadThrow = {
    URI,
    map: map_,
    ap: ap_,
    of,
    chain: chain_,
    throwError
};
/**
 * @category instances
 * @deprecated
 * @since 0.6.8
 */
export const observableEither = {
    URI,
    map: map_,
    of,
    ap: ap_,
    chain: chain_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    alt: alt_,
    fromIO: rightIO,
    fromTask,
    fromObservable,
    throwError
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
/**
 * @since 0.6.8
 */
export const toTaskEither = R.toTask;
