import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { opacityV } from "utils/variants";
import { IOSStatus, Nav } from "common/utlities";
import BillboardUpSideDown from "./billboard-upsidedown";
import LolomoRow from "common/lolomo-row";

import "./upsidedown.scss";

export default function GyroUpSideDown({ ClassNames, lolomos }) {
  const [log, setLog] = useState();

  useEffect(() => {
    return () => window.removeEventListener("deviceorientation", logIt);
  }, []);

  const logIt = (e) => {
    let _l =
      "alpha:" +
      e.alpha.toFixed(2) +
      " beta:" +
      e.beta.toFixed(2) +
      " gamma:" +
      e.gamma.toFixed(2);
    setLog(_l);
  };

  function requestOrientationPermission() {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          window.addEventListener("deviceorientation", logIt);
        }
      })
      .catch(console.error);
  }

  return (
    <motion.div
      className="home screen"
      variants={opacityV}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <IOSStatus />
      <Nav />
      <button
        className="permission center-abs"
        onClick={requestOrientationPermission}
      >
        Request orientation permission
      </button>
      <div className={`home__container ${ClassNames}`}>
        <p className="debug">{log}</p>
        <BillboardUpSideDown />

        {/* <div className="lolomo flex-col">
          {lolomos.map((_l, _idx) => (
            <LolomoRow key={`${_idx}-${_l.title}`} row={_l} />
          ))}
        </div> */}
      </div>
    </motion.div>
  );
}
