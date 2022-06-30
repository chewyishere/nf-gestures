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
    window.addEventListener("deviceorientation", function (event) {
      let _l = event.alpha + " : " + event.beta + " : " + event.gamma;
      setLog(_l);
    });
  }, []);

  function requestOrientationPermission() {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response == "granted") {
          window.addEventListener("deviceorientation", (e) => {
            // do something with e
          });
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
