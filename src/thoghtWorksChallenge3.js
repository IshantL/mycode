import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
          toolUsage:[],
          toolsSortedOnUsage:''
        };
    }
   
    getPopularMovies() {
      debugger;
      const request = new Request('https://http-hunt.thoughtworks-labs.net/challenge/input', {
      headers: new Headers({
      'userid': 'mh_q1KBR4'
      })
      });

    fetch (request)
      .then(response => response.json())
      .then(data => {
        this.setState({
          toolUsage: data.toolUsage
        })
        console.log(this.state.toolUsage); 
        
//logic
        var resultArray=[];
        data.toolUsage.forEach((tool, index)=> {
        var endDate = new Date(tool.useEndTime);
        var startDate = new Date(tool.useStartTime);
        var min = ((endDate.getTime() - startDate.getTime()) / 1000)/60;
        //to push the output
        resultArray.push({"name": tool.name, "timeUsedInMinutes" : min})
        });
        console.log(resultArray);

        var map = resultArray.reduce(function(map, data) {
        var name = data.name;
        var time = +data.timeUsedInMinutes
        //checking the key's value ,first time it is 0 or any later add
        map[name] = (map[name] || 0) + time
        return map
        }, {})


        var array = Object.keys(map).map(function(name) {
        return {
        name: name,
        timeUsedInMinutes: map[name]
        }
        })
        console.log(array);

        function compare(a,b) {
        if (a.timeUsedInMinutes < b.timeUsedInMinutes)
        return 1;
        if (a.timeUsedInMinutes > b.timeUsedInMinutes)
        return -1;
        return 0;
        }
        debugger;
        var sortedtime=array.sort(compare);
        console.log(sortedtime);
        this.setState({
        toolsSortedOnUsage:sortedtime
        })
        this.postrequest();

      });

      
  }
   postrequest(){
  console.log(this.state.toolsSortedOnUsage);
  const request = new Request('https://http-hunt.thoughtworks-labs.net/challenge/output', {
      headers: new Headers({
      'userid': 'mh_q1KBR4'
      })
      });
      fetch(request, {
      method: 'post',
      headers: {'Content-Type':'application/json','userid': 'mh_q1KBR4'},
      body: JSON.stringify({"toolsSortedOnUsage": this.state.toolsSortedOnUsage})
      })
      .then(response => response.json());
   } 
  componentDidMount() {
    this.getPopularMovies();  
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
         {this.state.encryptedMessage}
         {this.state.key}
        </p>
      </div>
    );
  }
}

export default App;
