<?php

require_once "NotORM.php";
/*
$pdo = new PDO("mysql:host=localhost; dbname=notorm","root","");
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$db=new NotORM($pdo);
*/

$dsn = "mysql:dbname=finance_db;host=localhost";
$pdo = new PDO($dsn, "root", "");
$db = new NotORM($pdo);
