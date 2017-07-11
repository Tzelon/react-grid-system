var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { DraggableCore } from 'react-draggable';
import { Resizable } from 'react-resizable';
import { perc, setTopLeft, setTransform } from './utils';
import classNames from 'classnames';

/**
 * An individual item within a ReactGridLayout.
 */
var GridItem = function (_React$Component) {
  _inherits(GridItem, _React$Component);

  function GridItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GridItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GridItem.__proto__ || Object.getPrototypeOf(GridItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      resizing: null,
      dragging: null,
      className: ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GridItem, [{
    key: 'calcColWidth',


    // Helper for generating column width
    value: function calcColWidth() {
      var _props = this.props,
          margin = _props.margin,
          containerPadding = _props.containerPadding,
          containerWidth = _props.containerWidth,
          cols = _props.cols;

      return (containerWidth - margin[0] * (cols - 1) - containerPadding[0] * 2) / cols;
    }

    /**
     * Return position on the page given an x, y, w, h.
     * left, top, width, height are all in pixels.
     * @param  {Number}  x             X coordinate in grid units.
     * @param  {Number}  y             Y coordinate in grid units.
     * @param  {Number}  w             W coordinate in grid units.
     * @param  {Number}  h             H coordinate in grid units.
     * @return {Object}                Object containing coords.
     */

  }, {
    key: 'calcPosition',
    value: function calcPosition(x, y, w, h, state) {
      var _props2 = this.props,
          margin = _props2.margin,
          containerPadding = _props2.containerPadding,
          rowHeight = _props2.rowHeight;

      var colWidth = this.calcColWidth();

      var out = {
        left: Math.round((colWidth + margin[0]) * x + containerPadding[0]),
        top: Math.round((rowHeight + margin[1]) * y + containerPadding[1]),
        // 0 * Infinity === NaN, which causes problems with resize constraints;
        // Fix this if it occurs.
        // Note we do it here rather than later because Math.round(Infinity) causes deopt
        width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * margin[0]),
        height: h === Infinity ? h : Math.round(rowHeight * h + Math.max(0, h - 1) * margin[1])
      };

      if (state && state.resizing) {
        out.width = Math.round(state.resizing.width);
        out.height = Math.round(state.resizing.height);
      }

      if (state && state.dragging) {
        out.top = Math.round(state.dragging.top);
        out.left = Math.round(state.dragging.left);
      }

      return out;
    }

    /**
     * Translate x and y coordinates from pixels to grid units.
     * @param  {Number} top  Top position (relative to parent) in pixels.
     * @param  {Number} left Left position (relative to parent) in pixels.
     * @return {Object} x and y in grid units.
     */

  }, {
    key: 'calcXY',
    value: function calcXY(top, left) {
      var _props3 = this.props,
          margin = _props3.margin,
          cols = _props3.cols,
          rowHeight = _props3.rowHeight,
          w = _props3.w,
          h = _props3.h,
          maxRows = _props3.maxRows;

      var colWidth = this.calcColWidth();

      // left = colWidth * x + margin * (x + 1)
      // l = cx + m(x+1)
      // l = cx + mx + m
      // l - m = cx + mx
      // l - m = x(c + m)
      // (l - m) / (c + m) = x
      // x = (left - margin) / (coldWidth + margin)
      var x = Math.round((left - margin[0]) / (colWidth + margin[0]));
      var y = Math.round((top - margin[1]) / (rowHeight + margin[1]));

      // Capping
      x = Math.max(Math.min(x, cols - w), 0);
      y = Math.max(Math.min(y, maxRows - h), 0);

      return { x: x, y: y };
    }

    /**
     * Given a height and width in pixel values, calculate grid units.
     * @param  {Number} height Height in pixels.
     * @param  {Number} width  Width in pixels.
     * @return {Object} w, h as grid units.
     */

  }, {
    key: 'calcWH',
    value: function calcWH(_ref2) {
      var height = _ref2.height,
          width = _ref2.width;
      var _props4 = this.props,
          margin = _props4.margin,
          maxRows = _props4.maxRows,
          cols = _props4.cols,
          rowHeight = _props4.rowHeight,
          x = _props4.x,
          y = _props4.y;

      var colWidth = this.calcColWidth();

      // width = colWidth * w - (margin * (w - 1))
      // ...
      // w = (width + margin) / (colWidth + margin)
      var w = Math.round((width + margin[0]) / (colWidth + margin[0]));
      var h = Math.round((height + margin[1]) / (rowHeight + margin[1]));

      // Capping
      w = Math.max(Math.min(w, cols - x), 0);
      h = Math.max(Math.min(h, maxRows - y), 0);
      return { w: w, h: h };
    }

    /**
     * This is where we set the grid item's absolute placement. It gets a little tricky because we want to do it
     * well when server rendering, and the only way to do that properly is to use percentage width/left because
     * we don't know exactly what the browser viewport is.
     * Unfortunately, CSS Transforms, which are great for performance, break in this instance because a percentage
     * left is relative to the item itself, not its container! So we cannot use them on the server rendering pass.
     *
     * @param  {Object} pos Position object with width, height, left, top.
     * @return {Object}     Style object.
     */

  }, {
    key: 'createStyle',
    value: function createStyle(pos) {
      var _props5 = this.props,
          usePercentages = _props5.usePercentages,
          containerWidth = _props5.containerWidth,
          useCSSTransforms = _props5.useCSSTransforms;


      var style = void 0;
      // CSS Transforms support (default)
      if (useCSSTransforms) {
        style = setTransform(pos);
      }
      // top,left (slow)
      else {
          style = setTopLeft(pos);

          // This is used for server rendering.
          if (usePercentages) {
            style.left = perc(pos.left / containerWidth);
            style.width = perc(pos.width / containerWidth);
          }
        }

      return style;
    }

    /**
     * Mix a Draggable instance into a child.
     * @param  {Element} child    Child element.
     * @return {Element}          Child wrapped in Draggable.
     */

  }, {
    key: 'mixinDraggable',
    value: function mixinDraggable(child) {
      return React.createElement(
        DraggableCore,
        {
          onStart: this.onDragHandler('onDragStart'),
          onDrag: this.onDragHandler('onDrag'),
          onStop: this.onDragHandler('onDragStop'),
          handle: this.props.handle,
          cancel: ".react-resizable-handle" + (this.props.cancel ? "," + this.props.cancel : "") },
        child
      );
    }

    /**
     * Mix a Resizable instance into a child.
     * @param  {Element} child    Child element.
     * @param  {Object} position  Position object (pixel values)
     * @return {Element}          Child wrapped in Resizable.
     */

  }, {
    key: 'mixinResizable',
    value: function mixinResizable(child, position) {
      var _props6 = this.props,
          cols = _props6.cols,
          x = _props6.x,
          minW = _props6.minW,
          minH = _props6.minH,
          maxW = _props6.maxW,
          maxH = _props6.maxH;

      // This is the max possible width - doesn't go to infinity because of the width of the window

      var maxWidth = this.calcPosition(0, 0, cols - x, 0).width;

      // Calculate min/max constraints using our min & maxes
      var mins = this.calcPosition(0, 0, minW, minH);
      var maxes = this.calcPosition(0, 0, maxW, maxH);
      var minConstraints = [mins.width, mins.height];
      var maxConstraints = [Math.min(maxes.width, maxWidth), Math.min(maxes.height, Infinity)];
      return React.createElement(
        Resizable,
        {
          width: position.width,
          height: position.height,
          minConstraints: minConstraints,
          maxConstraints: maxConstraints,
          onResizeStop: this.onResizeHandler('onResizeStop'),
          onResizeStart: this.onResizeHandler('onResizeStart'),
          onResize: this.onResizeHandler('onResize') },
        child
      );
    }

    /**
     * Wrapper around drag events to provide more useful data.
     * All drag events call the function with the given handler name,
     * with the signature (index, x, y).
     *
     * @param  {String} handlerName Handler name to wrap.
     * @return {Function}           Handler function.
     */

  }, {
    key: 'onDragHandler',
    value: function onDragHandler(handlerName) {
      var _this2 = this;

      return function (e, _ref3) {
        var node = _ref3.node,
            deltaX = _ref3.deltaX,
            deltaY = _ref3.deltaY;

        if (!_this2.props[handlerName]) return;

        var newPosition = { top: 0, left: 0 };

        // Get new XY
        switch (handlerName) {
          case 'onDragStart':
            {
              // ToDo this wont work on nested parents
              var parentRect = node.offsetParent.getBoundingClientRect();
              var clientRect = node.getBoundingClientRect();
              newPosition.left = clientRect.left - parentRect.left;
              newPosition.top = clientRect.top - parentRect.top;
              _this2.setState({ dragging: newPosition });
              break;
            }
          case 'onDrag':
            if (!_this2.state.dragging) throw new Error('onDrag called before onDragStart.');
            newPosition.left = _this2.state.dragging.left + deltaX;
            newPosition.top = _this2.state.dragging.top + deltaY;
            _this2.setState({ dragging: newPosition });
            break;
          case 'onDragStop':
            if (!_this2.state.dragging) throw new Error('onDragEnd called before onDragStart.');
            newPosition.left = _this2.state.dragging.left;
            newPosition.top = _this2.state.dragging.top;
            _this2.setState({ dragging: null });
            break;
          default:
            throw new Error('onDragHandler called with unrecognized handlerName: ' + handlerName);
        }

        var _calcXY = _this2.calcXY(newPosition.top, newPosition.left),
            x = _calcXY.x,
            y = _calcXY.y;

        _this2.props[handlerName](_this2.props.i, x, y, { e: e, node: node, newPosition: newPosition });
      };
    }

    /**
     * Wrapper around drag events to provide more useful data.
     * All drag events call the function with the given handler name,
     * with the signature (index, x, y).
     *
     * @param  {String} handlerName Handler name to wrap.
     * @return {Function}           Handler function.
     */

  }, {
    key: 'onResizeHandler',
    value: function onResizeHandler(handlerName) {
      var _this3 = this;

      return function (e, _ref4) {
        var node = _ref4.node,
            size = _ref4.size;

        if (!_this3.props[handlerName]) return;
        var _props7 = _this3.props,
            cols = _props7.cols,
            x = _props7.x,
            i = _props7.i,
            maxW = _props7.maxW,
            minW = _props7.minW,
            maxH = _props7.maxH,
            minH = _props7.minH;

        // Get new XY

        var _calcWH = _this3.calcWH(size),
            w = _calcWH.w,
            h = _calcWH.h;

        // Cap w at numCols


        w = Math.min(w, cols - x);
        // Ensure w is at least 1
        w = Math.max(w, 1);

        // Min/max capping
        w = Math.max(Math.min(w, maxW), minW);
        h = Math.max(Math.min(h, maxH), minH);

        _this3.setState({ resizing: handlerName === 'onResizeStop' ? null : size });

        _this3.props[handlerName](i, w, h, { e: e, node: node, size: size });
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props8 = this.props,
          x = _props8.x,
          y = _props8.y,
          w = _props8.w,
          h = _props8.h,
          isDraggable = _props8.isDraggable,
          isResizable = _props8.isResizable,
          useCSSTransforms = _props8.useCSSTransforms;


      var pos = this.calcPosition(x, y, w, h, this.state);
      var child = React.Children.only(this.props.children);

      // Create the child element. We clone the existing element but modify its className and style.
      var newChild = React.cloneElement(child, {
        className: classNames('react-grid-item', child.props.className, this.props.className, {
          static: this.props.static,
          resizing: Boolean(this.state.resizing),
          'react-draggable': isDraggable,
          'react-draggable-dragging': Boolean(this.state.dragging),
          cssTransforms: useCSSTransforms
        }),
        // We can set the width and height on the child, but unfortunately we can't set the position.
        style: _extends({}, this.props.style, child.props.style, this.createStyle(pos))
      });

      // Resizable support. This is usually on but the user can toggle it off.
      if (isResizable) newChild = this.mixinResizable(newChild, pos);

      // Draggable support. This is always on, except for with placeholders.
      if (isDraggable) newChild = this.mixinDraggable(newChild);

      return newChild;
    }
  }]);

  return GridItem;
}(React.Component);

GridItem.propTypes = {
  // Children must be only a single element
  children: PropTypes.element,

  // General grid attributes
  cols: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  margin: PropTypes.array.isRequired,
  maxRows: PropTypes.number.isRequired,
  containerPadding: PropTypes.array.isRequired,

  // These are all in grid units
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired,

  // All optional
  minW: function minW(props, propName) {
    var value = props[propName];
    if (typeof value !== 'number') return new Error('minWidth not Number');
    if (value > props.w || value > props.maxW) return new Error('minWidth larger than item width/maxWidth');
  },

  maxW: function maxW(props, propName) {
    var value = props[propName];
    if (typeof value !== 'number') return new Error('maxWidth not Number');
    if (value < props.w || value < props.minW) return new Error('maxWidth smaller than item width/minWidth');
  },

  minH: function minH(props, propName) {
    var value = props[propName];
    if (typeof value !== 'number') return new Error('minHeight not Number');
    if (value > props.h || value > props.maxH) return new Error('minHeight larger than item height/maxHeight');
  },

  maxH: function maxH(props, propName) {
    var value = props[propName];
    if (typeof value !== 'number') return new Error('maxHeight not Number');
    if (value < props.h || value < props.minH) return new Error('maxHeight smaller than item height/minHeight');
  },

  // ID is nice to have for callbacks
  i: PropTypes.string.isRequired,

  // Functions
  onDragStop: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onResizeStop: PropTypes.func,
  onResizeStart: PropTypes.func,
  onResize: PropTypes.func,

  // Flags
  isDraggable: PropTypes.bool.isRequired,
  isResizable: PropTypes.bool.isRequired,
  static: PropTypes.bool,

  // Use CSS transforms instead of top/left
  useCSSTransforms: PropTypes.bool.isRequired,

  // Others
  className: PropTypes.string,
  // Selector for draggable handle
  handle: PropTypes.string,
  // Selector for draggable cancel (see react-draggable)
  cancel: PropTypes.string
};
GridItem.defaultProps = {
  className: '',
  cancel: '',
  minH: 1,
  minW: 1,
  maxH: Infinity,
  maxW: Infinity
};
export default GridItem;