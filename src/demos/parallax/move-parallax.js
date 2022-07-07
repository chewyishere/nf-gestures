import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { opacityV } from "utils/variants";
import { useUIContext } from "contexts/ui";
import { home } from "data/app";
import { IOSStatus, Nav } from "common/utlities";
import { map_range } from "utils/math";
import BillboardParallax from "./billboard-parallax";
import LolomoRow from "common/lolomo-row";

const Debug = ({ requestOrientationPermission, log }) => {
  return (
    <div className="debug__modal">
      <button
        className="permission center-abs"
        onClick={requestOrientationPermission}
      >
        Request permission
      </button>
      <p className="debug">{log}</p>
    </div>
  );
};

export default function MoveParallax({ ClassNames, lolomos }) {
  const { showDebug } = useUIContext();
  const [log, setLog] = useState("alpha:" + 360 + " beta:" + 0 + " gamma:" + 0);
  const gyro = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => window.removeEventListener("deviceorientation", logIt);
  }, []);

  function requestOrientationPermission() {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          window.addEventListener("deviceorientation", logIt);
        }
      })
      .catch(console.error);
  }

  const logIt = (e) => {
    let _l =
      "alpha:" +
      e.alpha.toFixed(2) +
      " beta:" +
      e.beta.toFixed(2) +
      " gamma:" +
      e.gamma.toFixed(2);
    setLog(_l);
    let _x = map_range(e.gamma.toFixed(1), -30, 30, -1, 1);
    let _y = map_range(e.beta.toFixed(1), 0, 70, -1, 1);
    gyro.current = { x: _x, y: _y };
  };

  return (
    <motion.div
      className={`home screen ${ClassNames}`}
      variants={opacityV}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <IOSStatus />
      <Nav />

      <div className="home__container">
        {showDebug && (
          <Debug
            requestOrientationPermission={requestOrientationPermission}
            log={log}
          />
        )}
        <div className="billboard flex-center sparks">
          <BillboardParallax gyro={gyro.current} />
          <div className="home__nav flex-col">
            <img
              className="home__nav__col"
              src={home.navSrc}
              alt="nav"
              draggable="false"
            />
          </div>
          <div className="home__nav__col home__nav__filters flex-center  body-standard">
            {home.filters.map((_f) => (
              <span key={_f}>{_f}</span>
            ))}
          </div>
        </div>

        <div className="lolomo flex-col">
          {lolomos.map((_l, _idx) => (
            <LolomoRow key={`${_idx}-${_l.title}`} row={_l} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
