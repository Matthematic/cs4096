$(document).ready(function() {
    $(function(){
        $("#navbars").load("navbars.html");
    });


    $('#ranked_table').DataTable();
    load_table_data('ranked');
    load_table_data('social');

    var ranked_table = $('#ranked_table').DataTable();
    var social_table = $('#social_table').DataTable();

    $('#ranked_table tbody').on( 'click', 'tr', function () {
        var row_data = ranked_table.row( this ).data();
        var username = get_user();
        if (row_data[0] != username) {
            alert( "Game starting\n" + "Player: " + row_data[0] + "\tGametype: " + row_data[2]);
            window.location.href="/game.html";
        }
        else {
            alert( "You can't accept your own game!");
        }
    } );

    $('#social_table tbody').on( 'click', 'tr', function () {
        var row_data = social_table.row( this ).data();
        alert( "Game starting\n" + "Player: " + row_data[0] + "\tGametype: " + row_data[2]);
        window.location.href="/game.html";
    } );

});

function create_game(queuetype) {
    console.log("creating " + queuetype + " game");

    var game_data = {"queuetype": queuetype};
    console.log(game_data);
    $.ajax({
        url: "/api/create_game",
        data: game_data,
        datatype: 'json',
        method: "post",
        success: function(){
            console.log("Game created successfully");
        },
        callback: function(){
            console.log("Game created successfully");
        },
        failure: function(){
            console.log("Could not create a game");
        },
    });

    load_table_data(queuetype);

}

var send_play_request = function() {
    var inviteForm = $("#inviteForm");
    var data = inviteForm.serializeArray();
    console.log(data);
    var new_data = {};

    var i;
    for (i = 0; i < data.length; i++) {
        new_data[data[i]["name"]] = data[i]["value"];
    }
    console.log(new_data);
    console.log(data[0]["value"]);
    var username = get_user();
    console.log("username value " + username);


    if (data[0]["value"] != username) {

        $.ajax({
            url: "/api/invite-user",
            datatype: "json",
            data: new_data,
            method: "post",
            success: function(){
                alert("invite sent");
                console.log("invite sent");
            },
            failure: function(){
                alert("invite not sent");
                console.log("invite not sent");
            },
        });
    }
    else {
        alert("You can't invite yourself!");
    }

    // for some reason putting these inside the ajax's success function wouldn't work
    $('#username').val('');
    $('#email').val('');

};

function get_user() {
    var username = $("#userNameDisplay").html(); // will return some html element that we dont want
    var n = username.search("<");
    username = username.substring(0, n);
    username = username.trim();
    return username;
}


var load_table_data = function(queuetype) {
    var t = $('#' + queuetype + '_table').DataTable();
    t.clear().draw();
    $.ajax({
        url: "/api/load-open-games-" + queuetype,
        method: "post",
        success: function(data){
            console.log("data received");
            console.log(data);

            for( var i=0; i < data.length; i++ )
            {
                if (data[i].username != username)
                t.row.add( [
                    data[i].username,
                    data[i].elo,
                    data[i].gametype,
                ] ).draw( true );
            }

        },
        callback: function(){
            console.log("data received");
        },
        failure: function(){
            console.log("error getting open game data");
        },
    });
};