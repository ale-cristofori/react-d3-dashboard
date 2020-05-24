import React, { useEffect } from 'react';
import { scaleLinear, max, select } from 'd3';
import { barChartData } from '../../testData';

const animateRect = (rectRef, height, colour, countTextRef) => {
    const rect = select(rectRef.current);
    rect.transition()
        .duration(650)
        .attr("height", (height + 0.5) )
        .attr("fill", colour)
    const text = select(countTextRef.current);
    text.transition()
        .duration(650)
        .attr("y", ((4 + height) * -1));
};

const barTextStyle = {
    fontSize: "1px", 
    fontFamily: "verdana"
}

const Bar = (props) => {
    const rectRef = React.createRef();
    const countTextRef = React.createRef();
    const { x, y, width, height, colour, count } = props;

    useEffect(() => {
        animateRect(rectRef, height, colour, countTextRef);
    });

    return(
    <g>
        <rect x={x} y={y + 5} width={width} ref={rectRef}/>
        <text x={x + 3.9} 
              transform="scale(1, -1)" 
              fill="white"
              textAnchor="middle" 
              style={barTextStyle}
              ref={countTextRef}>{Math.round(count)}</text>
    </g>
    )
}

//wrapper function for the bar chart to 
//render bars as ReactJs components
const BarChart = (props) => {
    const { positionX, positionY, height, selectedGroup, barColour } = props;

    const margin = {top: 20, right: 20, bottom: 30, left: 45};
    const barChartHeight = height - margin.top - margin.bottom;

    const selectedData = barChartData.filter((datum) =>  datum.group === selectedGroup);
    
    //labels that will appear under the bars (Oranges, Apples, etc.)
    const categoriesLabel = selectedData.map((datum, index) => 
    <text 
        key={index}
        x={(index * 8) + 3.5} 
        y={-3.5} 
        textAnchor="middle" 
        transform={`scale(1, -1)`}
        style={barTextStyle}>
        {datum.category}
    </text>);

    //Title above the bar chart
    const groupsLabel = (
    <text 
        x={12} 
        y={-34} 
        textAnchor="start" 
        transform={`scale(1, -1)`}
        style={barTextStyle}>
        {selectedData[0].group} Sales Breakdown 2012
    </text>);

    //d3 function that sizes the bars height according to data range    
    const y = scaleLinear()
        .domain([0, max(selectedData, (d) => d.measure)])
        .range([barChartHeight, 0]);
    
    //creation of bars components
    const bars = selectedData.map((datum, index) => 
    <Bar 
        key={index} 
        x={index * 8} 
        y={0} 
        width={7.8} 
        height={(barChartHeight - y(datum.measure)) / 2} 
        colour={barColour} 
        count={datum.measure} />)
    
    return (
    <g transform={`translate(${positionX}, ${positionY}) scale(1, -1)`}>
        { groupsLabel }
        { bars }
        { categoriesLabel }
    </g>
    );
}

export default BarChart;