import { useEffect } from "react";
import demos from "demos/demos";
import { lolomo } from "data/app";
import Config from "config/config";
import { useUIContext } from "contexts/ui";
import "./App.scss";

const DynamicDemo = ({ demo }) => {
  const Demo = demo.component;
  return <Demo ClassNames={demo.id} lolomos={lolomo[demo.page]} />;
};

const App = ({ demoIdx = 0 }) => {
  const { showDebug } = useUIContext();

  useEffect(() => {
    showDebug
      ? document.body.classList.add("showDebug")
      : document.body.classList.remove("showDebug");
  }, [showDebug]);

  return (
    <div className="app">
      <Config />
      <div className="app__mobile__wrapper">
        <DynamicDemo demo={demos[demoIdx]} />
      </div>
    </div>
  );
};

export default App;
