/**
 * @since 0.6.6
 */
import { Alt2 } from 'fp-ts/lib/Alt'
import { Alternative2 } from 'fp-ts/lib/Alternative'
import { Applicative2 } from 'fp-ts/lib/Applicative'
import { Apply2 } from 'fp-ts/lib/Apply'
import { Compactable2, Separated } from 'fp-ts/lib/Compactable'
import * as E from 'fp-ts/lib/Either'
import { Filterable2 } from 'fp-ts/lib/Filterable'
import { Predicate, Refinement } from 'fp-ts/lib/function'
import { Functor2 } from 'fp-ts/lib/Functor'
import { IO } from 'fp-ts/lib/IO'
import { Monad2 } from 'fp-ts/lib/Monad'
import { MonadIO2 } from 'fp-ts/lib/MonadIO'
import { MonadTask2 } from 'fp-ts/lib/MonadTask'
import { Monoid } from 'fp-ts/lib/Monoid'
import * as O from 'fp-ts/lib/Option'
import * as R from 'fp-ts/lib/Reader'
import { ReaderTask } from 'fp-ts/lib/ReaderTask'
import { Observable } from 'rxjs'
import { MonadObservable2 } from './MonadObservable'
/**
 * @category model
 * @since 0.6.6
 */
export interface ReaderObservable<R, A> {
  (r: R): Observable<A>
}
/**
 * @category constructors
 * @since 0.6.6
 */
export declare const fromObservable: MonadObservable2<URI>['fromObservable']
/**
 * @category constructors
 * @since 0.6.6
 */
export declare const fromReader: <R, A = never>(ma: R.Reader<R, A>) => ReaderObservable<R, A>
/**
 * @category constructors
 * @since 0.6.6
 */
export declare const fromOption: <R, A>(o: O.Option<A>) => ReaderObservable<R, A>
/**
 * @category constructors
 * @since 0.6.6
 */
export declare const fromIO: MonadIO2<URI>['fromIO']
/**
 * @category constructors
 * @since 0.6.6
 */
export declare const fromTask: MonadTask2<URI>['fromTask']
/**
 * @category constructors
 * @since 0.6.9
 */
export declare const fromReaderTask: <R, A>(ma: ReaderTask<R, A>) => ReaderObservable<R, A>
/**
 * @category constructors
 * @since 0.6.6
 */
export declare const ask: <R>() => ReaderObservable<R, R>
/**
 * @category constructors
 * @since 0.6.6
 */
export declare const asks: <R, A = never>(f: (r: R) => A) => ReaderObservable<R, A>
/**
 * @category combinators
 * @since 0.6.6
 */
export declare const local: <R2, R1>(f: (f: R2) => R1) => <A>(ma: ReaderObservable<R1, A>) => ReaderObservable<R2, A>
/**
 * @category combinators
 * @since 0.6.6
 */
export declare const fromIOK: <A extends unknown[], B>(f: (...a: A) => IO<B>) => <R>(...a: A) => ReaderObservable<R, B>
/**
 * @category combinators
 * @since 0.6.6
 */
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => <R>(ma: ReaderObservable<R, A>) => ReaderObservable<R, B>
/**
 * @category combinators
 * @since 0.6.6
 */
export declare const fromObservableK: <A extends unknown[], B>(
  f: (...a: A) => Observable<B>
) => <R>(...a: A) => ReaderObservable<R, B>
/**
 * @category combinators
 * @since 0.6.6
 */
export declare const chainTaskK: <A, B>(
  f: (a: A) => Observable<B>
) => <R>(ma: ReaderObservable<R, A>) => ReaderObservable<R, B>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.6
 */
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderObservable<R, A>) => ReaderObservable<R, B>
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.6.6
 */
export declare const ap: <R, A>(
  fa: ReaderObservable<R, A>
) => <B>(fab: ReaderObservable<R, (a: A) => B>) => ReaderObservable<R, B>
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.6
 */
export declare const apFirst: <R, B>(
  fb: ReaderObservable<R, B>
) => <A>(fa: ReaderObservable<R, A>) => ReaderObservable<R, A>
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.6.6
 */
export declare const apSecond: <R, B>(
  fb: ReaderObservable<R, B>
) => <A>(fa: ReaderObservable<R, A>) => ReaderObservable<R, B>
/**
 * @category Applicative
 * @since 0.6.6
 */
export declare const of: <R, A>(a: A) => ReaderObservable<R, A>
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.6.12
 */
export declare const chainW: <A, R2, B>(
  f: (a: A) => ReaderObservable<R2, B>
) => <R1>(ma: ReaderObservable<R1, A>) => ReaderObservable<R1 & R2, B>
/**
 * @category Monad
 * @since 0.6.6
 */
export declare const chain: <R, A, B>(
  f: (a: A) => ReaderObservable<R, B>
) => (ma: ReaderObservable<R, A>) => ReaderObservable<R, B>
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.6
 */
export declare const flatten: <R, A>(mma: ReaderObservable<R, ReaderObservable<R, A>>) => ReaderObservable<R, A>
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 0.6.6
 */
export declare const chainFirst: <R, A, B>(
  f: (a: A) => ReaderObservable<R, B>
) => (ma: ReaderObservable<R, A>) => ReaderObservable<R, A>
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 0.6.7
 */
export declare const alt: <R, A>(
  that: () => ReaderObservable<R, A>
) => (fa: ReaderObservable<R, A>) => ReaderObservable<R, A>
/**
 * @since 0.6.12
 */
export declare const zero: Alternative2<URI>['zero']
/**
 * @category Filterable
 * @since 0.6.7
 */
export declare const filterMap: <A, B>(
  f: (a: A) => O.Option<B>
) => <R>(fa: ReaderObservable<R, A>) => ReaderObservable<R, B>
/**
 * @category Compactable
 * @since 0.6.7
 */
export declare const compact: <R, A>(fa: ReaderObservable<R, O.Option<A>>) => ReaderObservable<R, A>
/**
 * @category Filterable
 * @since 0.6.7
 */
export declare const partitionMap: <A, B, C>(
  f: (a: A) => E.Either<B, C>
) => <R>(fa: ReaderObservable<R, A>) => Separated<ReaderObservable<R, B>, ReaderObservable<R, C>>
/**
 * @category Compactable
 * @since 0.6.7
 */
export declare const separate: <R, A, B>(
  fa: ReaderObservable<R, E.Either<A, B>>
) => Separated<ReaderObservable<R, A>, ReaderObservable<R, B>>
/**
 * @category Filterable
 * @since 0.6.7
 */
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): <R>(fa: ReaderObservable<R, A>) => ReaderObservable<R, B>
  <A>(predicate: Predicate<A>): <R>(fa: ReaderObservable<R, A>) => ReaderObservable<R, A>
}
/**
 * @category Filterable
 * @since 0.6.7
 */
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): <R>(
    fa: ReaderObservable<R, A>
  ) => Separated<ReaderObservable<R, A>, ReaderObservable<R, B>>
  <A>(predicate: Predicate<A>): <R>(
    fa: ReaderObservable<R, A>
  ) => Separated<ReaderObservable<R, A>, ReaderObservable<R, A>>
}
/**
 * @category instances
 * @since 0.6.6
 */
export declare const URI = 'ReaderObservable'
/**
 * @category instances
 * @since 0.6.6
 */
export declare type URI = typeof URI
declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: ReaderObservable<E, A>
  }
}
/**
 * @category instances
 * @since 0.6.6
 */
export declare const getMonoid: <R, A>() => Monoid<ReaderObservable<R, A>>
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
export declare const Alt: Alt2<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Alternative: Alternative2<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Compactable: Compactable2<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Filterable: Filterable2<URI>
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
 * @since 0.6.6
 * @deprecated
 */
export declare const readerObservable: Monad2<URI> & Alternative2<URI> & Filterable2<URI> & MonadObservable2<URI>
/**
 * @since 0.6.12
 */
export declare const Do: ReaderObservable<unknown, {}>
/**
 * @since 0.6.11
 */
export declare const bindTo: <K extends string, R, A>(
  name: K
) => (fa: ReaderObservable<R, A>) => ReaderObservable<R, { [P in K]: A }>
/**
 * @since 0.6.11
 */
export declare const bind: <K extends string, R, A, B>(
  name: Exclude<K, keyof A>,
  f: (a: A) => ReaderObservable<R, B>
) => (fa: ReaderObservable<R, A>) => ReaderObservable<R, { [P in K | keyof A]: P extends keyof A ? A[P] : B }>
/**
 * @since 0.6.12
 */
export declare const bindW: <K extends string, R2, A, B>(
  name: Exclude<K, keyof A>,
  f: (a: A) => ReaderObservable<R2, B>
) => <R1>(
  fa: ReaderObservable<R1, A>
) => ReaderObservable<
  R1 & R2,
  {
    [P in keyof A | K]: P extends keyof A ? A[P] : B
  }
>
/**
 * @since 0.6.6
 */
export declare const run: <R, A>(ma: ReaderObservable<R, A>, r: R) => Promise<A>
/**
 * @since 0.6.6
 */
export declare const toReaderTask: <R, A>(ma: ReaderObservable<R, A>) => ReaderTask<R, A>
/**
 * @since 0.6.15
 */
export declare const toReaderTaskOption: <R, A>(ma: ReaderObservable<R, A>) => ReaderTask<R, O.Option<A>>
