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
    $collectionId = $dataObject-> CollectionId;
    session_start();    
    $mysqli->set_charset('utf8');
        
    $getrecommends = $mysqli -> prepare("SELECT * FROM recomendations WHERE collectionId = ?");
    $getrecommends->bind_param('s', $collectionId);
    $getrecommends->execute();
    $resultado = $getrecommends->get_result();
    $Recommends=array();
    while ($Row = $resultado->fetch_array(MYSQLI_NUM))
    {
      $Recommend = array('RecomendationId'=> $Row[0], 'Title' => $Row[1], 'FilmsId' => $Row[2], 'CollectionId' => $Row[3]); 
      array_push($Recommends,$Recommend);
    }
    echo json_encode(array('Recommends' => $Recommends));
    $getrecommends -> close();

$mysqli->close();
?>
