import React, { useEffect, useState } from "react";
import d3 from "d3";
import data from "../data/flare.json";
import Tree from "./Tree/Tree";

const margin = { top: 20, right: 120, bottom: 20, left: 120 };
const width = 960 - margin.right - margin.left;
const height = 800 - margin.top - margin.bottom;

let root = data;
root.x0 = height / 2;
root.y0 = 0;

let tree = d3.layout.tree().size([height, width]);
let nodes = tree.nodes(root).reverse();
// let links = tree.links(nodes);

nodes.forEach(function (d) {
  d.y = d.depth * 180;
});

console.log({ nodes });

const collapse = (d) => {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
};

const collapseNodes = (d) => {
  return Array.isArray(d) ? d.forEach(collapse) : collapse(d);
};

collapseNodes(root.children);

const D3 = () => {
  const [myNodes, setNodes] = useState([]);

  useEffect(() => {
    setNodes(nodes);
  });

  return <Tree width={width} height={height} nodes={myNodes} />;
};

export default D3;
