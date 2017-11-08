import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {area} from 'd3';

import {makeAccessor, domainFromData, combineDomains} from './utils/Data';
import xyPropsEqual from './utils/xyPropsEqual';
import * as CustomPropTypes from './utils/CustomPropTypes';


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
    edges: PropTypes.arrayOf(PropTypes.shape({
      source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      target: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })),

  };
  static defaultProps = {

  };


  render() {
    return <div>
      <div>nodes</div>
      <div>{this.props.nodes.map(node => {
        return <span>{node.id}</span>;
      })}</div>
    </div>
  }
}
