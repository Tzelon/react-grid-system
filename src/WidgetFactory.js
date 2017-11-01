import React, { PureComponent } from 'react';
import { SimpleBarChart, SimpleLineChart, SimpleLineBarAreaComposedChart, SimpleRadialBarChart } from './graphs';

export const widgetFactory = (widget) => {
  const props = {
    key: widget.i,
    data: widget.data,
    width: widget.w,
    height: widget.h,
    rowWidth: widget.rowWidth,
    rowHeight: widget.rowHeight,
    margin: widget.margin[0],
  };

  switch (widget.type) {
    case 'Line':
      return <SimpleLineChart {...props} />;
    case 'Bar':
      return <SimpleBarChart {...props}  />;
    case 'LineBarArea':
      return <SimpleLineBarAreaComposedChart {...props} />;
    case 'RadialBar':
      return <SimpleRadialBarChart {...props} />;
    default:
      return undefined;
  }
};
