function saveLocalChrome(to,data)
{
    if(location.hostname!='localhost')
    {
        //chrome.storage.local.set({[to]: data});
    }
}



export default function workspaceReducer(workspaceData=[],action){
    let new_workspace_data = [];

    switch(action.type){

        case'WORKSPACE_GET_WORKSPACES':
           // console.log(workspaceData)
            return workspaceData

        case'WORKSPACE_LIST_WORKSPACE':

            new_workspace_data = [       {
                id:0,
                name:"remote workspace",
                active:false
            },
                {
                    id:1,
                    name:"local workspace",
                    active:true
                }];

            return new_workspace_data;

        case 'WORKSPACE_SET_LIST':
          //  console.log("element");
            let new_workspace_data = [

                {
                    id:0,
                    name:"local workspace",
                    remote:false,
                    active:true
                }
            ]

        action.data.forEach(function(element, index, array){


          //  console.log(element.Name);
            let new_element = {
                id:index+1,
                name:"remote " + element.Name,
                remote:true,
                remote_object: element,
                active:false
            }
            new_workspace_data.push(new_element)
        })
            console.log(workspaceData)
            console.log(new_workspace_data)
            if(workspaceData.length !=new_workspace_data.length){
                saveLocalChrome("workspace_list_after_login",new_workspace_data)

                return new_workspace_data
            }else{
                return workspaceData
            }



        case 'WORKSPACE_LOCAL_RETURN_WORKSPACES':
            new_workspace_data=action.data
           // console.log("in workspace reducer");
           // console.log(new_workspace_data);
            return new_workspace_data
        case 'WORKSPACE_LOCAL_SET_ACTIVE_WORKSPACE':
            new_workspace_data = [...workspaceData]
            workspaceData.forEach(function(element,index,array){
                new_workspace_data[index]=workspaceData[index];
                new_workspace_data[index].active = (element.id==action.id)
              //  console.log("new_workspace_data[index]")
              //  console.log(new_workspace_data[index])
            })
            saveLocalChrome("workspace_list_after_login",new_workspace_data)

            return new_workspace_data
        default:
           // console.log("in workspace reducer")
            return workspaceData
    }
}