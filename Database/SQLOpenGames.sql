USE test;

CREATE TABLE OpenGames
(
	user_id int UNSIGNED NOT NULL AUTO_INCREMENT,
	username varchar (16) NOT NULL,
	elo int UNSIGNED NOT NULL,
	gametype varchar(25) NOT NULL,
	queuetype varchar(16) NOT NULL,
	PRIMARY KEY (user_id),
	UNIQUE (user_id, queuetype, gametype)
);

INSERT INTO OpenGames(username, elo, gametype, queuetype)
SELECT 'matthew', 1800, 'Classic', 'Ranked'
UNION ALL SELECT 'JTuggle', 1847, 'Classic', 'Ranked'
UNION ALL SELECT 'LordBritish', 1900, 'Classic', 'Ranked'
UNION ALL SELECT 'LeRedditXD', 2350, 'Classic', 'Ranked'
UNION ALL SELECT 'TetrisMan', 1235, 'Classic', 'Ranked'
UNION ALL SELECT 'user1', 1700, 'Classic', 'Ranked'
UNION ALL SELECT 'matthew', 1800, 'Classic', 'Social'
UNION ALL SELECT 'JTuggle', 1847, 'Classic', 'Social'
UNION ALL SELECT 'LordBritish', 1900, 'Classic', 'Social'
UNION ALL SELECT 'LeRedditXD', 2350, 'Classic', 'Social'
UNION ALL SELECT 'TetrisMan', 1235, 'Classic', 'Social'
UNION ALL SELECT 'user1', 1700, 'Classic', 'Social'


