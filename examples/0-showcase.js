import React from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout, { Responsive, WidthProvider } from 'react-grid-system';
import randomstring from 'randomstring';
import { widgetFactory } from '../src/WidgetFactory';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

export default class ShowcaseLayout extends React.Component {
  static propTypes = {
    onLayoutChange: PropTypes.func.isRequired,
    rowHeight: PropTypes.number,
    rowWidth: PropTypes.func,
    showGrid: PropTypes.bool,
    className: PropTypes.string,
    columns:  PropTypes.number,
    cols: PropTypes.object,
  };

  static defaultProps = {
    className: "layout",
    rowHeight: 85,
    columns: 20,
    maxRows: 10,
    rowWidth: function () {
      return Math.floor((window.innerWidth || document.documentElement.offsetWidth) / this.columns);
    },
    showGrid: false,
    onLayoutChange: function () {
    },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  };

  state = {
    currentBreakpoint: 'xxs',
    mounted: false,
    widgets: [
      {
        i: this.generateRandomKey(),
        x: 0,
        y: 0,
        w: 4,
        h: 4,
        itemSizes: [[5, 3], [4, 4]],
        type: "Line",
        data: data,
      },
      {
        i: this.generateRandomKey(),
        x: 6,
        y: 0,
        w: 4,
        h: 4,
        itemSizes: [[5, 3], [4, 4]],
        type: "Bar",
        data: data,
      },
      {
        i: this.generateRandomKey(),
        x: 11,
        y: 0,
        w: 4,
        h: 4,
        itemSizes: [[5, 3], [4, 4]],
        type: "LineBarArea",
        data: data,
      },
    ],
  };



  /**
   * 52(chars) for 4 number = a lot... :-)
   **/
  generateRandomKey() {
    return randomstring.generate({
      length: 4,
      charset: 'alphabetic',
    });
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }



  /**
   * return array of the widgets that will be present on the page
   */
  renderBoxes() {
    const size = {
      height: this.props.rowHeight,
      width: this.props.rowWidth()
    };
    return this.state.widgets.map((box) => widgetFactory(box, size));
  }

  onBreakpointChange = (breakpoint) => {
    this.setState({
      currentBreakpoint: breakpoint,
    });
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
  };

  /**
   * handle delete widget:
   * remove the widget with the current key from the list
   * @param key
   */
  onRemoveItem = (key) => {
    const filterdLayoutsList = this.state.widgets.filter(widget => widget.i !== key);
    this.setState({ widgets: filterdLayoutsList });
  };

  render() {
    return (
      <div className={this.props.showGrid ? 'grid-cube' : ''} style={ {'background-size':`${this.props.rowWidth()}px ${this.props.rowHeight}px`}}>
        <ReactGridLayout
          {...this.props}
          layout={this.state.widgets}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={true}
          // useCSSTransforms={false}
          verticalCompact={false}
          margin={[0, 0]}
          rowHeight={this.props.rowHeight}
          rowWidth={this.props.rowWidth()}
          isResizable={false}
          autoSize={false}
          maxRows={this.props.maxRows}
          cols={this.props.columns}
          handleRemoveItem={this.onRemoveItem.bind(this)}
        >
          {this.renderBoxes()}
        </ReactGridLayout>
      </div>
    );
  }
}


