import jquery_close_all_modals from './jquery_close_all_modals'
import jquery_close_modals_via_events from './jquery_close_modals_via_events'
import jquery_task_btn_click_events from './jquery_task_btn_click_events'
import jquery_login_btn_click_events from './jquery_login_btn_click_events'
import jquery_change_workspace_btn_click_events from './jquery_change_workspace_btn_click_events'

export default function jquery_initial_event_triggers() {


    jquery_task_btn_click_events();
    jquery_login_btn_click_events();
    jquery_change_workspace_btn_click_events();


// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        jquery_close_modals_via_events(event);
    }


    let close = $(".close");
    close.click( function() {

        jquery_close_all_modals();
    })



}

