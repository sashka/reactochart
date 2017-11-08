'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _d = require('d3');

var _Data = require('./utils/Data');

var _xyPropsEqual = require('./utils/xyPropsEqual');

var _xyPropsEqual2 = _interopRequireDefault(_xyPropsEqual);

var _CustomPropTypes = require('./utils/CustomPropTypes');

var CustomPropTypes = _interopRequireWildcard(_CustomPropTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An alluvial diagram AKA Sankey diagram
 */

var AlluvialDiagram = function (_React$Component) {
  _inherits(AlluvialDiagram, _React$Component);

  function AlluvialDiagram() {
    _classCallCheck(this, AlluvialDiagram);

    return _possibleConstructorReturn(this, (AlluvialDiagram.__proto__ || Object.getPrototypeOf(AlluvialDiagram)).apply(this, arguments));
  }

  _createClass(AlluvialDiagram, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          'nodes'
        ),
        _react2.default.createElement(
          'div',
          null,
          this.props.nodes.map(function (node) {
            return _react2.default.createElement(
              'span',
              null,
              node.id
            );
          })
        )
      );
    }
  }]);

  return AlluvialDiagram;
}(_react2.default.Component);

AlluvialDiagram.propTypes = {
  nodes: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    value: _propTypes2.default.number,
    step: _propTypes2.default.number

  })),
  edges: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    source: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    target: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
  }))

};
AlluvialDiagram.defaultProps = {};
exports.default = AlluvialDiagram;
//# sourceMappingURL=AlluvialDiagram.js.map