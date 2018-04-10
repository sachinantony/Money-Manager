import React, { Component } from 'react';
import axios from "axios/index";

class SignInPage extends Component {

    handleSubmit(e){
        console.log('reached');
        console.log(this.refs.password.value);
        axios.post('api/account/signin', {
            email: this.refs.email.value,
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

    render(){
        return(
            <div id="login-overlay" className="modal-dialog vertical-center">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                        <h3 className="modal-title" id="myModalLabel">Welcome to Money Manager</h3>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xs-6">
                                <div className="well">
                                    <form onSubmit = {this.handleSubmit.bind(this)} id="loginForm" >
                                        <div className="form-group">
                                            <label  className="control-label">Username</label>
                                            <input type="text" className="form-control" ref="email" id="username" name="username"  required="" title="Please enter you username" placeholder="example@gmail.com"/>
                                            <span className="help-block"></span>
                                        </div>
                                        <div className="form-group">
                                            <label  className="control-label" >Password</label>
                                            <input type="password" className="form-control" ref="password" id="password" name="password"  required="" title="Please enter your password"/>
                                            <span className="help-block"></span>
                                        </div>
                                        <div id="loginErrorMsg" className="alert alert-error hide">Wrong username og password</div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" name="remember" id="remember"/> Remember login
                                            </label>
                                            <p className="help-block">(if this is a private computer)</p>
                                        </div>
                                        <button type="submit" className="btn btn-success btn-block">Login</button>
                                        <a href="/forgot/" className="btn btn-default btn-block">Help to login</a>
                                    </form>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <p className="lead">Register now for <span className="text-success">FREE</span></p>
                                <ul className="list-unstyled" style={{lineHeight: 2}}>
                                    <li><span className="fa fa-check text-success"></span> Track all your expenses</li>
                                    <li><span className="fa fa-check text-success"></span> Have multiple accounts</li>
                                    <li><span className="fa fa-check text-success"></span> Create custom budgets</li>
                                    <li><span className="fa fa-check text-success"></span> Customized reports</li>
                                    <li><span className="fa fa-check text-success"></span> Enjoy premium for one week <small>(only new customers)</small></li>
                                    <li><a href="/read-more/"><u>Read more</u></a></li>
                                </ul>
                                <p><a href="/new-customer/" className="btn btn-info btn-block">Yes please, register now!</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SignInPage;