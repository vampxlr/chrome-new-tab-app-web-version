import React , { Component } from 'react'
import Root_SettingsListDrawer from './Root_SettingsListDrawer'
import Root_Main from './Root_Main'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../redux/action'
//import _$ from 'jquery'
import jquery_close_modals_via_events from "./utils/jquery_close_modals_via_events"



class Root extends Component {



    componentDidMount(){
     var that = this
        function filterActive(obj){
            return obj.active;
        }
        var d = new Date();
        var n = d.getDay()

       // $('body').css("background-image", "url(bgs/"+n+".jpg)");
        document.body.style.background = "url(bgs/"+n+".jpg) no-repeat center center fixed";


      /*  $("#center-container").bind('mousewheel', function(event) {

            if (event.originalEvent.wheelDelta >= 0 && that.props.login.status) {

                that.props.actions.workspace_local_moveWorkspace("UP",that.props.workspaceData.filter(filterActive)[0].id,that.props.workspaceData)
                console.log('Scroll up');
            }
            else if(event.originalEvent.wheelDelta <= 0 && that.props.login.status) {
                that.props.actions.workspace_local_moveWorkspace("DOWN",that.props.workspaceData.filter(filterActive)[0].id,that.props.workspaceData)

                console.log('Scroll down');
            }
        });
*/



    }
    componentWillMount() {



            //this.props.actions.login_local_async_checkLoginAndWorkspaceData()
            //this.props.actions.todo_async_remote_refresh()

            //this.props.actions.todo_async_local_getTodo()



    }
    componentDidUpdate(){
        //this.props.actions.jqueryInitialEventTriggers()

        window.onclick = function(event) {
            jquery_close_modals_via_events(event)
        }

    }

    filterActive(obj){
    return obj.active;
    }

    render(){
        return(
            <div>
                <div id="main_page" className="demo-layout-transparent mdl-layout mdl-js-layout kkk Root">
                    <Root_SettingsListDrawer actions={this.props.actions} login={this.props.login} />
                    <Root_Main todos_repository={this.props.todos_repository} actions={this.props.actions} todos={this.props.todos_repository[this.props.workspaceData.filter(this.filterActive)[0].id].todos} login={this.props.login} workspaceData={this.props.workspaceData}/>
                </div>
            </div>

        )
    }

}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch)
{
    return{
        actions: bindActionCreators(actions,dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Root)