import { type ReactNode, createContext } from "react";
import { type Stock } from "@prisma/client";
import { api } from "./utils/api";

const StockContext = createContext([] as Stock[]);

const StockProvider = ({ children }: { children: ReactNode }) => {
  const { data: stocks, isLoading, isError } = api.stock.all.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <StockContext.Provider value={stocks}>{children}</StockContext.Provider>
  );
};

export { StockContext, StockProvider };
