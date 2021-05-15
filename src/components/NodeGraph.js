import React, { useEffect, useState } from "react";
import d3 from "d3";
import data from "../data/flare-2.json";
import Tree from "./Tree/Tree";
import { idify } from "./idify";

const margin = { top: 20, right: 120, bottom: 20, left: 120 };
const width = 960 - margin.right - margin.left;
const height = 800 - margin.top - margin.bottom;
const fixedDepth = 200;

const tree = d3.layout.tree().size([height, width]);

let root = idify(data);

const NodeGraph = () => {
  const [myNodes, setNodes] = useState([]);
  const [myLinks, setLinks] = useState([]);

  const update = () => {
    let nodes = tree.nodes(root).reverse();
    let links = tree.links(nodes);

    nodes.forEach(function (d) {
      d.y = d.depth * fixedDepth;
    });

    setLinks(links);
    setNodes(nodes);

    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  };

  const toggleChildren = (self) => {
    if (self.children) {
      self._children = self.children;
      self.children = null;
    } else {
      self.children = self._children;
      self._children = null;
    }
    update(self);
  };

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

  useEffect(() => {
    collapseNodes(root.children);
    update(root);
  }, [root]);

  return (
    <Tree
      width={width}
      height={height}
      nodes={myNodes}
      links={myLinks}
      onNodeClick={toggleChildren}
    />
  );
};

export default NodeGraph;
