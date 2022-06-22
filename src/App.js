import { useState } from "react";
import { useUIContext } from "contexts/ui";
import Home from "pages/home";
import LongPressRemove from "pages/row-longpress-remove";
import LongPressReorder from "pages/row-longpress-reorder";
import DragToMyList from "pages/row-drag-to-my-list";
import Config from "config/config";
import CopyCard from "common/copycard";
import "./App.scss";

const demos = [
  {
    title: "Long Press Trigger: Remove",
    component: LongPressRemove,
    class: "longpress-remove",
    isMyList: true,
  },
  {
    title: "Long Press Trigger: Drag to reorder",
    component: LongPressReorder,
    class: "longpress-reorder",
    isMyList: true,
  },
  {
    title: "Long Press Trigger: Drag to my list",
    component: DragToMyList,
    class: "longpress-drag-to-mylist",
    isMyList: false,
  },
];

const App = () => {
  const { rowEditingMode } = useUIContext();

  const [currentDemoIdx, setCurrentDemoIdx] = useState(0);
  return (
    <div className="app">
      <Config
        demos={demos}
        currentDemoIdx={currentDemoIdx}
        setCurrentDemoIdx={setCurrentDemoIdx}
      />
      {currentDemoIdx === 2 && rowEditingMode && <CopyCard />}
      <div className="app__mobile__wrapper">
        <Home demo={demos[currentDemoIdx]} />
      </div>
    </div>
  );
};

export default App;
