import { contextBinder } from "@react-rxjs/utils";
import { createContext, useContext } from "react";
import { filter, Observable } from "rxjs";
import { contextualizeSignal } from "./contextualizeSignal";

export type RelationKey = string | undefined;
export type Relation<T> = [RelationKey, T];
export type RelatedSignal<T> = Observable<Relation<T>>;

export const RelatedContext = createContext<RelationKey>(undefined);
export const useRelation = () => useContext(RelatedContext);
export const bindRelation = contextBinder(() => useRelation());
export const createRelatedSignal = contextualizeSignal(RelatedContext);
export const selectRelation =
  (relation: RelationKey) =>
  <T>(source$: RelatedSignal<T>) =>
    source$.pipe(filter(([r]) => r === relation));
