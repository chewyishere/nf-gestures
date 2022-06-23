import classNames from "classnames";
import { gestures } from "gestures/gestures";
import { useUIContext } from "contexts/ui";
import "./config.scss";

export default function Config({ currentDemoIdx, setCurrentDemoIdx }) {
  const { reset } = useUIContext();
  return (
    <div className="config">
      <ul>
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
