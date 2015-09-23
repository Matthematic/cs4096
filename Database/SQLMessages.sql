USE test;

CREATE TABLE Messages
(
	id int UNSIGNED NOT NULL AUTO_INCREMENT,
	sender varchar (16) NOT NULL,
	receiver varchar(16) NOT NULL,
	`subject` varchar(256),
	content varchar(512) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO Messages(sender, receiver, `subject`, content)
SELECT 'matthew', 'FatalCatharsis', 'test message', 'This is a test message in the messages table'
UNION ALL SELECT 'JTuggle', 'matthew', 'test message2', 'This is a second test message in the messages table';
