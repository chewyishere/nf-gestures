import { useState } from "react";
import classNames from "classnames";
import { gestures } from "gestures/gestures";
import { useUIContext } from "contexts/ui";
import { Close, Menu } from "common/icons";
import "./config.scss";

export default function Config({ currentDemoIdx, setCurrentDemoIdx }) {
  const { reset } = useUIContext();
  const [isHiding, setIsHiding] = useState();

  return (
    <div className={classNames("config", { isHiding: isHiding })}>
      <div className="config__mobile__cta">
        {isHiding ? (
          <Menu
            className="config__mobile__cta__item"
            onClick={() => setIsHiding(false)}
          />
        ) : (
          <Close
            className="config__mobile__cta__item"
            onClick={() => setIsHiding(true)}
          />
        )}
      </div>

      <ul className="config__list">
        <div className="config__header">
          <p className="subtitle-heavy">Gesture Demos </p>
          <hr />
        </div>

        {gestures.map((_d, _idx) => (
          <li
            key={`list-${_idx}`}
            className={classNames("body-small", {
              isActive: currentDemoIdx === _idx,
            })}
          >
            <a
              onClick={() => {
                reset();
                setCurrentDemoIdx(_idx);
              }}
            >
              {_d.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
