import TitleCard from "./titlecard";

export default function LolomoRow({ row }) {
  return (
    <div className="flex-col lolomo__row">
      <span className="lolomo__row__label subtitle-heavy">{row.title}</span>
      <div className="lolomo__row__titles">
        {row.titles.map((item, i) => (
          <TitleCard title={item} />
        ))}
      </div>
    </div>
  );
}
