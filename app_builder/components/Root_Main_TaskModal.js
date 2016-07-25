import React , { Component } from 'react'
import Root_Main_TaskModal_TaskList from './Root_Main_TaskModal_TaskList'
import Root_Main_TaskModal_InputTask from './Root_Main_TaskModal_InputTask'


var Root_Main_TaskModal = React.createClass({

    componentDidUpdate:()=>{
        if(global.environment!=='test'){

            $(document).ready(function() {
                Tipped.create('#add-local-task-list', 'Add local task list to current workspace');
            });
        }



    },

    filterCompleted: (obj) => {
        return !obj.completed;

    },
    filterActive: (obj)=>{
      return obj.active;
    },
    handleShowWorkspace: function handleShowWorkspace(){
        console.log(this.props.workspaceData)
        console.log(this.props.workspaceData.filter(this.filterActive)[0].name)

    },
    handleLocalTaskListAdd: function handleLocalTaskListAdd(){

        let workspace_local_id =this.props.workspaceData.filter(this.filterActive)[0].id
        let todos_repository = this.props.todos_repository
        this.props.actions.todo_async_remote_local_addLocalTaskListToRemote(workspace_local_id,todos_repository)
    },
    handleCloseTaskModal:function handleCloseModal(){


        $("#taskModal").removeClass('show');
        $("#taskModal").addClass('hide');
        setTimeout(function(){ $("#taskModal").addClass('hidden');  }, 500);

    },
     render: function() {
        return (
            <div id="taskModal" className="modal hidden Root_Main_TaskModal">

                <div id="task-list-view" className="demo-card-wide mdl-card mdl-shadow--2dp">

                    <div id="task-list-card-title" className="mdl-card__title ">
                        <h2 onClick={this.handleShowWorkspace} id="task-list-title" className="mdl-card__title-text ">{this.props.workspaceData.filter(this.filterActive)[0].name}: Task List - ({this.props.todos.filter(this.filterCompleted).length})</h2>
                    </div>
                    <div id="task-list-table-container-master" >

                        <Root_Main_TaskModal_TaskList workspaceData={this.props.workspaceData}  actions={this.props.actions} todos={this.props.todos}/>
                    </div>

                    <div id="add-task-container" className="mdl-card__actions mdl-card--border">

                       < Root_Main_TaskModal_InputTask workspaceData={this.props.workspaceData}  actions={this.props.actions} todos={this.props.todos}/>

                    </div>
                    <div id="top-button-container" className="mdl-card__menu">

                        {
                            (this.props.workspaceData.filter(this.filterActive)[0].remote)?
                                <div onClick={this.handleLocalTaskListAdd} id="add-local-task-list" className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect Root_Main_TaskModal_addLocalTaskListBtn">
                                <div  className="material-icons">alarm_add</div>
                                </div> : null
                        }


                        <button onClick={this.handleCloseTaskModal} className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect close">
                            <i className="material-icons">clear</i>
                        </button>
                    </div>

                </div>






            </div>
        );
    }
});


export default Root_Main_TaskModal