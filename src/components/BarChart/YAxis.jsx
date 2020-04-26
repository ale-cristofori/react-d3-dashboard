import React from 'react';
import { range, format } from 'd3';

const YAxis = (props) => {

    const { y, labels, start, end } = props;

    let style = {
        stroke: "steelblue",
        strokeWidth: "1px"
      }
      
      let textStyle = {
        fontSize: "0.8em",
        fill: "steelblue",
        textAnchor: "end"
      }

            //D3 mathy bits
            let ticks = range(0, end, (end / labels.length))
            let percentage = format(".0%")
            
            let lines = []
            ticks.forEach((tick, index) => {
              lines.push(<line style={style} y1={tick} x1={y} y2={tick} x2={y - 4}  />)
            })
            
            let columnLables = []
            ticks.forEach((tick, index) => {
              columnLables.push(<text style={ textStyle } y={tick + 6} x={y - 6} font-family="Verdana" >{percentage(labels[index])}</text>)
            })

      return(
        <g>
            <g className="y_labels">
            <line x1={y} y1={start} y2={end} x2={y} style={ style } />
            </g>
            <g className="y_labels" >
              { columnLables }
              { lines }
            </g>
        </g>
      )

};

export default YAxis;