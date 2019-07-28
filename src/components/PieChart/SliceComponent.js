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
        onClickSlice
    } = props;

    let sliceArc = arc().innerRadius(innerRadius).outerRadius(outerRadius);

    useEffect(() => {
        let arcFinal3;
        let el = select(sliceRef.current);
        if (hoveredSlice !== null) {
            arcFinal3 = arc().innerRadius(innerRadiusSelected).outerRadius(outerRadius)
            .startAngle(hoveredSlice.startAngle)
            .endAngle(hoveredSlice.endAngle);
            el.select("path")
            .transition()
              .duration(600)
              .attr("d", arcFinal3)
        }
        setHoveredSlice(null);
    }, [sliceRef, hoveredSlice, innerRadiusSelected, outerRadius]);

    useEffect(() => {
        let arcFinal3;
        let el = select(sliceRef.current);
        if (unHoveredSlice !== null) {
            arcFinal3 = arc().innerRadius(innerRadius).outerRadius(outerRadius)
            .startAngle(unHoveredSlice.startAngle)
            .endAngle(unHoveredSlice.endAngle);
            el.select("path")
            .transition()
              .duration(600)
              .attr("d", arcFinal3)
        }
        setUnHoveredSlice(null);
    }, [sliceRef, unHoveredSlice, innerRadius, outerRadius]);

    return(
        <g onClick={(e) => onClickSlice(label, fill, value)} 
           onMouseEnter={(e) => setHoveredSlice(value)}
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