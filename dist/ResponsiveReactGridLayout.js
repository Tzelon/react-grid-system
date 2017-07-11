var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { cloneLayout, synchronizeLayoutWithChildren, validateLayout } from './utils';
import { getBreakpointFromWidth, getColsFromBreakpoint, findOrGenerateResponsiveLayout } from './responsiveUtils';
import ReactGridLayout from './ReactGridLayout';

var noop = function noop() {};
var type = function type(obj) {
  return Object.prototype.toString.call(obj);
};

var ResponsiveReactGridLayout = function (_React$Component) {
  _inherits(ResponsiveReactGridLayout, _React$Component);

  function ResponsiveReactGridLayout() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ResponsiveReactGridLayout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ResponsiveReactGridLayout.__proto__ || Object.getPrototypeOf(ResponsiveReactGridLayout)).call.apply(_ref, [this].concat(args))), _this), _this.state = _this.generateInitialState(), _this.onLayoutChange = function (layout) {
      _this.props.onLayoutChange(layout, _extends({}, _this.props.layouts, _defineProperty({}, _this.state.breakpoint, layout)));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // This should only include propTypes needed in this code; RGL itself
  // will do validation of the rest props passed to it.


  _createClass(ResponsiveReactGridLayout, [{
    key: 'generateInitialState',
    value: function generateInitialState() {
      var _props = this.props,
          width = _props.width,
          breakpoints = _props.breakpoints,
          layouts = _props.layouts,
          verticalCompact = _props.verticalCompact,
          cols = _props.cols;

      var breakpoint = getBreakpointFromWidth(breakpoints, width);
      var colNo = getColsFromBreakpoint(breakpoint, cols);
      // Get the initial layout. This can tricky; we try to generate one however possible if one doesn't exist
      // for this layout.
      var initialLayout = findOrGenerateResponsiveLayout(layouts, breakpoints, breakpoint, breakpoint, colNo, verticalCompact);

      return {
        layout: initialLayout,
        breakpoint: breakpoint,
        cols: colNo
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {

      // Allow parent to set width or breakpoint directly.
      if (nextProps.width != this.props.width || nextProps.breakpoint !== this.props.breakpoint || !isEqual(nextProps.breakpoints, this.props.breakpoints) || !isEqual(nextProps.cols, this.props.cols)) {
        this.onWidthChange(nextProps);
      }

      // Allow parent to set layouts directly.
      else if (!isEqual(nextProps.layouts, this.props.layouts)) {
          var _state = this.state,
              _breakpoint = _state.breakpoint,
              _cols = _state.cols;

          // Since we're setting an entirely new layout object, we must generate a new responsive layout
          // if one does not exist.

          var newLayout = findOrGenerateResponsiveLayout(nextProps.layouts, nextProps.breakpoints, _breakpoint, _breakpoint, _cols, nextProps.verticalCompact);
          this.setState({ layout: newLayout });
        }
    }

    // wrap layouts so we do not need to pass layouts to child

  }, {
    key: 'onWidthChange',


    /**
     * When the width changes work through breakpoints and reset state with the new width & breakpoint.
     * Width changes are necessary to figure out the widget widths.
     */
    value: function onWidthChange(nextProps) {
      var breakpoints = nextProps.breakpoints,
          cols = nextProps.cols,
          layouts = nextProps.layouts,
          verticalCompact = nextProps.verticalCompact;

      var newBreakpoint = nextProps.breakpoint || getBreakpointFromWidth(nextProps.breakpoints, nextProps.width);

      var lastBreakpoint = this.state.breakpoint;

      // Breakpoint change
      if (lastBreakpoint !== newBreakpoint || this.props.breakpoints !== breakpoints || this.props.cols !== cols) {
        // Preserve the current layout if the current breakpoint is not present in the next layouts.
        if (!(lastBreakpoint in layouts)) layouts[lastBreakpoint] = cloneLayout(this.state.layout);

        // Find or generate a new layout.
        var newCols = getColsFromBreakpoint(newBreakpoint, cols);
        var _layout = findOrGenerateResponsiveLayout(layouts, breakpoints, newBreakpoint, lastBreakpoint, newCols, verticalCompact);

        // This adds missing items.
        _layout = synchronizeLayoutWithChildren(_layout, nextProps.children, newCols, verticalCompact);

        // Store the new layout.
        layouts[newBreakpoint] = _layout;

        // callbacks
        this.props.onLayoutChange(_layout, layouts);
        this.props.onBreakpointChange(newBreakpoint, newCols);
        this.props.onWidthChange(nextProps.width, nextProps.margin, newCols, nextProps.containerPadding);

        this.setState({ breakpoint: newBreakpoint, layout: _layout, cols: newCols });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // eslint-disable-next-line no-unused-vars
      var _props2 = this.props,
          breakpoint = _props2.breakpoint,
          breakpoints = _props2.breakpoints,
          cols = _props2.cols,
          layouts = _props2.layouts,
          onBreakpointChange = _props2.onBreakpointChange,
          onLayoutChange = _props2.onLayoutChange,
          onWidthChange = _props2.onWidthChange,
          other = _objectWithoutProperties(_props2, ['breakpoint', 'breakpoints', 'cols', 'layouts', 'onBreakpointChange', 'onLayoutChange', 'onWidthChange']);

      return React.createElement(ReactGridLayout, _extends({}, other, {
        onLayoutChange: this.onLayoutChange,
        layout: this.state.layout,
        cols: this.state.cols
      }));
    }
  }]);

  return ResponsiveReactGridLayout;
}(React.Component);

ResponsiveReactGridLayout.propTypes = {

  //
  // Basic props
  //

  // Optional, but if you are managing width yourself you may want to set the breakpoint
  // yourself as well.
  breakpoint: PropTypes.string,

  // {name: pxVal}, e.g. {lg: 1200, md: 996, sm: 768, xs: 480}
  breakpoints: PropTypes.object,

  // # of cols. This is a breakpoint -> cols map
  cols: PropTypes.object,

  // layouts is an object mapping breakpoints to layouts.
  // e.g. {lg: Layout, md: Layout, ...}
  layouts: function layouts(props, propName) {
    if (type(props[propName]) !== '[object Object]') {
      throw new Error('Layout property must be an object. Received: ' + type(props[propName]));
    }
    Object.keys(props[propName]).forEach(function (key) {
      if (!(key in props.breakpoints)) {
        throw new Error('Each key in layouts must align with a key in breakpoints.');
      }
      validateLayout(props.layouts[key], 'layouts.' + key);
    });
  },


  // The width of this component.
  // Required in this propTypes stanza because generateInitialState() will fail without it.
  width: PropTypes.number.isRequired,

  //
  // Callbacks
  //

  // Calls back with breakpoint and new # cols
  onBreakpointChange: PropTypes.func,

  // Callback so you can save the layout.
  // Calls back with (currentLayout, allLayouts). allLayouts are keyed by breakpoint.
  onLayoutChange: PropTypes.func,

  // Calls back with (containerWidth, margin, cols, containerPadding)
  onWidthChange: PropTypes.func
};
ResponsiveReactGridLayout.defaultProps = {
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  layouts: {},
  onBreakpointChange: noop,
  onLayoutChange: noop,
  onWidthChange: noop
};
export default ResponsiveReactGridLayout;