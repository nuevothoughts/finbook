<?php

include "db.php";
$user=json_decode(file_get_contents('php://input'));  

$id = $user->id;
//echo $id;

$result=0;
$row=$db->tbl_expense()->where("id= ?", $id);

$result = $row->delete();

if($result!=0){
    echo $id;
}
 