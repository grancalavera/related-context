import { Context, useCallback, useContext } from "react";
import { identity, Observable, Subject } from "rxjs";

export function contextualizeSignal<C>(context: Context<C>) {
  // prettier-ignore
  function createSignal(): [Observable<[C, void]>, () => () => void];
  // prettier-ignore
  function createSignal<T>(): [Observable<[C, T]>, () => (payload: T) => void];
  // prettier-ignore
  function createSignal<A extends unknown[], T>(mapper: (...args: A) => T): [Observable<[C, T]>, () => (...args: A) => void];
  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function createSignal<A extends unknown[], T>(mapper: (...args: A) => T = identity as any): [Observable<[C, T]>, () => (...args: A) => void] {
    const subject = new Subject<[C, T]>();

    const signal$ = subject.asObservable();

    const useSignalSetter = () => {
      const contextValue = useContext(context);
      return useCallback((...args: A) => {
        return subject.next([contextValue, mapper(...args)]);
      },  [contextValue]);
    };

    return [signal$, useSignalSetter];
  }

  return createSignal;
}
