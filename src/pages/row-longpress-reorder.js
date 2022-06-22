import { useRef } from "react";
import { useSprings, animated, config } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { clamp } from "lodash";
import { Edit } from "common/icons";
import { useUIContext } from "contexts/ui";
import swap from "lodash-move";
import TitleCard from "common/titlecard";
import classNames from "classnames";
import useLongPress from "hooks/useLongPress";

const TITLE_GAP_X = 120;

const fnX = (
  order,
  active = false,
  originalIndex = 0,
  curIndex = 0,
  x = 0,
  canDrag = false
) => {
  return (index) =>
    active && index === originalIndex
      ? {
          x: canDrag && curIndex * TITLE_GAP_X + x,
          scale: 1.13,
          zIndex: 1,
          shadow: 15,
          immediate: (key) => key === "zIndex",
          config: (key) => (key === "x" ? config.stiff : config.default),
        }
      : {
          x: order.indexOf(index) * TITLE_GAP_X,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };
};

export default function LongPressReorder({ header, row, rowIdx, ClassNames }) {
  const { focusedRowIdx, setFocsuedRowIdx, setRowEditingMode, rowEditingMode } =
    useUIContext();

  const canDrag = rowEditingMode && rowIdx === focusedRowIdx;

  const onLongPress = (e) => {
    console.log("longpress");
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

  const order = useRef(row.map((_, index) => index)); // Store indicies as a local ref, this represents the item order
  const [springs, api] = useSprings(row.length, fnX(order.current)); // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  // const [springs, api] = useSprings(row.length, fnScale(order.current)); // Create springs, each corresponds to an item, controlling its transform, scale, etc.

  const bind = useDrag(
    ({ args: [originalIndex], active, movement: [x, y], ...state }) => {
      const curIndex = order.current.indexOf(originalIndex);
      const curRow = clamp(
        Math.round((curIndex * TITLE_GAP_X + x) / TITLE_GAP_X),
        0,
        row.length - 1
      );
      const newOrder = swap(order.current, curIndex, curRow);

      //DRAG
      if (canDrag) {
        api.start(fnX(newOrder, active, originalIndex, curIndex, x, canDrag));
        // Feed springs new style data, they'll animate the view without causing a single render
      }

      if (!active) order.current = newOrder;
    },
    {}
  );

  return (
    <div
      {...longPressEvent}
      className={classNames("flex-col lolomo__row", ClassNames, {
        isActive: canDrag,
      })}
    >
      <span className="lolomo__row__label subtitle-heavy">
        {header}
        <Edit className="lolomo-row__label__edit" />
      </span>
      <div className={"lolomo__row__titles"}>
        {springs.map(({ zIndex, shadow, x, scale }, i) => (
          <animated.div
            {...bind(i)}
            key={i}
            style={{
              zIndex,
              boxShadow: shadow.to(
                (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
              ),
              x,
              scale,
            }}
            className="gesture-detector"
            children={<TitleCard title={row[i]} isActive={canDrag} />}
          />
        ))}
      </div>
    </div>
  );
}
