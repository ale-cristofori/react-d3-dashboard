import React, { useEffect } from 'react';
import { scaleLinear, max, line, select} from 'd3';
import { lineChartData } from '../../testData';

const lineTileTextStyle = {
    fontSize: "1px", 
    fontFamily: "verdana",
    fontWeight: "bold"
}


const LineChart = (props) =>  {
    const { selectedGroup, lineColour, positionX, positionY } = props;
    const margin  = {top: 20, right: 10, bottom: 0, left: 50};
    const width = 500 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;

    const selectedData = lineChartData.filter((datum) =>  datum.group === selectedGroup);


    const xScale = scaleLinear()
                    .domain([0, selectedData.length - 1])
                    .range([0, width]);
    
    const yScale = scaleLinear()
                    .domain([0, max(selectedData, d => d.measure)])
                    .range([height, 0]);

    const lineElement = line()
                        .x((d, i) => xScale(i) * 0.10)
                        .y(d => yScale(d.measure) * 0.10);
    return(
        <g transform={`translate(${positionX}, ${positionY})`}>
            <path d={lineElement(selectedData)} stroke={lineColour} stroke-width="0.5" fill="none"/>
            <text style={lineTileTextStyle}>here the line component</text>
        </g>);

}

export default LineChart