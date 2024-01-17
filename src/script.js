import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import $ from "https://esm.sh/jquery";

// Sounds definition
const keySounds = [{
        keyCode: 81,
        keyTrigger: "Q",
        id: "Heater-1",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    }, {
        keyCode: 87,
        keyTrigger: "W",
        id: "Heater-2",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    }, {
        keyCode: 69,
        keyTrigger: "E",
        id: "Heater-3",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    }, {
        keyCode: 65,
        keyTrigger: "A",
        id: "Heater-4",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    }, {
        keyCode: 83,
        keyTrigger: "S",
        id: "Clap",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    }, {
        keyCode: 68,
        keyTrigger: "D",
        id: "Open-HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    }, {
        keyCode: 90,
        keyTrigger: "Z",
        id: "Kick-n'-Hat",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    }, {
        keyCode: 88,
        keyTrigger: "X",
        id: "Kick",
        url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    }, {
        keyCode: 67,
        keyTrigger: "C",
        id: "Closed-HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }];


class PadKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {}
    };
    this.pressedStyle = {color: '#111', backgroundColor: 'orange'};
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  };
  
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }
  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
  }
  
  handleKeyPress(event) {
    if (event.keyCode === this.props.keyCode) {
      this.setState({style: this.pressedStyle});
      this.playSound();
    }
  }
  
  playSound() {
    const keyTriggered = document.getElementById(this.props.keyTrigger);
    // const keyTriggered = event.target.children[0];
    keyTriggered.currentTime = 0;
    keyTriggered.play();
    setTimeout(( () => ( this.setState({ style: {} }) ) ), 100);
    this.props.updateDisplay(this.props.id.replace(/-/g, " "));
    
  }
  
  render() {
    return (
      <button className='drum-pad' id={this.props.id} onClick={this.playSound} style={this.state.style}>
        <audio className='clip' id={this.props.keyTrigger} src={this.props.src}></audio>
        {this.props.keyTrigger}
      </button>
    );
  }
}


class KeyBoard extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    // Mapping all the elements in keySound to a HTML element
    let keyBoard = keySounds.map(elem => React.createElement(PadKey, {
      id: elem['id'],
      src: elem['url'],
      keyCode: elem['keyCode'],
      keyTrigger: elem['keyTrigger'],
      updateDisplay: this.props.updateDisplay
    }));
    
    return keyBoard;
  }
}


class DrumPads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayKey: ''
    }
    this.displayClipName = this.displayClipName.bind(this);
  }
  displayClipName(event){
    console.log(event);
    this.setState({
      displayKey: event
    })
  }
  render() {
    return (
      <div id='drum-machine'>
        <div id='keyboard'>
          <KeyBoard updateDisplay={this.displayClipName}/>
        </div>
        <div id='display'>
          <p id='display-title'>Selected sound</p>
          <p id='display-value'>{this.state.displayKey}</p>
        </div>
      </div>
    );
  }
}


$(document).ready(function () {
  ReactDOM.render(<DrumPads/>, document.getElementById('app'));
});
// $(document).ready(function () {
//   ReactDOM.render(<DrumPads/>,
//     document.body.appendChild(document.createElement("div"))
// )
// });