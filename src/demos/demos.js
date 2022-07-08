import LongPressRemove from "./longpress/longpress-remove";
import LongPressReorder from "./longpress/longpress-reorder";
import LongPressModal from "./longpress/longpress-modal";
import TapFireworks from "./tap/tap-fireworks";
import UpSideDown from "./upsidedown/upsidedown";
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
    title: "Tap: Fireworks",
    component: TapFireworks,
    id: "tap-fireworks",
    page: "home",
  },
  {
    title: "Orientation: Up Side Down",
    component: UpSideDown,
    debug: true,
    id: "upsidedown",
    page: "home",
  },
  {
    title: "Orientation: Parallax",
    component: MoveParallax,
    id: "parallax",
    page: "home",
    debug: true,
  },
];

export default demos;
