<?php

include "db.php";
$user=json_decode(file_get_contents('php://input'));  

$name = $user->name;
$type = $user->transaction_type;
$userRef = $user->userRef;
$description = $user->description;
$status = $user->status;
$remark = $user->remark;
$amt = $user->amt;
$date = $user->date;

$string=$date;
$last_space = strrpos($string,'T');
$last_word = substr($string, $last_space);
$date_chunk = substr($string, 0, $last_space);


$incremented_date = strtotime("+1 day", strtotime($date_chunk));
$selected_date = date("Y-m-d", $incremented_date);

date_default_timezone_set('Asia/Calcutta');
$dateTime = $selected_date." ". date('h-i-s'); 
//$type = 'Australian customer';



$result = 0;
$row=$db->tbl_sales();
$row1 = $db->tbl_sales_type()->select("id")->where("sale_type=?",$type);
foreach($row1 as $id){
    $sale_id = $id["id"];
}

//echo $sale_id;

$data = array(
    "date_of_transaction" => $dateTime,
    "refrence_no_transaction" =>$userRef,
    "tbl_sales_type_id"=>$sale_id,
    "customer_name"=>$name,
    "description"=>$description,
    "remark"=>$remark,
    "amount"=>$amt,
    "status"=>$status  
);

$result = $row->insert($data);
//echo $result;



$arr = array();
$sale_records = $db->tbl_sales()->where("user_id=?",$result); // order by
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

 
 