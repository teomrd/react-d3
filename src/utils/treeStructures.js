import { v4 as uuidv4 } from "uuid";

export const idifyNode = (node) => ({
  ...node,
  id: uuidv4(),
});

export const collapseNodeChildren = (node) => ({
  ...node,
  children: undefined,
  _children: node.children,
});

export const expandNodeChildren = (node) => ({
  ...node,
  children: node._children,
  _children: undefined,
});

export const toggleNodeChildren = (node) => ({
  ...node,
  children: node.children ? undefined : node._children,
  _children: node.children ? node.children : undefined,
});

export const traverse = (node, fn, traverseProp = "children") => {
  const { ...rest } = node;
  const children = node[traverseProp];

  return fn({
    ...rest,
    ...(children
      ? { [traverseProp]: children.map((c) => traverse(c, fn, traverseProp)) }
      : {}),
  });
};

export const idifyTree = (node) => traverse(node, idifyNode);
