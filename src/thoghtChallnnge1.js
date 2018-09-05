import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
          encryptedMessage: '',
          message:'',
          key: ''
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
          encryptedMessage: data.encryptedMessage,
          key: data.key
        })
      var alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var position,newposition,newcharacter,keyl;
      var newmessage="";
      var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?^\d+$]+/;

      for (let char of data.encryptedMessage) {
        if(format.test(char)){
            newmessage+=char;
        }else{
            position=alphabet.indexOf(char);
            newposition=(position-data.key)%26;
                  if(newposition<0){
                  var revalphabets=alphabet.split("").reverse().join("");
                  newposition=newposition+1;
                  newcharacter=revalphabets.charAt(Math.abs(newposition));
                  newmessage+=newcharacter;         
                  }else{
                  newcharacter=alphabet.charAt(newposition);
                  newmessage+=newcharacter;         
                  }
             }       
        }
        console.log(newmessage);
        this.setState({message:newmessage});
        this.postrequest();
      });

      
  }
   postrequest(){
  console.log("posting"+this.state.message);
  const request = new Request('https://http-hunt.thoughtworks-labs.net/challenge/output', {
      headers: new Headers({
      'userid': 'mh_q1KBR4'
      })
      });
      fetch(request, {
      method: 'post',
      headers: {'Content-Type':'application/json','userid': 'mh_q1KBR4'},
      body: JSON.stringify({"message": this.state.message})
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
