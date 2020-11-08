import React from "react"
import "./component/fontawesome"
import './App.css';
import SetTimer from './component/SetTimer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const audio = document.getElementById("beep");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loop = undefined;
  }
  
  state = {
    breakCount : 5,
    sessionCount : 25,
    clockCount: 25 * 60,
    currentTimer : 'Session',
    isPlaying: false
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  handlePlayPause = () => {
    const { isPlaying } = this.state;

    if(isPlaying) {
      clearInterval(this.loop)

      this.setState({
        isPlaying: false
      });
    } else {
      this.setState({
        isPlaying: true
      });

      this.loop = setInterval(()=> {
        const { 
          clockCount, 
          currentTimer, 
          breakCount, 
          sessionCount 
        } = this.state;
        
        if(clockCount === 0) {
          this.setState({
            currentTimer: (currentTimer === 'Session') ? 'Break':'Session',
            clockCount : (currentTimer === 'Session') ? (breakCount * 60) : (sessionCount * 60)
          })

          audio.play();
          
        } else {
          this.setState({
            clockCount: clockCount - 1
          });
        }
      }, 1000);
    }
  }

  handleReset = () => {
    this.setState({
      breakCount : 5,
      sessionCount : 25,
      clockCount: 25 * 60,
      currentTimer : 'Session',
      isPlaying: false
    })

    clearInterval(this.loop);
    audio.pause();
    audio.currentTime = 0;
  }

  
  convertToTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;

    minutes = minutes < 10 ? ('0'+minutes) : minutes;
    seconds = seconds < 10 ? ('0'+seconds) : seconds;

    return `${minutes}:${seconds}`; 
  }

  handleBreakIncrease = () => {
    const { breakCount, isPlaying, currentTimer  } = this.state;

    if(breakCount < 60) {
      if(!isPlaying && currentTimer === 'Break') {
        this.setState({
          breakCount : breakCount + 1,
          clockCount: (breakCount + 1) * 60
        });
      } else {
        this.setState({
          breakCount : breakCount + 1
        });
      }
    }
  }

  handleBreakDecrease = () => {
    const { breakCount, isPlaying, currentTimer } = this.state;

    if(breakCount > 1) {
      if(!isPlaying && currentTimer === 'Break') {
        this.setState({
          breakCount : breakCount - 1,
          clockCount: (breakCount - 1) * 60
        });
      } else {
        this.setState({
          breakCount : breakCount - 1
        });
      }
    }
  }

  handleSessionIncrease = () => {
    const { sessionCount, isPlaying, currentTimer } = this.state;

    if(sessionCount < 60) {
      
      if(!isPlaying && currentTimer === 'Session') {
        this.setState({
          sessionCount : sessionCount + 1,
          clockCount: (sessionCount + 1) * 60
        });
      } else {
        this.setState({
          sessionCount : sessionCount + 1
        })
      }
    }
  }

  handleSessionDecrease = () => {
    const { sessionCount, isPlaying, currentTimer } = this.state;

    if(sessionCount > 1) {
      if(!isPlaying && currentTimer === 'Session') {
        this.setState({
          sessionCount : sessionCount - 1,
          clockCount: (sessionCount - 1) * 60
        });
      } else {
        this.setState({
          sessionCount : sessionCount - 1
        })
      }
    }
  }


  render() {

    const {
      breakCount, sessionCount, clockCount, currentTimer, isPlaying // eslint-disable-next-line
      } = this.state;

    const breakProps = {
      title: 'Break',
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease
    }
    const sessionProps = {
      title: 'Session',
      count: sessionCount,
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease
    }
    
    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <div className = " flex">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>
        <div className="clock-container">
            <h1 id="timer-label">{currentTimer}</h1>
            <span id="time-left">{this.convertToTime(clockCount)}</span>
            
          <div className ="flex">
                <button id="start_stop" onClick={this.handlePlayPause}>
                    <FontAwesomeIcon icon = {`${isPlaying ? "pause" : "play"}`} />
                </button>
                <button id="reset" onClick={this.handleReset}>
                    <FontAwesomeIcon icon = "sync" />
                </button>
          </div>
        </div>        
      </div>
    );
  }
}


export default App;
