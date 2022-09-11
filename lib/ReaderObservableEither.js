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
exports.bindW = exports.bind = exports.bindTo = exports.Do = exports.readerObservableEither = exports.MonadThrow = exports.MonadObservable = exports.MonadTask = exports.MonadIO = exports.Bifunctor = exports.Monad = exports.Applicative = exports.Apply = exports.Functor = exports.URI = exports.fromPredicate = exports.fromOption = exports.fromEither = exports.filterOrElse = exports.chainFirst = exports.flatten = exports.chain = exports.chainW = exports.mapLeft = exports.bimap = exports.of = exports.apSecond = exports.apFirst = exports.ap = exports.map = exports.throwError = exports.local = exports.fromObservable = exports.fromTask = exports.fromIO = exports.fromReader = exports.asks = exports.ask = exports.left = exports.right = exports.fromObservableEither = void 0;
var function_1 = require("fp-ts/lib/function");
var pipeable_1 = require("fp-ts/lib/pipeable");
var R = __importStar(require("fp-ts/lib/Reader"));
var OE = __importStar(require("./ObservableEither"));
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 0.6.10
 */
exports.fromObservableEither = R.of;
/**
 * @category constructors
 * @since 2.0.0
 */
exports.right = 
/*#__PURE__*/
function_1.flow(OE.right, exports.fromObservableEither);
/**
 * @category constructors
 * @since 2.0.0
 */
exports.left = 
/*#__PURE__*/
function_1.flow(OE.left, exports.fromObservableEither);
/**
 * @category constructors
 * @since 0.6.10
 */
var ask = function () { return OE.right; };
exports.ask = ask;
/**
 * @category constructors
 * @since 0.6.10
 */
var asks = function (f) { return function_1.flow(OE.right, OE.map(f)); };
exports.asks = asks;
/**
 * @category constructors
 * @since 0.6.10
 */
var fromReader = function (ma) { return function_1.flow(ma, OE.right); };
exports.fromReader = fromReader;
/**
 * @category constructors
 * @since 0.6.10
 */
var fromIO = function (ma) { return function () { return OE.rightIO(ma); }; };
exports.fromIO = fromIO;
/**
 * @category constructors
 * @since 0.6.10
 */
var fromTask = function (ma) { return function () { return OE.fromTask(ma); }; };
exports.fromTask = fromTask;
/**
 * @category constructors
 * @since 0.6.10
 */
var fromObservable = function (ma) { return function () { return OE.rightObservable(ma); }; };
exports.fromObservable = fromObservable;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 0.6.10
 */
exports.local = R.local;
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * @category MonadThrow
 * @since 0.6.10
 */
var throwError = function (e) { return function () { return OE.left(e); }; };
exports.throwError = throwError;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.10
 */
var map = function (f) { return function (fa) { return function_1.flow(fa, OE.map(f)); }; };
exports.map = map;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.10
 */
var ap = function (fa) { return function (fab) { return function (r) {
    return pipeable_1.pipe(fab(r), OE.ap(fa(r)));
}; }; };
exports.ap = ap;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.10
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
 * @since 0.6.10
 */
var apSecond = function (fb) {
    return function_1.flow(exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
};
exports.apSecond = apSecond;
/**
 * @category Applicative
 * @since 0.6.10
 */
exports.of = exports.right;
/**
 * @category Bifunctor
 * @since 0.6.10
 */
var bimap = function (f, g) { return function (fea) { return function (r) {
    return OE.bimap(f, g)(fea(r));
}; }; };
exports.bimap = bimap;
/**
 * @category Bifunctor
 * @since 0.6.10
 */
var mapLeft = function (f) { return function (fea) { return function (r) {
    return OE.mapLeft(f)(fea(r));
}; }; };
exports.mapLeft = mapLeft;
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.6.12
 */
var chainW = function (f) { return function (ma) { return function (r) {
    return pipeable_1.pipe(ma(r), OE.chainW(function (a) { return f(a)(r); }));
}; }; };
exports.chainW = chainW;
/**
 * @category Monad
 * @since 0.6.10
 */
exports.chain = exports.chainW;
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.10
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
 * @since 0.6.10
 */
var chainFirst = function (f) {
    return exports.chain(function (a) {
        return pipeable_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
exports.chainFirst = chainFirst;
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
/**
 * @category instances
 * @since 0.6.10
 */
exports.URI = 'ReaderObservableEither';
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
    of: exports.of,
    ap: ap_,
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
    of: exports.of,
    ap: ap_,
    chain: chain_,
    fromIO: exports.fromIO,
    fromObservable: exports.fromObservable,
    fromTask: exports.fromTask
};
/**
 * @category instances
 * @since 0.6.12
 */
exports.MonadThrow = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: ap_,
    chain: chain_,
    throwError: exports.throwError
};
/**
 * @category instances
 * @since 0.6.10
 * @deprecated
 */
exports.readerObservableEither = {
    URI: exports.URI,
    ap: ap_,
    map: map_,
    of: exports.of,
    chain: chain_,
    fromIO: exports.fromIO,
    fromObservable: exports.fromObservable,
    fromTask: exports.fromTask,
    throwError: exports.throwError,
    bimap: bimap_,
    mapLeft: mapLeft_
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
