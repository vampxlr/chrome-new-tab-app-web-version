import React , { Component } from 'react'




var Root_Main_LoginModal_View_Form = React.createClass({
    propTypes: {
        loginInfo:	React.PropTypes.object.isRequired,

        onChange: React.PropTypes.func.isRequired,

    },

    render:function(){
        return(
            <form className="loginForm Root_Main_LoginModal_View_Form" >
                <div className="mdl-textfield mdl-js-textfield">
                    <input
                        onChange={this.props.onChange}
                        name="userName"
                        value={this.props.loginInfo.userName}

                        className="mdl-textfield__input"
                        type="text"
                        id="username" />
                    <label id="username_label" className="mdl-textfield__label" htmlFor="username">Username</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield">
                    <input
                        onChange={this.props.onChange}
                        name="userPass"
                        className="mdl-textfield__input"
                        value={this.props.loginInfo.userPass}

                        type="password"
                        id="userpass" />
                    <label className="mdl-textfield__label" htmlFor="userpass">Password</label>
                </div>

            </form>

        );
    }
});

export default Root_Main_LoginModal_View_Form