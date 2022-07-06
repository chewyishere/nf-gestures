import demos from "demos/demos";
import { lolomo } from "data/app";
import Config from "config/config";

import "./App.scss";

const DynamicDemo = ({ demo }) => {
  const Demo = demo.component;
  return <Demo ClassNames={demo.id} lolomos={lolomo[demo.page]} />;
};

const App = ({ demoIdx = 0 }) => {
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
