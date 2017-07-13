import React from 'react';
import PropTypes from 'prop-types';
import tickBox from '../assets/tickBox.png';
import './HomeView.scss'

const HomeView = React.createClass({

    // get initial state
    getInitialState: function() {
    // initial vars
    	return {
        state : 'session',
        value : 25 * 60 * 1000,
        initialStart : 25 * 60 * 1000,
        time : new Date(25 * 60 * 1000),
        started : false,
        interval : null,
        delay : 200,
        clicks : 0,
        timer : null,
        pause : 5,
        session : 25,
        color : '#92CD00',
        font: 'black',
        message: '',
      };
    },
    reset : function() {
        this.state.value = (this.state.state === 'session'? (this.state.session *60 * 1000) : (this.state.pause *60 *1000));
        this.state.initialStart = this.state.value;
        this.state.time = new Date(this.state.value);
        this.setState(this.state);
    },
    done : function() {
      if(this.state.state === 'session') {
        this.state.state = "pause";
        this.state.color= "#7F5417";
        this.state.font='#301F0D';
        this.state.value = this.state.pause *60 *1000;
        this.state.message = 'Time for a coffee break!';
      } else {
        this.state.state = "session";
        this.state.color = "#92CD00";
        this.state.font = 'black',
        this.state.value = this.state.session *60 *1000;
        this.state.message = 'Your energy level:'
      }
      this.state.initialStart = this.state.value;
      console.log("testing start");
      this.state.time = new Date(this.state.value);
      this.setState(this.state);

    },
    run : function() {
         this.state.interval = setInterval(function(){
             this.state.value = this.state.value - 1000;

             this.state.time = new Date(this.state.value);
             this.setState(this.state);
             if(this.state.time<=0){
                this.done();
             }
        }.bind(this), 1000);
       this.setState(this.state);
    },
    click : function(){
        this.state.clicks++;  // clicks no
        this.setState(this.state);
        this.state.message = 'Your energy level:'
        console.log("testing 1");
        if(this.state.clicks === 1) {
          // delay the action a bit, waiting for the dblclick...
          this.state.timer = setTimeout(function() {
            this.state.clicks = 0;  // reset counter
            if(this.state.started === false) { // start the timer
              this.state.started = true;
              this.setState(this.state);
              this.state.message = 'Your energy level:'
              console.log("testing 2");
              this.run();
            } else {
              this.state.started = false;
              clearInterval(this.state.interval);
              this.setState(this.state);
              console.log("testing 3");
            }
          }.bind(this), this.state.delay);
          this.setState(this.state);
        } else if ( this.state.clicks === 2) {
          clearTimeout(this.state.timer);  //don't execute single click
          this.state.started = false;
          clearInterval(this.state.interval);
          this.state.clicks = 0;
          this.reset();
        }
    },
    handlePauseChange: function(e){
  		if(this.state.started === false){
        this.state.pause = parseInt(e.target.value);
    	  this.reset();
      }
   	},
    handleSessionChange: function(e){
  		if(this.state.started === false){
        this.state.session = parseInt(e.target.value);
    	  this.reset();
      }
   	},


    render : function(){
      var minutes = this.state.time.getMinutes();
      minutes = (minutes < 10)?"0"+minutes:minutes;
      var seconds = this.state.time.getSeconds();
      seconds = (seconds < 10)?"0"+seconds:seconds;
      var fill = {
        'height' : ((this.state.initialStart-this.state.value)*100/this.state.initialStart).toFixed(2) + '%',
        //'height' : ((100-((this.state.initialStart-this.state.value)*100/this.state.initialStart)).toFixed(2)) + '%',
        'backgroundColor'  : 'white',
        'color': this.state.font,
      };
      var border = {
        'border' : '2px solid black',
        'backgroundColor' : this.state.color,
      };

      var battery = {
        'backgroundColor': '#666666',
        'borderLeft': '2px solid black',
        'borderTop': '2px solid black',
        'borderRight': '2px solid black',
      };

  // console.log('initialStart: ' + this.state.initialStart);
  // console.log('value: ' + this.state.value);
  // console.log('Minus: ' + this.state.initialStart/(this.state.initialStart-this.state.value)*100);
  //console.log('Height: ' + ((100-((this.state.initialStart-this.state.value)*100/this.state.initialStart)).toFixed(2)) + '%');


      var show = minutes + ' : ' + seconds;
      var key = show + this.state.session;


      return (

          <section class="container">
            <div id="pomodoro">
              <h1>Timer</h1>
                <div id="options">
                  <span>Session</span>
                  <input class="session" type="number" value={this.state.session} min="1" max="60" onChange={this.handleSessionChange}/>
                  <span>Break</span>
                  <input class="break" type="number" value={this.state.pause} min="1" max="60" onChange={this.handlePauseChange}/>
                  <br/>
                  <span id="instructions">Click the timer once to begin / pause...</span>
                  <br/>
                  <span id="instructions">Click the timer twice to reset...</span>
                </div>

                <div id="message">
                  <h4>{this.state.message}</h4>
                </div>

                <div>
                  <div id="battery" style={battery}><span>  </span></div>
                  <div id="clock" style={border} onClick={this.click} key={key}>
                    <div className="inner" style={fill}>
                      <span>{show}</span>
                  </div>
                </div>
              </div>
            </div>

            <div id="task">
              <h1>Task List</h1>
              <div id="list">
                <div id="field"><span>1.</span><input/></div><div id="tick"><input type="checkbox"/></div><br/>
                <div id="field"><span>2.</span><input/></div><div id="tick"><input type="checkbox"/></div><br/>
                <div id="field"><span>3.</span><input/></div><div id="tick"><input type="checkbox"/></div><br/>
                <div id="field"><span>4.</span><input/></div><div id="tick"><input type="checkbox"/></div><br/>
                <div id="field"><span>5.</span><input/></div><div id="tick"><input type="checkbox"/></div><br/>
              </div>

            </div>


        </section>

      )
    }
  });


export default HomeView
