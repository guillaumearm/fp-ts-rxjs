import * as E from 'fp-ts/es6/Either';
import { flow, identity } from 'fp-ts/es6/function';
import * as O from 'fp-ts/es6/Option';
import { pipe } from 'fp-ts/es6/pipeable';
import * as R from 'fp-ts/es6/Reader';
import * as T from './Observable';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 0.6.6
 */
export const fromObservable = R.of;
/**
 * @category constructors
 * @since 0.6.6
 */
export const fromReader = ma => flow(ma, T.of);
/**
 * @category constructors
 * @since 0.6.6
 */
export const fromOption = (o) => fromObservable(T.fromOption(o));
/**
 * @category constructors
 * @since 0.6.6
 */
export const fromIO = 
/*#__PURE__*/
flow(T.fromIO, fromObservable);
/**
 * @category constructors
 * @since 0.6.6
 */
export const fromTask = 
/*#__PURE__*/
flow(T.fromTask, fromObservable);
/**
 * @category constructors
 * @since 0.6.9
 */
export const fromReaderTask = (ma) => flow(ma, T.fromTask);
/**
 * @category constructors
 * @since 0.6.6
 */
export const ask = () => T.of;
/**
 * @category constructors
 * @since 0.6.6
 */
export const asks = f => flow(T.of, T.map(f));
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 0.6.6
 */
export const local = R.local;
/**
 * @category combinators
 * @since 0.6.6
 */
export const fromIOK = (f) => (...a) => fromIO(f(...a));
/**
 * @category combinators
 * @since 0.6.6
 */
export const chainIOK = (f) => chain(a => fromIOK(f)(a));
/**
 * @category combinators
 * @since 0.6.6
 */
export const fromObservableK = (f) => (...a) => fromObservable(f(...a));
/**
 * @category combinators
 * @since 0.6.6
 */
export const chainTaskK = (f) => chain(a => fromObservableK(f)(a));
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.6
 */
export const map = f => fa => flow(fa, T.map(f));
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.6
 */
export const ap = fa => fab => r => pipe(fab(r), T.ap(fa(r)));
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.6
 */
export const apFirst = fb => flow(map(a => () => a), ap(fb));
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.6
 */
export const apSecond = (fb) => flow(map(() => (b) => b), ap(fb));
/**
 * @category Applicative
 * @since 0.6.6
 */
export const of = a => () => T.of(a);
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.6.12
 */
export const chainW = (f) => (ma) => r => pipe(ma(r), T.chain(a => f(a)(r)));
/**
 * @category Monad
 * @since 0.6.6
 */
export const chain = chainW;
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.6
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
 * @since 0.6.6
 */
export const chainFirst = f => chain(a => pipe(f(a), map(() => a)));
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 0.6.7
 */
export const alt = that => me => r => pipe(me(r), T.alt(() => that()(r)));
/**
 * @since 0.6.12
 */
export const zero = () => T.Alternative.zero;
/**
 * @category Filterable
 * @since 0.6.7
 */
export const filterMap = f => fa => r => pipe(fa(r), T.filterMap(f));
/**
 * @category Compactable
 * @since 0.6.7
 */
export const compact = 
/*#__PURE__*/
filterMap(identity);
/**
 * @category Filterable
 * @since 0.6.7
 */
export const partitionMap = f => fa => ({
    left: pipe(fa, filterMap(a => O.fromEither(E.swap(f(a))))),
    right: pipe(fa, filterMap(a => O.fromEither(f(a))))
});
/**
 * @category Compactable
 * @since 0.6.7
 */
export const separate = 
/*#__PURE__*/
partitionMap(identity);
/**
 * @category Filterable
 * @since 0.6.7
 */
export const filter = (predicate) => filterMap(O.fromPredicate(predicate));
/**
 * @category Filterable
 * @since 0.6.7
 */
export const partition = (predicate) => partitionMap(E.fromPredicate(predicate, identity));
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
const map_ = (fa, f) => pipe(fa, map(f));
const ap_ = (fab, fa) => pipe(fab, ap(fa));
/* istanbul ignore next */
const chain_ = (ma, f) => pipe(ma, chain(f));
/* istanbul ignore next */
const alt_ = (fx, f) => pipe(fx, alt(f));
/* istanbul ignore next */
const filter_ = (fa, p) => pipe(fa, filter(p));
/* istanbul ignore next */
const filterMap_ = (fa, f) => pipe(fa, filterMap(f));
/* istanbul ignore next */
const partition_ = (fa, p) => pipe(fa, partition(p));
/* istanbul ignore next */
const partitionMap_ = (fa, f) => pipe(fa, partitionMap(f));
/**
 * @category instances
 * @since 0.6.6
 */
export const URI = 'ReaderObservable';
/**
 * @category instances
 * @since 0.6.6
 */
export const getMonoid = () => R.getMonoid(T.getMonoid());
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
export const Alt = {
    URI,
    map: map_,
    alt: alt_
};
/**
 * @category instances
 * @since 0.6.12
 */
export const Alternative = {
    URI,
    map: map_,
    ap: ap_,
    of,
    alt: alt_,
    zero
};
/**
 * @category instances
 * @since 0.6.12
 */
export const Compactable = {
    URI,
    compact,
    separate
};
/**
 * @category instances
 * @since 0.6.12
 */
export const Filterable = {
    URI,
    compact,
    separate,
    map: map_,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_
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
 * @since 0.6.6
 * @deprecated
 */
export const readerObservable = {
    URI,
    map: map_,
    of,
    ap: ap_,
    chain: chain_,
    zero,
    alt: alt_,
    compact,
    separate,
    partitionMap: partitionMap_,
    partition: partition_,
    filterMap: filterMap_,
    filter: filter_,
    fromIO,
    fromTask,
    fromObservable
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
 * @since 0.6.6
 */
export const run = (ma, r) => T.toTask(ma(r))();
/**
 * @since 0.6.6
 */
export const toReaderTask = (ma) => r => T.toTask(ma(r));
/**
 * @since 0.6.15
 */
export const toReaderTaskOption = (ma) => r => T.toTaskOption(ma(r));
