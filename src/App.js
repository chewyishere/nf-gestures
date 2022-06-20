import { useState } from "react";
import Home from "pages/home";
import RowLongPressRemove from "pages/row-longpress-remove";
import RowLongPressActions from "pages/row-longpress-actions";
import RowDragDropReorder from "pages/row-dragdrop-reorder";
import Config from "config/config";
import "./App.scss";

const demos = [
  {
    title: "Drag & Drop: Re-arrange row",
    demo: RowDragDropReorder,
    class: "dragdrop-reorder",
  },
  {
    title: "Drag & Drop: Add to my list",
    demo: RowLongPressActions,
    class: "dragdrop-add",
  },
  {
    title: "Long Press: Remove",
    demo: RowLongPressRemove,
    class: "longpress-remove",
  },
  {
    title: "Long Press: Actions",
    demo: RowLongPressActions,
    class: "longpress-actions",
  },
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
        <Home demos={demos} />
      </div>
    </div>
  );
};

export default App;
