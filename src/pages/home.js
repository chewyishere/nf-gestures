import { motion } from "framer-motion";
import { lolomo } from "data/app";
import { opacityV } from "utils/variants";
import { gestures } from "gestures/gestures";
import classNames from "classnames";
import { IOSStatus, Nav, Billboard, ProfileNav } from "./home-utlities";
import "./home.scss";

const DynamicGestureRow = ({ gesture, row, idx }) => {
  const Demo = gesture.component;
  return (
    <Demo
      row={row.titles}
      header={row.title}
      ClassNames={gesture.class}
      rowIdx={idx}
    />
  );
};

export default function Home({ currentDemoIdx }) {
  const gesture = gestures[currentDemoIdx];

  return (
    <motion.div
      className="home screen"
      variants={opacityV}
      initial="hidden"
      animate="visible"
      exit="hiddne"
    >
      <IOSStatus />
      <Nav activePageIdx={0} />
      <div
        className={classNames(
          "home__container",
          gesture.isMyList ? "isMyList" : "isHome"
        )}
      >
        {gesture.isMyList ? <ProfileNav /> : <Billboard />}
        <div className="lolomo flex-col">
          {lolomo.map((_l, _idx) => (
            <DynamicGestureRow
              key={_l.title}
              row={_l}
              idx={_idx}
              gesture={gesture}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
