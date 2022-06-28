import { motion } from "framer-motion";
import { Remove, Add } from "common/icons";
import "./actions.scss";

const ActionRemove = ({ onAction, title }) => {
  return (
    <motion.div
      className="actions flex-center -remove"
      onTap={() => {
        onAction("remove", title);
      }}
    >
      <Remove />
    </motion.div>
  );
};

const ActionAdd = () => {
  return (
    <div className="actions flex-center -add">
      <Add />
    </div>
  );
};

const Actions = {
  remove: ActionRemove,
  add: ActionAdd,
};

export { Actions, ActionAdd, ActionRemove };
