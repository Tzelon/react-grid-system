import React, { PureComponent } from 'react';
import { SimpleBarChart, SimpleLineChart, SimpleLineBarAreaComposedChart, SimpleRadialBarChart } from './graphs';

export var widgetFactory = function widgetFactory(widget, size) {
  var props = {
    key: widget.i,
    data: widget.data,
    width: widget.w,
    height: widget.h,
    rowWidth: size.width,
    rowHeight: size.height
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