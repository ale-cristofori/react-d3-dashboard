import React, {useState, useEffect} from 'react';
import { arc } from "d3-shape";
import { select } from 'd3';
import { SlowBuffer } from 'buffer';

const SliceComponent = (props) => {

    const sliceRef = React.createRef();
    const [innerRadius, setInnerRadius] = useState(15 / 1.8);
    const [innerRadiusSelected, setInnerRadiusSelected] = useState( 15* .45 );
    const [hoveredSlice, setHoveredSlice] = useState(null);
    const [unHoveredSlice, setUnHoveredSlice] = useState(null);
    const [outerRadius, setOuterRadius] = useState(15);


    const angle = (value) => {
        let a = (value.startAngle + value.endAngle) * 90 / Math.PI - 90;
        return a > 90 ? a -180 :a;  
    }

    let {
        index,
        value, 
        fill,
        label, 
        onClickSlice,
        onMouseOverSlice
    } = props;

    let sliceArc = arc().innerRadius(innerRadius).outerRadius(outerRadius);

    const animateSlice = (slice, innerRadius) => {
        const el = select(sliceRef.current);
        const arcFinal3 = arc().innerRadius(innerRadius).outerRadius(outerRadius)
        .startAngle(hoveredSlice.startAngle)
        .endAngle(hoveredSlice.endAngle);
        el.select("path")
        .transition()
          .duration(600)
          .attr("d", arcFinal3)
    }

    useEffect(() => {
        if (hoveredSlice !== null) {
            animateSlice(hoveredSlice, innerRadiusSelected);
        }
        setUnHoveredSlice(null);
    }, [hoveredSlice]);

    useEffect(() => {
        if (unHoveredSlice !== null) {
            animateSlice(unHoveredSlice, innerRadius);
        }
        setHoveredSlice(null);
    }, [unHoveredSlice]);

    return(
        <g onClick={(e) => onClickSlice(label, fill, value)} 
           onMouseEnter={(e) => {setHoveredSlice(value) ;onMouseOverSlice(index)} }
           onMouseLeave={(e) => setUnHoveredSlice(value)}
           ref={sliceRef}
           index={index}>
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