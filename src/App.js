import React, {useState} from 'react';
import { createUseStyles }  from "react-jss";
import {pieChartData, barChartData, lineChartData} from './testData';
import DonutComponent from './components/PieChart/DonutComponent';
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
  const [selectedBar, setSelectedChart] = useState(barChartData);
  const [selectedLine, setSelectedLine] = useState(lineChartData);
  const classes = useStyles();
  return(
  <div>
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"> 
      <DonutComponent x={15} y={15} />
    </svg>
  </div>
  );
};


export default App;
