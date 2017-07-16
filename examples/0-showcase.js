import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ReactGridLayout, { Responsive, WidthProvider } from 'react-grid-system';
const Demo = (props) => {
  console.log(props);
  return (
    <div>
      Hello Im Demoe
    </div>
  );

};

export  default class ShowcaseLayout extends React.Component {

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
    currentBreakpoint: 'lg',
    mounted: false,
    layout: this.props.initialLayout,
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  generateDOM() {
    return _.map(this.state.layout, function (l, i) {
      return (
        <div key={i} className={l.static ? 'static' : ''} >
          {l.static ?
            <span className="text"
                  title="This item is static and cannot be removed or resized." >Static - {i}</span>
            : <span className="text" >{i}</span>
          }
        </div>);
    });
  }

  onBreakpointChange = (breakpoint) => {
    this.setState({
      currentBreakpoint: breakpoint,
    });
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
  };

  onNewLayout = () => {
    this.setState({
      layout: [
        { i: 'a', x: 0, y: 0, w: 1, h: 2, itemSizes: [[1, 1], [2, 2], [3, 4]] },
        { i: 'b', x: 1, y: 0, w: 3, h: 2, itemSizes: [[1, 1], [4, 4]] },
      ],
    });
  };

  render() {
    return (
      <div>
        <div>Current Breakpoint: {this.state.currentBreakpoint} ({this.props.cols[this.state.currentBreakpoint]}
          columns)
        </div>
        <button onClick={this.onNewLayout} >Generate New Layout</button>
        <ReactGridLayout
          {...this.props}
          layout={[
            { i: 'a', x: 0, y: 0, w: 1, h: 2, itemSizes: [[1, 1], [2, 2], [3, 4]] },
            { i: 'b', x: 1, y: 0, w: 3, h: 2, itemSizes: [[1, 1], [4, 4]] },
          ]}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={true}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={true}
          verticalCompact={false}
          margin={[5, 5]}
          rowHeight={85}
          isResizable={false}
          width={2705}
          cols={30}
        >
          <Demo key={'a'} />
          <Demo key={'b'} />
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
