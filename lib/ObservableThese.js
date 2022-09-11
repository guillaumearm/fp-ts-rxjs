"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTaskThese = exports.Bifunctor = exports.Functor = exports.getMonad = exports.getApplicative = exports.URI = exports.of = exports.mapLeft = exports.bimap = exports.map = exports.swap = exports.fold = exports.fromTask = exports.fromIO = exports.fromTaskThese = exports.leftIO = exports.rightIO = exports.fromIOEither = exports.leftObservable = exports.rightObservable = exports.right = exports.both = exports.left = void 0;
var function_1 = require("fp-ts/lib/function");
var pipeable_1 = require("fp-ts/lib/pipeable");
var TH = __importStar(require("fp-ts/lib/These"));
var R = __importStar(require("./Observable"));
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 0.6.12
 */
exports.left = 
/*#__PURE__*/
function_1.flow(TH.left, R.of);
/**
 * @category constructors
 * @since 0.6.12
 */
exports.both = 
/*#__PURE__*/
function_1.flow(TH.both, R.of);
/**
 * @category constructors
 * @since 0.6.12
 */
exports.right = 
/*#__PURE__*/
function_1.flow(TH.right, R.of);
/**
 * @category constructors
 * @since 0.6.12
 */
exports.rightObservable = 
/*#__PURE__*/
R.map(TH.right);
/**
 * @category constructors
 * @since 0.6.12
 */
exports.leftObservable = 
/*#__PURE__*/
R.map(TH.left);
/**
 * @category constructors
 * @since 0.6.12
 */
exports.fromIOEither = R.fromIO;
/**
 * @category constructors
 * @since 0.6.12
 */
exports.rightIO = 
/*#__PURE__*/
function_1.flow(R.fromIO, exports.rightObservable);
/**
 * @category constructors
 * @since 0.6.12
 */
exports.leftIO = 
/*#__PURE__*/
function_1.flow(R.fromIO, exports.leftObservable);
/**
 * @category constructors
 * @since 0.6.12
 */
exports.fromTaskThese = R.fromTask;
/**
 * @category constructors
 * @since 0.6.12
 */
exports.fromIO = exports.rightIO;
/**
 * @category constructors
 * @since 0.6.12
 */
exports.fromTask = 
/*#__PURE__*/
function_1.flow(R.fromTask, exports.rightObservable);
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 0.6.12
 */
exports.fold = 
/*#__PURE__*/
function_1.flow(TH.fold, R.chain);
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 0.6.12
 */
exports.swap = 
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
var map = function (f) {
    return R.map(TH.map(f));
};
exports.map = map;
/**
 * @category Bifunctor
 * @since 0.6.12
 */
var bimap = function (f, g) { return R.map(TH.bimap(f, g)); };
exports.bimap = bimap;
/**
 * @category Bifunctor
 * @since 0.6.12
 */
var mapLeft = function (f) {
    return R.map(TH.mapLeft(f));
};
exports.mapLeft = mapLeft;
/**
 * @category Applicative
 * @since 0.6.12
 */
exports.of = exports.right;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var map_ = function (fa, f) { return pipeable_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var bimap_ = function (fea, f, g) { return pipeable_1.pipe(fea, exports.bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fea, f) { return pipeable_1.pipe(fea, exports.mapLeft(f)); };
/**
 * @since 0.6.12
 */
exports.URI = 'ObservableThese';
/**
 * @category instances
 * @since 0.6.12
 */
var getApplicative = function (A, S) {
    var AV = TH.getMonad(S);
    var ap = function (fga) { return function (fgab) {
        return A.ap(A.map(fgab, function (h) { return function (ga) { return AV.ap(h, ga); }; }), fga);
    }; };
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) { return pipeable_1.pipe(fab, ap(fa)); },
        of: exports.of
    };
};
exports.getApplicative = getApplicative;
/**
 * @category instances
 * @since 0.6.12
 */
var getMonad = function (S) {
    var A = exports.getApplicative(R.Apply, S);
    return {
        URI: exports.URI,
        _E: undefined,
        map: map_,
        ap: A.ap,
        of: exports.of,
        chain: function (ma, f) {
            return pipeable_1.pipe(ma, R.chain(TH.fold(exports.left, f, function (e1, a) {
                return pipeable_1.pipe(f(a), R.map(TH.fold(function (e2) { return TH.left(S.concat(e1, e2)); }, function (b) { return TH.both(e1, b); }, function (e2, b) { return TH.both(S.concat(e1, e2), b); })));
            })));
        }
    };
};
exports.getMonad = getMonad;
/**
 * @since 0.6.12
 */
exports.Functor = {
    URI: exports.URI,
    map: map_
};
/**
 * @category instances
 * @since 0.6.12
 */
exports.Bifunctor = {
    URI: exports.URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 0.6.12
 */
exports.toTaskThese = R.toTask;
