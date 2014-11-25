<?php

include"db.php";
/*
$sales = $db->tbl_sales()->select("date_of_transaction,user_id,type_transaction,refrence_no_transaction,customer_name,description,remark,amount,status");
echo json_encode($sales);
 * 
 */



$arr = array();
$sale_records = $db->tbl_sales()->order("user_id desc"); // order by
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
        $arr[] = array("user_id"=>$id,"date_of_transaction"=>$date,"type_transaction"=>$type,"refrence_no_transaction"=>$ref_no,"customer_name"=>$name,"description"=>$description,"remark"=>$remark,"amount"=>$amount,"status"=>$status);   
    }
  
}


//echo $type;
echo json_encode($arr); 