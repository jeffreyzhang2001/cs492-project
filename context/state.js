import { createContext, useContext } from "react";

const StateContext = createContext();

let globalState = {
  name: "",
  visitedPages: {},
};

export function setGlobalState(newState) {
  globalState = newState;
}

export function StateWrapper({ children }) {
  return (
    <StateContext.Provider value={globalState}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}
