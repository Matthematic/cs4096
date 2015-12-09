USE test;

CREATE TABLE Messages
(
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `sender` varchar (16) NOT NULL,
    `receiver` varchar(16) NOT NULL,
    `subject` varchar(256),
    `content` varchar(512) NOT NULL,
    `type` varchar(16) NOT NULL,
    `timestamp` DATETIME,
    `gameid` int UNSIGNED,
    PRIMARY KEY (id)
);