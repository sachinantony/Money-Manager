import React, { Component } from 'react';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import './bootstrap.min.css';
import './App.css';
import SignInPage from './Components/SignInPage';
import HomePage from './Components/HomePage';
class App extends Component {
    render() {
        return (
          <div className = 'App'>
                <Route exact={true} path="/" component={SignInPage}/>
                <Route path="/home" component={HomePage}/>
          </div>
        );
    }
}

export default App;
