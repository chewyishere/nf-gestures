import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import demos from "demos/demos";
import { useUIContext } from "contexts/ui";
import { Close, Menu } from "common/icons";
import "./config.scss";

export default function Config({ currentDemoIdx, setCurrentDemoIdx }) {
  const { reset, showDebug, setShowDebug } = useUIContext();
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
          <p className="subtitle-heavy">Demos </p>
          <hr />
        </div>

        {demos.map((_d, _idx) => (
          <li
            key={`list-${_idx}`}
            className={classNames("body-small", {
              isActive: currentDemoIdx === _idx,
            })}
          >
            <Link
              to={`/${_d.id}`}
              onClick={() => {
                reset();
                setIsHiding(true);
              }}
            >
              {_d.title}
            </Link>
            {_d.debug && (
              <button
                className="config__list__debug"
                onClick={() => setShowDebug(!showDebug)}
              >
                {showDebug ? "hide" : "show"} debug
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
