import React from 'react';
import _ from 'lodash';
import measureText from 'measure-text';
import PropTypes from 'prop-types';

export default class YAxisTitle extends React.Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    distance: PropTypes.number,
    position: PropTypes.oneOf(['left', 'right']),
    alignment: PropTypes.oneOf(['top', 'middle', 'bottom']),
    placement: PropTypes.oneOf(['before', 'after']),
    rotate: PropTypes.bool,
    style: PropTypes.object,
    spacingLeft: PropTypes.number,
    spacingRight: PropTypes.number,
  };
  static defaultProps = {
    height: 250,
    width: 400,
    distance: 5,
    position: 'left',
    alignment: 'middle',
    placement: undefined,
    rotate: true,
    style: {
      fontFamily: "Helvetica, sans-serif",
      fontSize: '24px',
      fontWeight: 'bold',
      lineHeight: 1
    },
    spacingLeft: 0,
    spacingRight: 0
  };

  static getMargin(props) {
    props = _.defaults({}, props, YAxisTitle.defaultProps);
    const {distance, position, rotate} = props;
    const placement = props.placement || ((position === 'left') ? 'before' : 'after');
    const zeroMargin = {marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0};

    if((position === 'left' && placement === 'after') || (position === 'right' && placement === 'before'))
      return zeroMargin;

    const title = props.title || props.children;
    const style = _.defaults(props.style, YAxisTitle.defaultProps.style);
    const measured = measureText(_.assign({text: title}, style));

    const marginValue = distance +
      Math.ceil(rotate ?
        measured.height.value :
        measured.width.value
      );

    return (position === 'left') ?
      {...zeroMargin, marginLeft: marginValue} :
      {...zeroMargin, marginRight: marginValue};
  }

  render() {
    const {height, width, distance, position, alignment, style, spacingLeft, spacingRight} = this.props;
    const title = this.props.title || this.props.children;
    const placement = this.props.placement || ((position === 'left') ? 'before' : 'after');

    const rotate = this.props.rotate ? -90 : 0;
    const posX = (position === 'right') ? width + spacingRight : -spacingLeft;
    const translateX = posX +
      ((placement === 'before') ? -distance : distance);
    const translateY =
      (alignment === 'middle') ? (height / 2) :
      (alignment === 'bottom') ? (height) :
      0;
    const textAnchor =
      (rotate && alignment === 'top') ? 'end' :
      (rotate && alignment === 'middle') ? 'middle' :
      (rotate && alignment === 'bottom') ? 'start' :
      (placement === 'before') ? 'end' :
      'start';
    const dy =
      (rotate && placement == 'before') ? '-0.2em' :
      (rotate) ? '0.8em' :
      (alignment === 'top') ? '0.8em' :
      (alignment === 'middle') ? '0.3em' :
      null;

    return <g transform={`translate(${translateX},${translateY})`}>
      <text style={{...style, textAnchor}} transform={`rotate(${rotate})`} dy={dy}>
        {title}
      </text>
    </g>;
  }
}
