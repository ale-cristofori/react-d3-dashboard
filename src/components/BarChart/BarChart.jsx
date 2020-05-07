import React, { useState } from 'react';
import { range, scaleOrdinal, scaleLinear, max } from 'd3';
import XAxis from './XAxis';
import YAxis from './YAxis';


const Bar = (props) => {
    const { x, y, width, height, colour } = props;

    let style = {
        fill: colour
    };

    return(
    <g>
        <rect class="bar" style={style} x={x} y={y + 5} width={width} height={height} />
    </g>
    )
}

const BarChart = (props) => {

    //const [dataGroup, setDataGroup] = useState('All'); 

    const { positionX, positionY, width, height, selectedGroup, barColour } = props;

    let margin = {top: 20, right: 20, bottom: 30, left: 45},
        barChartWidth = width - margin.left - margin.right,
        barChartHeight = height - margin.top - margin.bottom;

    // let letters = data.map((d) => d.letter)
    // //D3 mathy bits    
    // let ticks = range(0, barChartWidth, (barChartWidth / data.length))
    // let x = scaleOrdinal()
    //     .domain(letters)
    //     .range(ticks)
    let y = scaleLinear()
        .domain([0, max(selectedGroup, (d) => d.measure)])
        .range([barChartHeight, 0])

    let bars = []
    let bottom = 450
    selectedGroup.forEach((datum, index) => {
        bars.push(<Bar key={index} x={index * 8} y={0} width={7} height={(barChartHeight - y(datum.measure)) / 2} colour={barColour}/>)
    });

    return (
    <g transform={`translate(${positionX}, ${positionY}) scale(1, -1)`}>
        { bars }
    </g>
    );
}

  export default BarChart;