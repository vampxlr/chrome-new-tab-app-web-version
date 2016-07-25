import React , { Component } from 'react'

class Root_Main_Header extends Component {



    handleRefreshBtn () {

        this.props.actions.todo_async_remote_refresh()
    }

    handleNextWorkspaceBtn () {
        function filterActive(obj){
            return obj.active;
        }
        this.props.actions.workspace_local_moveWorkspace("UP",this.props.workspaceData.filter(filterActive)[0].id,this.props.workspaceData)

    }

    handlePreviousWorkspaceBtn () {
        function filterActive(obj){
            return obj.active;
        }
        this.props.actions.workspace_local_moveWorkspace("DOWN",this.props.workspaceData.filter(filterActive)[0].id,this.props.workspaceData)

    }

    handleClickChangeWorkspaceBtn(){

    $("#ChangeWorkSpaceModal").addClass("show");
    $("#ChangeWorkSpaceModal").removeClass("hide");
    $("#ChangeWorkSpaceModal").removeClass("hidden");
    $("#settings-list-drawer").removeClass("is-visible");
    $(".mdl-layout__obfuscator").removeClass("is-visible");

}


    handleTaskBtn(){
       $("#taskModal").addClass("show");
       // global.document.getElementById("taskModal").className += " show"
        $("#taskModal").removeClass("hide");
        $("#taskModal").removeClass("hidden");
        $("#settings-list-drawer").removeClass("is-visible");
        $(".mdl-layout__obfuscator").removeClass("is-visible");
        console.log("task button clicked")
    }


    filterActive(obj){
    return obj.active;
}


    render() {
    return (
        <header className="mdl-layout__header mdl-layout__header--transparent Root_Main_Header">
            <div id="main-nav-container" className="mdl-layout__header-row">

                <span onClick={this.handleClickChangeWorkspaceBtn.bind(this)} id="Root_Main_Header_workspaceTitle" className="mdl-layout-title workspace_Name">{this.props.workspaceData.filter(this.filterActive)[0].name}</span>

                <div className="mdl-layout-spacer"></div>

                <nav id="main-nav" className="mdl-navigation">
                    { this.props.login.status ?   <a  onClick={this.handlePreviousWorkspaceBtn.bind(this)} className="mdl-navigation__link task Root_Main_Header_previousWorkspaceBtn hidden"><i className="material-icons">skip_previous</i></a>: null}
                    { this.props.login.status ?   <a  onClick={this.handleNextWorkspaceBtn.bind(this)} className="mdl-navigation__link task Root_Main_Header_nextWorkspaceBtn hidden"><i className="material-icons">skip_next</i></a>: null}

                    <a onClick={this.handleTaskBtn} id="task_btn"  className="mdl-navigation__link task Root_Main_Header_tasksBtn">Tasks</a>

                    { this.props.login.status ?   <a  onClick={this.handleRefreshBtn.bind(this)} className="mdl-navigation__link task Root_Main_Header_refreshBtn"><i className="material-icons">cached</i></a>: null}


                </nav>
            </div>
        </header>
    );
}
}




export default Root_Main_Header
