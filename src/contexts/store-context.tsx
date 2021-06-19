import * as React from "react";
import { RootStore } from "../stores";

export const StoreContext = React.createContext<RootStore>({} as RootStore);

export const StoreContextProvider = (props: {
  children: React.ReactNode;
  store: RootStore;
}) => (
  <StoreContext.Provider value={props.store}>
    {props.children}
  </StoreContext.Provider>
);
