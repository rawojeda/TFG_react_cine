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
    $RecomendationId = $dataObject-> recomendationId;

    session_start();    
    $mysqli->set_charset('utf8');
        
    $getrecommendation = $mysqli -> prepare("SELECT * FROM recomendations WHERE recomendationId = ?");
    $getrecommendation->bind_param('s', $RecomendationId);
    $getrecommendation->execute();
    $resultado = $getrecommendation->get_result();
    if ($resultado->num_rows == 1) {
      $datos = $resultado->fetch_assoc();
      $getrecommendation -> close();
      echo json_encode(array('mensaje' => 'hay peliculas', 'Recomendation' => array('RecomendationId'=> $datos['recomendationId'], 'Title' => $datos['title'], 'FilmsId' => $datos['listFilmsId'], 'CollectionId' => $datos['collectionId']))); 
    }else{
      echo json_encode(array('mensaje' => 'Todavía no hay ninguna peliculas para esta recomendacion'));
    }

$mysqli->close();
?>
