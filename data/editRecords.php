<?php

include"db.php";
$user=json_decode(file_get_contents('php://input')); 

$user_id = $user->user_id;
//$user_id = 14;
//echo $user_id;





//$sale_records = $db->tbl_sales();
$arr = array();
$sale_records=$db->tbl_sales()->where("user_id= ?",$user_id);
foreach ($sale_records as $records) {
    $id =  $records["user_id"];
    $date = $records["date_of_transaction"];
    $type_transaction = $records["tbl_sales_type_id"];
    $ref_no = $records["refrence_no_transaction"];
    $name = $records["customer_name"];
    $description = $records["description"];
    $remark = $records["remark"];
    $amount = $records["amount"];
    $status = $records["status"];
   // $tranType = $db->tbl_sales_type->select("sale_type")->where("id= ?","$type_transaction");
    $status1=$db->tbl_sales_type->select("sale_type")->where("id",$type_transaction);
    foreach($status1 as $state){
        $type = $state["sale_type"];
        $arr = array("user_id"=>$id,"date_of_transaction"=>$date,"type_transaction"=>$type,"refrence_no_transaction"=>$ref_no,"customer_name"=>$name,"description"=>$description,"remark"=>$remark,"amount"=>$amount,"status"=>$status);   
    }
  
}

//echo $type;
echo json_encode($arr); 


