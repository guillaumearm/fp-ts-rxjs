/**
 * @since 0.6.10
 */
import { Applicative4 } from 'fp-ts/lib/Applicative'
import { Apply4 } from 'fp-ts/lib/Apply'
import { Bifunctor4 } from 'fp-ts/lib/Bifunctor'
import * as E from 'fp-ts/lib/Either'
import { Predicate, Refinement } from 'fp-ts/lib/function'
import { Functor4 } from 'fp-ts/lib/Functor'
import { Monad4 } from 'fp-ts/lib/Monad'
import { MonadIO4 } from 'fp-ts/lib/MonadIO'
import { MonadTask4 } from 'fp-ts/lib/MonadTask'
import { MonadThrow4 } from 'fp-ts/lib/MonadThrow'
import { Option } from 'fp-ts/lib/Option'
import { MonadObservable4 } from './MonadObservable'
import * as ROE from './ReaderObservableEither'
/**
 * @category model
 * @since 0.6.10
 */
export interface StateReaderObservableEither<S, R, E, A> {
  (s: S): ROE.ReaderObservableEither<R, E, [A, S]>
}
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const fromReaderObservableEither: <S, R, E, A>(
  ma: ROE.ReaderObservableEither<R, E, A>
) => StateReaderObservableEither<S, R, E, A>
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const get: <R, E, S>() => StateReaderObservableEither<S, R, E, S>
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const gets: <S, R, E, A>(f: (s: S) => A) => StateReaderObservableEither<S, R, E, A>
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const modify: <R, E, S>(f: (s: S) => S) => StateReaderObservableEither<S, R, E, void>
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const put: <R, E, S>(s: S) => StateReaderObservableEither<S, R, E, void>
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const right: <S, R, E = never, A = never>(a: A) => StateReaderObservableEither<S, R, E, A>
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const left: <S, R, E = never, A = never>(e: E) => StateReaderObservableEither<S, R, E, A>
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const fromIO: MonadIO4<URI>['fromIO']
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const fromTask: MonadTask4<URI>['fromTask']
/**
 * @category constructors
 * @since 0.6.10
 */
export declare const fromObservable: MonadObservable4<URI>['fromObservable']
/**
 * @category MonadThrow
 * @since 0.6.10
 */
export declare const throwError: MonadThrow4<URI>['throwError']
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.10
 */
export declare const map: <A, B>(
  f: (a: A) => B
) => <S, R, E>(fa: StateReaderObservableEither<S, R, E, A>) => StateReaderObservableEither<S, R, E, B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.10
 */
export declare const ap: <S, R, E, A>(
  fa: StateReaderObservableEither<S, R, E, A>
) => <B>(fab: StateReaderObservableEither<S, R, E, (a: A) => B>) => StateReaderObservableEither<S, R, E, B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.10
 */
export declare const apFirst: <S, R, E, B>(
  fb: StateReaderObservableEither<S, R, E, B>
) => <A>(fa: StateReaderObservableEither<S, R, E, A>) => StateReaderObservableEither<S, R, E, A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.10
 */
export declare const apSecond: <S, R, E, B>(
  fb: StateReaderObservableEither<S, R, E, B>
) => <A>(fa: StateReaderObservableEither<S, R, E, A>) => StateReaderObservableEither<S, R, E, B>
/**
 * @category Bifunctor
 * @since 0.6.10
 */
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R>(fa: StateReaderObservableEither<S, R, E, A>) => StateReaderObservableEither<S, R, G, B>
/**
 * @category Bifunctor
 * @since 0.6.10
 */
export declare const mapLeft: <E, G>(
  f: (e: E) => G
) => <S, R, A>(fa: StateReaderObservableEither<S, R, E, A>) => StateReaderObservableEither<S, R, G, A>
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.6.12
 */
export declare const chainW: <A, S, R2, E2, B>(
  f: (a: A) => StateReaderObservableEither<S, R2, E2, B>
) => <R1, E1>(ma: StateReaderObservableEither<S, R1, E1, A>) => StateReaderObservableEither<S, R1 & R2, E2 | E1, B>
/**
 * @category Monad
 * @since 0.6.10
 */
export declare const chain: <S, R, E, A, B>(
  f: (a: A) => StateReaderObservableEither<S, R, E, B>
) => (ma: StateReaderObservableEither<S, R, E, A>) => StateReaderObservableEither<S, R, E, B>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.10
 */
export declare const flatten: <S, R, E, A>(
  mma: StateReaderObservableEither<S, R, E, StateReaderObservableEither<S, R, E, A>>
) => StateReaderObservableEither<S, R, E, A>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.10
 */
export declare const chainFirst: <S, R, E, A, B>(
  f: (a: A) => StateReaderObservableEither<S, R, E, B>
) => (ma: StateReaderObservableEither<S, R, E, A>) => StateReaderObservableEither<S, R, E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderObservableEither<S, R, E, A>
  ) => StateReaderObservableEither<S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderObservableEither<S, R, E, A>
  ) => StateReaderObservableEither<S, R, E, A>
}
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export declare const fromEither: <S, R, E, A>(ma: E.Either<E, A>) => StateReaderObservableEither<S, R, E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export declare const fromOption: <E>(
  onNone: () => E
) => <S, R, A>(ma: Option<A>) => StateReaderObservableEither<S, R, E, A>
/**
 * Derivable from `MonadThrow`.
 *
 * @since 0.6.10
 */
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    a: A
  ) => StateReaderObservableEither<S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(a: A) => StateReaderObservableEither<S, R, E, A>
}
/**
 * @since 0.6.12
 */
export declare const of: Applicative4<URI>['of']
/**
 * @since 0.6.10
 */
export declare const URI = 'StateReaderObservableEither'
/**
 * @since 0.6.10
 */
export declare type URI = typeof URI
declare module 'fp-ts/lib/HKT' {
  interface URItoKind4<S, R, E, A> {
    readonly [URI]: StateReaderObservableEither<S, R, E, A>
  }
}
/**
 * @since 0.6.12
 */
export declare const Functor: Functor4<URI>
/**
 * @since 0.6.12
 */
export declare const Apply: Apply4<URI>
/**
 * @since 0.6.12
 */
export declare const Applicative: Applicative4<URI>
/**
 * @since 0.6.12
 */
export declare const Monad: Monad4<URI>
/**
 * @since 0.6.12
 */
export declare const Bifunctor: Bifunctor4<URI>
/**
 * @since 0.6.12
 */
export declare const MonadIO: MonadIO4<URI>
/**
 * @since 0.6.12
 */
export declare const MonadTask: MonadTask4<URI>
/**
 * @since 0.6.12
 */
export declare const MonadObservable: MonadObservable4<URI>
/**
 * @since 0.6.12
 */
export declare const MonadThrow: MonadThrow4<URI>
/**
 * @since 0.6.10
 * @deprecated
 */
export declare const stateReaderObservableEither: MonadObservable4<URI> & Bifunctor4<URI> & MonadThrow4<URI>
/**
 * @since 0.6.11
 */
export declare const bindTo: <K extends string>(
  name: K
) => <S, R, E, A>(fa: StateReaderObservableEither<S, R, E, A>) => StateReaderObservableEither<S, R, E, { [P in K]: A }>
/**
 * @since 0.6.11
 */
export declare const bind: <K extends string, S, R, E, A, B>(
  name: Exclude<K, keyof A>,
  f: (a: A) => StateReaderObservableEither<S, R, E, B>
) => (
  fa: StateReaderObservableEither<S, R, E, A>
) => StateReaderObservableEither<S, R, E, { [P in K | keyof A]: P extends keyof A ? A[P] : B }>
/**
 * @since 0.6.12
 */
export declare const bindW: <K extends string, S, R2, E2, A, B>(
  name: Exclude<K, keyof A>,
  f: (a: A) => StateReaderObservableEither<S, R2, E2, B>
) => <R1, E1>(
  fa: StateReaderObservableEither<S, R1, E1, A>
) => StateReaderObservableEither<
  S,
  R1 & R2,
  E1 | E2,
  {
    [P in keyof A | K]: P extends keyof A ? A[P] : B
  }
>
/**
 * @since 0.6.10
 */
export declare const evaluate: <S>(
  s: S
) => <R, E, A>(ma: StateReaderObservableEither<S, R, E, A>) => ROE.ReaderObservableEither<R, E, A>
/**
 * @since 0.6.10
 */
export declare const execute: <S>(
  s: S
) => <R, E, A>(ma: StateReaderObservableEither<S, R, E, A>) => ROE.ReaderObservableEither<R, E, S>
