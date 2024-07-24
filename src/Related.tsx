import { useId } from "react";
import { RelatedContext } from "./relation";
export const Related = ({ children }: { children: React.ReactNode }) => (
  <RelatedContext.Provider value={useId()}>{children}</RelatedContext.Provider>
);
