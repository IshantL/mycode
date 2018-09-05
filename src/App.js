import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
          tools:'',
          maximumWeight:'',
          toolsToTakeSorted:''
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
          tools: data.tools,
          maximumWeight:data.maximumWeight
        })
        //console.log(this.state.tools,this.state.maximumWeight);
        console.log(data.tools, data.maximumWeight);
        var maximumWeight=data.maximumWeight;
        debugger;
//logic
        function compare(a,b) {
          if (a.weight < b.weight)
            return 1;
          if (a.weight > b.weight)
            return -1;
          return 0;
        }

      var sortedWeight=data.tools.sort(compare);
      console.log(sortedWeight);
      var resultArray = [], calculateWeight = 0;
       //logiv
       /*sortedWeight.forEach((value, index, array) => {
        if(calculateWeight <= maximumWeight){
          calculateWeight = calculateWeight + value.weight;
          if(calculateWeight <= maximumWeight){
            resultArray.push(value);
          } else {
            calculateWeight = calculateWeight - value.weight;
          }
        }
       });*/

       var finalRes = [];
       for (let i = 0; i < sortedWeight.length;i++){
        var tempArr = [], calcWeight = 0, calcValue = 0;
        calcWeight = calcWeight + sortedWeight[i].weight;
        calcValue = calcValue + sortedWeight[i].value;
        tempArr.push(sortedWeight[i]);
        for (let j = i + 1; j < sortedWeight.length; j++){
          if(calcWeight <= maximumWeight){
            tempArr.push(sortedWeight[j]);
            calcWeight = calcWeight + sortedWeight[j].weight;
            calcValue = calcValue + sortedWeight[j].value;
          }
        }
        finalRes.push(tempArr);
       }

       resultArray.sort((a, b) => {
        if(a.name < b.name){
          return -1;
        }else if(a.name > b.name){
          return 1;
        }else {
          return 0;
        }
       });
      console.log(resultArray);
      var res =[];
      resultArray.forEach((value) => {
        res.push(value.name);
      });
      console.log(res);
      this.setState({
        toolsToTakeSorted:res
      });
      //this.postrequest();
  });
}

    postrequest(){
      const request = new Request('https://http-hunt.thoughtworks-labs.net/challenge/output', {
      headers: new Headers({
      'userid': 'mh_q1KBR4'
      })
      });
      fetch(request, {
        method: 'post',
        headers: {'Content-Type':'application/json','userid': 'mh_q1KBR4'},
        body: JSON.stringify({"toolsToTakeSorted": this.state.toolsToTakeSorted})
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
