import { motion } from "framer-motion";
import { useUIContext } from "contexts/ui";
import { opacityV } from "utils/variants";
import TitleCard from "common/titlecard";
import { ActionAdd } from "common/actions";
import "./modal.scss";

export default function Modal() {
  const { focusedTitle, setShowModal } = useUIContext();
  const style = focusedTitle.boundingBox;

  const onDrag = (event, info) => {
    // console.log(info.point.x, info.point.y);
  };

  return (
    <motion.div
      variants={opacityV}
      initial="hidden"
      animate="visible"
      exit="hiddne"
      className="modal flex-center"
    >
      <div
        className="modal__overlay"
        onClick={() => {
          setShowModal(false);
        }}
      />
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 60 }}
        onDrag={onDrag}
        className="dragging-title gesture-detector"
        // style={style}
      >
        <TitleCard title={focusedTitle.title} />
      </motion.div>
      <div className="modal__addArea">
        <ActionAdd />
      </div>
    </motion.div>
  );
}
