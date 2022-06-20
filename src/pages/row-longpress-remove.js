import TitleCard from "common/titlecard";

export default function RowLongPressRemove({ row }) {
  return (
    <div className="lolomo__row__titles">
      {row.map((_title, _idx) => (
        <TitleCard key={`${_title}-${_idx}`} title={_title} />
      ))}
    </div>
  );
}
