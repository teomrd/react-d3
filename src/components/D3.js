import React, { useEffect, useState } from "react";
import d3 from "d3";
import data from "../data/flare.json";
import Tree from "./Tree/Tree";

const margin = { top: 20, right: 120, bottom: 20, left: 120 };
const width = 960 - margin.right - margin.left;
const height = 800 - margin.top - margin.bottom;

// const toggleChildren = (node) => ({
//   ...node,
//   children: node.children ? null : node._children,
//   _children: node.children ? node.children : null,
// });

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

let root = data;

const D3 = () => {
  const [myNodes, setNodes] = useState([]);

  const update = (source) => {
    console.log("source", source);
    let nodes = tree.nodes(root).reverse();
    nodes.forEach(function (d) {
      d.y = d.depth * 200;
    });

    console.log("root", root);
    setNodes(nodes);
  };

  function toggleChildren(d) {
    console.log("d", d);
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }

  const handleNodeClick = (d) => {
    toggleChildren(d);
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
