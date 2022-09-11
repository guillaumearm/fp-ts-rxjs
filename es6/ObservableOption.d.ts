/**
 * @since 0.6.14
 */
import { Alt1 } from 'fp-ts/es6/Alt'
import { Applicative1 } from 'fp-ts/es6/Applicative'
import { Apply1 } from 'fp-ts/es6/Apply'
import { Predicate, Refinement } from 'fp-ts/es6/function'
import { Functor1 } from 'fp-ts/es6/Functor'
import { IO } from 'fp-ts/es6/IO'
import { Monad1 } from 'fp-ts/es6/Monad'
import { MonadIO1 } from 'fp-ts/es6/MonadIO'
import { MonadTask1 } from 'fp-ts/es6/MonadTask'
import * as O from 'fp-ts/es6/Option'
import { Observable } from 'rxjs'
import { MonadObservable1 } from './MonadObservable'
/**
 * @category model
 * @since 0.6.14
 */
export interface ObservableOption<A> extends Observable<O.Option<A>> {}
/**
 * @category constructors
 * @since 0.6.14
 */
export declare const none: ObservableOption<never>
/**
 * @category constructors
 * @since 0.6.14
 */
export declare const some: <A>(a: A) => ObservableOption<A>
/**
 * @category constructors
 * @since 0.6.14
 */
export declare const fromObservable: <A = never>(ma: Observable<A>) => ObservableOption<A>
/**
 * @category constructors
 * @since 0.6.14
 */
export declare const fromIO: <A = never>(ma: IO<A>) => ObservableOption<A>
/**
 * @category constructors
 * @since 0.6.14
 */
export declare const fromTask: MonadTask1<URI>['fromTask']
/**
 * @category constructors
 * @since 0.6.14
 */
export declare const tryCatch: <A>(a: Observable<A>) => ObservableOption<A>
/**
 * @category destructors
 * @since 0.6.14
 */
export declare const fold: <A, B>(
  onNone: () => Observable<B>,
  onSome: (a: A) => Observable<B>
) => (ma: ObservableOption<A>) => Observable<B>
/**
 * @category destructors
 * @since 0.6.14
 */
export declare const getOrElse: <A>(onNone: () => Observable<A>) => (ma: ObservableOption<A>) => Observable<A>
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category combinators
 * @since 0.6.14
 */
export declare const alt: <A>(onNone: () => ObservableOption<A>) => (ma: ObservableOption<A>) => ObservableOption<A>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.14
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: ObservableOption<A>) => ObservableOption<B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.14
 */
export declare const ap: <A>(fa: ObservableOption<A>) => <B>(fab: ObservableOption<(a: A) => B>) => ObservableOption<B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.14
 */
export declare const apFirst: <B>(fb: ObservableOption<B>) => <A>(fa: ObservableOption<A>) => ObservableOption<A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.14
 */
export declare const apSecond: <B>(fb: ObservableOption<B>) => <A>(fa: ObservableOption<A>) => ObservableOption<B>
/**
 * @category Monad
 * @since 0.6.14
 */
export declare const chain: <A, B>(f: (a: A) => ObservableOption<B>) => (ma: ObservableOption<A>) => ObservableOption<B>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.14
 */
export declare const flatten: <A>(mma: ObservableOption<ObservableOption<A>>) => ObservableOption<A>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.14
 */
export declare const chainFirst: <A, B>(
  f: (a: A) => ObservableOption<B>
) => (ma: ObservableOption<A>) => ObservableOption<A>
/**
 * @since 0.6.14
 */
export declare const of: Applicative1<URI>['of']
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.14
 */
export declare const filterOrElse: {
  <A, B extends A>(refinement: Refinement<A, B>): (ma: ObservableOption<A>) => ObservableOption<B>
  <A>(predicate: Predicate<A>): (ma: ObservableOption<A>) => ObservableOption<A>
}
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.14
 */
export declare const fromOption: <A>(ma: O.Option<A>) => ObservableOption<A>
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.14
 */
export declare const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => ObservableOption<B>
  <A>(predicate: Predicate<A>): (a: A) => ObservableOption<A>
}
/**
 * @category instances
 * @since 0.6.14
 */
export declare const URI = 'ObservableOption'
/**
 * @category instances
 * @since 0.6.14
 */
export declare type URI = typeof URI
declare module 'fp-ts/es6/HKT' {
  interface URItoKind<A> {
    readonly [URI]: ObservableOption<A>
  }
}
/**
 * @category instances
 * @since 0.6.14
 */
export declare const Functor: Functor1<URI>
/**
 * @category instances
 * @since 0.6.14
 */
export declare const Apply: Apply1<URI>
/**
 * @category instances
 * @since 0.6.14
 */
export declare const Applicative: Applicative1<URI>
/**
 * @category instances
 * @since 0.6.14
 */
export declare const Monad: Monad1<URI>
/**
 * @category instances
 * @since 0.6.14
 */
export declare const Alt: Alt1<URI>
/**
 * @category instances
 * @since 0.6.14
 */
export declare const MonadIO: MonadIO1<URI>
/**
 * @category instances
 * @since 0.6.14
 */
export declare const MonadTask: MonadTask1<URI>
/**
 * @category instances
 * @since 0.6.14
 */
export declare const MonadObservable: MonadObservable1<URI>
/**
 * @since 0.6.14
 */
export declare const Do: ObservableOption<{}>
/**
 * @since 0.6.14
 */
export declare const bindTo: <K extends string, A>(
  name: K
) => (fa: ObservableOption<A>) => ObservableOption<{ [P in K]: A }>
/**
 * @since 0.6.14
 */
export declare const bind: <K extends string, A, B>(
  name: Exclude<K, keyof A>,
  f: (a: A) => ObservableOption<B>
) => (fa: ObservableOption<A>) => ObservableOption<{ [P in K | keyof A]: P extends keyof A ? A[P] : B }>
