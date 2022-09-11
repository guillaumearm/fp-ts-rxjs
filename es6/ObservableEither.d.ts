/**
 * @since 0.6.8
 */
import { Alt2 } from 'fp-ts/es6/Alt'
import { Applicative2 } from 'fp-ts/es6/Applicative'
import { Apply2 } from 'fp-ts/es6/Apply'
import { Bifunctor2 } from 'fp-ts/es6/Bifunctor'
import * as E from 'fp-ts/es6/Either'
import { Predicate, Refinement } from 'fp-ts/es6/function'
import { Functor2 } from 'fp-ts/es6/Functor'
import { IO } from 'fp-ts/es6/IO'
import { IOEither } from 'fp-ts/es6/IOEither'
import { Monad2 } from 'fp-ts/es6/Monad'
import { MonadIO2 } from 'fp-ts/es6/MonadIO'
import { MonadTask2 } from 'fp-ts/es6/MonadTask'
import { MonadThrow2 } from 'fp-ts/es6/MonadThrow'
import { Option } from 'fp-ts/es6/Option'
import * as TE from 'fp-ts/es6/TaskEither'
import { Observable } from 'rxjs'
import { MonadObservable2 } from './MonadObservable'
/**
 * @category model
 * @since 0.6.8
 */
export interface ObservableEither<E, A> extends Observable<E.Either<E, A>> {}
/**
 * @category constructors
 * @since 0.6.8
 */
export declare const left: <E = never, A = never>(e: E) => ObservableEither<E, A>
/**
 * @category constructors
 * @since 0.6.8
 */
export declare const right: <E = never, A = never>(a: A) => ObservableEither<E, A>
/**
 * @category constructors
 * @since 0.6.8
 */
export declare const rightObservable: <E = never, A = never>(ma: Observable<A>) => ObservableEither<E, A>
/**
 * @category constructors
 * @since 0.6.8
 */
export declare const leftObservable: <E = never, A = never>(ma: Observable<E>) => ObservableEither<E, A>
/**
 * @category constructors
 * @since 0.6.8
 */
export declare const fromIOEither: <E, A>(fa: IOEither<E, A>) => ObservableEither<E, A>
/**
 * @category constructors
 * @since 0.6.8
 */
export declare const rightIO: <E = never, A = never>(ma: IO<A>) => ObservableEither<E, A>
/**
 * @category constructors
 * @since 0.6.8
 */
export declare const leftIO: <E = never, A = never>(me: IO<E>) => ObservableEither<E, A>
/**
 * @category constructors
 * @since 0.6.8
 */
export declare const fromTaskEither: <E, A>(t: TE.TaskEither<E, A>) => ObservableEither<E, A>
/**
 * @category constructors
 * @since 0.6.12
 */
export declare const fromIO: MonadIO2<URI>['fromIO']
/**
 * @category constructors
 * @since 0.6.8
 */
export declare const fromTask: MonadTask2<URI>['fromTask']
/**
 * @category constructors
 * @since 0.6.12
 */
export declare const fromObservable: MonadObservable2<URI>['fromObservable']
/**
 * @category constructors
 * @since 0.6.12
 */
export declare const tryCatch: <A>(a: Observable<A>) => ObservableEither<unknown, A>
/**
 * @category destructors
 * @since 0.6.8
 */
export declare const fold: <E, A, B>(
  onLeft: (e: E) => Observable<B>,
  onRight: (a: A) => Observable<B>
) => (ma: ObservableEither<E, A>) => Observable<B>
/**
 * @category destructors
 * @since 0.6.8
 */
export declare const getOrElse: <E, A>(onLeft: (e: E) => Observable<A>) => (ma: ObservableEither<E, A>) => Observable<A>
/**
 * @category combinators
 * @since 0.6.8
 */
export declare const orElse: <E, A, M>(
  onLeft: (e: E) => ObservableEither<M, A>
) => (ma: ObservableEither<E, A>) => ObservableEither<M, A>
/**
 * @category combinators
 * @since 0.6.8
 */
export declare const swap: <E, A>(ma: ObservableEither<E, A>) => ObservableEither<A, E>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.8
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: ObservableEither<E, A>) => ObservableEither<E, B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.0
 */
export declare const ap: <E, A>(
  fa: ObservableEither<E, A>
) => <B>(fab: ObservableEither<E, (a: A) => B>) => ObservableEither<E, B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.8
 */
export declare const apFirst: <E, B>(
  fb: ObservableEither<E, B>
) => <A>(fa: ObservableEither<E, A>) => ObservableEither<E, A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.8
 */
export declare const apSecond: <E, B>(
  fb: ObservableEither<E, B>
) => <A>(fa: ObservableEither<E, A>) => ObservableEither<E, B>
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 0.6.8
 */
export declare const alt: <E, A>(
  that: () => ObservableEither<E, A>
) => (fa: ObservableEither<E, A>) => ObservableEither<E, A>
/**
 * @category Bifunctor
 * @since 0.6.8
 */
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => (fa: ObservableEither<E, A>) => ObservableEither<G, B>
/**
 * @category Bifunctor
 * @since 0.6.8
 */
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: ObservableEither<E, A>) => ObservableEither<G, A>
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.6.12
 */
export declare const chainW: <A, E2, B>(
  f: (a: A) => ObservableEither<E2, B>
) => <E1>(ma: ObservableEither<E1, A>) => ObservableEither<E2 | E1, B>
/**
 * @category Monad
 * @since 0.6.8
 */
export declare const chain: <A, E, B>(
  f: (a: A) => ObservableEither<E, B>
) => (ma: ObservableEither<E, A>) => ObservableEither<E, B>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.0
 */
export declare const flatten: <E, A>(mma: ObservableEither<E, ObservableEither<E, A>>) => ObservableEither<E, A>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.8
 */
export declare const chainFirst: <E, A, B>(
  f: (a: A) => ObservableEither<E, B>
) => (ma: ObservableEither<E, A>) => ObservableEither<E, A>
/**
 * @since 0.6.12
 */
export declare const of: Applicative2<URI>['of']
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (
    ma: ObservableEither<E, A>
  ) => ObservableEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: ObservableEither<E, A>) => ObservableEither<E, A>
}
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export declare const fromEither: <E, A>(ma: E.Either<E, A>) => ObservableEither<E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export declare const fromOption: <E>(onNone: () => E) => <A>(ma: Option<A>) => ObservableEither<E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => ObservableEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => ObservableEither<E, A>
}
/**
 * @category MonadThrow
 * @since 0.6.12
 */
export declare const throwError: MonadThrow2<URI>['throwError']
/**
 * @category instances
 * @since 0.6.8
 */
export declare const URI = 'ObservableEither'
/**
 * @category instances
 * @since 0.6.8
 */
export declare type URI = typeof URI
declare module 'fp-ts/es6/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: ObservableEither<E, A>
  }
}
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Functor: Functor2<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Apply: Apply2<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Applicative: Applicative2<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Monad: Monad2<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Bifunctor: Bifunctor2<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Alt: Alt2<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const MonadIO: MonadIO2<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const MonadTask: MonadTask2<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const MonadObservable: MonadObservable2<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const MonadThrow: MonadThrow2<URI>
/**
 * @category instances
 * @deprecated
 * @since 0.6.8
 */
export declare const observableEither: Monad2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  MonadObservable2<URI> &
  MonadThrow2<URI>
/**
 * @since 0.6.12
 */
export declare const Do: ObservableEither<never, {}>
/**
 * @since 0.6.11
 */
export declare const bindTo: <K extends string, E, A>(
  name: K
) => (fa: ObservableEither<E, A>) => ObservableEither<E, { [P in K]: A }>
/**
 * @since 0.6.11
 */
export declare const bind: <K extends string, E, A, B>(
  name: Exclude<K, keyof A>,
  f: (a: A) => ObservableEither<E, B>
) => (fa: ObservableEither<E, A>) => ObservableEither<E, { [P in K | keyof A]: P extends keyof A ? A[P] : B }>
/**
 * @since 0.6.12
 */
export declare const bindW: <K extends string, E2, A, B>(
  name: Exclude<K, keyof A>,
  f: (a: A) => ObservableEither<E2, B>
) => <E1>(
  fa: ObservableEither<E1, A>
) => ObservableEither<
  E1 | E2,
  {
    [P in keyof A | K]: P extends keyof A ? A[P] : B
  }
>
/**
 * @since 0.6.8
 */
export declare const toTaskEither: <E, A>(o: ObservableEither<E, A>) => TE.TaskEither<E, A>
