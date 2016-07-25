import $ from "jquery"

export default function jquery_close_modals_via_events(event){
    let taskModal = document.getElementById('taskModal');
    let loginModal = document.getElementById('loginModal');
    let ChangeWorkSpaceModal = document.getElementById('ChangeWorkSpaceModal');
    if (event.target == taskModal) {
        $("#taskModal").addClass('hide');

        $("#taskModal").removeClass('show');
        setTimeout(function(){ $("#taskModal").addClass('hidden');  }, 500);

    }
    if (event.target == loginModal) {

        $("#loginModal").addClass('hide');

        $("#loginModal").removeClass('show');
        setTimeout(function(){ $("#loginModal").addClass('hidden');  }, 500);

    }
    if (event.target == ChangeWorkSpaceModal) {
        $("#ChangeWorkSpaceModal").addClass('hide');

        $("#ChangeWorkSpaceModal").removeClass('show');
        setTimeout(function(){ $("#ChangeWorkSpaceModal").addClass('hidden');  }, 500);

    }

}

