import classNames from "classnames";
import { home } from "data/app";
import { nav } from "data/app";

const ProfileNav = () => {
  return (
    <div className="mylist__nav flex-col">
      <img
        className="home__nav__col"
        src={home.navSrc}
        alt="nav"
        draggable="false"
      />
      <p className="title-heavy">My Lists</p>
    </div>
  );
};

const Billboard = () => {
  return (
    <div className="billboard flex-center">
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

export { IOSStatus, Nav, Billboard, ProfileNav };
