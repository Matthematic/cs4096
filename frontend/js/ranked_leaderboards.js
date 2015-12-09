$(document).ready(function() {
    var leaderboard;

    $.ajax({
        url: "/api/get_ranked_leaderboard",
        datatype: 'json',
        method: "post",
        success: function(res){
            if (res.success) {
                leaderboard = res.leaderboard;
                console.log("Received ranked leaderboard");
                console.log(leaderboard);
            }
            else console.log("Error getting ranked leaderboard");
        },
        failure: function(){
            console.log("Error getting ranked leaderboard");
        },
    });

});