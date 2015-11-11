$(document).ready(function() {
    $(function(){
      $("#navbars").load("navbars.html");
    });

    $.ajax({
        url: "/api/load-messages",
        method: "post",
        success: function(data){
            $("#message_counter").html(data.messages.length);
            if (data.messages.length == 1)
                $("#message_counter_label").html("Message");
            else
                $("#message_counter_label").html("Messages");
        },
        failure: function(){
            console.log("error loading message counter");
        },
    });

    $.ajax({
        url: "/api/load-friends",
        method: "post",
        success: function(data){
            if(data.success == true) {
                $("#friend_counter").html(data.friends.length);
                if (data.friends.length == 1)
                    $("#friend_counter_label").html("Friend");
                else
                    $("#friend_counter_label").html("Friends");
            } else {
                console.log("error getting friends data");
            }
        }
    });

    // trying to invoke a click on friends list section of navbar, doesnt work yet
    $('#view_friends_button').click(function() {
        var a = document.getElementById("friends");
        var evnt = a["onclick"];

        if (typeof(evnt) == "function") {
            evnt.call(a);
        }
    });
});