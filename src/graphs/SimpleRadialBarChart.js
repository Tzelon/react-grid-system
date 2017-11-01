import React, { PureComponent } from 'react';
import { RadialBar, RadialBarChart, Legend} from 'recharts';

export default class SimpleRadialBarChart  extends PureComponent {
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
          <RadialBarChart width={width * this.props.rowWidth} height={height * this.props.rowHeight} data={this.props.data} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10}>
            <RadialBar minAngle={15} label background clockWise={true} dataKey='uv'/>
            <Legend iconSize={10} width={width * this.props.rowWidth / 3}  height={height * this.props.rowHeight / 2} layout='vertical' verticalAlign='middle' wrapperStyle={
              { top: 0,
                left: 350,
                lineHeight: '24px'}}/>
          </RadialBarChart>
      </div>
    );
  }
}
