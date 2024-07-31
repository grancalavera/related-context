import { state } from "@react-rxjs/core";
import { map, scan, startWith } from "rxjs";
import { bindRelation, selectRelation, createRelatedSignal } from "./relation";

/**
 * Creates a signal that will include a relation to the component that triggered it, if any.
 */
export const [increment$, useIncrementer] = createRelatedSignal();

/**
 * Zero-Odd-Odd-Even-Even-Odd-Odd-Even-Even-... sequence
 * This sequence is used to make the state emit pairs of odd and even numbers
 * which allows to verify that components only re-render when their specific
 * state changes.
 * @param n iteration on the sequence
 * @returns nth value of the sequence
 */
const sequence = (n: number) => (n * (n + 1)) / 2;

const state$ = state((relation: string | undefined, symbol: number) =>
  increment$.pipe(
    selectRelation(relation),
    scan((_x, _y, i) => sequence(symbol + i + 1), sequence(symbol)),
    startWith(sequence(symbol))
  )
);

export const [useIncrement] = bindRelation((relation: string, key: number) =>
  state$(relation, key)
);

export const [useIsEven] = bindRelation((relation: string, key: number) =>
  state$(relation, key).pipe(map((value) => value % 2 === 0))
);
