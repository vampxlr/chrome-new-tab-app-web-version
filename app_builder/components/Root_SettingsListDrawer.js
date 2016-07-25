import React , { Component } from 'react'
import {misc} from './misc'

var Root_SettingsListDrawer = React.createClass({
    handleLogout:function handleLogout(){
    this.props.actions.login_local_async_logout()
        $("#preloader").fadeIn('slow');
    console.log("logout button clicked");
        setTimeout(function(){
            $("#preloader").fadeOut('slow');
            misc();
        }, 1000);
},
    componentDidUpdate:function componentDidUpdate(){

        //jquery_change_workspace_btn_click_events();
    },
    handleClickChangeWorkspaceBtn:function handleClickChangeWorkspaceBtn(){

        $("#ChangeWorkSpaceModal").addClass("show");
        $("#ChangeWorkSpaceModal").removeClass("hide");
        $("#ChangeWorkSpaceModal").removeClass("hidden");
        $("#settings-list-drawer").removeClass("is-visible");
        $(".mdl-layout__obfuscator").removeClass("is-visible");

    },
    handleRefreshBtn: function () {
        this.props.actions.todo_async_remote_refresh()
    }
    ,
    handleLoginBtn:function handleLogineBtn(){

        $("#loginModal").addClass("show");
        $("#loginModal").removeClass("hide");
        $("#loginModal").removeClass("hidden");
        $("#settings-list-drawer").removeClass("is-visible");
        $(".mdl-layout__obfuscator").removeClass("is-visible");

    },
    render: function() {
        return (
            <div id="settings-list-drawer" className="mdl-layout__drawer Root_SettingsListDrawer Root_SettingsListDrawer">
                <span className="mdl-layout-title">Settings</span>
                <nav className="mdl-navigation">

                    { this.props.login.status ?   <a onClick={this.handleClickChangeWorkspaceBtn} id="change_workspace_btn" className="mdl-navigation__link change-workspace-btn Root_SettingsListDrawer_change_workspace_btn">Change Workspace</a>: null}

                    { this.props.login.status ?  null : <a onClick={this.handleLoginBtn}   className="mdl-navigation__link login Root_SettingsListDrawer_login_btn">Login To Weekplan</a>  }
                    { this.props.login.status ?  <a onClick={this.handleLogout} className="mdl-navigation__link Root_SettingsListDrawer_logout_btn">Logout</a>: null}


                </nav>
            </div>
        );
    }
});
export default Root_SettingsListDrawer

