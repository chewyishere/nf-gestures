import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import demos from "demos/demos";
import { useUIContext } from "contexts/ui";
import { Close, Menu } from "common/icons";
import "./config.scss";

export default function Config() {
  let navigate = useNavigate();
  const { reset, showDebug, setShowDebug, currentDemo, setCurrentDemo } =
    useUIContext();
  const [isHiding, setIsHiding] = useState();

  const goTo = (id) => {
    reset();
    setIsHiding(true);
    setCurrentDemo(id);
    navigate(`/${id}`);
  };

  function requestOrientationPermission() {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          window.addEventListener("deviceorientation");
        }
      })
      .catch(console.error);
  }

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
        <p className="subtitle-heavy header">Demos</p>
        <hr />
        {demos.map((_d, _idx) => (
          <li
            key={`list-${_idx}`}
            className={classNames("body-small", {
              isActive: currentDemo === _d.id,
            })}
          >
            <a
              onClick={() => {
                goTo(_d.id);
              }}
            >
              {_d.title}
            </a>
          </li>
        ))}

        <div className="config__debug">
          <p className="subtitle-heavy header">Mobile Debug</p>
          <hr />
          <button
            className="config__btn body-small"
            onClick={() => {
              setShowDebug(!showDebug);
            }}
          >
            {showDebug ? "Hide" : "Show"} Values
          </button>{" "}
          <button
            className="config__btn body-small"
            onClick={requestOrientationPermission}
          >
            Activate Device Orientation
          </button>
        </div>
      </ul>
    </div>
  );
}
