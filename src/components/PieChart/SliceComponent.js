import React, {useState, useEffect} from 'react';
import { arc } from "d3-shape";

const SliceComponent = (props) => {

    const sliceRef = React.createRef();
    

    const angle = (value) => {
        let a = (value.startAngle + value.endAngle) * 90 / Math.PI - 90;
        return a > 90 ? a -180 :a;  
    }

    let {
        value, 
        fill, 
        innerRadius, 
        outerRadius, 
        label, 
        onClickSlice, 
        onMouseOverSlice, 
        onMouseOutSlice
    } = props;

    let sliceArc = arc().innerRadius(innerRadius).outerRadius(outerRadius);

    return(
        <g onClick={(e) => onClickSlice(label, fill, value)} 
           onMouseOver={(e) => onMouseOverSlice(value)}
           onMouseOut={onMouseOutSlice}
           ref={sliceRef}>
          <path d={sliceArc(value)} fill={fill} />
          <text transform={`translate(${sliceArc.centroid(value)}) rotate(${angle(value)})`}
                dy=".35em"
                textAnchor="middle"
                fill="white"
                style={{
                    fontSize: "1px", 
                    fontFamily: "verdana", 
                    fontWeight: "bold"
                  }}>
                {label}
          </text>
        </g>
    )
}

export default SliceComponent;