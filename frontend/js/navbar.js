/*$('#message_list').prepend(
    '<li>' +
        '<a href="#">' +
            '<div>' +
                '<strong>Matt Carr2</strong>' +
                '<span class="pull-right text-muted">' +
                    '<em>Yesterday2</em>' +
                '</span>' +
            '</div>' +
        '<div>test</div>' +
        '</a>' +
    '</li>'
);
*/
//$("#" + queuetype + "_tbody tr").remove();
(function() {
    $.ajax({
        url: "/api/load-messages",
        method: "post",
        success: function(data){
            if(data.success == true) {
                console.log("data received");
                console.log(data);

                for( var i=0; i < data.length; i++ )
                {
                    $('#message_list').prepend('<li>' +
                        '<a href="#">' +
                        '<div>' +
                        '<strong>From:' + data[i].sender + '</strong>' +
                        '<span class="pull-right text-muted">' +
                        '<em>To:' + data[i].receiver +'</em>' +
                        '</span></div>' +
                        '<div>' + data[i].content + '</div></a></li>'
                    );
                }
            } else {
                console.log("error getting message data");
            }

        },
        callback: function(){
            console.log("message data received");
        },
        failure: function(){
            console.log("error getting message data");
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

    // check for cookie token
    var token = getCookie('token');
    if(token != "") {
        $('#profile-logged-out').hide();
    } else {
        $('#alerts').hide();
        $('#tasks').hide();
        $('#messages').hide();
        $('#profile-logged-in').hide();
    }



})()