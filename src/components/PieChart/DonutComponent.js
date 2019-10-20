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
    

    const colorScale = scaleOrdinal(schemeCategory10);

    const onClickSlice = (label, fill, value) => {
        setDonutTitle(label);
        setSelectedCount(value.data);
        setTextFill(fill);
    }

    const onMouseOverSlice = (index) => {
    }

    const renderSlice = (measure, i) => {
        
        return(
        <SliceComponent 
            key={i}
            index={i}
            value={measure}
            label={DonutChartData[i].category}
            fill={colorScale(i)}
            onClickSlice={onClickSlice}
            onMouseOverSlice={onMouseOverSlice}/>
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
        {donutTitle && <tspan dy="0em" dx="4.36em">{donutTitle}</tspan>}
        {selectedCount && <tspan dy="1.2em" dx="-2.35em">{selectedCount * 100}%</tspan>}
        </text>
        </g>
    )
}

export default DonutComponent

