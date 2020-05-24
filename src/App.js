import React, { useState } from 'react';
import { lineChartData } from './testData';
import DonutComponent from './components/PieChart/DonutComponent';
import BarChart from './components/BarChart/BarChart';

const App = (props) => {

  // React hooks with common state values for all components 
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedLine, setSelectedLine] = useState(lineChartData);
  const [groupColour, setGroupColour] = useState('lightgrey');

  //function that will hook into the state to change it 
  function updateBarChart(group, colour) {
    setSelectedGroup(group);
    setGroupColour(colour);
  }

  return(
  <div>
    <svg viewBox="-2 -2 100 100" preserveAspectRatio="xMidYMid meet"> 
      <DonutComponent x={15} y={15} onChangeGroup={updateBarChart}/>
      <BarChart positionX={35} positionY={35} width={80} height={100} selectedGroup={selectedGroup} barColour={groupColour}/>
    </svg>
  </div>
  );

};


export default App;
