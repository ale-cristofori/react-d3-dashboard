import React, { useState, useEffect } from "react";
import { arc } from "d3-shape";
import { select } from "d3";


const animateSlice = (sliceRef, slice, innerRadius, outerRadius) => {
    const el = select(sliceRef.current);
    const arcFinal3 = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(slice.startAngle)
        .endAngle(slice.endAngle);
    el.select("path")
        .transition()
        .duration(600)
        .attr("d", arcFinal3);
};

const sliceTextStyle = {
  fontSize: "1px",
  fontFamily: "verdana",
  fontWeight: "bold"
};

const SliceComponent = props => {
    const sliceRef = React.createRef();
    const [hoveredSlice, setHoveredSlice] = useState(null);
    const [unHoveredSlice, setUnHoveredSlice] = useState(null);

    const angle = value => {
        let a = ((value.startAngle + value.endAngle) * 90) / Math.PI - 90;
        return a > 90 ? a - 180 : a;
    };

    const outerRadius = 15;
    const innerRadius = (outerRadius / 2);
  
    const { index, value, fill, label, onClickSlice } = props;

    const sliceArc = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    
    useEffect(() => {
        if (hoveredSlice !== null) {
            const selectedInnerRadius = (outerRadius * 0.40);
            animateSlice(sliceRef, hoveredSlice, selectedInnerRadius, outerRadius);
       } 
       setUnHoveredSlice(null);
    }, [hoveredSlice, sliceRef]);

    useEffect(() => {
        if (unHoveredSlice !== null) {
            animateSlice(sliceRef, unHoveredSlice, innerRadius, outerRadius);
        }
        setHoveredSlice(null);
    }, [unHoveredSlice, sliceRef, innerRadius]);
    
    return (
    <g
      onClick={()=> onClickSlice(label, fill, value)}
      onMouseEnter={() => setHoveredSlice(value)}
      onMouseLeave={() => setUnHoveredSlice(value)}
      ref={sliceRef}
      index={index}>
      <path d={sliceArc(value)} fill={fill} />
      <text
        transform={`translate(${sliceArc.centroid(value)}) rotate(${angle(
          value
        )})`}
        dy=".35em"
        textAnchor="middle"
        fill="white"
        style={sliceTextStyle}>
        {label}
      </text>
    </g>
  );
};

export default SliceComponent;
