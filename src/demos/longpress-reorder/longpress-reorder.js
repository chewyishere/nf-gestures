import { motion } from "framer-motion";

import { opacityV } from "utils/variants";
import { IOSStatus, Nav, ProfileNav } from "common/utlities";
import RowLongPressReorder from "./row-longpress-reorder";

export default function LongPressReorder({ ClassNames, lolomos }) {
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
            <RowLongPressReorder
              key={_l.title}
              rowIdx={_idx}
              header={_l.title}
              row={_l.titles}
              ClassNames={ClassNames}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
