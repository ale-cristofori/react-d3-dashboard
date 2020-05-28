import React, { useEffect } from 'react';
import { scaleLinear, max, line, select, path, selectAll } from 'd3';
import { lineChartData } from '../../testData';

const lineTileTextStyle = {
    fontSize: "1px", 
    fontFamily: "verdana",
    fontWeight: "bold"
};

const amimateLine = (xScale, yScale, currentLine, lineColour, selectedData) => {

    const lineDefinition = line()
            .x((d, i) => xScale(i) * 0.10)
            .y(d => yScale(d.measure) * 0.10);
    
    const newLinePath = lineDefinition(selectedData);

    currentLine.transition()
        .duration(650)
        .attr("d", newLinePath)
        .attr("stroke", lineColour)
};

const animateDots = (xScale, yScale, dotsContainer, dotsColour, selectedData) => {

    const dotsCoords = selectedData.map( (item, index) => { return {x: (xScale(index) * 0.10), y: (yScale(item.measure) * 0.10)}});
    
    const dots = dotsContainer.selectAll('circle');
    
    dots.each(function (d, i) { 
        select(this)
        .transition()
        .duration(650)
        .attr("cx", dotsCoords[i].x)
        .attr("cy", dotsCoords[i].y) 
        .attr("fill", dotsColour)});
};

const Dot = (props) => {

    const {xScale, yScale, dotsColour, selectedData } = props;
    const dotsRef = React.createRef();
    useEffect(() => {
        const dotsContainer = select(dotsRef.current);
        animateDots(xScale, yScale, dotsContainer, dotsColour, selectedData);
    });
    
    const dots = selectedData.map((item, index) => <circle r={0.4}></circle>);

    return(
        <g ref={dotsRef}>
            {dots}
        </g>

    );
};

const Line = (props) => {

    const { xScale, yScale, lineColour, selectedData} = props;
    const lineRef = React.createRef();

    useEffect(() => {
        const currentLine = select(lineRef.current);
        amimateLine(xScale, yScale, currentLine, lineColour, selectedData);
    });

    return(
        <g>
            <path ref={lineRef} strokeWidth="0.3" fill="none"/>
        </g>

    );
};

const LineChart = (props) =>  {

    const { selectedGroup, lineColour, positionX, positionY } = props;
    const margin  = {top: 20, right: 10, bottom: 0, left: 50};
    const selectedData = lineChartData.filter((datum) =>  datum.group === selectedGroup);
    const width = 500 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;
    
    const xScale = scaleLinear()
    .domain([0, selectedData.length - 1])
    .range([0, width]);

    const yScale = scaleLinear()
        .domain([0, max(selectedData, d => d.measure)])
        .range([height, 0]);


    return(
        <g transform={`translate(${positionX}, ${positionY})`}>
            <Line xScale={xScale} yScale={yScale} lineColour={lineColour} selectedData={selectedData}/>
            <Dot  xScale={xScale} yScale={yScale} dotsColour={lineColour} selectedData={selectedData} />
        </g>);

};

export default LineChart;