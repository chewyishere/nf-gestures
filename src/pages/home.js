import { home, lolomo } from "data/app";
import { nav } from "data/app";
import classNames from "classnames";

import "./home.scss";
import "./gesture.scss";

export default function Home({ demos, demoIdx = 0 }) {
  const DynamicDemo = ({ demoIdx, row }) => {
    const Demo = demos[demoIdx].demo;
    return <Demo row={row} ClassNames={demos[demoIdx].class} />;
  };

  return (
    <div className="home screen">
      <IOSStatus />
      <Nav activePageIdx={0} />
      <div className="home__nav flex-col">
        <img
          className="home__nav__col"
          src={home.navSrc}
          alt="nav"
          draggable="false"
        />
        <div className="home__nav__col home__nav__filters flex-center  body-standard">
          {home.filters.map((_f) => (
            <span key={_f}>{_f}</span>
          ))}
        </div>
      </div>
      <div className="home__container">
        <Billboard />
        <div className="lolomo flex-col surface-background-color-darker">
          {lolomo.map((_l) => (
            <div key={_l.title} className="flex-col lolomo__row">
              <span className="lolomo__row__label subtitle-heavy">
                {_l.title}
              </span>
              <DynamicDemo demoIdx={0} row={_l.titles} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Billboard = () => {
  return (
    <div className="billboard flex-center">
      <img
        className="billboard__bg"
        src={home.billboardSrc}
        alt="billboard"
        draggable="false"
      />
      <div className="billboard__info">
        <img
          className="billboard__info__title"
          src={home.billboardInfoSrc}
          alt="title"
        />
      </div>
    </div>
  );
};

const Nav = ({ activePageIdx = 0 }) => {
  return (
    <div className="app__nav flex-row">
      {nav.map((navItem, _idx) => (
        <div
          className={classNames("app__nav__item flex-col", {
            active: _idx === activePageIdx,
          })}
          key={navItem.label}
        >
          {navItem?.id === activePageIdx ? (
            <navItem.iconFill className="label__img" />
          ) : (
            <navItem.icon className="label__img" />
          )}
          <span className="tag">{navItem.label}</span>
        </div>
      ))}
    </div>
  );
};

const IOSStatus = () => {
  return (
    <>
      <div className="app__status -top">
        <img
          src={`${process.env.PUBLIC_URL}/images/home-status.png`}
          alt="home-status"
          draggable="false"
        />
      </div>
      <div className="app__status -bottom">
        <img
          src={`${process.env.PUBLIC_URL}/images/home-indicator.png`}
          alt="home-indicator"
          draggable="false"
        />
      </div>
    </>
  );
};
