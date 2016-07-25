import React , { Component } from 'react'
import Root_Main_TaskModal_TaskList_Item from './Root_Main_TaskModal_TaskList_Item'
import toastr from 'toastr'
function notify(type,message){
    if(global.environment!='test')
        toastr[type](message)
}

var Root_Main_TaskModal_TaskList = React.createClass({

    componentWillMount: function () {

    },
    moveTodo:function(direction,id){
        function filterActive(obj){
            return obj.active;
        }
        let active_workspace =this.props.workspaceData.filter(filterActive)[0]
        let data = [];
        data.todo_object_id=null;
        this.props.todos.forEach((element,index,array)=>{
            if(element.id==id){
                data.todo_object_id=index
            }
        })
        let exception=0;
        if(direction.toUpperCase()=="DOWN"){
            exception = this.props.todos.length-1
        } else if (direction.toUpperCase()=="UP"){
            exception = 0
        }

        if(data.todo_object_id==exception){
            notify("info","Can't move "+direction+" from here")
           // toastr["info"]("Can't move "+direction+" from here")

        }else{

            data.is_remote = active_workspace.remote
            data.workspace_local_id = active_workspace.id
            data.workspace_remote_id =(data.is_remote)? active_workspace.remote_object.WorkspaceId:null
            data.todo_id = id
            data.todos = this.props.todos
            if(direction.toUpperCase()=="DOWN"){
                this.props.actions.todo_async_remote_local_moveDownTodo(data);
            } else if (direction.toUpperCase()=="UP"){
                this.props.actions.todo_async_remote_local_moveUpTodo(data);
            }

        }


    },

    moveUp: function(id){
        this.moveTodo("up",id)

    },
    moveDown:function(id){

       this.moveTodo("down",id)



    },

    render: function() {
        return (


                        <div id="task-list-table-container" className="mdl-card__supporting-text Root_Main_TaskModal_TaskList">
                            <table id="task-list-table" className="mdl-data-table mdl-js-data-table Root_Main_TaskModal_TaskList_table  mdl-shadow--2dp">
                                <thead>
                                <tr>
                                    <th>Done</th>
                                    <th className="mdl-data-table__cell--non-numeric">Task</th>
                                    <th>Move Up</th>
                                    <th>Move Down</th>

                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    this.props.todos.map((todo)=>
                                        {
                                            return (
                                                <Root_Main_TaskModal_TaskList_Item moveUp={this.moveUp} moveDown={this.moveDown} key={todo.id} actions={this.props.actions}  todo={todo} workspaceData={this.props.workspaceData} />

                                            )
                                        }
                                    )
                                }



                                </tbody>
                            </table>
                        </div>


        );
    },
});


export default Root_Main_TaskModal_TaskList