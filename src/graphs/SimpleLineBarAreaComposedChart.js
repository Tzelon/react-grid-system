import React, { PureComponent } from 'react';
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class SimpleLineBarAreaComposedChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  extractItemSize = () => {
    const itemSize = this.props.itemSize;

    if(itemSize !== undefined) {
      const listOfSizes = itemSize.split('x').map(number => parseInt(number));
      return {width: listOfSizes[0], height: listOfSizes[1]}
    }

    return { width: this.props.width, height: this.props.height }
  };

  render() {
    const {width, height} = this.extractItemSize();

    return (
      <div key={this.props.key} >
        <ComposedChart  width={width * this.props.rowWidth} height={height * this.props.rowHeight} data={this.props.data}
                       margin={{top: 20, right: 20, bottom: 20, left: 20}}>
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip/>
          <Legend/>
          <CartesianGrid stroke='#f5f5f5'/>
          <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8'/>
          <Bar dataKey='pv' barSize={20} fill='#413ea0'/>
          <Line type='monotone' dataKey='uv' stroke='#ff7300'/>
        </ComposedChart>
      </div>
    );
  }
}
