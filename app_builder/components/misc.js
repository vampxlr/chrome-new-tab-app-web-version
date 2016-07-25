

export function misc() {

    var taskModal = document.getElementById('taskModal');
    var loginModal = document.getElementById('loginModal');
    var ChangeWorkSpaceModal = document.getElementById('ChangeWorkSpaceModal');


// Get the button that opens the modal
    var taskBtn = $(".task");
    var loginBtn = $(".login");
    var ChangeWorkSpaceModalBtn = $(".change-workspace-btn");

// Get the <span> element that closes the modal
    var close = $(".close");

// When the user clicks the button, open the modal
    /* btn.each().onclick = function() {
     modal.style.display = "block";
     }
     */
    taskBtn.each( function(index) {
        $(this).click( function() {

            $("#taskModal").addClass("show");
            $("#taskModal").removeClass("hide");
            $("#taskModal").removeClass("hidden");
            $("#settings-list-drawer").removeClass("is-visible");
            $(".mdl-layout__obfuscator").removeClass("is-visible");

        })})

    loginBtn.each( function(index) {
        $(this).click( function() {
            //loginModal.style.display="block";
            $("#loginModal").addClass("show");
            $("#loginModal").removeClass("hide");
            $("#loginModal").removeClass("hidden");
            $("#settings-list-drawer").removeClass("is-visible");
            $(".mdl-layout__obfuscator").removeClass("is-visible");
        })})


    ChangeWorkSpaceModalBtn.each( function(index) {
        $(this).click( function() {

            $("#ChangeWorkSpaceModal").addClass("show");
            $("#ChangeWorkSpaceModal").removeClass("hide");
            $("#ChangeWorkSpaceModal").removeClass("hidden");
            $("#settings-list-drawer").removeClass("is-visible");
            $(".mdl-layout__obfuscator").removeClass("is-visible");
        })})



// When the user clicks on <span> (x), close the modal
    /* span.onclick = function() {
     taskModal.style.display = "none";
     }
     */
    close.click( function() {

        jquery_dom_closeAllModals();
    })


// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        closeModalsViaEvents(event);
    }

    function closeModalsViaEvents(event){
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
    function jquery_dom_closeAllModals(){
        $("#loginModal").removeClass('show');
        $("#taskModal").removeClass('show');
        $("#ChangeWorkSpaceModal").removeClass('show');


        $("#ChangeWorkSpaceModal").addClass('hide');
        $("#loginModal").addClass('hide');
        $("#taskModal").addClass('hide');


        setTimeout(function(){ $("#ChangeWorkSpaceModal").addClass('hidden');  }, 500);
        setTimeout(function(){ $("#loginModal").addClass('hidden');  }, 500);
        setTimeout(function(){ $("#taskModal").addClass('hidden');  }, 500);

    }

}

