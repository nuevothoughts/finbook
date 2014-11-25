<?php

include "db.php";
$user=json_decode(file_get_contents('php://input'));  



$paid = $user->paid;
$type = $user->transaction_type;
$userRef = $user->userRef;
$description = $user->description;
$status = $user->status;
$remark = $user->remark;
$amt = $user->amt;
$date = $user->date;
$id = $user->user_id;

//echo $id;

$string=$date;
$last_space = strrpos($string,'T');
$last_word = substr($string, $last_space);
$date_chunk = substr($string, 0, $last_space);


$incremented_date = strtotime("+1 day", strtotime($date_chunk));
$selected_date = date("Y-m-d", $incremented_date);

date_default_timezone_set('Asia/Calcutta');
$dateTime = $selected_date." ". date('h:i:s');

$row2=$db->tbl_sales_type()->select("id")->where("sale_type= ?",$type);
foreach($row2 as $id2){
    $type_id = $id2["id"];
} 

$result=0;

$row=$db->tbl_expense()->where("id = ?",$id);

    $data = array(
        "transaction_date" => $dateTime,
        "tbl_sales_type_id" => $type_id,
        "transaction_refrence_no" => $userRef,
        "Paid_to" => $paid,
        "description" => $description,
        "remarks" => $remark,
        "amount" => $amt,
        "status" => $status
        
    );
  $result = $row->update($data);
 // echo $result .'hello';
   
   
    
    
    if($result!=0){
        $arr1 = array(
            "id" => $id,
            "date" => $dateTime
        );
        
        echo json_encode($arr1);
    }
     
     

