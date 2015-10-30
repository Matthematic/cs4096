(function() {
    $.ajax({
        url: "/api/load-messages",
        method: "post",
        success: function(data){
            if(data.success == true) {
                console.log("message data received");
                console.log(data.messages.length);
                console.log(data);

                for( var i=0; i < data.messages.length; i++ )
                {
                    $('#message_list').prepend('<li>' +
                        '<a href="#">' +
                        '<div>' +
                        '<strong>From:' + data.messages[i].sender + '</strong>' +
                        '<span class="pull-right text-muted">' +
                        '<em>To:' + data.messages[i].receiver +'</em>' +
                        '</span></div>' +
                        '<div>' + data.messages[i].content + '</div></a></li>'
                    );
                }
            } else {
                console.log("error getting message data");
            }
        }
    });

    $.ajax({
        url: "/api/load-friends",
        method: "post",
        success: function(data){
            if(data.success == true) {
                console.log("friend data received");
                console.log(data.friends.length);
                console.log(data);

                for( var i=0; i < data.friends.length; i++ )
                {
                    $('#friends_list').append('<li>' +
                        '<a href="#">' +
                        '<div>' + data.friends[i].friend + '</div></a></li>'
                    );
                }
                //$('#friends_list').append('<input type="text" id="new_friend_username" placeholder="Enter A Username" style="float:left;" >' +
                  //  '<input type="button" id="add_friend" value="Add Friend" class="btn btn-success"  >');
            } else {
                console.log("error getting friends data");
            }
        }
    });


    $.ajax({
        url: "/api/load-username-display",
        method: "post",
        success: function(data){
            console.log("data received");
            console.log(data);
            $("#userNameDisplay").html(function(index, oldhtml) {
                return data + oldhtml;
            });
        },
        callback: function(){
            console.log("data received");
        },
        failure: function(){
            console.log("error getting data");
        },
    });

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    }

    function deleteAllCookies() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    // check for cookie token
    var token = getCookie('token');
    if(token != "") { // if logged in
        $('#profile-logged-out').hide();
    } else { // if logged out
        $('#alerts').hide();
        $('#tasks').hide();
        $('#messages').hide();
        $('#friends').hide();
        $('#profile-logged-in').hide();
    }



})()