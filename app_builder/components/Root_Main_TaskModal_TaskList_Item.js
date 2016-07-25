import React , { Component } from 'react'
import {shorten_string} from './utils/shorten_string'


var Root_Main_TaskModal_TaskList_Item = React.createClass({


    handleMoveUp:function(){
        this.props.moveUp(this.props.todo.id)
    },
    handleMoveDown:function(){
        this.props.moveDown(this.props.todo.id)

    },

    handleDelete: function () {
        function filterActive(obj){
            return obj.active;
        }
        let data = []
        data.workspace_id = this.props.workspaceData.filter(filterActive)[0].id
        data.todo_id = this.props.todo.id
        data.action_id = this.props.todo.action_id
        data.is_remote = this.props.workspaceData.filter(filterActive)[0].remote
        this.props.actions.todo_async_remote_local_deleteTodo(data);
    },
    handleComplete: function () {
        function filterActive(obj){
            return obj.active;
        }
        let data = []
        data.workspace_id = this.props.workspaceData.filter(filterActive)[0].id
        data.todo_id = this.props.todo.id
        data.action_id=this.props.todo.action_id
        data.is_remote=this.props.workspaceData.filter(filterActive)[0].remote
        data.is_complete=this.props.todo.completed
        //console.log(data)
        this.props.actions.todo_async_remote_local_completeTodo(data);

    },

    render: function() {
        return (



                    <tr className="Root_Main_TaskModal_TaskList_Item">
                        <td onClick={this.handleComplete} className="icons-container Root_Main_TaskModal_TaskList_Item_complete_btn"><i className="material-icons">done</i></td>


                        { this.props.todo.completed ?    <td width="200" className=" underlineText Root_Main_TaskModal_TaskList_Item_TodoName">{shorten_string(this.props.todo.text,200)}</td>: <td width="200" className=" Root_Main_TaskModal_TaskList_Item_TodoName">{shorten_string(this.props.todo.text,200)}</td>}


                        <td onClick={this.handleMoveUp} className="icons-container Root_Main_TaskModal_TaskList_Item_move_up_btn"><i className="material-icons">arrow_upward</i></td>
                        <td onClick={this.handleMoveDown} className="icons-container Root_Main_TaskModal_TaskList_Item_move_down_btn"><i className="material-icons">arrow_downward</i></td>
                        <td  onClick={this.handleDelete} className="icons-container Root_Main_TaskModal_TaskList_Item_delete_btn"><i className="material-icons">delete</i></td>
                    </tr>


        );
    }
});


export default Root_Main_TaskModal_TaskList_Item