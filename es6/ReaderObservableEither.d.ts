/**
 * @since 0.6.10
 */
import { Applicative3 } from 'fp-ts/es6/Applicative'
import { Apply3 } from 'fp-ts/es6/Apply'
import { Bifunctor3 } from 'fp-ts/es6/Bifunctor'
import { Either } from 'fp-ts/es6/Either'
import { Predicate, Refinement } from 'fp-ts/es6/function'
import { Functor3 } from 'fp-ts/es6/Functor'
import { Monad3 } from 'fp-ts/es6/Monad'
import { MonadIO3 } from 'fp-ts/es6/MonadIO'
import { MonadTask3 } from 'fp-ts/es6/MonadTask'
import { MonadThrow3 } from 'fp-ts/es6/MonadThrow'
import { Option } from 'fp-ts/es6/Option'
import * as R from 'fp-ts/es6/Reader'
import { MonadObservable3 } from './MonadObservable'
import * as OE from './ObservableEither'
/**
 * @category model
 * @since 0.6.10
 */
export interface ReaderObservableEither<R, E, A> {
  (r: R): OE.ObservableEither<E, A>
}
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const fromObservableEither: <R, E, A>(ma: OE.ObservableEither<E, A>) => ReaderObservableEither<R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const right: <R, E = never, A = never>(a: A) => ReaderObservableEither<R, E, A>
/**
 * @category constructors
 * @since 2.0.0
 */
export declare const left: <R, E = never, A = never>(e: E) => ReaderObservableEither<R, E, A>
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const ask: <R, E>() => ReaderObservableEither<R, E, R>
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const asks: <R, E, A>(f: (r: R) => A) => ReaderObservableEither<R, E, A>
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const fromReader: <R, E, A>(ma: R.Reader<R, A>) => ReaderObservableEither<R, E, A>
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const fromIO: MonadIO3<URI>['fromIO']
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const fromTask: MonadTask3<URI>['fromTask']
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const fromObservable: MonadObservable3<URI>['fromObservable']
/**
 * @category combinators
 * @since 0.6.10
 */
export declare const local: <R2, R1>(
  f: (d: R2) => R1
) => <E, A>(ma: ReaderObservableEither<R1, E, A>) => ReaderObservableEither<R2, E, A>
/**
 * @category MonadThrow
 * @since 0.6.10
 */
export declare const throwError: MonadThrow3<URI>['throwError']
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.10
 */
export declare const map: <A, B>(
  f: (a: A) => B
) => <R, E>(fa: ReaderObservableEither<R, E, A>) => ReaderObservableEither<R, E, B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.10
 */
export declare const ap: <R, E, A>(
  fa: ReaderObservableEither<R, E, A>
) => <B>(fab: ReaderObservableEither<R, E, (a: A) => B>) => ReaderObservableEither<R, E, B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.10
 */
export declare const apFirst: <R, E, B>(
  fb: ReaderObservableEither<R, E, B>
) => <A>(fa: ReaderObservableEither<R, E, A>) => ReaderObservableEither<R, E, A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.10
 */
export declare const apSecond: <R, E, B>(
  fb: ReaderObservableEither<R, E, B>
) => <A>(fa: ReaderObservableEither<R, E, A>) => ReaderObservableEither<R, E, B>
/**
 * @category Applicative
 * @since 0.6.10
 */
export declare const of: Applicative3<URI>['of']
/**
 * @category Bifunctor
 * @since 0.6.10
 */
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fa: ReaderObservableEither<R, E, A>) => ReaderObservableEither<R, G, B>
/**
 * @category Bifunctor
 * @since 0.6.10
 */
export declare const mapLeft: <E, G>(
  f: (e: E) => G
) => <R, A>(fa: ReaderObservableEither<R, E, A>) => ReaderObservableEither<R, G, A>
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.6.12
 */
export declare const chainW: <A, R2, E2, B>(
  f: (a: A) => ReaderObservableEither<R2, E2, B>
) => <R1, E1>(ma: ReaderObservableEither<R1, E1, A>) => ReaderObservableEither<R1 & R2, E2 | E1, B>
/**
 * @category Monad
 * @since 0.6.10
 */
export declare const chain: <R, E, A, B>(
  f: (a: A) => ReaderObservableEither<R, E, B>
) => (ma: ReaderObservableEither<R, E, A>) => ReaderObservableEither<R, E, B>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.10
 */
export declare const flatten: <R, E, A>(
  mma: ReaderObservableEither<R, E, ReaderObservableEither<R, E, A>>
) => ReaderObservableEither<R, E, A>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.10
 */
export declare const chainFirst: <R, E, A, B>(
  f: (a: A) => ReaderObservableEither<R, E, B>
) => (ma: ReaderObservableEither<R, E, A>) => ReaderObservableEither<R, E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: ReaderObservableEither<R, E, A>
  ) => ReaderObservableEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(
    ma: ReaderObservableEither<R, E, A>
  ) => ReaderObservableEither<R, E, A>
}
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export declare const fromEither: <R, E, A>(ma: Either<E, A>) => ReaderObservableEither<R, E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export declare const fromOption: <E>(onNone: () => E) => <R, A>(ma: Option<A>) => ReaderObservableEither<R, E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(a: A) => ReaderObservableEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderObservableEither<R, E, A>
}
/**
 * @category instances
 * @since 0.6.10
 */
export declare const URI = 'ReaderObservableEither'
/**
 * @category instances
 * @since 0.6.10
 */
export declare type URI = typeof URI
declare module 'fp-ts/es6/HKT' {
  interface URItoKind3<R, E, A> {
    readonly [URI]: ReaderObservableEither<R, E, A>
  }
}
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Functor: Functor3<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Apply: Apply3<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Applicative: Applicative3<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Monad: Monad3<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Bifunctor: Bifunctor3<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const MonadIO: MonadIO3<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const MonadTask: MonadTask3<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const MonadObservable: MonadObservable3<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const MonadThrow: MonadThrow3<URI>
/**
 * @category instances
 * @since 0.6.10
 * @deprecated
 */
export declare const readerObservableEither: MonadObservable3<URI> & MonadThrow3<URI> & Bifunctor3<URI>
/**
 * @since 0.6.12
 */
export declare const Do: ReaderObservableEither<unknown, never, {}>
/**
 * @since 0.6.11
 */
export declare const bindTo: <K extends string, R, E, A>(
  name: K
) => (fa: ReaderObservableEither<R, E, A>) => ReaderObservableEither<R, E, { [P in K]: A }>
/**
 * @since 0.6.11
 */
export declare const bind: <K extends string, R, E, A, B>(
  name: Exclude<K, keyof A>,
  f: (a: A) => ReaderObservableEither<R, E, B>
) => (
  fa: ReaderObservableEither<R, E, A>
) => ReaderObservableEither<R, E, { [P in K | keyof A]: P extends keyof A ? A[P] : B }>
/**
 * @since 0.6.12
 */
export declare const bindW: <K extends string, R2, E2, A, B>(
  name: Exclude<K, keyof A>,
  f: (a: A) => ReaderObservableEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderObservableEither<R1, E1, A>
) => ReaderObservableEither<
  R1 & R2,
  E1 | E2,
  {
    [P in keyof A | K]: P extends keyof A ? A[P] : B
  }
>
