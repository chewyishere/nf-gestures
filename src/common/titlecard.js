import { Remove } from "common/icons";

export default function TitleCard({ title, canDrag }) {
  return (
    <div className="boxart block">
      <img
        draggable="false"
        src={`${process.env.PUBLIC_URL}/images/boxshot/${title}.jpg`}
        alt={title}
      />
      {/* {canDrag && <ActionRemove />} */}
    </div>
  );
}

const ActionRemove = () => {
  return (
    <div className="gesture-action flex-center -remove">
      <Remove />
    </div>
  );
};
