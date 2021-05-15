import React, { useEffect, useState } from "react";
import d3 from "d3";
import data from "../../data/flare-2.json";
import Tree from "./Tree";
import { idify } from "./idify";

const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const width = 960 - margin.right - margin.left;
const height = 800 - margin.top - margin.bottom;
const fixedDepth = 200;

const tree = d3.layout.tree().size([height, width]);

let root = idify(data);

const NodeGraph = () => {
  const [myNodes, setNodes] = useState([]);
  const [myLinks, setLinks] = useState([]);
  const [sourcePosition, setSourcePosition] = useState({});

  const update = (source) => {
    setSourcePosition({
      x: source.x,
      y: source.y,
    });
    let nodes = tree.nodes(root).reverse();
    let links = tree.links(nodes);

    nodes.forEach(function (d) {
      d.y = d.depth * fixedDepth;
    });

    setLinks(links);
    setNodes(nodes);
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
      sourcePosition={sourcePosition}
      onNodeClick={toggleChildren}
    />
  );
};

export default NodeGraph;
