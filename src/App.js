import { useState } from "react";
import { useUIContext } from "contexts/ui";
import Home from "pages/home";
import Config from "config/config";
import Modal from "gestures/modal";

import "./App.scss";

const App = () => {
  const { showModal } = useUIContext();
  const [currentDemoIdx, setCurrentDemoIdx] = useState(0);

  return (
    <div className="app">
      <Config
        currentDemoIdx={currentDemoIdx}
        setCurrentDemoIdx={setCurrentDemoIdx}
      />
      <div className="app__mobile__wrapper">
        <Home currentDemoIdx={currentDemoIdx} />
        {showModal && <Modal />}
      </div>
    </div>
  );
};

export default App;
