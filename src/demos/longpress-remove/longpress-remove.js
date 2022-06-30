import { motion } from "framer-motion";
import { lolomo } from "data/app";
import { opacityV } from "utils/variants";
import { IOSStatus, Nav, ProfileNav } from "common/utlities";
import RowLongpressRemove from "./row-longpress-remove";

export default function LongPressRemove({ ClassNames, lolomos }) {
  return (
    <motion.div
      className="home screen"
      variants={opacityV}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <IOSStatus />
      <Nav />
      <div className={`home__container isMyList`}>
        <ProfileNav />
        <div className="lolomo flex-col">
          {lolomos.map((_l, _idx) => (
            <RowLongpressRemove
              key={_l.title}
              rowIdx={_idx}
              row={_l}
              ClassNames={ClassNames}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
