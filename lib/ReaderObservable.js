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
exports.toReaderTask = exports.run = exports.bindW = exports.bind = exports.bindTo = exports.Do = exports.readerObservable = exports.MonadObservable = exports.MonadTask = exports.MonadIO = exports.Filterable = exports.Compactable = exports.Alternative = exports.Alt = exports.Monad = exports.Applicative = exports.Apply = exports.Functor = exports.getMonoid = exports.URI = exports.partition = exports.filter = exports.separate = exports.partitionMap = exports.compact = exports.filterMap = exports.zero = exports.alt = exports.chainFirst = exports.flatten = exports.chain = exports.chainW = exports.of = exports.apSecond = exports.apFirst = exports.ap = exports.map = exports.chainTaskK = exports.fromObservableK = exports.chainIOK = exports.fromIOK = exports.local = exports.asks = exports.ask = exports.fromReaderTask = exports.fromTask = exports.fromIO = exports.fromOption = exports.fromReader = exports.fromObservable = void 0;
exports.toReaderTaskOption = void 0;
var E = __importStar(require("fp-ts/lib/Either"));
var function_1 = require("fp-ts/lib/function");
var O = __importStar(require("fp-ts/lib/Option"));
var pipeable_1 = require("fp-ts/lib/pipeable");
var R = __importStar(require("fp-ts/lib/Reader"));
var T = __importStar(require("./Observable"));
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 0.6.6
 */
exports.fromObservable = R.of;
/**
 * @category constructors
 * @since 0.6.6
 */
var fromReader = function (ma) { return function_1.flow(ma, T.of); };
exports.fromReader = fromReader;
/**
 * @category constructors
 * @since 0.6.6
 */
var fromOption = function (o) { return exports.fromObservable(T.fromOption(o)); };
exports.fromOption = fromOption;
/**
 * @category constructors
 * @since 0.6.6
 */
exports.fromIO = 
/*#__PURE__*/
function_1.flow(T.fromIO, exports.fromObservable);
/**
 * @category constructors
 * @since 0.6.6
 */
exports.fromTask = 
/*#__PURE__*/
function_1.flow(T.fromTask, exports.fromObservable);
/**
 * @category constructors
 * @since 0.6.9
 */
var fromReaderTask = function (ma) { return function_1.flow(ma, T.fromTask); };
exports.fromReaderTask = fromReaderTask;
/**
 * @category constructors
 * @since 0.6.6
 */
var ask = function () { return T.of; };
exports.ask = ask;
/**
 * @category constructors
 * @since 0.6.6
 */
var asks = function (f) { return function_1.flow(T.of, T.map(f)); };
exports.asks = asks;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 0.6.6
 */
exports.local = R.local;
/**
 * @category combinators
 * @since 0.6.6
 */
var fromIOK = function (f) { return function () {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    return exports.fromIO(f.apply(void 0, a));
}; };
exports.fromIOK = fromIOK;
/**
 * @category combinators
 * @since 0.6.6
 */
var chainIOK = function (f) {
    return exports.chain(function (a) { return exports.fromIOK(f)(a); });
};
exports.chainIOK = chainIOK;
/**
 * @category combinators
 * @since 0.6.6
 */
var fromObservableK = function (f) { return function () {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    return exports.fromObservable(f.apply(void 0, a));
}; };
exports.fromObservableK = fromObservableK;
/**
 * @category combinators
 * @since 0.6.6
 */
var chainTaskK = function (f) { return exports.chain(function (a) { return exports.fromObservableK(f)(a); }); };
exports.chainTaskK = chainTaskK;
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
var map = function (f) { return function (fa) {
    return function_1.flow(fa, T.map(f));
}; };
exports.map = map;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.6
 */
var ap = function (fa) { return function (fab) { return function (r) { return pipeable_1.pipe(fab(r), T.ap(fa(r))); }; }; };
exports.ap = ap;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.6
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
 * @since 0.6.6
 */
var apSecond = function (fb) {
    return function_1.flow(exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
};
exports.apSecond = apSecond;
/**
 * @category Applicative
 * @since 0.6.6
 */
var of = function (a) { return function () { return T.of(a); }; };
exports.of = of;
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.6.12
 */
var chainW = function (f) { return function (ma) { return function (r) {
    return pipeable_1.pipe(ma(r), T.chain(function (a) { return f(a)(r); }));
}; }; };
exports.chainW = chainW;
/**
 * @category Monad
 * @since 0.6.6
 */
exports.chain = exports.chainW;
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.6
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
 * @since 0.6.6
 */
var chainFirst = function (f) {
    return exports.chain(function (a) {
        return pipeable_1.pipe(f(a), exports.map(function () { return a; }));
    });
};
exports.chainFirst = chainFirst;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 0.6.7
 */
var alt = function (that) { return function (me) { return function (r) {
    return pipeable_1.pipe(me(r), T.alt(function () { return that()(r); }));
}; }; };
exports.alt = alt;
/**
 * @since 0.6.12
 */
var zero = function () { return T.Alternative.zero; };
exports.zero = zero;
/**
 * @category Filterable
 * @since 0.6.7
 */
var filterMap = function (f) { return function (fa) { return function (r) { return pipeable_1.pipe(fa(r), T.filterMap(f)); }; }; };
exports.filterMap = filterMap;
/**
 * @category Compactable
 * @since 0.6.7
 */
exports.compact = 
/*#__PURE__*/
exports.filterMap(function_1.identity);
/**
 * @category Filterable
 * @since 0.6.7
 */
var partitionMap = function (f) { return function (fa) { return ({
    left: pipeable_1.pipe(fa, exports.filterMap(function (a) { return O.fromEither(E.swap(f(a))); })),
    right: pipeable_1.pipe(fa, exports.filterMap(function (a) { return O.fromEither(f(a)); }))
}); }; };
exports.partitionMap = partitionMap;
/**
 * @category Compactable
 * @since 0.6.7
 */
exports.separate = 
/*#__PURE__*/
exports.partitionMap(function_1.identity);
/**
 * @category Filterable
 * @since 0.6.7
 */
var filter = function (predicate) {
    return exports.filterMap(O.fromPredicate(predicate));
};
exports.filter = filter;
/**
 * @category Filterable
 * @since 0.6.7
 */
var partition = function (predicate) {
    return exports.partitionMap(E.fromPredicate(predicate, function_1.identity));
};
exports.partition = partition;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return pipeable_1.pipe(fa, exports.map(f)); };
var ap_ = function (fab, fa) { return pipeable_1.pipe(fab, exports.ap(fa)); };
/* istanbul ignore next */
var chain_ = function (ma, f) { return pipeable_1.pipe(ma, exports.chain(f)); };
/* istanbul ignore next */
var alt_ = function (fx, f) { return pipeable_1.pipe(fx, exports.alt(f)); };
/* istanbul ignore next */
var filter_ = function (fa, p) { return pipeable_1.pipe(fa, exports.filter(p)); };
/* istanbul ignore next */
var filterMap_ = function (fa, f) { return pipeable_1.pipe(fa, exports.filterMap(f)); };
/* istanbul ignore next */
var partition_ = function (fa, p) {
    return pipeable_1.pipe(fa, exports.partition(p));
};
/* istanbul ignore next */
var partitionMap_ = function (fa, f) { return pipeable_1.pipe(fa, exports.partitionMap(f)); };
/**
 * @category instances
 * @since 0.6.6
 */
exports.URI = 'ReaderObservable';
/**
 * @category instances
 * @since 0.6.6
 */
var getMonoid = function () { return R.getMonoid(T.getMonoid()); };
exports.getMonoid = getMonoid;
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
exports.Alt = {
    URI: exports.URI,
    map: map_,
    alt: alt_
};
/**
 * @category instances
 * @since 0.6.12
 */
exports.Alternative = {
    URI: exports.URI,
    map: map_,
    ap: ap_,
    of: exports.of,
    alt: alt_,
    zero: exports.zero
};
/**
 * @category instances
 * @since 0.6.12
 */
exports.Compactable = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate
};
/**
 * @category instances
 * @since 0.6.12
 */
exports.Filterable = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate,
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
 * @since 0.6.6
 * @deprecated
 */
exports.readerObservable = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: ap_,
    chain: chain_,
    zero: exports.zero,
    alt: alt_,
    compact: exports.compact,
    separate: exports.separate,
    partitionMap: partitionMap_,
    partition: partition_,
    filterMap: filterMap_,
    filter: filter_,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask,
    fromObservable: exports.fromObservable
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
 * @since 0.6.6
 */
var run = function (ma, r) { return T.toTask(ma(r))(); };
exports.run = run;
/**
 * @since 0.6.6
 */
var toReaderTask = function (ma) { return function (r) { return T.toTask(ma(r)); }; };
exports.toReaderTask = toReaderTask;
/**
 * @since 0.6.15
 */
var toReaderTaskOption = function (ma) { return function (r) {
    return T.toTaskOption(ma(r));
}; };
exports.toReaderTaskOption = toReaderTaskOption;
