import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

export default class SimpleLineChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleClick = (e) => {
    console.log(e);
  };

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
        <LineChart width={width * this.props.rowWidth} height={height * this.props.rowHeight} data={this.props.data}
                   margin={{top: 25, right: 30, left: 20, bottom: 5}} >
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
          <Line type="monotone" dataKey="uv" stroke="#82ca9d"  onClick={this.handleClick}/>
        </LineChart>
      </div>
    );
  }
}
