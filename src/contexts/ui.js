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

  const setFocusedTitle = (value) => {
    updateUI((prevState) => {
      const newState = { ...prevState };
      newState.focusedTitle = value;
      return newState;
    });
  };

  const setShowModal = (value) => {
    updateUI((prevState) => {
      const newState = { ...prevState };
      newState.showModal = value;
      return newState;
    });
  };

  const setShowDebug = (value) => {
    updateUI((prevState) => {
      const newState = { ...prevState };
      newState.showDebug = value;
      return newState;
    });
  };

  const setCurrentDemo = (value) => {
    updateUI((prevState) => {
      const newState = { ...prevState };
      newState.currentDemo = value;
      return newState;
    });
  };

  const reset = () => {
    updateUI((prevState) => {
      return defaultState;
    });
  };

  const defaultState = {
    rowEditingMode: false,
    currentDemo: "",
    focusedRowIdx: 0,
    focusedTitle: {},
    showModal: false,
    showDebug: true,
    setRowEditingMode,
    setFocsuedRowIdx,
    setFocusedTitle,
    setShowModal,
    setShowDebug,
    setCurrentDemo,
    reset,
  };

  const [UI, updateUI] = useState(defaultState);
  return <UIContext.Provider value={UI}>{children}</UIContext.Provider>;
};

const useUIContext = () => useContext(UIContext);

export { UIWrapper, useUIContext };
