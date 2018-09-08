INSERT INTO users
(pw, temppassword, tempexpiration, lastlogin)
VALUES
($1, null, null, $2)