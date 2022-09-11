/**
 * @since 0.6.0
 */
import { Alt1 } from 'fp-ts/es6/Alt'
import { Alternative1 } from 'fp-ts/es6/Alternative'
import { Applicative1 } from 'fp-ts/es6/Applicative'
import { Apply1 } from 'fp-ts/es6/Apply'
import { Compactable1, Separated } from 'fp-ts/es6/Compactable'
import * as E from 'fp-ts/es6/Either'
import { Filterable1 } from 'fp-ts/es6/Filterable'
import { Predicate, Refinement } from 'fp-ts/es6/function'
import { Functor1 } from 'fp-ts/es6/Functor'
import { Monad1 } from 'fp-ts/es6/Monad'
import { MonadIO1 } from 'fp-ts/es6/MonadIO'
import { MonadTask1 } from 'fp-ts/es6/MonadTask'
import { Monoid } from 'fp-ts/es6/Monoid'
import * as O from 'fp-ts/es6/Option'
import { Task } from 'fp-ts/es6/Task'
import { Observable } from 'rxjs'
import { MonadObservable1 } from './MonadObservable'
/**
 * @category constructors
 * @since 0.6.5
 */
export declare const fromOption: <A>(o: O.Option<A>) => Observable<A>
/**
 * @category constructors
 * @since 0.6.5
 */
export declare const fromIO: MonadIO1<URI>['fromIO']
/**
 * @category constructors
 * @since 0.6.5
 */
export declare const fromTask: MonadTask1<URI>['fromTask']
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: Observable<A>) => Observable<B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.0
 */
export declare const ap: <A>(fa: Observable<A>) => <B>(fab: Observable<(a: A) => B>) => Observable<B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.0
 */
export declare const apFirst: <B>(fb: Observable<B>) => <A>(fa: Observable<A>) => Observable<A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.0
 */
export declare const apSecond: <B>(fb: Observable<B>) => <A>(fa: Observable<A>) => Observable<B>
/**
 * @category Applicative
 * @since 0.6.6
 */
export declare const of: Applicative1<URI>['of']
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 0.6.0
 */
export declare const chain: <A, B>(f: (a: A) => Observable<B>) => (ma: Observable<A>) => Observable<B>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.0
 */
export declare const flatten: <A>(mma: Observable<Observable<A>>) => Observable<A>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => Observable<B>) => (ma: Observable<A>) => Observable<A>
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 0.6.0
 */
export declare const alt: <A>(that: () => Observable<A>) => (fa: Observable<A>) => Observable<A>
/**
 * @category Filterable
 * @since 0.6.0
 */
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fa: Observable<A>) => Observable<B>
/**
 * @category Compactable
 * @since 0.6.0
 */
export declare const compact: <A>(fa: Observable<O.Option<A>>) => Observable<A>
/**
 * @category Filterable
 * @since 0.6.0
 */
export declare const partitionMap: <A, B, C>(
  f: (a: A) => E.Either<B, C>
) => (fa: Observable<A>) => Separated<Observable<B>, Observable<C>>
/**
 * @category Compactable
 * @since 0.6.0
 */
export declare const separate: <A, B>(fa: Observable<E.Either<A, B>>) => Separated<Observable<A>, Observable<B>>
/**
 * @category Filterable
 * @since 0.6.0
 */
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Observable<A>) => Observable<B>
  <A>(predicate: Predicate<A>): (fa: Observable<A>) => Observable<A>
}
/**
 * @category Filterable
 * @since 0.6.0
 */
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Observable<A>) => Separated<Observable<A>, Observable<B>>
  <A>(predicate: Predicate<A>): (fa: Observable<A>) => Separated<Observable<A>, Observable<A>>
}
/**
 * @category Alternative
 * @since 0.6.12
 */
export declare const zero: Alternative1<URI>['zero']
/**
 * @category instances
 * @since 0.6.0
 */
export declare const URI = 'Observable'
/**
 * @category instances
 * @since 0.6.0
 */
export declare type URI = typeof URI
declare module 'fp-ts/es6/HKT' {
  interface URItoKind<A> {
    readonly [URI]: Observable<A>
  }
}
/**
 * @category instances
 * @since 0.6.0
 */
export declare const getMonoid: <A = never>() => Monoid<Observable<A>>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Functor: Functor1<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Apply: Apply1<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Applicative: Applicative1<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Monad: Monad1<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Alt: Alt1<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Alternative: Alternative1<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Compactable: Compactable1<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Filterable: Filterable1<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const MonadIO: MonadIO1<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const MonadTask: MonadTask1<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const MonadObservable: MonadObservable1<URI>
/**
 * @category instances
 * @since 0.6.0
 * @deprecated
 */
export declare const observable: Monad1<URI> & Alternative1<URI> & Filterable1<URI> & MonadObservable1<URI>
/**
 * @since 0.6.12
 */
export declare const Do: Observable<{}>
/**
 * @since 0.6.11
 */
export declare const bindTo: <K extends string, A>(name: K) => (fa: Observable<A>) => Observable<{ [P in K]: A }>
/**
 * @since 0.6.11
 */
export declare const bind: <K extends string, A, B>(
  name: Exclude<K, keyof A>,
  f: (a: A) => Observable<B>
) => (fa: Observable<A>) => Observable<{ [P in K | keyof A]: P extends keyof A ? A[P] : B }>
/**
 * @since 0.6.5
 */
export declare const toTask: <A>(o: Observable<A>) => Task<A>
/**
 * @since 0.6.15
 */
export declare const toTaskOption: <A>(o: Observable<A>) => Task<O.Option<A>>
