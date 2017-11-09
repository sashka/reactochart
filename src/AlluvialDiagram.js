import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {area} from 'd3';

import {sankey, sankeyLinkHorizontal, sankeyLeft, sankeyRight, sankeyCenter, sankeyJustify} from 'd3-sankey';

import {makeAccessor, domainFromData, combineDomains} from './utils/Data';
import xyPropsEqual from './utils/xyPropsEqual';
import * as CustomPropTypes from './utils/CustomPropTypes';

const nodeAlignmentsByName = {
  left: sankeyLeft,
  right: sankeyRight,
  center: sankeyCenter,
  justify: sankeyJustify
};

/**
 * An alluvial diagram AKA Sankey diagram
 */

export default class AlluvialDiagram extends React.Component {
  static propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.number,
      step: PropTypes.number,
    })),
    links: PropTypes.arrayOf(PropTypes.shape({
      source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      target: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })),
    getNodeId: PropTypes.any,
    nodeWidth: PropTypes.number,
    nodePadding: PropTypes.number,
    nodeAlignment: PropTypes.oneOf(['left', 'right', 'center', 'justify']),

    // pass nodeStyle OR getNodeStyle to control inline style of node
    nodeStyle: PropTypes.object,
    getNodeStyle: PropTypes.any,

  };
  static defaultProps = {
    width: 400,
    height: 300,
    getNodeId: 'id',
    nodeWidth: 24,
    nodePadding: 8,
    nodeAlignment: 'justify',
    nodeStyle: {fill: 'thistle'}
  };

  componentWillMount() {
    const {width, height, getNodeId, nodeWidth, nodePadding, nodeAlignment} = this.props;
    this._sankey = sankey()
      .size([width, height])
      .nodeId(makeAccessor(getNodeId))
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .nodeAlign(nodeAlignmentsByName[nodeAlignment] || nodeAlignmentsByName.justify);
  }

  render() {
    const {nodes, links, width, height, getNodeStyle} = this.props;

    const graph = this._sankey({nodes, links});
    const makeLinkPath = sankeyLinkHorizontal();

    const nodeStyleAccessor = _.isUndefined(getNodeStyle) ? undefined : makeAccessor(getNodeStyle);

    return <svg width={width} height={height}>
      <g className="sankey-links">
        {(graph.links || []).map(link => {

          return <path
            className="sankey-link"
            d={makeLinkPath(link)}
            style={{
              strokeWidth: link.width,
              strokeOpacity: 0.5
            }}
          />
        })}
      </g>
      <g className="sankey-nodes">
        {graph.nodes.map((node, i) => {
          let nodeStyle = (nodeStyleAccessor) ? nodeStyleAccessor(node, i) : (this.props.nodeStyle || {});

          return <g
            className="sankey-node"
            transform={`translate(${node.x0},${node.y0})`}
          >
            <rect
              height={Math.abs(node.y1 - node.y0)}
              width={this._sankey.nodeWidth()}
              style={nodeStyle}
            />
          </g>
        })}
      </g>
    </svg>;
  }
}
