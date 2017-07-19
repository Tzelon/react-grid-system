var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import classNames from 'classnames';
import { autoBindHandlers, bottom, childrenEqual, cloneLayoutItem, compact, getLayoutItem, moveElement, synchronizeLayoutWithChildren, validateLayout } from './utils';
import GridItem from './GridItemExtend';
var noop = function noop() {};

// Types

var _ref7 = _jsx('div', {});

// End Types

/**
 * A reactive, fluid grid layout with draggable, resizable components.
 */

var ReactGridLayout = function (_React$Component) {
  _inherits(ReactGridLayout, _React$Component);

  function ReactGridLayout(props, context) {
    _classCallCheck(this, ReactGridLayout);

    var _this = _possibleConstructorReturn(this, (ReactGridLayout.__proto__ || Object.getPrototypeOf(ReactGridLayout)).call(this, props, context));

    _this.state = {
      activeDrag: null,
      layout: synchronizeLayoutWithChildren(_this.props.layout, _this.props.children, _this.props.cols, _this.props.verticalCompact),
      mounted: false,
      oldDragItem: null,
      oldLayout: null,
      oldResizeItem: null
    };

    autoBindHandlers(_this, ['onDragStart', 'onDrag', 'onDragStop', 'onResizeStart', 'onResize', 'onResizeStop']);
    return _this;
  }
  // TODO publish internal ReactClass displayName transform


  _createClass(ReactGridLayout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ mounted: true });
      // Possibly call back with layout on mount. This should be done after correcting the layout width
      // to ensure we don't rerender with the wrong width.
      this.onLayoutMaybeChanged(this.state.layout, this.props.layout);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var newLayoutBase = void 0;
      // Allow parent to set layout directly.
      if (!isEqual(nextProps.layout, this.props.layout)) {
        newLayoutBase = nextProps.layout;
      }

      // If children change, also regenerate the layout. Use our state
      // as the base in case because it may be more up to date than
      // what is in props.
      else if (!childrenEqual(this.props.children, nextProps.children)) {
          newLayoutBase = this.state.layout;
        }

      // We need to regenerate the layout.
      if (newLayoutBase) {
        var newLayout = synchronizeLayoutWithChildren(newLayoutBase, nextProps.children, nextProps.cols, nextProps.verticalCompact);
        var _oldLayout = this.state.layout;
        this.setState({ layout: newLayout });
        this.onLayoutMaybeChanged(newLayout, _oldLayout);
      }
    }

    /**
     * Calculates a pixel value for the container.
     * @return {String} Container height in pixels.
     */

  }, {
    key: 'containerHeight',
    value: function containerHeight() {
      if (!this.props.autoSize) return;
      var nbRow = bottom(this.state.layout);
      var containerPaddingY = this.props.containerPadding ? this.props.containerPadding[1] : this.props.margin[1];
      return nbRow * this.props.rowHeight + (nbRow - 1) * this.props.margin[1] + containerPaddingY * 2 + 'px';
    }

    /**
     * When dragging starts
     * @param {String} i Id of the child
     * @param {Number} x X position of the move
     * @param {Number} y Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */

  }, {
    key: 'onDragStart',
    value: function onDragStart(i, x, y, _ref) {
      var e = _ref.e,
          node = _ref.node;
      var layout = this.state.layout;

      var l = getLayoutItem(layout, i);
      if (!l) return;

      this.setState({ oldDragItem: cloneLayoutItem(l), oldLayout: this.state.layout });

      this.props.onDragStart(layout, l, l, null, e, node);
    }

    /**
     * Each drag movement create a new dragelement and move the element to the dragged location
     * @param {String} i Id of the child
     * @param {Number} x X position of the move
     * @param {Number} y Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */

  }, {
    key: 'onDrag',
    value: function onDrag(i, x, y, _ref2) {
      var e = _ref2.e,
          node = _ref2.node;
      var oldDragItem = this.state.oldDragItem;
      var layout = this.state.layout;

      var l = getLayoutItem(layout, i);
      if (!l) return;

      // Create placeholder (display only)
      var placeholder = {
        w: l.w, h: l.h, x: l.x, y: l.y, placeholder: true, i: i
      };

      // Move the element to the dragged location.
      layout = moveElement(layout, l, x, y, true /* isUserAction */);

      this.props.onDrag(layout, oldDragItem, l, placeholder, e, node);

      this.setState({
        layout: compact(layout, this.props.verticalCompact),
        activeDrag: placeholder
      });
    }

    /**
     * When dragging stops, figure out which position the element is closest to and update its x and y.
     * @param  {String} i Index of the child.
     * @param {Number} x X position of the move
     * @param {Number} y Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */

  }, {
    key: 'onDragStop',
    value: function onDragStop(i, x, y, _ref3) {
      var e = _ref3.e,
          node = _ref3.node;
      var oldDragItem = this.state.oldDragItem;
      var layout = this.state.layout;

      var l = getLayoutItem(layout, i);
      if (!l) return;

      // Move the element here
      layout = moveElement(layout, l, x, y, true /* isUserAction */);

      this.props.onDragStop(layout, oldDragItem, l, null, e, node);

      // Set state
      var newLayout = compact(layout, this.props.verticalCompact);
      var oldLayout = this.state.oldLayout;

      this.setState({
        activeDrag: null,
        layout: newLayout,
        oldDragItem: null,
        oldLayout: null
      });

      this.onLayoutMaybeChanged(newLayout, oldLayout);
    }
  }, {
    key: 'onLayoutMaybeChanged',
    value: function onLayoutMaybeChanged(newLayout, oldLayout) {
      if (!oldLayout) oldLayout = this.state.layout;
      if (!isEqual(oldLayout, newLayout)) {
        this.props.onLayoutChange(newLayout);
      }
    }
  }, {
    key: 'onResizeStart',
    value: function onResizeStart(i, w, h, _ref4) {
      var e = _ref4.e,
          node = _ref4.node;
      var layout = this.state.layout;

      var l = getLayoutItem(layout, i);
      if (!l) return;

      this.setState({
        oldResizeItem: cloneLayoutItem(l),
        oldLayout: this.state.layout
      });

      this.props.onResizeStart(layout, l, l, null, e, node);
    }
  }, {
    key: 'onResize',
    value: function onResize(i, w, h, _ref5) {
      var e = _ref5.e,
          node = _ref5.node;
      var _state = this.state,
          layout = _state.layout,
          oldResizeItem = _state.oldResizeItem;

      var l = getLayoutItem(layout, i);
      if (!l) return;

      // Set new width and height.
      l.w = w;
      l.h = h;

      // Create placeholder element (display only)
      var placeholder = {
        w: w, h: h, x: l.x, y: l.y, static: true, i: i
      };

      this.props.onResize(layout, oldResizeItem, l, placeholder, e, node);

      // Re-compact the layout and set the drag placeholder.
      this.setState({
        layout: compact(layout, this.props.verticalCompact),
        activeDrag: placeholder
      });
    }
  }, {
    key: 'onResizeStop',
    value: function onResizeStop(i, w, h, _ref6) {
      var e = _ref6.e,
          node = _ref6.node;
      var _state2 = this.state,
          layout = _state2.layout,
          oldResizeItem = _state2.oldResizeItem;

      var l = getLayoutItem(layout, i);

      this.props.onResizeStop(layout, oldResizeItem, l, null, e, node);
      // Set state
      var newLayout = compact(layout, this.props.verticalCompact);
      var oldLayout = this.state.oldLayout;

      this.setState({
        activeDrag: null,
        layout: newLayout,
        oldResizeItem: null,
        oldLayout: null
      });

      this.onLayoutMaybeChanged(newLayout, oldLayout);
    }

    /**
     * Create a placeholder object.
     * @return {Element} Placeholder div.
     */

  }, {
    key: 'placeholder',
    value: function placeholder() {
      var activeDrag = this.state.activeDrag;

      if (!activeDrag) return null;
      var _props = this.props,
          width = _props.width,
          cols = _props.cols,
          margin = _props.margin,
          containerPadding = _props.containerPadding,
          rowHeight = _props.rowHeight,
          maxRows = _props.maxRows,
          useCSSTransforms = _props.useCSSTransforms;

      // {...this.state.activeDrag} is pretty slow, actually

      return _jsx(GridItem, {
        w: activeDrag.w,
        h: activeDrag.h,
        x: activeDrag.x,
        y: activeDrag.y,
        i: activeDrag.i,
        className: 'react-grid-placeholder',
        containerWidth: width,
        cols: cols,
        margin: margin,
        containerPadding: containerPadding || margin,
        maxRows: maxRows,
        rowHeight: rowHeight,
        isDraggable: false,
        isResizable: false,
        useCSSTransforms: useCSSTransforms
      }, void 0, _ref7);
    }

    /**
     * Given a grid item, set its style attributes & surround in a <Draggable>.
     * @param  {Element} child React element.
     * @return {Element}       Element wrapped in draggable and properly placed.
     */

  }, {
    key: 'processGridItem',
    value: function processGridItem(child) {
      if (!child.key) return;
      var l = getLayoutItem(this.state.layout, child.key);
      if (!l) return null;
      var _props2 = this.props,
          width = _props2.width,
          cols = _props2.cols,
          margin = _props2.margin,
          containerPadding = _props2.containerPadding,
          rowHeight = _props2.rowHeight,
          maxRows = _props2.maxRows,
          isDraggable = _props2.isDraggable,
          isResizable = _props2.isResizable,
          useCSSTransforms = _props2.useCSSTransforms,
          draggableCancel = _props2.draggableCancel,
          draggableHandle = _props2.draggableHandle;
      var mounted = this.state.mounted;

      // Parse 'static'. Any properties defined directly on the grid item will take precedence.

      var draggable = Boolean(!l.static && isDraggable && (l.isDraggable || l.isDraggable == null));
      var resizable = Boolean(!l.static && isResizable && (l.isResizable || l.isResizable == null));

      return _jsx(GridItem, {
        containerWidth: width,
        cols: cols,
        margin: margin,
        containerPadding: containerPadding || margin,
        maxRows: maxRows,
        rowHeight: rowHeight,
        cancel: draggableCancel,
        handle: draggableHandle,
        onDragStop: this.onDragStop,
        onDragStart: this.onDragStart,
        onDrag: this.onDrag,
        onResizeStart: this.onResizeStart,
        onResize: this.onResize,
        onResizeStop: this.onResizeStop,
        isDraggable: draggable,
        isResizable: resizable,
        useCSSTransforms: useCSSTransforms && mounted,
        usePercentages: !mounted,
        w: l.w,
        h: l.h,
        x: l.x,
        y: l.y,
        i: l.i,
        minH: l.minH,
        minW: l.minW,
        maxH: l.maxH,
        maxW: l.maxW,
        'static': l.static,
        itemSizes: l.itemSizes
      }, void 0, child);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          className = _props3.className,
          style = _props3.style;


      var mergedStyle = _extends({
        height: this.containerHeight()
      }, style);

      return _jsx('div', {
        className: classNames('react-grid-layout', className),
        style: mergedStyle
      }, void 0, React.Children.map(this.props.children, function (child) {
        return _this2.processGridItem(child);
      }), this.placeholder());
    }
  }]);

  return ReactGridLayout;
}(React.Component);

ReactGridLayout.displayName = "ReactGridLayout";
ReactGridLayout.defaultProps = {
  autoSize: true,
  cols: 12,
  className: '',
  rowHeight: 150,
  maxRows: Infinity, // infinite vertical growth
  layout: [],
  margin: [10, 10],
  isDraggable: true,
  isResizable: true,
  useCSSTransforms: true,
  verticalCompact: true,
  onLayoutChange: noop,
  onDragStart: noop,
  onDrag: noop,
  onDragStop: noop,
  onResizeStart: noop,
  onResize: noop,
  onResizeStop: noop
};
export default ReactGridLayout;