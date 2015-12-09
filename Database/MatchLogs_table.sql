CREATE TABLE MatchLogs(
    `match_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `gametype` varchar(16) NOT NULL,
    `player1` varchar (16) NOT NULL,
    `player2` varchar (16) NOT NULL,
    `winner` varchar (16) NOT NULL,
    `p1_rows_cleared` int UNSIGNED NOT NULL,
    `p2_rows_cleared` int UNSIGNED NOT NULL,
    `p1_points` int UNSIGNED NOT NULL,
    `p2_points` int UNSIGNED NOT NULL,
    `game_length` int UNSIGNED NOT NULL,
    `timestamp` DATETIME NOT NULL,

    PRIMARY KEY (`match_id`)
);