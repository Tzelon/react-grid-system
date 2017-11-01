var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

var _ref = _jsx(XAxis, {
  dataKey: 'name'
});

var _ref2 = _jsx(YAxis, {});

var _ref3 = _jsx(CartesianGrid, {
  strokeDasharray: '3 3'
});

var SimpleLineChart = function (_PureComponent) {
  _inherits(SimpleLineChart, _PureComponent);

  function SimpleLineChart(props) {
    _classCallCheck(this, SimpleLineChart);

    var _this = _possibleConstructorReturn(this, (SimpleLineChart.__proto__ || Object.getPrototypeOf(SimpleLineChart)).call(this, props));

    _this.handleClick = function (e) {
      console.log(e);
    };

    _this.extractItemSize = function () {
      var itemSize = _this.props.itemSize;

      if (itemSize !== undefined) {
        var listOfSizes = itemSize.split('x').map(function (number) {
          return parseInt(number);
        });
        return { width: listOfSizes[0], height: listOfSizes[1] };
      }

      return { width: _this.props.width, height: _this.props.height };
    };

    _this.state = {};
    return _this;
  }

  _createClass(SimpleLineChart, [{
    key: 'render',
    value: function render() {
      var _extractItemSize = this.extractItemSize(),
          width = _extractItemSize.width,
          height = _extractItemSize.height;

      return _jsx('div', {}, this.props.key, _jsx(LineChart, {
        width: width * this.props.rowWidth,
        height: height * this.props.rowHeight,
        data: this.props.data,
        margin: { top: 20, right: 30, left: 20, bottom: 5 }
      }, void 0, _ref, _ref2, _ref3, _jsx(Line, {
        type: 'monotone',
        dataKey: 'pv',
        stroke: '#8884d8',
        activeDot: { r: 8 }
      }), _jsx(Line, {
        type: 'monotone',
        dataKey: 'uv',
        stroke: '#82ca9d',
        onClick: this.handleClick
      })));
    }
  }]);

  return SimpleLineChart;
}(PureComponent);

export default SimpleLineChart;