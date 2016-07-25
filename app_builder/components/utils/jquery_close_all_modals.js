

export default function jquery_close_all_modals(){

        $("#taskModal").addClass('hide');

        $("#taskModal").removeClass('show');
        setTimeout(function(){ $("#taskModal").addClass('hidden');  }, 500);



        $("#loginModal").addClass('hide');

        $("#loginModal").removeClass('show');
        setTimeout(function(){ $("#loginModal").addClass('hidden');  }, 500);

        $("#ChangeWorkSpaceModal").addClass('hide');

        $("#ChangeWorkSpaceModal").removeClass('show');
        setTimeout(function(){ $("#ChangeWorkSpaceModal").addClass('hidden');  }, 500);


}

