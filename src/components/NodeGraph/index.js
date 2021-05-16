import React, { useEffect, useState } from "react";
import d3 from "d3";
import data from "../../data/flare-2.json";
import Tree from "./Tree";
import { idifyTree } from "../../utils/treeStructures";

const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const width = 960 - margin.right - margin.left;
const height = 800 - margin.top - margin.bottom;
const fixedDepth = 200;

const toggleChildren = (self) => {
  if (self.children) {
    self._children = self.children;
    self.children = null;
  } else {
    self.children = self._children;
    self._children = null;
  }
};
const collapseChildrenToTheEnd = (d) => {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapseChildrenToTheEnd);
    d.children = null;
  }
};
const fullyCollapseTreeOrNodes = (d) =>
  Array.isArray(d)
    ? d.forEach(collapseChildrenToTheEnd)
    : collapseChildrenToTheEnd(d);

const tree = d3.layout.tree().size([height, width]);

const root = idifyTree(data);

const NodeGraph = () => {
  const [myNodes, setNodes] = useState([]);
  const [myLinks, setLinks] = useState([]);
  const [sourcePosition, setSourcePosition] = useState({});

  const update = (source) => {
    setSourcePosition({
      x: source.x,
      y: source.y,
    });
    const nodes = tree.nodes(root).reverse();
    const links = tree.links(nodes);

    nodes.forEach((d) => {
      d.y = d.depth * fixedDepth;
    });

    setLinks(links);
    setNodes(nodes);
  };

  const handleNodeClick = (self) => {
    toggleChildren(self);
    update(self);
  };

  useEffect(() => {
    fullyCollapseTreeOrNodes(root.children);
    update(root);
  }, [root]);

  return (
    <Tree
      width={width}
      height={height}
      nodes={myNodes}
      links={myLinks}
      sourcePosition={sourcePosition}
      onNodeClick={handleNodeClick}
    />
  );
};

export default NodeGraph;
