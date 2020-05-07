import React, { useState, useEffect } from 'react';
import { createUseStyles }  from "react-jss";
import {pieChartData, barChartData, lineChartData} from './testData';
import DonutComponent from './components/PieChart/DonutComponent';
import BarChart from './components/BarChart/BarChart';
import logo from './logo.svg';

const useStyles = createUseStyles({
  app : {
    textAlign: 'center'
  },
  appLogo : {
    animation: 'App-logo-spin infinite 20s linear',
    height: '40vmin',
    pointerEvents: 'none'
  },
  appHeader: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white'
  },
  appLink: {
    color: '#61dafb'
  },
  '@keyframes App-logo-spin': {
    from: {
        transform: 'rotate(0deg)'
    },
    to: {
        transform: 'rotate(360deg)'
    }
  }
});

const App = (props) => {
  const [selectedGroup, setSelectedGroup] = useState(() => barChartData.filter((datum) =>  datum.group === 'All'));
  const [selectedLine, setSelectedLine] = useState(lineChartData);
  const [barColour, setBarColour] = useState('steelblue');
  const classes = useStyles();

  function updateBarChart(group, colour) {
    setSelectedGroup(barChartData.filter((datum) => datum.group === group));
    setBarColour(colour);
  }

  return(
  <div>
    <svg viewBox="-2 -2 100 100" preserveAspectRatio="xMidYMid meet"> 
      <DonutComponent x={15} y={15} onChangeGroup={updateBarChart}/>
      <BarChart positionX={35} positionY={35} width={80} height={100} selectedGroup={selectedGroup} barColour={barColour}/>
    </svg>
  </div>
  );

};


export default App;
