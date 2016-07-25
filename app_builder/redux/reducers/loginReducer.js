

function saveLocalChrome(to,data)
{


    if(location.hostname!='localhost')
    {
        //chrome.storage.local.set({[to]:data});

    }
}

export default function loginReducer(login=[],action){
    let new_login_state = [];
    var array =login;
    var temp;
    switch(action.type){

        case'LOGIN_CHECK_LOGIN':


            new_login_state.status=action.bool;
            return new_login_state;

        case'LOGIN_LOGOUT':
            saveLocalChrome("login_status",false);

            new_login_state.status=false;
           // console.log("logout action fired");
            return new_login_state;

        case'CHECK_LOGIN':
            new_login_state.status=false;
            return new_login_state;


       case 'LOGIN_LOCAL_SAVE_LOGIN_STATUS':
            new_login_state.status=action.bool
           saveLocalChrome("login_status",action.bool);
            return new_login_state;

        case 'LOGIN_RETURN_LOGIN_STATUS':
            new_login_state.status = action.bool;
           // console.log("LOGIN_RETURN_LOGIN_STATUS action fired");
           // console.log(action.bool);
            return new_login_state;
        default:
           // console.log("in login")
            return login
    }
}