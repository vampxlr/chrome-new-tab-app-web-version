// Get the modal
var taskModal = document.getElementById('taskModal');
var loginModal = document.getElementById('loginModal');
var ChangeWorkSpaceModal = document.getElementById('ChangeWorkSpaceModal');

var modals = $(".modal");
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
       taskModal.style.display="block";
       $("#settings-list-drawer").removeClass("is-visible");
       $(".mdl-layout__obfuscator").removeClass("is-visible");

})})

loginBtn.each( function(index) {
    $(this).click( function() {
       loginModal.style.display="block";
       $("#settings-list-drawer").removeClass("is-visible");
       $(".mdl-layout__obfuscator").removeClass("is-visible");
})})


ChangeWorkSpaceModalBtn.each( function(index) {
    $(this).click( function() {
        ChangeWorkSpaceModal.style.display="block";
        $("#settings-list-drawer").removeClass("is-visible");
        $(".mdl-layout__obfuscator").removeClass("is-visible");
    })})



// When the user clicks on <span> (x), close the modal
/* span.onclick = function() {
taskModal.style.display = "none";
}
 */
close.each( function(index) {
    $(this).click( function() {
		
       modals.each( function(index) {
    $(this).css("display","none");
	
	})})
})


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == taskModal) {
        taskModal.style.display = "none";
        
    }
    if (event.target == loginModal) {
       
        loginModal.style.display = "none";
    }
    if (event.target == ChangeWorkSpaceModal) {

        ChangeWorkSpaceModal.style.display = "none";
    }
}

