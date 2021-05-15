import { v4 as uuidv4 } from "uuid";

export const idify = (node) => {
  const { children } = node;
  const newChildren = children ? { children: children.map(idify) } : {};

  return {
    id: uuidv4(),
    ...node,
    ...newChildren,
  };
};
