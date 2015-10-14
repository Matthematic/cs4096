
$(document).ready(function() {
    $(function(){
      $("#navbars").load("navbars.html", function() {
          $('#sidebar').hide();
      });
    });

    $('#signup-button').click(function() {
        window.location.href="registration.html";
    });

});