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
exports.bind = exports.bindTo = exports.Do = exports.MonadObservable = exports.MonadTask = exports.MonadIO = exports.Alt = exports.Monad = exports.Applicative = exports.Apply = exports.Functor = exports.URI = exports.fromPredicate = exports.fromOption = exports.filterOrElse = exports.of = exports.chainFirst = exports.flatten = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.map = exports.alt = exports.getOrElse = exports.fold = exports.tryCatch = exports.fromTask = exports.fromIO = exports.fromObservable = exports.some = exports.none = void 0;
var function_1 = require("fp-ts/lib/function");
var O = __importStar(require("fp-ts/lib/Option"));
var pipeable_1 = require("fp-ts/lib/pipeable");
var operators_1 = require("rxjs/operators");
var R = __importStar(require("./Observable"));
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 0.6.14
 */
exports.none = 
/*#__PURE__*/
pipeable_1.pipe(O.none, R.of);
/**
 * @category constructors
 * @since 0.6.14
 */
exports.some = 
/*#__PURE__*/
function_1.flow(O.some, R.of);
/**
 * @category constructors
 * @since 0.6.14
 */
exports.fromObservable = 
/*#__PURE__*/
R.map(O.some);
/**
 * @category constructors
 * @since 0.6.14
 */
exports.fromIO = 
/*#__PURE__*/
function_1.flow(R.fromIO, exports.fromObservable);
/**
 * @category constructors
 * @since 0.6.14
 */
exports.fromTask = 
/*#__PURE__*/
function_1.flow(R.fromTask, exports.fromObservable);
/**
 * @category constructors
 * @since 0.6.14
 */
exports.tryCatch = 
/*#__PURE__*/
function_1.flow(R.map(O.some), operators_1.catchError(function () { return exports.none; }));
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * @category destructors
 * @since 0.6.14
 */
exports.fold = 
/*#__PURE__*/
function_1.flow(O.fold, R.chain);
/**
 * @category destructors
 * @since 0.6.14
 */
var getOrElse = function (onNone) { return function (ma) {
    return pipeable_1.pipe(ma, R.chain(O.fold(onNone, R.of)));
}; };
exports.getOrElse = getOrElse;
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
var alt = function (f) {
    return R.chain(O.fold(f, exports.some));
};
exports.alt = alt;
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
var map = function (f) { return R.map(O.map(f)); };
exports.map = map;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.14
 */
var ap = function (fa) {
    return function_1.flow(R.map(function (gab) { return function (ga) { return O.ap(ga)(gab); }; }), R.ap(fa));
};
exports.ap = ap;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.14
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
 * @since 0.6.14
 */
var apSecond = function (fb) {
    return function_1.flow(exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
};
exports.apSecond = apSecond;
/**
 * @category Monad
 * @since 0.6.14
 */
var chain = function (f) { return function (ma) {
    return pipeable_1.pipe(ma, R.chain(O.fold(function () { return exports.none; }, f)));
}; };
exports.chain = chain;
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.14
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
 * @since 0.6.14
 */
var chainFirst = function (f) {
    return exports.chain(function (a) {
        return pipeable_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
exports.chainFirst = chainFirst;
/**
 * @since 0.6.14
 */
exports.of = exports.some;
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.14
 */
var filterOrElse = function (predicate) {
    return exports.chain(function (a) { return (predicate(a) ? exports.of(a) : exports.none); });
};
exports.filterOrElse = filterOrElse;
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.14
 */
var fromOption = function (ma) { return (ma._tag === 'None' ? exports.none : exports.of(ma.value)); };
exports.fromOption = fromOption;
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.14
 */
var fromPredicate = function (predicate) { return function (a) { return (predicate(a) ? exports.of(a) : exports.none); }; };
exports.fromPredicate = fromPredicate;
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
var alt_ = function (fx, fy) { return pipeable_1.pipe(fx, exports.alt(fy)); };
/**
 * @category instances
 * @since 0.6.14
 */
exports.URI = 'ObservableOption';
/**
 * @category instances
 * @since 0.6.14
 */
exports.Functor = {
    URI: exports.URI,
    map: map_
};
/**
 * @category instances
 * @since 0.6.14
 */
exports.Apply = {
    URI: exports.URI,
    map: map_,
    ap: ap_
};
/**
 * @category instances
 * @since 0.6.14
 */
exports.Applicative = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of
};
/**
 * @category instances
 * @since 0.6.14
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
 * @since 0.6.14
 */
exports.Alt = {
    URI: exports.URI,
    map: map_,
    alt: alt_
};
/**
 * @category instances
 * @since 0.6.14
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
 * @since 0.6.14
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
 * @since 0.6.14
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
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 0.6.14
 */
exports.Do = 
/*#__PURE__*/
exports.of({});
/**
 * @since 0.6.14
 */
var bindTo = function (name) { return exports.map(function (a) {
    var _a;
    return (_a = {}, _a[name] = a, _a);
}); };
exports.bindTo = bindTo;
/**
 * @since 0.6.14
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
