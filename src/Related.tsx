import { createContext, useId } from "react";

export const RelatedContext = createContext<string | undefined>(undefined);

export const Related = ({ children }: { children: React.ReactNode }) => (
  <RelatedContext.Provider value={useId()}>{children}</RelatedContext.Provider>
);
