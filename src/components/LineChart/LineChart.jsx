import React, { useEffect } from 'react';
import { scaleLinear, max, line, select, path } from 'd3';
import { lineChartData } from '../../testData';

const lineTileTextStyle = {
    fontSize: "1px", 
    fontFamily: "verdana",
    fontWeight: "bold"
}

const amimateLine = (currentLine, newLinePath, lineColour) => {
    currentLine.transition()
        .duration(650)
        .attr("d", newLinePath)
        .attr("stroke", lineColour);
};

const Dot = (props) => {

    const {datum, margin} = props;
    const width = 500 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;

    const xScale = scaleLinear()
    .domain([0, 1])
    .range([0, width]);

    const yScale = scaleLinear()
        .domain([0, max(datum.measure)])
        .range([height, 0]);
        
    const circleDefinition = line()
            .x((d, i) => xScale(i) * 0.10)
            .y(d => yScale(d.measure) * 0.10);

    return(
        <circle fill="blue" cx={circleDefinition.x()} cy={circleDefinition.y()}></circle>
    )
}

const Line = (props) => {

    const { margin, lineColour, selectedData } = props;
    const lineRef = React.createRef();
    const width = 500 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;

    const dots = selectedData.map((datum) =>
    <Dot datum={datum} margin={margin}/>);

    useEffect(() => {
        const xScale = scaleLinear()
        .domain([0, selectedData.length - 1])
        .range([0, width]);
    
        const yScale = scaleLinear()
            .domain([0, max(selectedData, d => d.measure)])
            .range([height, 0]);
    
        const lineDefinition = line()
                .x((d, i) => xScale(i) * 0.10)
                .y(d => yScale(d.measure) * 0.10);
        
        const currentLine = select(lineRef.current);
        const newLinePath = lineDefinition(selectedData);

        amimateLine(currentLine, newLinePath, lineColour);
    });

    return(
        <g>
            { dots }
            <path ref={lineRef} strokeWidth="0.3" fill="none"/>
        </g>

    );
};

const LineChart = (props) =>  {

    const { selectedGroup, lineColour, positionX, positionY } = props;
    const margin  = {top: 20, right: 10, bottom: 0, left: 50};
    const selectedData = lineChartData.filter((datum) =>  datum.group === selectedGroup);

    return(
        <g transform={`translate(${positionX}, ${positionY})`}>
            <Line margin={margin} lineColour={lineColour} selectedData={selectedData}/>
            {/* <text style={lineTileTextStyle}>here the line component</text> */}
        </g>);

};

export default LineChart;