UPDATE users
SET pw=$3,
    temppassword=null,
    tempexpiration=null,
    lastlogin=$4
WHERE user_id = $1
AND email = $2