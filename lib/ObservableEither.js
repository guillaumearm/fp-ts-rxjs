"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.toTaskEither = exports.bindW = exports.bind = exports.bindTo = exports.Do = exports.observableEither = exports.MonadThrow = exports.MonadObservable = exports.MonadTask = exports.MonadIO = exports.Alt = exports.Bifunctor = exports.Monad = exports.Applicative = exports.Apply = exports.Functor = exports.URI = exports.throwError = exports.fromPredicate = exports.fromOption = exports.fromEither = exports.filterOrElse = exports.of = exports.chainFirst = exports.flatten = exports.chain = exports.chainW = exports.mapLeft = exports.bimap = exports.alt = exports.apSecond = exports.apFirst = exports.ap = exports.map = exports.swap = exports.orElse = exports.getOrElse = exports.fold = exports.tryCatch = exports.fromObservable = exports.fromTask = exports.fromIO = exports.fromTaskEither = exports.leftIO = exports.rightIO = exports.fromIOEither = exports.leftObservable = exports.rightObservable = exports.right = exports.left = void 0;
var E = __importStar(require("fp-ts/lib/Either"));
var function_1 = require("fp-ts/lib/function");
var pipeable_1 = require("fp-ts/lib/pipeable");
var operators_1 = require("rxjs/operators");
var R = __importStar(require("./Observable"));
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 0.6.8
 */
exports.left = 
/*#__PURE__*/
function_1.flow(E.left, R.of);
/**
 * @category constructors
 * @since 0.6.8
 */
exports.right = 
/*#__PURE__*/
function_1.flow(E.right, R.of);
/**
 * @category constructors
 * @since 0.6.8
 */
exports.rightObservable = 
/*#__PURE__*/
R.map(E.right);
/**
 * @category constructors
 * @since 0.6.8
 */
exports.leftObservable = 
/*#__PURE__*/
R.map(E.left);
/**
 * @category constructors
 * @since 0.6.8
 */
exports.fromIOEither = R.fromIO;
/**
 * @category constructors
 * @since 0.6.8
 */
exports.rightIO = 
/*#__PURE__*/
function_1.flow(R.fromIO, exports.rightObservable);
/**
 * @category constructors
 * @since 0.6.8
 */
exports.leftIO = 
/*#__PURE__*/
function_1.flow(R.fromIO, exports.leftObservable);
/**
 * @category constructors
 * @since 0.6.8
 */
exports.fromTaskEither = R.fromTask;
/**
 * @category constructors
 * @since 0.6.12
 */
exports.fromIO = exports.rightIO;
/**
 * @category constructors
 * @since 0.6.8
 */
exports.fromTask = 
/*#__PURE__*/
function_1.flow(R.fromTask, exports.rightObservable);
/**
 * @category constructors
 * @since 0.6.12
 */
exports.fromObservable = exports.rightObservable;
/**
 * @category constructors
 * @since 0.6.12
 */
exports.tryCatch = 
/*#__PURE__*/
function_1.flow(R.map(E.right), operators_1.catchError(function_1.flow(E.left, R.of)));
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 0.6.8
 */
exports.fold = 
/*#__PURE__*/
function_1.flow(E.fold, R.chain);
/**
 * @category destructors
 * @since 0.6.8
 */
var getOrElse = function (onLeft) { return function (ma) {
    return pipeable_1.pipe(ma, R.chain(E.fold(onLeft, R.of)));
}; };
exports.getOrElse = getOrElse;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 0.6.8
 */
var orElse = function (f) { return R.chain(E.fold(f, exports.right)); };
exports.orElse = orElse;
/**
 * @category combinators
 * @since 0.6.8
 */
exports.swap = 
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
var map = function (f) {
    return R.map(E.map(f));
};
exports.map = map;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.0
 */
var ap = function (fa) {
    return function_1.flow(R.map(function (gab) { return function (ga) { return E.ap(ga)(gab); }; }), R.ap(fa));
};
exports.ap = ap;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.8
 */
var apFirst = function (fb) {
    return function_1.flow(exports.map(function (a) { return function () { return a; }; }), exports.ap(fb));
};
exports.apFirst = apFirst;
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.8
 */
var apSecond = function (fb) {
    return function_1.flow(exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
};
exports.apSecond = apSecond;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 0.6.8
 */
var alt = function (that) { return R.chain(E.fold(that, exports.right)); };
exports.alt = alt;
/**
 * @category Bifunctor
 * @since 0.6.8
 */
exports.bimap = 
/*#__PURE__*/
function_1.flow(E.bimap, R.map);
/**
 * @category Bifunctor
 * @since 0.6.8
 */
var mapLeft = function (f) {
    return R.map(E.mapLeft(f));
};
exports.mapLeft = mapLeft;
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.6.12
 */
var chainW = function (f) { return function (ma) { return pipeable_1.pipe(ma, R.chain(E.fold(function (a) { return exports.left(a); }, f))); }; };
exports.chainW = chainW;
/**
 * @category Monad
 * @since 0.6.8
 */
exports.chain = exports.chainW;
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.0
 */
exports.flatten = 
/*#__PURE__*/
exports.chain(function_1.identity);
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.8
 */
var chainFirst = function (f) {
    return exports.chain(function (a) {
        return pipeable_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
exports.chainFirst = chainFirst;
/**
 * @since 0.6.12
 */
exports.of = exports.right;
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
var filterOrElse = function (predicate, onFalse) {
    return exports.chain(function (a) { return (predicate(a) ? exports.of(a) : exports.throwError(onFalse(a))); });
};
exports.filterOrElse = filterOrElse;
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
var fromEither = function (ma) {
    return ma._tag === 'Left' ? exports.throwError(ma.left) : exports.of(ma.right);
};
exports.fromEither = fromEither;
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
var fromOption = function (onNone) { return function (ma) {
    return ma._tag === 'None' ? exports.throwError(onNone()) : exports.of(ma.value);
}; };
exports.fromOption = fromOption;
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
var fromPredicate = function (predicate, onFalse) { return function (a) {
    return predicate(a) ? exports.of(a) : exports.throwError(onFalse(a));
}; };
exports.fromPredicate = fromPredicate;
/**
 * @category MonadThrow
 * @since 0.6.12
 */
exports.throwError = exports.left;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var map_ = function (fa, f) { return pipeable_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var ap_ = function (fab, fa) { return pipeable_1.pipe(fab, exports.ap(fa)); };
/* istanbul ignore next */
var chain_ = function (ma, f) { return pipeable_1.pipe(ma, exports.chain(f)); };
/* istanbul ignore next */
var bimap_ = function (fea, f, g) { return pipeable_1.pipe(fea, exports.bimap(f, g)); };
/* istanbul ignore next */
var mapLeft_ = function (fea, f) { return pipeable_1.pipe(fea, exports.mapLeft(f)); };
/* istanbul ignore next */
var alt_ = function (fx, fy) { return pipeable_1.pipe(fx, exports.alt(fy)); };
/**
 * @category instances
 * @since 0.6.8
 */
exports.URI = 'ObservableEither';
/**
 * @category instances
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
exports.Apply = {
    URI: exports.URI,
    map: map_,
    ap: ap_
};
/**
 * @category instances
 * @since 0.6.12
 */
exports.Applicative = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of
};
/**
 * @category instances
 * @since 0.6.12
 */
exports.Monad = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of,
    chain: chain_
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
/**
 * @category instances
 * @since 0.6.12
 */
exports.Alt = {
    URI: exports.URI,
    map: map_,
    alt: alt_
};
/**
 * @category instances
 * @since 0.6.12
 */
exports.MonadIO = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of,
    chain: chain_,
    fromIO: exports.fromIO
};
/**
 * @category instances
 * @since 0.6.12
 */
exports.MonadTask = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of,
    chain: chain_,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask
};
/**
 * @category instances
 * @since 0.6.12
 */
exports.MonadObservable = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of,
    chain: chain_,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask,
    fromObservable: exports.fromObservable
};
/**
 * @category instances
 * @since 0.6.12
 */
exports.MonadThrow = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of,
    chain: chain_,
    throwError: exports.throwError
};
/**
 * @category instances
 * @deprecated
 * @since 0.6.8
 */
exports.observableEither = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: ap_,
    chain: chain_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    alt: alt_,
    fromIO: exports.rightIO,
    fromTask: exports.fromTask,
    fromObservable: exports.fromObservable,
    throwError: exports.throwError
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 0.6.12
 */
exports.Do = 
/*#__PURE__*/
exports.of({});
/**
 * @since 0.6.11
 */
var bindTo = function (name) {
    return exports.map(function (a) {
        var _a;
        return (_a = {}, _a[name] = a, _a);
    });
};
exports.bindTo = bindTo;
/**
 * @since 0.6.11
 */
var bind = function (name, f) {
    return exports.chain(function (a) {
        return pipeable_1.pipe(f(a), exports.map(function (b) {
            var _a;
            return (__assign(__assign({}, a), (_a = {}, _a[name] = b, _a)));
        }));
    });
};
exports.bind = bind;
/**
 * @since 0.6.12
 */
exports.bindW = exports.bind;
/**
 * @since 0.6.8
 */
exports.toTaskEither = R.toTask;
