import { useRef, useState, useEffect } from "react";
import { useSprings, useSpring, animated, config } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { clamp } from "lodash";
import { Edit } from "common/icons";
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

export default function LongPressWiggle({ header, row, ClassNames }) {
  const [canDrag, setCanDrag] = useState(false);

  const onLongPress = () => {
    console.log("longpress is triggered");
    setCanDrag(true);
  };

  const onClick = () => {
    console.log("click is triggered");
    setCanDrag(false);
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

  const fadeStyle = useSpring({
    to: { opacity: canDrag ? 1 : 0 },
    from: { opacity: 0 },
    config: { duration: 200 },
  });

  return (
    <div className="flex-col lolomo__row">
      <span className="lolomo__row__label subtitle-heavy">
        {header}
        <animated.div style={fadeStyle}>
          <Edit />
        </animated.div>
      </span>
      <div className={classNames("lolomo__row__titles", ClassNames)}>
        {springs.map(({ zIndex, shadow, x, scale }, i) => (
          <animated.div
            {...bind(i)}
            {...longPressEvent}
            key={i}
            style={{
              zIndex,
              boxShadow: shadow.to(
                (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
              ),
              x,
              scale,
            }}
            className={classNames("gesture-detector", { canDrag: canDrag })}
            children={<TitleCard title={row[i]} canDrag={canDrag} />}
          />
        ))}
      </div>
    </div>
  );
}
