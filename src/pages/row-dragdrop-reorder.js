import { useRef } from "react";
import { useSprings, animated, config } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { clamp } from "lodash";
import swap from "lodash-move";
import { Remove } from "common/icons";
import TitleCard from "common/titlecard";
import classNames from "classnames";

const ActionRemove = () => {
  return (
    <div className="gesture-action flex-center -remove">
      <Remove />
    </div>
  );
};

const TITLE_GAP_X = 120;

const fn =
  (order, active = false, originalIndex = 0, curIndex = 0, x = 0) =>
  (index) =>
    active && index === originalIndex
      ? {
          x: curIndex * 120 + x,
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          immediate: (key) => key === "zIndex",
          config: (key) => (key === "x" ? config.stiff : config.default),
        }
      : {
          x: order.indexOf(index) * 120,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };

export default function RowDragDropReorder({ header, row, ClassNames }) {
  const order = useRef(row.map((_, index) => index)); // Store indicies as a local ref, this represents the item order
  const [springs, api] = useSprings(row.length, fn(order.current)); // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useDrag(
    ({ args: [originalIndex], active, movement: [x, y] }) => {
      const curIndex = order.current.indexOf(originalIndex);
      const curRow = clamp(
        Math.round((curIndex * TITLE_GAP_X + x) / TITLE_GAP_X),
        0,
        row.length - 1
      );
      const newOrder = swap(order.current, curIndex, curRow);
      api.start(fn(newOrder, active, originalIndex, curIndex, x)); // Feed springs new style data, they'll animate the view without causing a single render
      if (!active) order.current = newOrder;
    }
  );

  return (
    <div className="flex-col lolomo__row">
      <span className="lolomo__row__label subtitle-heavy">{header}</span>
      <div className={classNames("lolomo__row__titles", ClassNames)}>
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
            children={<TitleCard title={row[i]} />}
          />
        ))}
      </div>
    </div>
  );
}
