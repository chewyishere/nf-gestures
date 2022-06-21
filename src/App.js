import { useState } from "react";
import Home from "pages/home";
import LongPressRemove from "pages/row-longpress-remove";
import LongPressWiggle from "pages/row-longpress-wiggle";
import DragDropReorder from "pages/row-dragdrop-reorder";
import Test from "pages/test";
import Config from "config/config";
import "./App.scss";

const demos = [
  {
    title: "Long Press: Remove",
    demo: LongPressRemove,
    class: "longpress-remove",
  },
  {
    title: "Drag & Drop: Reorder",
    demo: DragDropReorder,
    class: "dragdrop-reorder",
  },
  {
    title: "Long Press: Wiggle",
    demo: LongPressWiggle,
    class: "longpress-wiggle",
  },

  // {
  //   title: "Drag & Drop: Add to my list",
  //   demo: RowLongPressActions,
  //   class: "dragdrop-add",
  // },
];

const App = () => {
  const [currentDemoIdx, setCurrentDemoIdx] = useState(0);
  return (
    <div className="app">
      <Config
        demos={demos}
        currentDemoIdx={currentDemoIdx}
        setCurrentDemoIdx={setCurrentDemoIdx}
      />
      <div className="app__mobile__wrapper">
        <Home demos={demos} demoIdx={currentDemoIdx} />
      </div>
    </div>
  );
};

export default App;
