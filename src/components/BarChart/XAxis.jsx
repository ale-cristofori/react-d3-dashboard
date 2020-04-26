import React from 'react';
import { range } from 'd3';

const XAxis = (props) => {

    const { x, labels, start, end } = props;

    let style = {
        stroke: "steelblue",
        strokeWidth: "1px"
    }
    
    let step = (start + end / labels.length)
    
    //D3 mathy bits   
    let ticks = range(start, end, step)
    
    let lines = []
    ticks.forEach((tick, index) => {
    lines.push(<line style={style} x1={tick + 10 } y1={x} x2={tick + 10} y2={x + 4}  />)
    })
    
    let columnLables = []
    ticks.forEach((tick, index) => {
    columnLables.push(<text style={{fill: "steelblue"}} x={tick + 5} y={x + 20} font-family="Verdana" font-size="16">{labels[index]}</text>)
    })
    

    return(
    <g>
        <line x1={start} y1={x } x2={end} y2={x} style={ style } />
        { columnLables }
        { lines }
    </g>
    )
}

export default XAxis;