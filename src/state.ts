import { bind, state } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { useCallback } from "react";
import { filter, map, scan, startWith } from "rxjs";
import { useRelation } from "./useRelation";

const [increment$, increment] = createSignal<{
  relation: string | undefined;
}>();

/**
 * Zero-Odd-Odd-Even-Even-Odd-Odd-Even-Even-... sequence
 * @param n iteration on the sequence
 * @returns nth value of the sequence
 */
const sequence = (n: number) => (n * (n + 1)) / 2;

const state$ = state((base: number, relation: string | undefined) =>
  increment$.pipe(
    filter((signal) => signal.relation === relation),
    scan((_x, _y, i) => sequence(base + i + 1), sequence(base)),
    startWith(sequence(base))
  )
);

const [useIncremented_, incremented$] = bind(state$);

const [useIsEven_] = bind((base: number, relation: string | undefined) =>
  incremented$(base, relation).pipe(map((value) => value % 2 === 0))
);

export const useIncremented = (base: number) =>
  useIncremented_(base, useRelation());

export const useIsEven = (base: number) => useIsEven_(base, useRelation());

export const useIncrement = () => {
  const relation = useRelation();
  return useCallback(() => increment({ relation }), [relation]);
};
