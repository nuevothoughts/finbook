<?php

include "db.php";

$arr = array();
$list = $db->tbl_sales_type();
foreach ($list as $lists) {
   // $id =  $lists["id"];
    $sale_type = $lists["sale_type"];
    $arr[] = array("value"=>$sale_type);   
}

//$mail = $db->tbl_sales_type->select("sale_type")->where("id",$type_transaction);

//echo $type;
echo json_encode($arr);
