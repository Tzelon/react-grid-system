import React, { PureComponent } from 'react';
import randomstring from 'randomstring';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const handleClick = (e) => {
	console.log(e);
};

class SimpleLineChart extends PureComponent {
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
	}


	render() {
		const {width, height} = this.extractItemSize()
		return (
			<div key={this.props.key} >
				<LineChart width={width * this.props.rowWidth} height={height * this.props.rowHeight} data={this.props.data}
				margin={{top: 20, right: 30, left: 20, bottom: 5}} > 
					<XAxis dataKey="name"/>
					<YAxis/>
					<CartesianGrid strokeDasharray="3 3"/>
					<Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
					<Line type="monotone" dataKey="uv" stroke="#82ca9d"  onClick={handleClick}/>
				</LineChart>
			</div>
		);
	}
}


class SimpleBarChart extends PureComponent {
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
	}

	render () {
		const {width, height} = this.extractItemSize()
		return (
			<div key={this.props.key}>
				<BarChart width={width * this.props.rowWidth} height={height * this.props.rowHeight} data={this.props.data}
				margin={{top: 5, right: 30, left: 20, bottom: 5}}>
					<XAxis dataKey="name"/>
					<YAxis/>
					<CartesianGrid strokeDasharray="3 3"/>
					<Tooltip/>
					<Legend />
					<Bar dataKey="pv" fill="#8884d8" />
					<Bar dataKey="uv" fill="#82ca9d" onClick={handleClick}/>
				</BarChart>
			</div>
		);
	}
}

export const widgetFactory = (widget, data) => {
	switch(widget.type) {
		case 'Line':
			return <SimpleLineChart key={widget.i} data={data} width={widget.w} height={widget.h} rowWidth={widget.rowWidth} rowHeight={widget.rowHeight} margin={widget.margin[0]} />;
		case 'Bar':
			return <SimpleBarChart key={widget.i} data={data} width={widget.w} height={widget.h} rowWidth={widget.rowWidth} rowHeight={widget.rowHeight} margin={widget.margin[0]}/>;
		default:
			return undefined;
	}
}

