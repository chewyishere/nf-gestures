import { motion } from "framer-motion";
import { opacityV } from "utils/variants";
import { IOSStatus, Nav } from "common/utlities";
import BillboardUpSideDown from "./billboard-upsidedown";
import LolomoRow from "common/lolomo-row";

import "./upsidedown.scss";

export default function GyroUpSideDown({ ClassNames, lolomos }) {
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

      <div className={`home__container ${ClassNames}`}>
        <BillboardUpSideDown />

        <div className="lolomo flex-col">
          {lolomos.map((_l, _idx) => (
            <LolomoRow key={`${_idx}-${_l.title}`} row={_l} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
