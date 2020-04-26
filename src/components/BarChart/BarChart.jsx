import React from 'react';
import { range, scaleOrdinal, scaleLinear, max } from 'd3';
import XAxis from './XAxis';
import YAxis from './YAxis';


const Bar = (props) => {
    const { x, y, width, height } = props;

    let style = {
        fill: "steelblue"
    };

    return(
    <g>
        <rect class="bar" style={style} x={x} y={y + 5} width={width} height={height} />
    </g>
    )
}

const BarChart = (props) => {

    const { positionX, positionY, width, height, data } = props;

    let margin = {top: 20, right: 20, bottom: 30, left: 45},
        barChartWidth = width - margin.left - margin.right,
        barChartHeight = height - margin.top - margin.bottom;

    let letters = data.map((d) => d.letter)
    //D3 mathy bits    
    let ticks = range(0, barChartWidth, (barChartWidth / data.length))
    let x = scaleOrdinal()
        .domain(letters)
        .range(ticks)
    let y = scaleLinear()
        .domain([0, max(data, (d) => d.measure)])
        .range([barChartHeight, 0])

    let bars = []
    let bottom = 450

    data.filter(datum => datum.group === "All").forEach((datum, index) => {
        bars.push(<Bar key={index} x={index * 8} y={0} width={7} height={(barChartHeight - y(datum.measure)) / 2} />)
    });

    return (
    <g transform={`translate(${positionX}, ${positionY}) scale(1, -1)`}>
        { bars }
    </g>
    );
}

  export default BarChart;