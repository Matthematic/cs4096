CREATE TABLE UserStats(
    `username` varchar(16) NOT NULL,
    `wins` int UNSIGNED,
    `games_played` int UNSIGNED,
    `elo` int UNSIGNED,
    `total_points` int UNSIGNED,
    `total_rows_cleared` int UNSIGNED
);