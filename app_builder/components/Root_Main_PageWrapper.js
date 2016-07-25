import React , { Component } from 'react'
import {shorten_string} from './utils/shorten_string'

var Root_Main_PageWrapper = React.createClass({
    getInitialState: () => {
        return {checkedValue: false};
    },
    componentDidUpdate:()=>{

    },

    filterCompleted: (obj) => {
        return !obj.completed;

},
    handleComplete: function handleComplete(e){
        //console.log("Complete clicked")
        if(this.props.todos.filter(this.filterCompleted).length==0)
        {
            //console.log("prevent default")
            e.preventDefault();
            return;
        }
        this.setState({checkedValue: !this.state.checkedValue})
        var todo = this.props.todos.filter(this.filterCompleted)[0]
        //console.log(todo)

        setTimeout(()=>{
            function filterActive(obj){
                return obj.active;
            }
            let data = []
            data.workspace_id = this.props.workspaceData.filter(filterActive)[0].id
            data.todo_id = todo.id
            data.action_id=todo.action_id
            data.is_remote=this.props.workspaceData.filter(filterActive)[0].remote
            data.is_complete=todo.completed
            //console.log(data)
            //console.log(data)
            this.props.actions.todo_async_remote_local_completeTodo(data);

            this.setState({checkedValue: false});
            $("#checkboxLabel").removeClass('is-checked');

        }, 1000);

    },
        render: function() {
            return (
                <div id="page_wrapper" className="Root_Main_PageWrapper">
                    <div id="center-container">

                        <div  id="center_clock" className="Root_Main_PageWrapper_nextTaskTitleContainer">
                            <h2 className="Root_Main_PageWrapper_nextTaskTitle">Next Task</h2>
                        </div>

                        <div id="nexttasktext" className="Root_Main_PageWrapper_nextTaskContainer">
                            <label id="checkboxLabel" className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect Root_Main_PageWrapper_nextTaskLabel" htmlFor="checkbox-2">
                                { this.state.checkedValue ?<input onClick={this.handleComplete} type="checkbox" id="checkbox-2" className="mdl-checkbox__input Root_Main_PageWrapper_completeCheckBox" checked/>:<input onClick={this.handleComplete} type="checkbox" id="checkbox-2" className="mdl-checkbox__input Root_Main_PageWrapper_completeCheckBox" />}

                                { this.props.todos.filter(this.filterCompleted).length>0  ?
                                    (this.state.checkedValue?<span className="mdl-checkbox__label underlineText Root_Main_PageWrapper_nextTaskText">{shorten_string(this.props.todos.filter(this.filterCompleted)[0].text,200)}</span>:<span className="mdl-checkbox__label Root_Main_PageWrapper_nextTaskText">{shorten_string(this.props.todos.filter(this.filterCompleted)[0].text,200)}</span>)

                                    :<span className="mdl-checkbox__label Root_Main_PageWrapper_nextTaskText">Nothing To Do</span>
                                }

                            </label>
                        </div>


                    </div>

                </div>
            );
        }
    });

export default Root_Main_PageWrapper