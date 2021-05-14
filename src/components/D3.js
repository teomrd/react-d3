import React from "react";
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
nodes.forEach(function (d) {
  d.y = d.depth * 180;
});

const D3 = () => {
  return <Tree width={width} height={height} nodes={nodes} />;
};

export default D3;
