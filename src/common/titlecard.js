import { Actions } from "./actions";

export default function TitleCard({ title, isActive, actions = [], onAction }) {
  const showActions = isActive && actions.length > 0;

  const DynamicAction = ({ action }) => {
    const Action = Actions[action];
    return <Action onAction={onAction} title={title} />;
  };

  return (
    <div className="boxart block">
      <img
        draggable="false"
        src={`${process.env.PUBLIC_URL}/images/boxshot/${title}.jpeg`}
        alt={title}
      />
      {showActions &&
        actions.map((_a) => <DynamicAction key={_a} action={_a} />)}
    </div>
  );
}
