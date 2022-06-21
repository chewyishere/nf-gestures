import { useRef, useState, useEffect } from "react";
import { Remove } from "common/icons";

const ActionRemove = ({ onAction, title }) => {
  return (
    <div
      className="gesture-action flex-center -remove"
      onClick={() => {
        onAction("remove", title);
      }}
    >
      <Remove />
    </div>
  );
};

const Actions = {
  remove: ActionRemove,
};

export default function TitleCard({ title, isActive, actions = [], onAction }) {
  const showActions = isActive && actions.length;

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
