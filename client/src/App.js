import React, { Component } from 'react';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import './bootstrap.min.css';
import './App.css';
import SignInPage from './Components/SignInPage';
class App extends Component {
    render() {
        return (
          <div className = 'App'>
                <SignInPage/>
          </div>
        );
    }
}

export default App;
