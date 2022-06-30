import classNames from "classnames";
import { home } from "data/app";
import { nav } from "data/app";

export default function BillboardUpSideDown() {
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
}
