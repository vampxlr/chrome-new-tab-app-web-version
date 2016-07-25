
function getId(todos) {
    return todos.reduce((maxId,todo)=>{
            return Math.max(todo.id,maxId)
        },-1)+1
}

function saveLocalChrome(to,data)
{
    if(location.hostname!='localhost')
    {
        //chrome.storage.local.set({[to]: data});
    }
}


export default function todoReducer(todos_repository=[],action){
    let new_todo_state = [];
    let new_todos_repository=[...todos_repository]
    var array =todos_repository;
    var temp;
    let todos = []
    switch(action.type){

        case'GET_TODO':
            new_todo_state = action.data
            return new_todo_state

        case'TODO_LOCAL_MOVE_UP_TODO':

            todos =new_todos_repository[action.workspace_local_id].todos;


            for (var i = 1; i < todos.length;i++)
            {
                if( todos[i].id == action.todo_id){
                    temp = todos[i];
                    todos[i]=todos[i-1];
                    todos[i-1] = temp;
                    break;
                }
            }
             new_todo_state = todos;

            new_todos_repository.forEach(function(element,index,array){
                if(element.id==action.workspace_local_id){
                    element.todos = new_todo_state
                }
            })



           // console.log(new_todos_repository)
            saveLocalChrome("todos_repository",new_todos_repository)
            return new_todos_repository
        case'TODO_LOCAL_MOVE_DOWN_TODO':
           // console.log(new_todos_repository)
            todos =new_todos_repository[action.workspace_local_id].todos;


            for (var i = 0; i < todos.length-1;i++)
            {

                if( todos[i].id === action.todo_id){
                    temp = todos[i];
                    todos[i]=todos[i+1];
                    todos[i+1] = temp;
                    break;

                }

            }
             new_todo_state = todos;

            new_todos_repository.forEach(function(element,index,array){
                if(element.id==action.workspace_local_id){
                    element.todos = new_todo_state
                }
            })



            saveLocalChrome("todos_repository",new_todos_repository)

            return new_todos_repository
        case'TODO_LOCAL_ADD_TODO':
           // console.log("inside todo_local_add_todo")
           // console.log(action)
            todos = new_todos_repository[action.workspace_local_id].todos;
            if(action.text!=undefined){
               // console.log("in add todo");


                new_todo_state =[ {
                    text:action.text,
                    completed:false,
                    id:getId(todos),
                    action_id:action.action_id
                }
                    , ...todos
                ]

                new_todos_repository.forEach(function(element,index,array){
                    if(element.id==action.workspace_local_id){
                        element.todos = new_todo_state
                    }
                })
             //   console.log(new_todos_repository)
                saveLocalChrome("todos_repository",new_todos_repository)

                return new_todos_repository
            }



        case'TODO_LOCAL_COMPLETE_TODO':
           // console.log("inside complete todo");
           // console.log("action")
           // console.log(action)
            todos = new_todos_repository[action.workspace_id].todos;
            //console.log("todos")
            //console.log(todos)
             new_todo_state= todos.map(todo=>{
                return todo.id === action.todo_id ?
                    Object.assign({}, todo,{completed:!todo.completed}):
                    todo
            })

            new_todos_repository.forEach(function(element,index,array){
                if(element.id==action.workspace_id){
                    element.todos = new_todo_state
                }
            })
          // console.log("inside complete todo");
          // console.log(new_todos_repository.todos);
          // console.log(new_todo_state);


            saveLocalChrome("todos_repository",new_todos_repository)
            return new_todos_repository
        case'TODO_LOCAL_DELETE_TODO':
            todos = new_todos_repository[action.workspace_id].todos;
            new_todo_state = todos.filter(todo=>{
                return todo.id !== action.todo_id
            })


            new_todos_repository.forEach(function(element,index,array){
                if(element.id==action.workspace_id){
                    element.todos = new_todo_state
                }
            })

            saveLocalChrome("todos_repository",new_todos_repository)
            return new_todos_repository

        case 'TODO_REMOTE_DATA_SAVE':
              //  console.log("inside todo remote data save");
              //  console.log(action.data);

            let remote_data = action.data;

                let data_to_be_saved = [];

                let local_data = {
                    id:0,
                    workspace_name:"local",
                    remote:false,
                    todos:new_todos_repository[0].todos,
                    workspace_id:null
                }
                data_to_be_saved.push(local_data);
                let remote_data_element;
                remote_data.workspaceList.forEach(function (workSpaceListElement,index,array){


                    let actionListByWorkspace= []
                    remote_data.actionsList.forEach(function(actionListElement,index,array){

                        if(actionListElement.WorkspaceId==workSpaceListElement.WorkspaceId){
                           let  actionListByWorkspaceElement = {
                             text: actionListElement.Text,
                             completed: actionListElement.IsCompleted,
                             id:index,
                             action_id:  actionListElement.id
                           };
                            actionListByWorkspace.push(actionListByWorkspaceElement)
                        }

                    })

                    remote_data_element = {
                        id:index+1,
                        workspace_name:workSpaceListElement.Name,
                        remote:true,
                        todos:actionListByWorkspace,
                        workspace_id:workSpaceListElement.WorkspaceId
                    }

                    data_to_be_saved.push(remote_data_element);

                })

             //   console.log("data to be saved")
             //   console.log(data_to_be_saved)
                saveLocalChrome("todos_repository",data_to_be_saved)
            new_todos_repository = [...data_to_be_saved]
            return new_todos_repository


        default:
           // console.log("in default")
            return todos_repository
    }
}