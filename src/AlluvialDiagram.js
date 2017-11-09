import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {area} from 'd3';

import {sankey, sankeyLinkHorizontal} from 'd3-sankey';

import {makeAccessor, domainFromData, combineDomains} from './utils/Data';
import xyPropsEqual from './utils/xyPropsEqual';
import * as CustomPropTypes from './utils/CustomPropTypes';

window.sankey = sankey;

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
    getNodeId: PropTypes.any
  };
  static defaultProps = {
    width: 400,
    height: 300,
    getNodeId: 'id'
  };

  componentWillMount() {
    const {nodes, links, width, height, getNodeId} = this.props;
    this._sankey = sankey()
      .size([width, height])
      .nodeId(makeAccessor(getNodeId));

    console.log(this._sankey({nodes, links}));
    console.log(this.props.links[0])
    console.log(sankeyLinkHorizontal()(this.props.links[0]))
  }

  render() {
    const {nodes, links, width, height} = this.props;

    const graph = this._sankey({nodes, links});
    const makeLinkPath = sankeyLinkHorizontal();

    return <svg width={width} height={height}>
      <g className="sankey-links">
        {(graph.links || []).map(link => {
          return <path
            className="sankey-link"
            d={makeLinkPath(link)}
            style={{strokeWidth: link.width}}
          />
        })}
      </g>
    </svg>;

    return <div>
      <div>nodes</div>
      <div>{this.props.nodes.map(node => {
        return <span>{node.id}</span>;
      })}</div>
    </div>
  }
}
