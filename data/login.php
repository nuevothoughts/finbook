<?php

include "db.php";
// taks the input from the user object and assig it to the $user variable
$user = json_decode(file_get_contents('php://input')); //get user from json header

// email and pass is a variable which is given by the user
$email = $user->email;
$pass = md5($user->password);


$userid=0;
$query = $db->tbl_user->select("id")->where("email","$email")->where("password","$pass");
//echo $row["user_id"];
foreach($query as $rowuser)
{
   $userid=$rowuser["id"];
 
}
// if userid is not zero then we create a session
if($userid>0) 
{
   // $db->tbl_user
    session_start();
    $_SESSION['uid']=$userid;
    print $_SESSION['uid'];
 
    
}
else{
   echo 0;  
}

