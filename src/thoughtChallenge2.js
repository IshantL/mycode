import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
          jumbledMessage:'',
          tools:[],
          toolsFound:[]
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
          jumbledMessage: data.hiddenTools,
          tools: data.tools
        })
        console.log(this.state.jumbledMessage,this.state.tools); 
        
//logic
var resultArr=[];
for(let tool of data.tools){
    var toolArr = [...tool];
    var index = data.hiddenTools.indexOf(toolArr[0]);
    var str = '';
    if(index >= 0){
        str = str + toolArr[0];
        let j=index;
        for (let i=1;i < toolArr.length;i++){
            while(j <= data.hiddenTools.length){
                var index1 = data.hiddenTools.indexOf(toolArr[i], j);
                if(index1 >= 0){
                    str = str + toolArr[i];
                    j = index1;
                    break;
                }else {
                    j = j+1;
                }
                
            }
        }
    }
    if(tool === str){
        resultArr.push(str);
    }
}
      this.setState({
        toolsFound:resultArr
      })
    this.postrequest();

      });

      
  }
   postrequest(){
  console.log("posting "+this.state.toolsFound);
  const request = new Request('https://http-hunt.thoughtworks-labs.net/challenge/output', {
      headers: new Headers({
      'userid': 'mh_q1KBR4'
      })
      });
      fetch(request, {
      method: 'post',
      headers: {'Content-Type':'application/json','userid': 'mh_q1KBR4'},
      body: JSON.stringify({"toolsFound": this.state.toolsFound})
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
