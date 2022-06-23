import { useEffect, useRef } from "react";
import { Edit } from "common/icons";
import { motion } from "framer-motion";
import { useUIContext } from "contexts/ui";
import TitleCard from "common/titlecard";
import classNames from "classnames";
import useLongPress from "hooks/useLongPress";

const TITLE_W = 120;

export default function LongPressModal({ header, row, rowIdx, ClassNames }) {
  const { focusedTitle, setFocusedTitle, setShowModal } = useUIContext();

  const onLongPress = (e, id, title, boundingBox) => {
    setShowModal(true);
    setFocusedTitle({ id, title, boundingBox });
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  return (
    <>
      <div className={classNames("flex-col lolomo__row", ClassNames)}>
        <span className="lolomo__row__label subtitle-heavy">
          {header}
          <Edit className="lolomo-row__label__edit" />
        </span>
        <div className="lolomo__row__titles">
          {row.map((item, i) => (
            <AnimatedTitle
              key={`${rowIdx}-${item}`}
              item={item}
              i={i}
              id={`${rowIdx}-${item}`}
              onLongPress={onLongPress}
              // isActive={focusedTitle.id === `${rowIdx}-${item}`}
              defaultOptions={defaultOptions}
            />
          ))}
        </div>
      </div>
    </>
  );
}

const AnimatedTitle = ({
  item,
  i,
  id,
  onLongPress,
  defaultOptions,
  isActive,
}) => {
  const x = i * TITLE_W;
  const titleRef = useRef();

  useEffect(() => {
    isActive && console.log();
  }, [isActive]);

  const longPressEvent = useLongPress(
    (e) => onLongPress(e, id, item, titleRef.current.getBoundingClientRect()),
    () => {},
    defaultOptions
  );

  return (
    <motion.div
      ref={titleRef}
      {...longPressEvent}
      className={classNames("gesture-detector", { canDrag: isActive })}
      style={{ x }}
    >
      <TitleCard title={item} />
    </motion.div>
  );
};
