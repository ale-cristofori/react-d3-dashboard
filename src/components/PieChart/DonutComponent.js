import React, {useState, useEffect} from 'react';
import { scaleOrdinal } from "d3-scale";
import { pie } from "d3-shape";
import { schemeCategory10 } from 'd3';

import { DonutChartData } from '../../testData';
import SliceComponent from './SliceComponent';



const DonutComponent = (props) => {

    const {x, y} = props;
    const [selectedDonut, setSelectedDonut] = useState(DonutChartData);
    const [donutTitle, setDonutTitle] = useState('');
    const [textFill, setTextFill] = useState('');
    const [selectedCount, setSelectedCount] = useState('');
    const [outerRadius, setOuterRadius] = useState(15);
    const [innerRadius, setInnerRadius] = useState(15 / 1.8);
    const [innerRadiusSelected, setInnerRadiusSelected] = useState( 15* .45 );
    const [hoveredSlice, setHoveredSlice] = useState(null);

    const colorScale = scaleOrdinal(schemeCategory10);
    const onClickSlice = () => {

    }
    const onMouseOverSlice = () => {

    }
    const onMouseOutSlice = () => {

    }
    const renderSlice = (measure, i) => {
        const sliceInnerRadius = hoveredSlice === i ? innerRadiusSelected : innerRadius;
        return(
        <SliceComponent 
            key={i}
            innerRadius={sliceInnerRadius}
            outerRadius={outerRadius} 
            value={measure}
            label={DonutChartData[i].category}
            fill={colorScale(i)}
            onClickSlice={onClickSlice}
            onMouseOverSlice={onMouseOverSlice}
            onMouseOutSlice={onMouseOutSlice}
            />
        );
    }

    useEffect(() => {

    });

    let pieChart = pie().sort(null);
    const measures = DonutChartData.map(item => item.measure);

    return(
        <g transform={`translate(${x}, ${y})`}>
          {pieChart(measures).map(renderSlice)}
        <text
            x="-4.2em"
            y="-.35em"
            textAnchor="middle"
            style={{fontSize: "2px", fontFamily: "verdana", fontWeight: "bold"}}
            fill={textFill}>
        {donutTitle && <tspan dy="0em" dx="5em">{donutTitle}</tspan>}
        {selectedCount && <tspan dy="1.2em" dx="-4.65em"> Total: {selectedCount}</tspan>}
        </text>
        </g>
    )
}

export default DonutComponent

