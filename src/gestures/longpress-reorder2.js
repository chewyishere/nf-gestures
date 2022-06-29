import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, Reorder } from "framer-motion";
import { Edit } from "common/icons";
import { useUIContext } from "contexts/ui";
import TitleCard from "common/titlecard";
import classNames from "classnames";
import useLongPress from "hooks/useLongPress";
import { useRaisedShadow } from "hooks/useRaisedShadow";

const TITLE_W = 120;

export default function LongPressReorder({ header, row, rowIdx, ClassNames }) {
  const { focusedRowIdx, setFocsuedRowIdx, setRowEditingMode, rowEditingMode } =
    useUIContext();
  const [items, setItems] = useState(row);

  const canDrag = rowEditingMode && rowIdx === focusedRowIdx;

  const onLongPress = (e) => {
    setRowEditingMode(true);
    setFocsuedRowIdx(rowIdx);
  };

  const onClick = () => {
    if (rowIdx !== focusedRowIdx) {
      setRowEditingMode(false);
    }
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <div
      //   {...longPressEvent}
      className={classNames("flex-col lolomo__row", ClassNames, {
        isActive: canDrag,
      })}
    >
      <span className="lolomo__row__label subtitle-heavy">
        {header}
        <Edit className="lolomo-row__label__edit" />
      </span>

      <Reorder.Group axis="x" onReorder={setItems} values={items}>
        {items.map((item) => (
          <Item key={item} item={item} />
        ))}
      </Reorder.Group>
    </div>
  );
}

const Item = ({ item }) => {
  const x = useMotionValue(0);
  const boxShadow = useRaisedShadow(x);

  return (
    <Reorder.Item value={item} id={item} style={{ boxShadow, x }}>
      <TitleCard title={item} />
    </Reorder.Item>
  );
};

const AnimatedTitle = ({ item }) => {
  // const x = i * TITLE_W;
  //   const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item id={item} value={item}>
      <TitleCard title={item} />
    </Reorder.Item>
  );
};
