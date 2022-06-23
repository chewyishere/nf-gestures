import { Remove, Add } from "common/icons";
import "./actions.scss";

const ActionRemove = ({ onAction, title }) => {
  return (
    <div
      className="actions flex-center -remove"
      onClick={() => {
        onAction("remove", title);
      }}
    >
      <Remove />
    </div>
  );
};

const ActionAdd = () => {
  return (
    <div className="actions flex-center -remove">
      <Add />
    </div>
  );
};

const Actions = {
  remove: ActionRemove,
  add: ActionAdd,
};

export { Actions, ActionAdd };
