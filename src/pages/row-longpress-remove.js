import TitleCard from "common/titlecard";
import { Remove } from "common/icons";

const ActionRemove = () => {
  return (
    <div className="gesture-action flex-center -remove">
      <Remove />
    </div>
  );
};

export default function RowLongPressRemove({ row }) {
  return (
    <div className="lolomo__row__titles">
      {row.map((_title, _idx) => (
        <TitleCard key={`${_title}-${_idx}`} title={_title} />
      ))}
    </div>
  );
}
