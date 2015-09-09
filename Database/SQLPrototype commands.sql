USE test;

CREATE TABLE Users
(
	UserID int UNSIGNED NOT NULL AUTO_INCREMENT,
	UserName varchar (16) NOT NULL,
	Email varchar (255),
	Password varchar (255) NOT NULL,
	PRIMARY KEY (UserID),
	UNIQUE (UserName)
);

INSERT INTO Users (UserID, UserName, Email, Password) 
VALUES (NULL, "user1", "user1@mst.edu", "123456");

INSERT INTO Users (UserID, UserName, Email, Password) VALUES 
(NULL, "TetrisMan", "TetrisMan@gmail.com", "apples");

INSERT INTO Users (UserID, UserName, Email, Password) VALUES 
(NULL, "LeRedditXD", "LeTip@mlady.com", "Lolcats");

INSERT INTO Users (UserID, UserName, Email, Password) VALUES 
(NULL, "LordBritish", "LordBritish@ultima.com", "FireField");

INSERT INTO Users (UserID, UserName, Email, Password) VALUES 
(NULL, "JTuggle", NULL , "BadPassword123");

INSERT INTO Users (UserID, UserName, Email, Password) VALUES 
(NULL, "JTuggle", "jmt275@mst.edu" , "BadPassword123");



