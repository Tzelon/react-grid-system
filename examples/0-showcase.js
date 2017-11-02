import React from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout, { Responsive, WidthProvider } from 'react-grid-system';
import randomstring from 'randomstring';
import { widgetFactory } from '../src/WidgetFactory';

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];


const dataRadialBar = [
  {name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8'},
  {name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed'},
  {name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1'},
  {name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d'},
  {name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c'},
  {name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57'},
  {name: 'unknow', uv: 6.67, pv: 4800, fill: '#ffc658'}
];

export default class ShowcaseLayout extends React.Component {
  static propTypes = {
    onLayoutChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: "layout",
    rowHeight: 85,
    columns: 20,
    maxRows: 10,
    rowWidth: function() {
      return Math.floor((window.innerWidth || document.documentElement.offsetWidth) / this.columns )
    },
    onLayoutChange: function () {
    },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    showGrid: true,
  };

  state = {
    currentBreakpoint: 'xxs',
    mounted: false,
    widgets: [
            { i: this.generateRandomKey(), x: 0, y: 0, w: 5, h: 4, itemSizes: [[5, 3], [4, 4]], type:"Line", rowWidth:this.props.rowWidth(), rowHeight: this.props.rowHeight, margin: [5, 5], data: data },
            { i: this.generateRandomKey(), x: 6, y: 0, w: 4, h: 4, itemSizes: [[5, 3], [4, 4]], type:"Bar", rowWidth:this.props.rowWidth(), rowHeight: this.props.rowHeight, margin: [5, 5] , data: data },
            { i: this.generateRandomKey(), x: 11, y: 0, w: 4, h: 4, itemSizes: [[5, 3], [4, 4]], type:"LineBarArea", rowWidth:this.props.rowWidth(), rowHeight: this.props.rowHeight, margin: [5, 5], data: data },
          ],
  };

  /**
  * 52(chars) for 4 number = a lot... :-)
  **/
  generateRandomKey() {
    return randomstring.generate({
      length: 4,
      charset: 'alphabetic'
    });
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  /**
   * Add divs to the background that presents the grid
   * that the widgets can be placed on.
   * @param iHeight - row height
   * @param iWidth - row width
   */
  paintGrid(iHeight, iWidth) {
    const ratioW = Math.floor((window.innerWidth || document.documentElement.offsetWidth) / iWidth ),
        ratioH = Math.floor((window.innerHeight || document.documentElement.offsetHeight) / iHeight );

    const parent = document.createElement('div');
    parent.className = 'grid';
    parent.style.width = (ratioW * iWidth) + 'px';
    parent.style.height = (ratioH * iHeight) + 'px';

    for (let i = 0; i < ratioH; i++) {
        for (let p = 0; p < ratioW; p++) {
            const cell = document.createElement('div');
            cell.style.height = (iHeight - 1) + 'px';
            cell.style.width = (iWidth - 1) + 'px';
            parent.appendChild(cell);
        }
    }

    document.body.appendChild(parent);
}


  /**
   * return array of the widgets that will be present on the page
   */
  renderBoxes() {
    return this.state.widgets.map((box) => widgetFactory(box));
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
    this.setState({widgets: filterdLayoutsList });
  };

  render() {
    if(this.props.showGrid) {
      this.paintGrid(this.props.rowHeight, this.props.rowWidth());
    }

    return (
      <div>
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
          handleRemoveItem = {this.onRemoveItem.bind(this)}
        >
        {this.renderBoxes()}
        </ReactGridLayout >
      </div>
    );
  }
}


