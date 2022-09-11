/**
 * @since 0.6.12
 */
import { Applicative2, Applicative2C } from 'fp-ts/lib/Applicative'
import { Apply1 } from 'fp-ts/lib/Apply'
import { Bifunctor2 } from 'fp-ts/lib/Bifunctor'
import { Functor2 } from 'fp-ts/lib/Functor'
import { IO } from 'fp-ts/lib/IO'
import { IOEither } from 'fp-ts/lib/IOEither'
import { Monad2C } from 'fp-ts/lib/Monad'
import { MonadIO2 } from 'fp-ts/lib/MonadIO'
import { MonadTask2 } from 'fp-ts/lib/MonadTask'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import * as TT from 'fp-ts/lib/TaskThese'
import * as TH from 'fp-ts/lib/These'
import { Observable } from 'rxjs'
import * as R from './Observable'
/**
 * @category model
 * @since 0.6.12
 */
export interface ObservableThese<E, A> extends Observable<TH.These<E, A>> {}
/**
 * @category constructors
 * @since 0.6.12
 */
export declare const left: <E = never, A = never>(e: E) => ObservableThese<E, A>
/**
 * @category constructors
 * @since 0.6.12
 */
export declare const both: <E = never, A = never>(e: E, a: A) => ObservableThese<E, A>
/**
 * @category constructors
 * @since 0.6.12
 */
export declare const right: <E = never, A = never>(a: A) => ObservableThese<E, A>
/**
 * @category constructors
 * @since 0.6.12
 */
export declare const rightObservable: <E = never, A = never>(ma: Observable<A>) => ObservableThese<E, A>
/**
 * @category constructors
 * @since 0.6.12
 */
export declare const leftObservable: <E = never, A = never>(ma: Observable<E>) => ObservableThese<E, A>
/**
 * @category constructors
 * @since 0.6.12
 */
export declare const fromIOEither: <E, A>(fa: IOEither<E, A>) => ObservableThese<E, A>
/**
 * @category constructors
 * @since 0.6.12
 */
export declare const rightIO: <E = never, A = never>(ma: IO<A>) => ObservableThese<E, A>
/**
 * @category constructors
 * @since 0.6.12
 */
export declare const leftIO: <E = never, A = never>(me: IO<E>) => ObservableThese<E, A>
/**
 * @category constructors
 * @since 0.6.12
 */
export declare const fromTaskThese: <E, A>(t: TT.TaskThese<E, A>) => ObservableThese<E, A>
/**
 * @category constructors
 * @since 0.6.12
 */
export declare const fromIO: MonadIO2<URI>['fromIO']
/**
 * @category constructors
 * @since 0.6.12
 */
export declare const fromTask: MonadTask2<URI>['fromTask']
/**
 * @category destructors
 * @since 0.6.12
 */
export declare const fold: <E, A, B>(
  onLeft: (e: E) => Observable<B>,
  onRight: (a: A) => Observable<B>,
  onBoth: (e: E, a: A) => Observable<B>
) => (ma: ObservableThese<E, A>) => Observable<B>
/**
 * @category combinators
 * @since 0.6.12
 */
export declare const swap: <E, A>(ma: ObservableThese<E, A>) => ObservableThese<A, E>
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.6.12
 */
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: ObservableThese<E, A>) => ObservableThese<E, B>
/**
 * @category Bifunctor
 * @since 0.6.12
 */
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => (fa: ObservableThese<E, A>) => ObservableThese<G, B>
/**
 * @category Bifunctor
 * @since 0.6.12
 */
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: ObservableThese<E, A>) => ObservableThese<G, A>
/**
 * @category Applicative
 * @since 0.6.12
 */
export declare const of: Applicative2<URI>['of']
/**
 * @since 0.6.12
 */
export declare const URI = 'ObservableThese'
/**
 * @since 0.6.12
 */
export declare type URI = typeof URI
declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: ObservableThese<E, A>
  }
}
/**
 * @category instances
 * @since 0.6.12
 */
export declare const getApplicative: <E>(A: Apply1<R.URI>, S: Semigroup<E>) => Applicative2C<'ObservableThese', E>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const getMonad: <E>(S: Semigroup<E>) => Monad2C<'ObservableThese', E>
/**
 * @since 0.6.12
 */
export declare const Functor: Functor2<URI>
/**
 * @category instances
 * @since 0.6.12
 */
export declare const Bifunctor: Bifunctor2<URI>
/**
 * @since 0.6.12
 */
export declare const toTaskThese: <E, A>(o: ObservableThese<E, A>) => TT.TaskThese<E, A>
