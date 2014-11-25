<?php

include "db.php";
$user=json_decode(file_get_contents('php://input'));  

$id = $user->user_id;

$result=0;
$row=$db->tbl_sales()->where("user_id= ?", $id);

$result = $row->delete();

if($result!=0){
    echo $id;
}