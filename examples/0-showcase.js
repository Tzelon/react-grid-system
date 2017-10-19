import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ReactGridLayout, { Responsive, WidthProvider } from 'react-grid-system';
import randomstring from 'randomstring';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { widgetFactory } from '../src/WidgetFactory';
const Demo = (props) => {
  return (
    <div>
      Hello Im Demoe
    </div>
  );

};

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

export default class ShowcaseLayout extends React.Component {
  static propTypes = {
    onLayoutChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function () {
    },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    initialLayout: generateLayout(),
  };

  state = {
    currentBreakpoint: 'xxs',
    mounted: false,
    layout: [
            { i: this.generateRandomKey(), x: 0, y: 1, w: 5, h: 3, itemSizes: [[5, 3], [4, 4]], type:"Line" },
            { i: this.generateRandomKey(), x: 5, y: 1, w: 4, h: 4, itemSizes: [[5, 3], [4, 4]], type:"Bar" },
            { i: this.generateRandomKey(), x: 9, y: 1, w: 4, h: 4, itemSizes: [[5, 3], [4, 4]], type:"Bar" },
            { i: this.generateRandomKey(), x: 9, y: 1, w: 4, h: 4, itemSizes: [[5, 3], [4, 4]], type:"Bar" },
            { i: this.generateRandomKey(), x: 15, y: 1, w: 4, h: 4, itemSizes: [[5, 3], [4, 4]], type:"Bar" },
          ],
  };

  /**
  * 52(chars) ^ 4 = 7,311,616 options
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


renderBoxes() {
  const layouts = this.state.layout.map((box) => widgetFactory(box, data) )
  return layouts;
}

  onBreakpointChange = (breakpoint) => {
    this.setState({
      currentBreakpoint: breakpoint,
    });
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
  };

  render() {
    return (
      <div>
        <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={true}
          useCSSTransforms={false}
          verticalCompact={false}
          margin={[5, 5]}
          rowHeight={85}
          isResizable={false}
          width={2705}
          cols={30}
        >
        {this.renderBoxes()}
        </ReactGridLayout >
      </div>
    );
  }
}



function generateLayout() {
  return _.map(_.range(0, 2), function (item, i) {
    const y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: _.random(0, 5) * 2 % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05,
      itemSizes: [
        [1, 1],
        [2, 2],
        [3, 4],
      ],
    };
  });
}
