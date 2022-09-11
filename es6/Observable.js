import * as E from 'fp-ts/es6/Either';
import { flow, identity } from 'fp-ts/es6/function';
import * as O from 'fp-ts/es6/Option';
import { pipe } from 'fp-ts/es6/pipeable';
import { combineLatest, defer, EMPTY, lastValueFrom, merge, of as rxOf } from 'rxjs';
import { map as rxMap, mergeMap, startWith } from 'rxjs/operators';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 0.6.5
 */
export const fromOption = (o) => (O.isNone(o) ? EMPTY : of(o.value));
/**
 * @category constructors
 * @since 0.6.5
 */
export const fromIO = ma => defer(() => rxOf(ma()));
/**
 * @category constructors
 * @since 0.6.5
 */
export const fromTask = defer;
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.0
 */
export const map = f => fa => fa.pipe(rxMap(f));
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.0
 */
export const ap = fa => fab => combineLatest([fab, fa]).pipe(rxMap(([f, a]) => f(a)));
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.0
 */
export const apFirst = fb => flow(map(a => () => a), ap(fb));
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.0
 */
export const apSecond = (fb) => flow(map(() => (b) => b), ap(fb));
/**
 * @category Applicative
 * @since 0.6.6
 */
// tslint:disable-next-line: deprecation
export const of = rxOf;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 0.6.0
 */
export const chain = f => ma => ma.pipe(mergeMap(f));
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
 * @since 0.6.0
 */
export const chainFirst = f => chain(a => pipe(f(a), map(() => a)));
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 0.6.0
 */
export const alt = that => fa => merge(fa, that());
/**
 * @category Filterable
 * @since 0.6.0
 */
export const filterMap = (f) => (fa) => fa.pipe(mergeMap(a => pipe(f(a), 
// tslint:disable-next-line: deprecation
O.fold(() => EMPTY, of))));
/**
 * @category Compactable
 * @since 0.6.0
 */
export const compact = 
/*#__PURE__*/
filterMap(identity);
/**
 * @category Filterable
 * @since 0.6.0
 */
export const partitionMap = f => fa => ({
    left: pipe(fa, filterMap(a => O.fromEither(E.swap(f(a))))),
    right: pipe(fa, filterMap(a => O.fromEither(f(a))))
});
/**
 * @category Compactable
 * @since 0.6.0
 */
export const separate = 
/*#__PURE__*/
partitionMap(identity);
/**
 * @category Filterable
 * @since 0.6.0
 */
export const filter = (p) => (fa) => pipe(fa, filterMap(O.fromPredicate(p)));
/**
 * @category Filterable
 * @since 0.6.0
 */
export const partition = (p) => (fa) => pipe(fa, partitionMap(E.fromPredicate(p, identity)));
/**
 * @category Alternative
 * @since 0.6.12
 */
export const zero = () => EMPTY;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
const map_ = (fa, f) => pipe(fa, map(f));
const ap_ = (fab, fa) => pipe(fab, ap(fa));
/* istanbul ignore next */
const chain_ = (fa, f) => pipe(fa, chain(f));
/* istanbul ignore next */
const alt_ = (me, that) => pipe(me, alt(that));
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
 * @since 0.6.0
 */
export const URI = 'Observable';
/**
 * @category instances
 * @since 0.6.0
 */
export const getMonoid = () => ({
    concat: (x, y) => merge(x, y),
    empty: EMPTY
});
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
    fromObservable: identity
};
/**
 * @category instances
 * @since 0.6.0
 * @deprecated
 */
export const observable = {
    URI,
    map: map_,
    of,
    ap: ap_,
    chain: chain_,
    zero,
    alt: alt_,
    compact,
    separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    fromIO,
    fromTask,
    fromObservable: identity
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
 * @since 0.6.5
 */
export const toTask = (o) => () => new Promise((resolve, reject) => {
    let hasResult = false;
    let result;
    o.subscribe({
        next: value => {
            result = value;
            hasResult = true;
        },
        error: reject,
        complete: () => {
            /* istanbul ignore next */
            if (hasResult) {
                resolve(result);
            }
        }
    });
});
/**
 * @since 0.6.15
 */
export const toTaskOption = (o) => () => pipe(o, //
map(O.some), startWith(O.none), (o) => lastValueFrom(o, { defaultValue: O.none }));
