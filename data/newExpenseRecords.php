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
$row=$db->tbl_Expense();
$row1 = $db->tbl_sales_type()->select("id")->where("sale_type=?",$type);
foreach($row1 as $id){
    $sale_id = $id["id"];
}

$data = array(
    "transaction_date" => $dateTime,
    "transaction_refrence_no" =>$userRef,
    "tbl_sales_type_id"=>$sale_id,
    "Paid_to"=>$paid,
    "description"=>$description,
    "remarks"=>$remark,
    "amount"=>$amt,
    "status"=>$status  
);

$result = $row->insert($data);


$arr = array();
$sale_records = $db->tbl_expense()->where("id=?",$result); // order by
foreach ($sale_records as $records) {
    $id =  $records["id"];
    $date = $records["transaction_date"];
    $type_transaction = $records["tbl_sales_type_id"];
    $ref_no = $records["transaction_refrence_no"];
    $paid = $records["Paid_to"];
    $description = $records["description"];
    $remark = $records["remarks"];
    $amount = $records["amount"];
    $status = $records["status"];
   // $tranType = $db->tbl_sales_type->select("sale_type")->where("id= ?","$type_transaction");
    $status1=$db->tbl_sales_type->select("sale_type")->where("id",$type_transaction);
    foreach($status1 as $state){
        $type = $state["sale_type"];
        $arr = array("id"=>$id,"transaction_date"=>$date,"type_transaction"=>$type,"transaction_refrence_no"=>$ref_no,"Paid_to"=>$paid,"description"=>$description,"remarks"=>$remark,"amount"=>$amount,"status"=>$status);   
    }
  
}

echo json_encode($arr); 