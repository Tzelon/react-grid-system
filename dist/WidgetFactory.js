import React, { PureComponent } from 'react';
import { SimpleBarChart, SimpleLineChart, SimpleLineBarAreaComposedChart, SimpleRadialBarChart } from './graphs';

export var widgetFactory = function widgetFactory(widget, data) {
  var props = {
    key: widget.i,
    data: data,
    width: widget.w,
    height: widget.h,
    rowWidth: widget.rowWidth,
    rowHeight: widget.rowHeight,
    margin: widget.margin[0]
  };

  switch (widget.type) {
    case 'Line':
      return React.createElement(SimpleLineChart, props);
    case 'Bar':
      return React.createElement(SimpleBarChart, props);
    case 'LineBarArea':
      return React.createElement(SimpleLineBarAreaComposedChart, props);
    case 'RadialBar':
      return React.createElement(SimpleRadialBarChart, props);
    default:
      return undefined;
  }
};