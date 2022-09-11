import { flow } from 'fp-ts/es6/function';
import { pipe } from 'fp-ts/es6/pipeable';
import * as TH from 'fp-ts/es6/These';
import * as R from './Observable';
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 0.6.12
 */
export const left = 
/*#__PURE__*/
flow(TH.left, R.of);
/**
 * @category constructors
 * @since 0.6.12
 */
export const both = 
/*#__PURE__*/
flow(TH.both, R.of);
/**
 * @category constructors
 * @since 0.6.12
 */
export const right = 
/*#__PURE__*/
flow(TH.right, R.of);
/**
 * @category constructors
 * @since 0.6.12
 */
export const rightObservable = 
/*#__PURE__*/
R.map(TH.right);
/**
 * @category constructors
 * @since 0.6.12
 */
export const leftObservable = 
/*#__PURE__*/
R.map(TH.left);
/**
 * @category constructors
 * @since 0.6.12
 */
export const fromIOEither = R.fromIO;
/**
 * @category constructors
 * @since 0.6.12
 */
export const rightIO = 
/*#__PURE__*/
flow(R.fromIO, rightObservable);
/**
 * @category constructors
 * @since 0.6.12
 */
export const leftIO = 
/*#__PURE__*/
flow(R.fromIO, leftObservable);
/**
 * @category constructors
 * @since 0.6.12
 */
export const fromTaskThese = R.fromTask;
/**
 * @category constructors
 * @since 0.6.12
 */
export const fromIO = rightIO;
/**
 * @category constructors
 * @since 0.6.12
 */
export const fromTask = 
/*#__PURE__*/
flow(R.fromTask, rightObservable);
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 0.6.12
 */
export const fold = 
/*#__PURE__*/
flow(TH.fold, R.chain);
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 0.6.12
 */
export const swap = 
/*#__PURE__*/
R.map(TH.swap);
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.12
 */
export const map = f => R.map(TH.map(f));
/**
 * @category Bifunctor
 * @since 0.6.12
 */
export const bimap = (f, g) => R.map(TH.bimap(f, g));
/**
 * @category Bifunctor
 * @since 0.6.12
 */
export const mapLeft = f => R.map(TH.mapLeft(f));
/**
 * @category Applicative
 * @since 0.6.12
 */
export const of = right;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
const map_ = (fa, f) => pipe(fa, map(f));
/* istanbul ignore next */
const bimap_ = (fea, f, g) => pipe(fea, bimap(f, g));
/* istanbul ignore next */
const mapLeft_ = (fea, f) => pipe(fea, mapLeft(f));
/**
 * @since 0.6.12
 */
export const URI = 'ObservableThese';
/**
 * @category instances
 * @since 0.6.12
 */
export const getApplicative = (A, S) => {
    const AV = TH.getMonad(S);
    const ap = (fga) => (fgab) => A.ap(A.map(fgab, h => (ga) => AV.ap(h, ga)), fga);
    return {
        URI,
        _E: undefined,
        map: map_,
        ap: (fab, fa) => pipe(fab, ap(fa)),
        of
    };
};
/**
 * @category instances
 * @since 0.6.12
 */
export const getMonad = (S) => {
    const A = getApplicative(R.Apply, S);
    return {
        URI,
        _E: undefined,
        map: map_,
        ap: A.ap,
        of,
        chain: (ma, f) => pipe(ma, R.chain(TH.fold(left, f, (e1, a) => pipe(f(a), R.map(TH.fold(e2 => TH.left(S.concat(e1, e2)), b => TH.both(e1, b), (e2, b) => TH.both(S.concat(e1, e2), b)))))))
    };
};
/**
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
export const Bifunctor = {
    URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 0.6.12
 */
export const toTaskThese = R.toTask;
