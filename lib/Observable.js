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
exports.toTaskOption = exports.toTask = exports.bind = exports.bindTo = exports.Do = exports.observable = exports.MonadObservable = exports.MonadTask = exports.MonadIO = exports.Filterable = exports.Compactable = exports.Alternative = exports.Alt = exports.Monad = exports.Applicative = exports.Apply = exports.Functor = exports.getMonoid = exports.URI = exports.zero = exports.partition = exports.filter = exports.separate = exports.partitionMap = exports.compact = exports.filterMap = exports.alt = exports.chainFirst = exports.flatten = exports.chain = exports.of = exports.apSecond = exports.apFirst = exports.ap = exports.map = exports.fromTask = exports.fromIO = exports.fromOption = void 0;
var E = __importStar(require("fp-ts/lib/Either"));
var function_1 = require("fp-ts/lib/function");
var O = __importStar(require("fp-ts/lib/Option"));
var pipeable_1 = require("fp-ts/lib/pipeable");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 0.6.5
 */
var fromOption = function (o) { return (O.isNone(o) ? rxjs_1.EMPTY : exports.of(o.value)); };
exports.fromOption = fromOption;
/**
 * @category constructors
 * @since 0.6.5
 */
var fromIO = function (ma) { return rxjs_1.defer(function () { return rxjs_1.of(ma()); }); };
exports.fromIO = fromIO;
/**
 * @category constructors
 * @since 0.6.5
 */
exports.fromTask = rxjs_1.defer;
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
var map = function (f) { return function (fa) { return fa.pipe(operators_1.map(f)); }; };
exports.map = map;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.0
 */
var ap = function (fa) { return function (fab) {
    return rxjs_1.combineLatest([fab, fa]).pipe(operators_1.map(function (_a) {
        var f = _a[0], a = _a[1];
        return f(a);
    }));
}; };
exports.ap = ap;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.0
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
 * @since 0.6.0
 */
var apSecond = function (fb) {
    return function_1.flow(exports.map(function () { return function (b) { return b; }; }), exports.ap(fb));
};
exports.apSecond = apSecond;
/**
 * @category Applicative
 * @since 0.6.6
 */
// tslint:disable-next-line: deprecation
exports.of = rxjs_1.of;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 0.6.0
 */
var chain = function (f) { return function (ma) {
    return ma.pipe(operators_1.mergeMap(f));
}; };
exports.chain = chain;
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
 * @since 0.6.0
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
 * @since 0.6.0
 */
var alt = function (that) { return function (fa) {
    return rxjs_1.merge(fa, that());
}; };
exports.alt = alt;
/**
 * @category Filterable
 * @since 0.6.0
 */
var filterMap = function (f) { return function (fa) {
    return fa.pipe(operators_1.mergeMap(function (a) {
        return pipeable_1.pipe(f(a), 
        // tslint:disable-next-line: deprecation
        O.fold(function () { return rxjs_1.EMPTY; }, exports.of));
    }));
}; };
exports.filterMap = filterMap;
/**
 * @category Compactable
 * @since 0.6.0
 */
exports.compact = 
/*#__PURE__*/
exports.filterMap(function_1.identity);
/**
 * @category Filterable
 * @since 0.6.0
 */
var partitionMap = function (f) { return function (fa) { return ({
    left: pipeable_1.pipe(fa, exports.filterMap(function (a) { return O.fromEither(E.swap(f(a))); })),
    right: pipeable_1.pipe(fa, exports.filterMap(function (a) { return O.fromEither(f(a)); }))
}); }; };
exports.partitionMap = partitionMap;
/**
 * @category Compactable
 * @since 0.6.0
 */
exports.separate = 
/*#__PURE__*/
exports.partitionMap(function_1.identity);
/**
 * @category Filterable
 * @since 0.6.0
 */
var filter = function (p) { return function (fa) { return pipeable_1.pipe(fa, exports.filterMap(O.fromPredicate(p))); }; };
exports.filter = filter;
/**
 * @category Filterable
 * @since 0.6.0
 */
var partition = function (p) { return function (fa) { return pipeable_1.pipe(fa, exports.partitionMap(E.fromPredicate(p, function_1.identity))); }; };
exports.partition = partition;
/**
 * @category Alternative
 * @since 0.6.12
 */
var zero = function () { return rxjs_1.EMPTY; };
exports.zero = zero;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return pipeable_1.pipe(fa, exports.map(f)); };
var ap_ = function (fab, fa) { return pipeable_1.pipe(fab, exports.ap(fa)); };
/* istanbul ignore next */
var chain_ = function (fa, f) { return pipeable_1.pipe(fa, exports.chain(f)); };
/* istanbul ignore next */
var alt_ = function (me, that) { return pipeable_1.pipe(me, exports.alt(that)); };
/* istanbul ignore next */
var filter_ = function (fa, p) { return pipeable_1.pipe(fa, exports.filter(p)); };
/* istanbul ignore next */
var filterMap_ = function (fa, f) {
    return pipeable_1.pipe(fa, exports.filterMap(f));
};
/* istanbul ignore next */
var partition_ = function (fa, p) { return pipeable_1.pipe(fa, exports.partition(p)); };
/* istanbul ignore next */
var partitionMap_ = function (fa, f) { return pipeable_1.pipe(fa, exports.partitionMap(f)); };
/**
 * @category instances
 * @since 0.6.0
 */
exports.URI = 'Observable';
/**
 * @category instances
 * @since 0.6.0
 */
var getMonoid = function () { return ({
    concat: function (x, y) { return rxjs_1.merge(x, y); },
    empty: rxjs_1.EMPTY
}); };
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
    fromObservable: function_1.identity
};
/**
 * @category instances
 * @since 0.6.0
 * @deprecated
 */
exports.observable = {
    URI: exports.URI,
    map: map_,
    of: exports.of,
    ap: ap_,
    chain: chain_,
    zero: exports.zero,
    alt: alt_,
    compact: exports.compact,
    separate: exports.separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    fromIO: exports.fromIO,
    fromTask: exports.fromTask,
    fromObservable: function_1.identity
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
 * @since 0.6.5
 */
var toTask = function (o) { return function () {
    return new Promise(function (resolve, reject) {
        var hasResult = false;
        var result;
        o.subscribe({
            next: function (value) {
                result = value;
                hasResult = true;
            },
            error: reject,
            complete: function () {
                /* istanbul ignore next */
                if (hasResult) {
                    resolve(result);
                }
            }
        });
    });
}; };
exports.toTask = toTask;
/**
 * @since 0.6.15
 */
var toTaskOption = function (o) { return function () {
    return pipeable_1.pipe(o, //
    exports.map(O.some), operators_1.startWith(O.none), function (o) { return rxjs_1.lastValueFrom(o, { defaultValue: O.none }); });
}; };
exports.toTaskOption = toTaskOption;
