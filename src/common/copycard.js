import { useEffect } from "react";
import { motion } from "framer-motion";
import { useUIContext } from "contexts/ui";
import TitleCard from "common/titlecard";

export default function CopyCard() {
  const { focusedTitle, setRowEditingMode } = useUIContext();
  const style = focusedTitle.boundingBox;

  useEffect(() => {
    console.log(focusedTitle);
    console.log(style);
  }, [focusedTitle]);

  return (
    <motion.div drag className="dragging-title gesture-detector" style={style}>
      <TitleCard title={focusedTitle.title} />
    </motion.div>
  );
}
