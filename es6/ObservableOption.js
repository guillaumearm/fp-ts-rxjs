import { flow, identity } from 'fp-ts/es6/function';
import * as O from 'fp-ts/es6/Option';
import { pipe } from 'fp-ts/es6/pipeable';
import { catchError } from 'rxjs/operators';
import * as R from './Observable';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 0.6.14
 */
export const none = 
/*#__PURE__*/
pipe(O.none, R.of);
/**
 * @category constructors
 * @since 0.6.14
 */
export const some = 
/*#__PURE__*/
flow(O.some, R.of);
/**
 * @category constructors
 * @since 0.6.14
 */
export const fromObservable = 
/*#__PURE__*/
R.map(O.some);
/**
 * @category constructors
 * @since 0.6.14
 */
export const fromIO = 
/*#__PURE__*/
flow(R.fromIO, fromObservable);
/**
 * @category constructors
 * @since 0.6.14
 */
export const fromTask = 
/*#__PURE__*/
flow(R.fromTask, fromObservable);
/**
 * @category constructors
 * @since 0.6.14
 */
export const tryCatch = 
/*#__PURE__*/
flow(R.map(O.some), catchError(() => none));
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 0.6.14
 */
export const fold = 
/*#__PURE__*/
flow(O.fold, R.chain);
/**
 * @category destructors
 * @since 0.6.14
 */
export const getOrElse = (onNone) => (ma) => pipe(ma, R.chain(O.fold(onNone, R.of)));
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category combinators
 * @since 0.6.14
 */
export const alt = f => R.chain(O.fold(f, some));
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.14
 */
export const map = f => R.map(O.map(f));
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.14
 */
export const ap = (fa) => flow(R.map(gab => (ga) => O.ap(ga)(gab)), R.ap(fa));
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.14
 */
export const apFirst = fb => flow(map(a => () => a), ap(fb));
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.14
 */
export const apSecond = (fb) => flow(map(() => (b) => b), ap(fb));
/**
 * @category Monad
 * @since 0.6.14
 */
export const chain = (f) => (ma) => pipe(ma, R.chain(O.fold(() => none, f)));
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.14
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
 * @since 0.6.14
 */
export const chainFirst = f => chain(a => pipe(f(a), map(() => a)));
/**
 * @since 0.6.14
 */
export const of = some;
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.14
 */
export const filterOrElse = (predicate) => chain(a => (predicate(a) ? of(a) : none));
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.14
 */
export const fromOption = (ma) => (ma._tag === 'None' ? none : of(ma.value));
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.14
 */
export const fromPredicate = (predicate) => (a) => (predicate(a) ? of(a) : none);
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
const alt_ = (fx, fy) => pipe(fx, alt(fy));
/**
 * @category instances
 * @since 0.6.14
 */
export const URI = 'ObservableOption';
/**
 * @category instances
 * @since 0.6.14
 */
export const Functor = {
    URI,
    map: map_
};
/**
 * @category instances
 * @since 0.6.14
 */
export const Apply = {
    URI,
    map: map_,
    ap: ap_
};
/**
 * @category instances
 * @since 0.6.14
 */
export const Applicative = {
    URI,
    map: map_,
    ap: ap_,
    of
};
/**
 * @category instances
 * @since 0.6.14
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
 * @since 0.6.14
 */
export const Alt = {
    URI,
    map: map_,
    alt: alt_
};
/**
 * @category instances
 * @since 0.6.14
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
 * @since 0.6.14
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
 * @since 0.6.14
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
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 0.6.14
 */
export const Do = 
/*#__PURE__*/
of({});
/**
 * @since 0.6.14
 */
export const bindTo = (name) => map(a => ({ [name]: a }));
/**
 * @since 0.6.14
 */
export const bind = (name, f) => chain(a => pipe(f(a), map(b => (Object.assign(Object.assign({}, a), { [name]: b })))));
