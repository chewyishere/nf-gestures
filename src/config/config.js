import classNames from "classnames";
import "./config.scss";

export default function Config({ demos, currentDemoIdx, setCurrentDemoIdx }) {
  return (
    <div className="config">
      <ul>
        <div className="config__header">
          <p className="subtitle-heavy">Gesture Demos </p>
          <hr />
        </div>

        {demos.map((_d, _idx) => (
          <li
            key={`list-${_idx}`}
            className={classNames("body-small", {
              isActive: currentDemoIdx === _idx,
            })}
          >
            <a onClick={() => setCurrentDemoIdx(_idx)}>{_d.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
