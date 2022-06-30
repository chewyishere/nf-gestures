import LongPressRemove from "./longpress-remove/longpress-remove";
import LongPressReorder from "./longpress-reorder/longpress-reorder";
import LongPressModal from "./longpress-modal/longpress-modal";
import GyroUpSideDown from "./gyro/gyro-upsidedown";

import "./demos.scss";
import "./home.scss";

const demos = [
  {
    title: "Long Press: Remove",
    component: LongPressRemove,
    id: "longpress-remove",
    page: "list",
  },
  {
    title: "Long Press: Drag to reorder",
    component: LongPressReorder,
    id: "longpress-reorder",
    page: "list",
  },
  {
    title: "Long Press: Show Draggable Modal",
    component: LongPressModal,
    id: "longpress-modal",
    page: "home",
  },
  {
    title: "Gyro: Up Side Down (WIP)",
    component: GyroUpSideDown,
    id: "gyro-upsidedown",
    page: "home",
  },
];

export default demos;
