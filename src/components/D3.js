import React, { useEffect, useState } from "react";
import d3 from "d3";
import data from "../data/flare.json";
import Tree from "./Tree/Tree";

const margin = { top: 20, right: 120, bottom: 20, left: 120 };
const width = 960 - margin.right - margin.left;
const height = 800 - margin.top - margin.bottom;

const toggleChildren = (node) => ({
  ...node,
  children: node.children ? null : node._children,
  _children: node.children ? node.children : null,
});

const tree = d3.layout.tree().size([height, width]);
// let links = tree.links(nodes);
// const collapse = (d) => {
//   if (d.children) {
//     d._children = d.children;
//     d._children.forEach(collapse);
//     d.children = null;
//   }
// };
// const collapseNodes = (d) => {
//   return Array.isArray(d) ? d.forEach(collapse) : collapse(d);
// };
// collapseNodes(root.children);

const D3 = () => {
  const [myNodes, setNodes] = useState([]);
  const [root, setRoot] = useState({
    ...data,
    x0: height / 2,
    y0: 0,
  });

  const update = (source) => {
    let nodes = tree.nodes(root).reverse();
    const myNodes = nodes.map((d, i) => ({
      ...d,
      y: d.depth * 180,
      x0: d.x,
      y0: d.y,
      id: i,
    }));

    setNodes(myNodes);
  };

  const handleNodeClick = (d) => {
    toggleChildren(d);
    update(d);
  };

  useEffect(() => {
    update(root);
  }, [root]);

  return (
    <Tree
      width={width}
      height={height}
      nodes={myNodes}
      onNodeClick={handleNodeClick}
    />
  );
};

export default D3;
