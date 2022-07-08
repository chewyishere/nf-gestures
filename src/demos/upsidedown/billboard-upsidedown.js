import { motion, useTransform, useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import { home } from "data/app";
import { useUIContext } from "contexts/ui";

export default function BillboardUpSideDown() {
  const { showDebug } = useUIContext();
  const [log, setLog] = useState("alpha:" + 360 + " beta:" + 0 + " gamma:" + 0);

  const rotate = useMotionValue(0);
  const input = [0, 180, 360];
  const y = useTransform(rotate, input, [0, -100, 0]);
  const opacity_down = useTransform(rotate, input, [0, 1, 0]);
  const opacity_up = useTransform(rotate, input, [1, 0, 1]);

  useEffect(() => {
    window.addEventListener("deviceorientation", logIt);
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
    rotate.set(e.alpha);
  };

  return (
    <div className="upsidedown billboard flex-center">
      {showDebug && (
        <div className="debug__modal">
          <p className="debug">{log}</p>
        </div>
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
        className="billboard__rotator billboard__bg"
        style={{ rotate, y }}
      >
        <motion.img
          className="billboard__rotator__up"
          src={home.billboardSrc}
          alt="billboard"
          draggable="false"
          style={{ opacity: opacity_up }}
        />
        <motion.img
          className="billboard__rotator__down"
          src={home.billboardDownSrc}
          alt="down"
          draggable="false"
          style={{ opacity: opacity_down }}
        />
        <img
          className="billboard__rotator__front"
          src={home.billboardFrontSrc}
          alt="front"
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
