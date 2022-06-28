import { useState, useMemo, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useUIContext } from "contexts/ui";
import { opacityV } from "utils/variants";
import TitleCard from "common/titlecard";
import { ActionAdd } from "common/actions";
import "./modal.scss";

export default function Modal() {
  const { focusedTitle, setShowModal } = useUIContext();
  const style = focusedTitle.boundingBox;
  const [onList, setOnList] = useState();
  const controls = useAnimation();
  const addRef = useRef();
  const cardRef = useRef();

  const onDrag = (event, info) => {
    if (cardRef.current && addRef.current) {
      setOnList(overlap());
    }
  };

  const overlap = () => {
    let rect1 = addRef.current.getBoundingClientRect();
    let rect2 = cardRef.current.getBoundingClientRect();

    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  };

  const sequence = async () => {
    await controls.start({ scale: 0, transition: { duration: 0.3 } });
    return await setShowModal(false);
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
        dragConstraints={{ left: -100, right: 100, top: -250, bottom: 250 }}
        onDrag={onDrag}
        dragElastic={0.8}
        whileDrag={{ scale: 0.8 }}
        onDragEnd={() => {
          onList && sequence();
        }}
        animate={controls}
        className="dragging-title gesture-detector"
        ref={cardRef}
        // style={style}
      >
        <TitleCard title={focusedTitle.title} />
      </motion.div>
      <div ref={addRef} className="modal__addArea center-abs">
        <ActionAdd />
      </div>
    </motion.div>
  );
}
