import React , { Component } from 'react'
import Root_Main_LoginModal_View_Form from './Root_Main_LoginModal_View_Form'
import {misc} from './misc'
var Root_Main_LoginModal_View = React.createClass({

    handleLogin:function handleLogin(){
       // console.log('login_btn clicked')
        let data = []
        data.email = this.state.loginInfo.userName
        data.password = this.state.loginInfo.userPass
        this.props.actions.login_async_remote_weekPlan(data);


    },



    getInitialState: function() {


        return {loginInfo: {userName:'',userPass:''},
            errors: {},
            dirty: false};
    },
    setLoginInfoState: function(event) {

        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.loginInfo[field] = value;

        return this.setState({loginInfo: this.state.loginInfo});
    },




    render: function() {

        return (


            <div id="login-view" className="mdl-card mdl-shadow--6dp Root_Main_LoginModal_View">
                <div id="login-title-container" className="mdl-card__title mdl-color-text--white">
                    <h2 className="mdl-card__title-text Root_Main_LoginModal_View_Title">Login To WeekPlan</h2>
                </div>
                <div id="login-supporting-text" className="mdl-card__supporting-text">
                    <Root_Main_LoginModal_View_Form
                        loginInfo={this.state.loginInfo}
                        onChange={this.setLoginInfoState}
                    />
                </div>
                <div id="login-button-container" className="mdl-card__actions mdl-card--border">
                    <button id="login_btn" onClick={this.handleLogin} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect Root_Main_LoginModal_View_loginBtn">Log in</button>
                </div>
            </div>





        );
    }
});







export default Root_Main_LoginModal_View