import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";

let data = [
  "Rare Wind",
  "Saint Petersburg",
  "Deep Blue",
  "Ripe Malinka",
  "Near Moon",
  "Wild Apple",
];

export default function Test() {
  const [rows, set] = useState(data);
  const width = 100;

  const transitions = useTransition(
    rows.map((title, i) => ({ title, x: i * width })),
    {
      from: { position: "absolute", opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ x }) => ({ x, opacity: 1 }),
      update: ({ x }) => ({ x }),
    }
  );

  return (
    <div class="list">
      <button
        onClick={() =>
          set([`list item ${Math.floor(Math.random() * 1000)}`, ...rows])
        }
      >
        add first
      </button>
      {transitions.map(({ item, props: { x, ...rest }, key }, index) => (
        <animated.div
          key={key}
          class="card"
          style={{
            transform: x.interpolate((x) => `translate3d(${x}px,0, 0)`),
            ...rest,
          }}
        >
          <div
            class="cell"
            onClick={() =>
              set(rows.filter((_item) => _item.title !== item.title))
            }
          >
            <div class="details">{item.title}</div>
          </div>
        </animated.div>
      ))}
    </div>
  );
}
