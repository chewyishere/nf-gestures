import classNames from "classnames";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { home } from "data/app";
import { nav } from "data/app";
import { useUIContext } from "contexts/ui";

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
export default function BillboardUpSideDown() {
  const { showDebug } = useUIContext();
  const [rotate, setRotate] = useState(100);
  const [log, setLog] = useState("alpha:" + 360 + " beta:" + 0 + " gamma:" + 0);

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
    setRotate(e.alpha);
  };

  return (
    <div className="billboard flex-center">
      {showDebug && (
        <Debug
          requestOrientationPermission={requestOrientationPermission}
          log={log}
        />
      )}
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
      <motion.div
        className="billboard__rotator"
        animate={{ rotate: rotate }}
        transition={{
          ease: "easeOut",
          duration: 0.1,
        }}
      >
        <img
          className="billboard__bg"
          src={home.billboardSrc}
          alt="billboard"
          draggable="false"
        />
      </motion.div>
      <div className="billboard__info">
        <img
          className="billboard__info__title"
          src={home.billboardInfoSrc}
          alt="title"
        />
      </div>
    </div>
  );
}
