import { useContext } from "react";
import { RelatedContext } from "./Related";
export const useRelation = () => useContext(RelatedContext);
