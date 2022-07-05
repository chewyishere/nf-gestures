import { motion } from "framer-motion";
import { opacityV } from "utils/variants";
import { home } from "data/app";
import { IOSStatus, Nav } from "common/utlities";
import BillboardFireworks from "./billboard-fireworks";
import LolomoRow from "common/lolomo-row";

export default function TapFireworks({ ClassNames, lolomos }) {
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
        <div className="billboard flex-center fireworks">
          <BillboardFireworks />
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
          <div className="billboard__info">
            <img
              className="billboard__info__title"
              src={home.billboardInfoSrc}
              alt="title"
            />
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
