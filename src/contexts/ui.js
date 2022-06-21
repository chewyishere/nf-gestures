import { useState, createContext, useContext } from "react";

const initial = {};
const UIContext = createContext(initial);

const UIWrapper = ({ children }) => {
  const setFocsuedRowIdx = (value) => {
    updateUI((prevState) => {
      const newState = { ...prevState };
      newState.focusedRowIdx = value;
      return newState;
    });
  };

  const setRowEditingMode = (value) => {
    updateUI((prevState) => {
      const newState = { ...prevState };
      newState.rowEditingMode = value;
      return newState;
    });
  };

  const reset = (value) => {
    updateUI((prevState) => {
      return defaultState;
    });
  };

  const defaultState = {
    rowEditingMode: false,
    setRowEditingMode,
    focusedRowIdx: 0,
    setFocsuedRowIdx,
    reset,
  };

  const [UI, updateUI] = useState(defaultState);
  return <UIContext.Provider value={UI}>{children}</UIContext.Provider>;
};

const useUIContext = () => useContext(UIContext);

export { UIWrapper, useUIContext };
