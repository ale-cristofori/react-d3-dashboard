import React, { useEffect } from 'react';
import { scaleLinear, max, line, select, path, selectAll } from 'd3';
import { lineChartData } from '../../testData';

const lineTileTextStyle = {
    fontSize: "1px", 
    fontFamily: "verdana",
    fontWeight: "bold"
}

const amimateLine = (margin, currentLine, selectedData, lineColour) => {
    const width = 500 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;
    const xScale = scaleLinear()
    .domain([0, selectedData.length - 1])
    .range([0, width]);

    const yScale = scaleLinear()
        .domain([0, max(selectedData, d => d.measure)])
        .range([height, 0]);

    const lineDefinition = line()
            .x((d, i) => xScale(i) * 0.10)
            .y(d => yScale(d.measure) * 0.10);
    const points = selectedData.map( (item, index) => { return {x: (xScale(index) * 0.10), y: (yScale(item.measure) * 0.10)}})
    const newLinePath = lineDefinition(selectedData);
    currentLine.transition()
        .duration(650)
        .attr("d", newLinePath)
        .attr("stroke", lineColour)
    
    points.map((point) => {
        select(".line")
        .append("circle")
        .attr("cx", point.x)
        .attr("cy", point.y)
        .attr("r", 0.5)
        .attr("fill", "red");
    });
};

const Dot = (props) => {

    const {selectedData, margin} = props;


    // const xScale = scaleLinear()
    // .domain([0, 1])
    // .range([0, width]);

    // const yScale = scaleLinear()
    //     .domain([0, max(selectedData.measure)])
    //     .range([height, 0]);
        
    // const circleDefinition = line()
    //         .x((d, i) => xScale(i) * 0.10)
    //         .y(d => yScale(d.measure) * 0.10);

    const dots = selectedData.map(datum => <circle fill="blue" cx={3} cy={10} r={1}></circle>) 
    return dots
}

const Line = (props) => {

    const { margin, lineColour, selectedData } = props;
    const lineRef = React.createRef();
    const width = 500 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;

    // const dots = selectedData.map((datum) =>
    // <Dot datum={datum} margin={margin}/>);

    useEffect(() => {


        const currentLine = select(lineRef.current);
        amimateLine(margin, currentLine, selectedData, lineColour);
    });

    return(
        <g className="line">
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
            {/* <Dot className="dot" margin={margin} selectedData={selectedData} /> */}
            {/* <text style={lineTileTextStyle}>here the line component</text> */}
        </g>);

};

export default LineChart;