USE test;

CREATE TABLE Friends
(
	`user_id` int unsigned NOT NULL,
	`friend_id` int unsigned NOT NULL,
	PRIMARY KEY (`user_id`,`friend_id`),
	KEY `FK_FRIENDS_1` (`user_id`),
	KEY `FK_FRIENDS_2` (`friend_id`),
	CONSTRAINT `FK_FRIENDS_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`UserID`),
	CONSTRAINT `FK_FRIENDS_2` FOREIGN KEY (`friend_id`) REFERENCES `Users` (`UserID`)
);