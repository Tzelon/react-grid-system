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

const ROW_HEIGHT = 85;
const COLUMNS = 20;
const MAX_ROWS = 10;
const ROW_WIDTH =  Math.floor((window.innerWidth || document.documentElement.offsetWidth) / COLUMNS );

export default class ShowcaseLayout extends React.Component {
  static propTypes = {
    onLayoutChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: "layout",
    rowHeight: 20,
    onLayoutChange: function () {
    },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  };

  state = {
    currentBreakpoint: 'xxs',
    mounted: false,
    layout: [
            { i: this.generateRandomKey(), x: 0, y: 0, w: 5, h: 4, itemSizes: [[5, 3], [4, 4]], type:"Line", rowWidth:ROW_WIDTH, rowHeight: ROW_HEIGHT, margin: [0, 0] },
            { i: this.generateRandomKey(), x: 5, y: 1, w: 4, h: 4, itemSizes: [[5, 3], [4, 4]], type:"Bar", rowWidth:ROW_WIDTH, rowHeight: ROW_HEIGHT, margin: [5, 5] },
            // { i: this.generateRandomKey(), x: 9, y: 1, w: 4, h: 4, itemSizes: [[5, 3], [4, 4]], type:"Bar", rowWidth:ROW_WIDTH, rowHeight: ROW_HEIGHT, margin: [5, 5] },
            // { i: this.generateRandomKey(), x: 9, y: 1, w: 4, h: 4, itemSizes: [[5, 3], [4, 4]], type:"Bar" },
            // { i: this.generateRandomKey(), x: 15, y: 1, w: 4, h: 4, itemSizes: [[5, 3], [4, 4]], type:"Bar" },
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


  renderBoxes() {
    const layouts = this.state.layout.map((box) => widgetFactory(box, data))
    return layouts;
  }

  onBreakpointChange = (breakpoint) => {
    this.setState({
      currentBreakpoint: breakpoint,
    });
  }

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
  }

  render() {
    this.paintGrid(ROW_HEIGHT, ROW_WIDTH);

    return (
      <div>
        <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={true}
          // useCSSTransforms={false}
          verticalCompact={false}
          margin={[0, 0]}
          rowHeight={ROW_HEIGHT}
          rowWidth={ROW_WIDTH}
          isResizable={false}
          autoSize={false}
          maxRows={MAX_ROWS}
          cols={COLUMNS}
        >
        {this.renderBoxes()}
        </ReactGridLayout >
      </div>
    );
  }
}


