var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import { RadialBar, RadialBarChart, Legend } from 'recharts';

var _ref = _jsx(RadialBar, {
  minAngle: 15,
  label: true,
  background: true,
  clockWise: true,
  dataKey: 'uv'
});

var SimpleRadialBarChart = function (_PureComponent) {
  _inherits(SimpleRadialBarChart, _PureComponent);

  function SimpleRadialBarChart(props) {
    _classCallCheck(this, SimpleRadialBarChart);

    var _this = _possibleConstructorReturn(this, (SimpleRadialBarChart.__proto__ || Object.getPrototypeOf(SimpleRadialBarChart)).call(this, props));

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

  _createClass(SimpleRadialBarChart, [{
    key: 'render',
    value: function render() {
      var _extractItemSize = this.extractItemSize(),
          width = _extractItemSize.width,
          height = _extractItemSize.height;

      return _jsx('div', {}, this.props.key, _jsx(RadialBarChart, {
        width: width * this.props.rowWidth,
        height: height * this.props.rowHeight,
        data: this.props.data,
        cx: 150,
        cy: 150,
        innerRadius: 20,
        outerRadius: 140,
        barSize: 10
      }, void 0, _ref, _jsx(Legend, {
        iconSize: 10,
        width: width * this.props.rowWidth / 3,
        height: height * this.props.rowHeight / 2,
        layout: 'vertical',
        verticalAlign: 'middle',
        wrapperStyle: { top: 0,
          left: 350,
          lineHeight: '24px' }
      })));
    }
  }]);

  return SimpleRadialBarChart;
}(PureComponent);

export default SimpleRadialBarChart;