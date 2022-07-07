import LongPressRemove from "./longpress/longpress-remove";
import LongPressReorder from "./longpress/longpress-reorder";
import LongPressModal from "./longpress/longpress-modal";
import GyroUpSideDown from "./gyro/gyro-upsidedown";
import TapFireworks from "./tap/tap-fireworks";
import MoveParallax from "./parallax/move-parallax";

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
    title: "Gyro: Up Side Down",
    component: GyroUpSideDown,
    debug: true,
    id: "gyro-upsidedown",
    page: "home",
  },
  {
    title: "Tap: Fireworks",
    component: TapFireworks,
    id: "tap-fireworks",
    page: "home",
  },
  {
    title: "Move: Parallax",
    component: MoveParallax,
    id: "move-parallax",
    page: "home",
    debug: true,
  },
];

export default demos;
