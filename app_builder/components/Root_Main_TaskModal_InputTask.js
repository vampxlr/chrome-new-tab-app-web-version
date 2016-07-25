import React , { Component } from 'react'



var Root_Main_TaskModal_InputTask = React.createClass({


    addTask:function(e){
        //console.log("senter")
        //console.log(e.keyCode)
        function filterActive(obj){
            return obj.active;
        }
        if(e.keyCode == 13){
            //console.log("enter")
            let data = [];
                       //console.log("in addTask")
                       //console.log(this.props.workspaceData)
                       //console.log(this.props.workspaceData.filter(filterActive)[0].id)
            data.text = e.target.value
            data.workspace_local_id = this.props.workspaceData.filter(filterActive)[0].id
            data.is_remote = this.props.workspaceData.filter(filterActive)[0].remote
            data.workspace_remote_id =(data.is_remote)? this.props.workspaceData.filter(filterActive)[0].remote_object.WorkspaceId:null
            //console.log("add task data")
            //console.log(data)
            this.props.actions.todo_async_remote_local_addTodo(data)
            e.target.value=""
        }
    } ,

     render: function() {
        return (

                        <div id="add-task-input-container" className="mdl-textfield mdl-js-textfield Root_Main_TaskModal_InputTask" >
                            <input onKeyDown={this.addTask} className="mdl-textfield__input Root_Main_TaskModal_InputTask_inputTask_addTask" type="text" id="addtask" />
                            <label className="mdl-textfield__label Root_Main_TaskModal_InputLabel" htmlFor="addtask">New Task</label>
                        </div>


        );
    }
});


export default Root_Main_TaskModal_InputTask