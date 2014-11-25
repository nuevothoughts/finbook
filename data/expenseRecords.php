<?php

include"db.php";




$arr = array();
$expense_records = $db->tbl_expense()->order("id desc"); // order by
foreach ($expense_records as $records) {
    $id =  $records["id"];
    $date = $records["transaction_date"];
    $type_transaction = $records["tbl_sales_type_id"];
    $ref_no = $records["transaction_refrence_no"];
    $name = $records["Paid_to"];
    $description = $records["description"];
    $remark = $records["remarks"];
    $amount = $records["amount"];
    $status = $records["status"];
   // $tranType = $db->tbl_sales_type->select("sale_type")->where("id= ?","$type_transaction");
    $status1=$db->tbl_sales_type->select("sale_type")->where("id",$type_transaction);
    foreach($status1 as $state){
        $type = $state["sale_type"];
        $arr[] = array("id"=>$id,"date_of_transaction"=>$date,"type_transaction"=>$type,"refrence_no_transaction"=>$ref_no,"paid_to"=>$name,"description"=>$description,"remark"=>$remark,"amount"=>$amount,"status"=>$status);   
    }
  
}


//echo $type;
echo json_encode($arr); 