import LongPressRemove from "./longpress-remove";
import LongPressReorder from "./longpress-reorder";
import LongPressModal from "./longpress-modal";

import "./gestures.scss";

const gestures = [
  {
    title: "Long Press: Show Draggable Modal",
    component: LongPressModal,
    class: "longpress-modal",
    isMyList: false,
  },
  {
    title: "Long Press: Remove",
    component: LongPressRemove,
    class: "longpress-remove",
    isMyList: true,
  },
  {
    title: "Long Press: Drag to reorder",
    component: LongPressReorder,
    class: "longpress-reorder",
    isMyList: true,
  },
];

export { gestures };
