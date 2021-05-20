import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import d3 from "d3";
import Tree from "./Tree";
import { idifyTree } from "../../utils/treeStructures";
import { useAvailableWidth } from "./useAvailableWidth";

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

const NodeGraph = ({ id, data, fixedDepth, nodeSize, transitionDuration }) => {
  const [myNodes, setNodes] = useState([]);
  const [myLinks, setLinks] = useState([]);
  const [root, setRoot] = useState(idifyTree({}));
  const width = useAvailableWidth(`#${id}`);
  const [height, setHeight] = useState(0);
  const [sourcePosition, setSourcePosition] = useState({});

  useEffect(() => {
    const root = idifyTree(data);
    fullyCollapseTreeOrNodes(root.children);
    setRoot(root);
  }, [data]);

  useEffect(() => {
    update(root);
  }, [width]);

  const handleNodeClick = (self) => {
    toggleChildren(self);
    setSourcePosition({
      x: self.x,
      y: self.y,
    });
    update();
  };

  const update = () => {
    const tree = d3.layout.tree().size([width, height]);
    const nodes = tree.nodes(root).reverse();
    const treeDepth = nodes.reduce(
      (acc, { depth }) => (depth > acc ? depth : acc),
      1
    );
    const links = tree.links(nodes);

    nodes.forEach((d) => {
      d.y = d.depth * fixedDepth;
    });

    setHeight(treeDepth * fixedDepth + nodeSize * 3);
    setLinks(links);
    setNodes(nodes);
  };

  return (
    <Tree
      id={id}
      width={width}
      height={height}
      nodes={myNodes}
      links={myLinks}
      sourcePosition={sourcePosition}
      onNodeClick={handleNodeClick}
      transitionDuration={transitionDuration}
    />
  );
};

NodeGraph.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    children: PropTypes.array,
  }),
  fixedDepth: PropTypes.number,
  nodeSize: PropTypes.number,
  transitionDuration: PropTypes.number,
};

NodeGraph.defaultProps = {
  id: "node-graph-svg",
  fixedDepth: 180,
  nodeSize: 30,
  transitionDuration: 0.75,
};

export default NodeGraph;
