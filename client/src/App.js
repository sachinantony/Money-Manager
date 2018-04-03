import React, { Component } from 'react';
import logo from './moneymanager.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
    handleSubmit(e){
        console.log(this.refs.password.value);
        axios.post('/user/login', {
            username: this.refs.userName.value,
            password: this.refs.password.value
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        e.preventDefault();
    }
    render() {
    return (
      <div className="App"> <br/><br/><br/><br/><br/><br/>
          <div id="loginbox"   >
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <span className="App-header-span"> MoneyManager </span>
                  <img src={logo} className="App-logo" alt="logo" />
              </header>

              <div className="loginboxdata">
                  <form onSubmit = {this.handleSubmit.bind(this)}>
                      <b className="loginboxdata-u" >User Name :</b>
                      <br />
                      <input type="text" id="unm"  ref="userName"/><br />
                      <b className="loginboxdata-p">Password :</b>
                      <br />
                      <input type="password" id="pwd" ref="password" /><br />
                      <br />
                      <input id="Submit1" type="submit"   className="mybuttonstyle" value="Sign in" />
                      <br /><br /><br />
                  </form>
                  New User? <a href="#">Sign Up!!!</a> Here
              </div>
          </div>
      </div>
    );
    }
}

export default App;
