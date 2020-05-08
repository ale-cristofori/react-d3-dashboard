import React, { useEffect } from 'react';
import { range, scaleOrdinal, scaleLinear, max, select } from 'd3';
import { barChartData } from '../../testData';

const Bar = (props) => {
    const barRef = React.createRef();
    const rectRef = React.createRef();
    const { x, y, width, height, colour } = props;

    const animateRect = () => {
        const rect = select(rectRef.current);
        rect.transition()
            .duration(650)
            .attr("height", height)
            .attr("fill", colour)
    }

    useEffect(() => {
        animateRect();
    }, [height, colour]);


    return(
    <g className="bar" ref={barRef}>
        <rect x={x} y={y + 5} width={width} ref={rectRef}/>
    </g>
    )
}

const BarChart = (props) => {
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

    const selectedData = barChartData.filter((datum) =>  datum.group === selectedGroup);
    let y = scaleLinear()
        .domain([0, max(selectedData, (d) => d.measure)])
        .range([barChartHeight, 0]);
    
    const bars = selectedData.map((datum, index) => <Bar key={index} x={index * 8} y={0} width={7} height={(barChartHeight - y(datum.measure)) / 2} colour={barColour} />)
    
    return (
    <g transform={`translate(${positionX}, ${positionY}) scale(1, -1)`}>
        { bars }
    </g>
    );
}

  export default BarChart;