import * as React from "react";
import { StoreContext } from "../contexts/store-context";

export const useStore = () => {
  const storeContext = React.useContext(StoreContext);

  if (!storeContext) {
    throw new Error("Component must be wrapped with StoreContext.Provider");
  }

  return storeContext;
};
