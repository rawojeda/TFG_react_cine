<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  header("Content-Type: text/html; charset=utf-8");

  $method = $_SERVER['REQUEST_METHOD'];
    include "conectar.php";
    $mysqli = conectarDB();

    //sleep(1);	
    $JSONData = file_get_contents("php://input");
    $dataObject = json_decode($JSONData);    
    
    session_start();    
    $mysqli->set_charset('utf8');
        
    $get_collections = $mysqli -> prepare("SELECT * FROM collections ORDER BY collectionId");
    $get_collections->execute();
    $resultado = $get_collections->get_result();
    $Collections=array();
    while ($Row = $resultado->fetch_array(MYSQLI_NUM))
    {
      $Collection = array('CollectionId'=>$Row[0],'CollectionName'=> $Row[1]); 
      array_push($Collections, $Collection);
    }
    echo json_encode(array('Collections' => $Collections));
    $get_collections -> close();

$mysqli->close();
?>
