import React, {useState} from 'react';
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

let data = [
  {letter: 'A', frequency: .08167},
  {letter: 'B', frequency: .01492},
  {letter: 'C', frequency: .02782},
  {letter: 'D', frequency: .04253},
  {letter: 'E', frequency: .12702},
  {letter: 'F', frequency: .02288},
  {letter: 'G', frequency: .02015},
  {letter: 'H', frequency: .06094},
  {letter: 'I', frequency: .06966},
  {letter: 'J', frequency: .00153},
  {letter: 'K', frequency: .00772},
  {letter: 'L', frequency: .04025},
  {letter: 'M', frequency: .02406},
  {letter: 'N', frequency: .06749},
  {letter: 'O', frequency: .07507},
  {letter: 'P', frequency: .01929},
  {letter: 'Q', frequency: .00095},
  {letter: 'R', frequency: .05987},
  {letter: 'S', frequency: .06327},
  {letter: 'T', frequency: .09056},
  {letter: 'U', frequency: .02758},
  {letter: 'V', frequency: .00978},
  {letter: 'W', frequency: .02360},
  {letter: 'X', frequency: .00150},
  {letter: 'Y', frequency: .01974},
  {letter: 'Z', frequency: .00074}]

const App = (props) => {
  const [selectedBar, setSelectedChart] = useState(barChartData);
  const [selectedLine, setSelectedLine] = useState(lineChartData);
  const classes = useStyles();
  return(
  <div>
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"> 
      <DonutComponent x={15} y={15} />
      <BarChart positionX={35} positionY={35} width={80} height={100} data={barChartData}/>
    </svg>
  </div>
  );
};


export default App;
