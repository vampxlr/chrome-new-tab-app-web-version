import jquery_close_all_modals from '../../components/utils/jquery_close_all_modals'

export default function jqueryReducer(jqueryData=[],action){
    let new_jquery_data = [];

    switch(action.type){

        case'JQUERY_DOM_CLOSE_ALL_MODALS':

            jquery_close_all_modals();

            return jqueryData;


        case 'JQUERY_CLOSE_LOGIN_MODAL':
            $("#loginModal").removeClass('show');
            $("#loginModal").addClass('hide');
            setTimeout(function(){ $("#loginModal").addClass('hidden');  }, 500);

            return jqueryData;

        default:
            //console.log("in jquery reducer")
            return jqueryData
    }
}