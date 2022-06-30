import { useState } from "react";
import { Edit } from "common/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useUIContext } from "contexts/ui";
import TitleCard from "common/titlecard";
import classNames from "classnames";
import useLongPress from "hooks/use-long-press";

const TITLE_W = 120;

export default function RowLongPressRemove({ row, rowIdx, ClassNames }) {
  const { focusedRowIdx, setFocsuedRowIdx, setRowEditingMode, rowEditingMode } =
    useUIContext();
  const [items, setItems] = useState(row.titles);
  const isActive = rowEditingMode && rowIdx === focusedRowIdx;

  const onLongPress = (e) => {
    setRowEditingMode(true);
    setFocsuedRowIdx(rowIdx);
  };

  const onClick = () => {
    if (rowIdx !== focusedRowIdx) {
      setRowEditingMode(false);
    }
  };

  const onAction = (_action, _title) => {
    switch (_action) {
      case "remove":
        setItems([...items.filter((_t) => _t !== _title)]);
        break;
    }
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <div
      {...longPressEvent}
      className={classNames("flex-col lolomo__row", ClassNames, {
        isActive: isActive,
      })}
    >
      <span className="lolomo__row__label subtitle-heavy">
        {row.title}
        <Edit className="lolomo-row__label__edit" />
      </span>
      <div className="lolomo__row__titles">
        <AnimatePresence>
          {[...items].map((item, i) => (
            <AnimatedTitle
              key={item}
              item={item}
              onAction={onAction}
              isActive={isActive}
              i={i}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

const AnimatedTitle = ({ item, onAction, isActive, i }) => {
  const x = i * TITLE_W;

  return (
    <motion.div
      initial={{ x: x }}
      animate={{ x: x, transition: { delay: 0.3, duration: 0.3 } }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
      className="gesture-detector"
    >
      <TitleCard
        title={item}
        isActive={isActive}
        actions={["remove"]}
        onAction={onAction}
      />
    </motion.div>
  );
};
