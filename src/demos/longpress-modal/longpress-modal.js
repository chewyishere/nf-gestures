import { motion } from "framer-motion";
import { useUIContext } from "contexts/ui";
import { opacityV } from "utils/variants";
import { IOSStatus, Nav, Billboard } from "common/utlities";
import RowLongPressModal from "./row-longpress-modal";
import Modal from "./draggable-modal";

export default function LongPressModal({ ClassNames, lolomos }) {
  const { showModal } = useUIContext();

  return (
    <>
      <motion.div
        className="home screen"
        variants={opacityV}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <IOSStatus />
        <Nav />
        <div className={`home__container isHome`}>
          <Billboard />
          <div className="lolomo flex-col">
            {lolomos.map((_l, _idx) => (
              <RowLongPressModal
                key={_l.title}
                rowIdx={_idx}
                row={_l}
                ClassNames={ClassNames}
              />
            ))}
          </div>
        </div>
      </motion.div>
      {showModal && <Modal />}
    </>
  );
}
