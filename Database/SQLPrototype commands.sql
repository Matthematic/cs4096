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
VALUES (NULL, "tuglight", "rekt@tug.gg", "apples");

INSERT INTO Users (UserID, UserName, Email, Password) VALUES 
(NULL, "tuglight", "rekt@tug.gg", "apples");