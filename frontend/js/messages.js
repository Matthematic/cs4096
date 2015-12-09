$(document).ready(function() {
    $(function(){
        $("#navbars").load("navbars.html");
    });

    $('#messages_table').DataTable( {
        "order": [[ 3, "desc" ]] // this lets the messages table sort by primary key, which effectively sorts by the time the message was sent
    });                          // Previously the table would sort by username by default, so a new invite wouldn't appear at the top

    console.log('loading messages');
    var num_messages = load_messages();

    var message_dtos = []; // array to hold message data objects so we can reference their id's without hitting the database again
});

var accept_friend_request = function(row_num) {
    var table = $('#messages_table').DataTable();

    alert( 'You have accepted the friend request from ' + table.row(row_num).data()[0] );
    var new_friend = {'username' : table.row(row_num).data()[0]};
    $.ajax({
        url: "/api/add_friend",
        data: new_friend,
        datatype: 'json',
        method: "post",
        success: function(res){
            if (res.success) {
                console.log("Friend added successfully");
                remove_message(row_num, 1);
            }
        },
        failure: function(){
            console.log("Could not add friend");
        },
    });
};


var accept_invite = function(row_num, gameid) {
    var table = $('#messages_table').DataTable();

    //alert( 'You have accepted the invite from ' + table.row(row_num).data()[0] );
    remove_message(row_num);
    window.location.href="/game.html?gameid=" + gameid;
};

var remove_message = function(row, reload) {
    reload = reload || 0; // forces reload to be optional
    var table = $('#messages_table').DataTable();

    var message_dto = message_dtos[row];
    $.ajax({
        url: "/api/remove_friend_request",
        data: message_dto,
        method: "post",
        success: function(res){
            if (res.success) {
                console.log("Message removed successfully");
                if (reload)
                    location.reload();
            }
            else
                console.log("Could not remove message");
        },
        failure: function(){
            console.log("An error has occurred");
        },
    });
};

var load_messages = function() {
    var t = $('#messages_table').DataTable();
    t.clear().draw();
    $.ajax({
        url: "/api/load-messages",
        method: "post",
        success: function(data){
            console.log(data);
            message_dtos = data.messages;
            console.log("dtos:");
            console.log(message_dtos);
            // data is an arbitrary object, not an array, thus data.length returns undefined. Must use this instead
            for( var i=0; i < Object.keys(data.messages).length; i++ )
            {
                button_str = 'message';
                if (data.messages[i].type =='friend_request') {
                    button_str = '<input type="button" id="accept_' + data.messages[i].type  + '_' + i + '" value="Accept" class="btn btn-success" onClick="accept_' + data.messages[i].type + '(' + i + ')">';
                }
                else if (data.messages[i].type == 'invite') {
                    button_str = '<input type="button" id="accept_' + data.messages[i].type  + '_' + i + '" value="Accept" class="btn btn-success" onClick="accept_' + data.messages[i].type + '(' + i + ', ' + data.messages[i].gameid + ')">';
                }
                button_str += ' <input type="button" id="reject_invite_' + i + '" value="Reject" class="btn btn-danger" onClick="remove_message(' + i + ', 1)">';
                t.row.add( [
                    data.messages[i].sender,
                    data.messages[i].subject,
                    data.messages[i].content,
                    button_str,
                    data.messages[i].timestamp,
                ] ).draw( true );
            }
            return Object.keys(data.messages).length;
        },
        callback: function(){
            console.log("message data received");
        },
        failure: function(){
            console.log("error getting message data");
        },
    });
};