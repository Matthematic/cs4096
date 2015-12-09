$(document).ready(function() {
    var user_stats;

    // get data for all the crap
    $.ajax({
        url: "/api/get_user_stats",
        datatype: 'json',
        method: "post",
        success: function(res){
            user_stats = res.stats;
            console.log("Received user stats");
            console.log(user_stats);
            make_pie_chart(user_stats[0].wins, user_stats[0].games_played);
            make_average_data_table(user_stats[0]);
        },
        failure: function(){
            console.log("Error getting user stats");
        },
    });
});

function make_pie_chart(wins, games_played) {
    $(function() {
        var data = [{
            label: "Wins",
            data: wins/games_played
        }, {
            label: "Losses",
            data: 1 - wins/games_played
        }
        ];

        var plotObj = $.plot($("#flot-pie-chart"), data, {
            series: {
                pie: {
                    show: true
                }
            },
            grid: {
                hoverable: true
            },
            tooltip: true,
            tooltipOpts: {
                content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                shifts: {
                    x: 20,
                    y: 0
                },
                defaultTheme: false
            }
        });

    });
}

function make_average_data_table(stats) {
    $('#wins').html(stats.wins);
    $('#games_played').html(stats.games_played);
    $('#points').html(stats.total_points);
    $('#rows_cleared').html(stats.total_rows_cleared);
    //$('#elo').html(stats.elo);


}