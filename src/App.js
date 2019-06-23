import React, {useState} from 'react';
import injectSheet from "react-jss";
import {pieChartData, barChartData, lineChartData} from './testData';

import logo from './logo.svg';

const styles = theme => ({
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

const App = ({classes}) => {

  const [selectedPie, setSelectedPie] = useState(pieChartData);
  const [selectedBar, setSelectedChart] = useState(barChartData);
  const [selectedLine, setSelectedLine] = useState(lineChartData);

  

  return(
    <div className={classes.app}>
    <header className={classes.appHeader}>
      <img src={logo} className={classes.appLogo} alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className={classes.appLink}
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
  );

};


export default injectSheet(styles)(App);
