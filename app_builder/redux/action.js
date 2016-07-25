// chrome storage
// login_info, login_status,workspace_list_after_login,todos_repository


import toastr from 'toastr'


function notify(type,message){

    if(global.environment!='test') {
        toastr[type](message)
    }
}
Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this;
};

function saveLocalChrome(to,data) {
    if(location.hostname!='localhost' )
    {
        //chrome.storage.local.set({[to]: data});

    }
}
function getRemoteDataWeekplan(dispatch){
    //console.log("getting worskpace data");
    $("#preloader").fadeIn('slow');
    notify("info","Fetching Remote Weekplan Data!")


    $.get("https://api.weekplan.net/v2/workspaces").done(
        function (data) {
            //console.log("getting worskpace done");
            //console.log(data);
            dispatch(actions.workspaceSetList(data))

            $("#ChangeWorkSpaceModal").addClass("show");
            $("#ChangeWorkSpaceModal").removeClass("hide");
            $("#ChangeWorkSpaceModal").removeClass("hidden");
            $("#settings-list-drawer").removeClass("is-visible");
            $(".mdl-layout__obfuscator").removeClass("is-visible");
            let workspaceListData = data;
            let date= new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let monthDay = date.getDate();
            notify("success","Workspace Data Downloaded Successfully")

            $.get("https://api.weekplan.net/v2/users/?Timezone=360&Year="+ year+ "&Month="+month+"&Day=" +monthDay+"&Skip=0&Take=").done(
                function(data){
                    //console.log("task lists")
                    //console.log(data);
                    notify("success","TaskLists Downloaded Successfully")

                    let weekDays = data.WeekPlanDto.WeekDays;

                    weekDays.forEach(function(weekDayselement,index,array){
                        if(weekDayselement.Date!=null){

                            if( weekDayselement.Date.Day == monthDay){

                                let workspaceAndActionsList = {
                                    workspaceList:workspaceListData,
                                    actionsList:weekDayselement.Actions.reverse()
                                }
                                dispatch(actions.todoRemoteDataSave(workspaceAndActionsList))
                            }
                        }
                    })
                }
            ).fail(function () {
                notify("error","Failed Loading Tasklists")
                //console.log("failed fetching task list");

                dispatch(actions.login_logout())
            }).always(function(){
                $("#preloader").fadeOut('slow');
            })
        }
    ).fail(function(err){
        //console.log(err)
        notify("error","Failed Loading Weekplan Data")
        //console.log("Failed Loading Weekplan Data")
        dispatch(actions.login_logout())
    }).always(function(){
        $("#preloader").fadeOut('slow');
    })
}
function moveWeekplanTodo(direction,dispatch,data){
    //  console.log(data);
    let action_id_list =[];
    let ActionId;
    let WorkspaceId = data.workspace_remote_id
    let date= new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let monthDay = date.getDate();
    let postDate = year + "-" + month + "-" + monthDay
    let Text;
    data.todos.forEach((element,index,array)=>{
        action_id_list.push("action_"+element.action_id)
        ActionId=element.action_id
        Text= element.text
    })
    action_id_list.push("action_"+"-10");
    let post_data = {}
    post_data.ActionId= ActionId;
    post_data.WorkspaceId= WorkspaceId
    if(direction.toUpperCase()=="UP"){
        action_id_list.move(data.todo_object_id-1,data.todo_object_id)
    }else if(direction.toUpperCase()=="DOWN"){
        action_id_list.move(data.todo_object_id+1,data.todo_object_id)
    }
    //  console.log(action_id_list.join(","))
    //console.log(action_id_list)
    action_id_list.reverse()
    //console.log(action_id_list)
    post_data.Orders= action_id_list.join(",")
    post_data.orders= action_id_list
    post_data.Date = postDate;
    post_data.Text = Text;
    //console.log(post_data)
    $("#preloader").fadeIn('slow');
    $.post( "https://api.weekplan.net/v2/actions/full_patch",post_data, function() {
    })
        .done(function(post_received_data) {
            //  console.log(post_received_data);
            notify("success","Todo Moved!")
            // console.log(data)
            if(direction.toUpperCase()=="UP"){
                dispatch(actions.todo_local_moveUpTodo(data))

            }else if(direction.toUpperCase()=="DOWN"){
                dispatch(actions.todo_local_moveDownTodo(data))
            }
            // $("#preloader").fadeOut('slow');
        }).fail(function () {
            notify("error","Failed to move todo")
            console.log("Failed to move todo")
            //$("#preloader").fadeOut('slow');
        }).always(function(){
            $("#preloader").fadeOut('slow');

        })
}
function addWeekplanTodo(dispatch,data){
    let date= new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let monthDay = date.getDate();
    let postDate = year + "-" + month + "-" + monthDay
    let post_data ={
        IsAction:true,
        Date:postDate,
        WorkspaceId:data.workspace_remote_id,
        Text:data.text,
        HtmlText:data.text,
        IsCompleted:false

    };
    //console.log("inside addWeekplanTodo")
    //console.log("inside addWeekplanTodo")
    //console.log("post_data")
    //console.log(post_data)
    //console.log("data")
    //console.log(data)
    $("#preloader").fadeIn('slow');
    $.post( "https://api.weekplan.net/v2/actions/",post_data, function() {})
        .done(function(post_recieved_data) {
            notify("success","Adding Todo Successful!")
            data.action_id = post_recieved_data.Data.ActionId
            data.text = post_recieved_data.Data.Text // this is reassigned because by the time async call receives data .. data.text changes
          //  console.log("recieved data")
          //  console.log(post_recieved_data)
          //  console.log("data")
          //  console.log(data)
            dispatch(actions.todo_local_addTodo(data))
        })
        .fail(function() {
            console.log("Add todo failed")

            notify("error","Adding Todo Failed!")
            $("#preloader").fadeOut('slow');
            return todos_repository
        })
        .always(function() {
            $("#preloader").fadeOut('slow');
        });
}

let actions = {


    workspace_local_setActiveWorkspace: function workspace_local_setActiveWorkspace(id){
        return{
            type:"WORKSPACE_LOCAL_SET_ACTIVE_WORKSPACE",
            id:id
        }

    },

    workspace_local_moveWorkspace: function workspace_local_moveWorkspace(direction,id,workspaceData){
        return(dispatch)=>{

            if(id<workspaceData.length && id>=0)
                if(direction.toUpperCase()=="UP"&& id<workspaceData.length-1)
                {
                    dispatch(actions.workspace_local_setActiveWorkspace(id+1))
                }
                else if (direction.toUpperCase()=="DOWN" &&id>0)
                {
                    dispatch(actions.workspace_local_setActiveWorkspace(id-1))

                }

        }

    },

    workspace_local_returnWorkspaces: function workspace_local_returnWorkspaces(data){
        return{
            type:"WORKSPACE_LOCAL_RETURN_WORKSPACES",
            data:data
        }
     },

    workspace_local_async_getWorkspaces:function workspace_local_async_getWorkspaces(){
        return (dispatch) => {
            chrome.storage.local.get('workspace_list_after_login', function (data) {
                dispatch(actions.workspace_local_returnWorkspaces(data.workspace_list_after_login))
            });
        }
    },

    login_local_async_checkLoginAndWorkspaceData: function login_local_async_checkLoginAndWorkspaceData(){
        return (dispatch) => {
            dispatch(actions.todo_async_local_getTodo())
            chrome.storage.local.get('login_status', function (data)
            {
                dispatch(actions.login_returnLoginStatus(data.login_status))
                if(data.login_status)
                {
                    dispatch(actions.workspace_local_async_getWorkspaces())
                }
            });
        }
    },

    login_returnLoginStatus: function login_returnLoginStatus(bool){
        return{
            type:"LOGIN_RETURN_LOGIN_STATUS",
            bool:bool
        }
    },

    login_local_saveLoginStatus: function login_local_saveLoginStatus(bool){
        return{
            type:"LOGIN_LOCAL_SAVE_LOGIN_STATUS",
            bool:bool
        }
    },

    login_local_async_logout: function login_local_async_logout(){
        return (dispatch) => {
            dispatch(actions.workspace_local_setActiveWorkspace(0))
            dispatch(actions.login_logout())
        }
    },

    login_logout: function login_logout(){
        return{
            type:"LOGIN_LOGOUT"
        }
    },

    getTodo: function getTodo(data){
        return{
            type:"GET_TODO",
            data: data
        }
    },

    todo_async_remote_local_moveUpTodo: function todo_async_remote_local_moveUpTodo(data){
        return (dispatch)=>{
            if(data.is_remote==true){
                moveWeekplanTodo("UP",dispatch,data) // Up or Down
            }else{
                dispatch(actions.todo_local_moveUpTodo(data))
                notify("success","Todo Moved!")
            }
        }
    },

    todo_local_moveUpTodo: function todo_local_moveUpTodo(data){
        return{
            type:"TODO_LOCAL_MOVE_UP_TODO",
            todo_id: data.todo_id,
            workspace_local_id:data.workspace_local_id
        }
    },

    todo_async_remote_local_moveDownTodo: function todo_async_remote_local_moveDownTodo(data){
        return (dispatch)=>{
            if(data.is_remote==true){
                moveWeekplanTodo("DOWN",dispatch,data) // Up or Down
            }else{
                dispatch(actions.todo_local_moveDownTodo(data))
                notify("success","Todo Moved!")
            }
        }
    },

    todo_local_moveDownTodo: function todo_local_moveDownTodo(data){
        return{
            type:"TODO_LOCAL_MOVE_DOWN_TODO",
            todo_id: data.todo_id,
            workspace_local_id:data.workspace_local_id
        }
    },

    todo_async_remote_local_addTodo: function todo_async_remote_local_addTodo(data){
        return (dispatch) => {
           // console.log("inside todo_async_remote_local_addTodo")
           // console.log(data)
            if(data.is_remote){
              //  console.log("inside todo_async_remote_local_addTodo is remote")
                addWeekplanTodo(dispatch,data)
            } else
            {
              //  console.log("inside todo_async_remote_local_addTodo is not remote")
                notify("success","Adding Todo Successful!")
                dispatch(actions.todo_local_addTodo(data))
            }
        }
    },

    todo_local_addTodo: function todo_local_addTodo(data){
        return{
            type:"TODO_LOCAL_ADD_TODO",
            text: data.text,
            workspace_remote_id: data.workspace_remote_id,
            workspace_local_id:data.workspace_local_id,
            action_id:data.action_id
        }
    },

    todo_async_remote_local_completeTodo: function todo_async_remote_local_completeTodo(data){
        return(dispatch)=>{
            //console.log("in action")
            //console.log(data)
            let post_data = {}
            post_data.ActionId = data.action_id
            post_data.IsCompleted = !data.is_complete
            if(data.is_remote){
                $("#preloader").fadeIn('slow');
                $.post( "https://api.weekplan.net/v2/actions/complete",post_data, function() {})
                    .done(function() {
                        notify("success","Completing Todo Successful!")
                        dispatch(actions.todo_local_completeTodo(data))
                    })
                    .fail(function() {
                        notify("error","Completing Todo Failed!")
                        console.log("Completing Todo Failed")
                    })
                    .always(function() {
                        $("#preloader").fadeOut('slow');
                    });
            } else
            {
                //console.log("else block")
                notify("success","Completing Todo Successful!")
                dispatch(actions.todo_local_completeTodo(data))
            }

        }
    },

    todo_local_completeTodo: function todo_local_completeTodo(data){
        return{
            type:"TODO_LOCAL_COMPLETE_TODO",
            todo_id: data.todo_id,
            workspace_id:data.workspace_id
        }
    },

    todo_async_remote_local_deleteTodo: function todo_async_remote_local_deleteTodo(data){
        return (dispatch) => {
           if(data.is_remote){
                $("#preloader").fadeIn('slow');

                $.ajax({
                    method: "DELETE",
                    url: "https://api.weekplan.net/v2/actions/"+ data.action_id
                })
                    .done(function( msg ) {
                        notify("success","Deleting Todo Successful!")
                        dispatch(actions.todo_local_deleteTodo(data))
                    }).fail(function(){
                        notify("error","Error Deleting Todo!")
                        console.log("Delete Action Failed")
                    }).always(function(){
                        $("#preloader").fadeOut('slow');
                    });

            } else{
                dispatch(actions.todo_local_deleteTodo(data))
                notify("success","Deleting Todo Successful!")
            }
        }
    },

    todo_local_deleteTodo: function todo_local_deleteTodo(data){
        return{
            type:"TODO_LOCAL_DELETE_TODO",
            todo_id: data.todo_id,
            workspace_id:data.workspace_id
        }
    },

    todo_async_local_getTodo:function(){
        return (dispatch) => {

            chrome.storage.local.get('todos_repository', function (data) {
                if(data.todos_repository!=undefined && data.todos_repository!=null){
                    dispatch(actions.getTodo(data.todos_repository))
                }else{
                    let todos_data = [
                        {
                            id:0,
                            remote:false,
                            todos:[
                                {
                                    id:0,
                                    text:"something",
                                    complete:false
                                }
                            ],
                            workspace_id:null,
                            workspace_name:"local"
                        }
                    ];
                    saveLocalChrome("todos_repository",todos_data);
                }
            });
        }
    },

    jquery_dom_closeAllModals:function(){
        return{
            type:"JQUERY_DOM_CLOSE_ALL_MODALS",
        }
    },

    todo_async_remote_refresh:function(){
        return (dispatch) => {
            $("#preloader").fadeIn('slow');
            notify("info","Fetching Remote Weekplan Data!")


            $.get("https://api.weekplan.net/v2/workspaces").done(
                function (data) {
                    //console.log("getting worskpace done");
                    //console.log(data);
                    dispatch(actions.workspaceSetList(data))

                    let workspaceListData = data;
                    let date= new Date();
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let monthDay = date.getDate();
                    notify("success","Workspace Data Downloaded Successfully")

                    $.get("https://api.weekplan.net/v2/users/?Timezone=360&Year="+ year+ "&Month="+month+"&Day=" +monthDay+"&Skip=0&Take=").done(
                        function(data){
                            //console.log("task lists")
                            //console.log(data);
                            notify("success","TaskLists Downloaded Successfully")

                            let weekDays = data.WeekPlanDto.WeekDays;

                            weekDays.forEach(function(weekDayselement,index,array){
                                if(weekDayselement.Date!=null){

                                    if( weekDayselement.Date.Day == monthDay){

                                        let workspaceAndActionsList = {
                                            workspaceList:workspaceListData,
                                            actionsList:weekDayselement.Actions.reverse()
                                        }
                                        dispatch(actions.todoRemoteDataSave(workspaceAndActionsList))
                                    }
                                }
                            })
                        }
                    ).fail(function () {
                        notify("error","Failed Loading Tasklists")
                        //console.log("failed fetching task list");

                        dispatch(actions.login_logout())
                    }).always(function(){
                        $("#preloader").fadeOut('slow');
                    })
                }
            ).fail(function(err){
                //console.log(err)
                notify("error","Failed Loading Weekplan Data")
                //console.log("Failed Loading Weekplan Data")
                dispatch(actions.login_logout())
            }).always(function(){
                $("#preloader").fadeOut('slow');
            })
        }
    },

    login_async_remote_weekPlan:function(data){
        return (dispatch) => {
            //console.log("login try")
            //console.log(data)
            var url = "https://api.weekplan.net/v2/sessions";
            var dataToSend = { EmailAddress: "notun.id.rocky@gmail.com", Password: 'kothin007' }
            var dataType = 'application/x-www-form-urlencoded';




                $("#preloader").fadeIn('slow');
    
                $.post("https://api.weekplan.net/v2/sessions", { EmailAddress: data.email, Password: data.password }).done(function (data,textStatus,xmlHttp) {
                   // console.log("textStatus")
                   // console.log(textStatus)
                   // console.log("xmlHttp")
                   // console.log(xmlHttp)
                    saveLocalChrome("login_info",data);
                    dispatch(actions.login_local_saveLoginStatus(true))
    
                    //console.log("success");
                    //console.log(data);
                    notify("success","Login Successful!")
                    $("#preloader").fadeOut('slow');
    
    
    
    
                        getRemoteDataWeekplan(dispatch)
    
    
                    dispatch(actions.jquery_dom_closeAllModals())
                    dispatch(actions.jquery_dom_closeLoginModal())


    
                }).fail(function () {
                    notify("error","Login Failed!")
                    $("#preloader").fadeOut('slow');
                    console.log("Login failed");
                    dispatch(actions.jquery_dom_closeAllModals())
                });
            // console.log("hi")
        }
    },

    jquery_dom_closeLoginModal: function(){
        return{
            type:"JQUERY_CLOSE_LOGIN_MODAL",
        }

    },

    workspaceListWorkspace:function(){
        return{
            type:"WORKSPACE_LIST_WORKSPACE"
        }
    },

    workspaceSetList:function(data){
        return{
            type:"WORKSPACE_SET_LIST",
            data:data
        }
    },

    todoRemoteDataSave: function(data){
        return{
            type:"TODO_REMOTE_DATA_SAVE",
            data:data
        }
    },

    todo_async_remote_local_addLocalTaskListToRemote(workspace_local_id,todos_repository){
        return(dispatch)=>{
            let data=[]
            data.workspace_local_id=workspace_local_id
            data.workspace_remote_id=todos_repository[workspace_local_id].workspace_id
            let todos_to_post = todos_repository[0].todos;
            let length = todos_to_post.length
            let post_data={};
            function post(id){
                if(id<0){
                    return
                }
                let date= new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let monthDay = date.getDate();
                let postDate = year + "-" + month + "-" + monthDay
                let post_data ={
                    IsAction:true,
                    Date:postDate,
                    WorkspaceId:todos_repository[workspace_local_id].workspace_id,
                    Text:todos_to_post[id].text,
                    HtmlText:todos_to_post[id].text,
                    IsCompleted:false

                };
                $.post( "https://api.weekplan.net/v2/actions/",post_data, function() {})
                    .done(function(post_recieved_data) {
                        notify("success","Adding Todo Successful!")
                        data.action_id = post_recieved_data.Data.ActionId
                        data.text = post_recieved_data.Data.Text // this is reassigned because by the time async call receives data .. data.text changes
                        dispatch(actions.todo_local_addTodo(data))
                        post((id-1))

                    })
                    .fail(function() {
                        notify("error","Adding Todo Failed!")
                        console.log("Add Action Failed")
                        $("#preloader").fadeOut('slow');
                        return todos_repository
                    })
                    .always(function() {
                        $("#preloader").fadeOut('slow');
                    });

            }
            post(length-1)

            /* todos_repository[0].todos.reverse().forEach((element,index,array)=>{
                 data.text = element.text
                 data.workspace_local_id = workspace_local_id
                 data.workspace_remote_id = todos_repository[workspace_local_id].workspace_id
                 data.is_remote = true
                 console.log(data)
                 //dispatch(actions.todo_async_remote_local_addTodo(data))
                 addWeekplanTodo(dispatch,data);
             })*/
        }
    }
}

export default actions