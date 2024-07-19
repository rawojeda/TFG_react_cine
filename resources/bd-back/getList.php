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
    $ListName = $dataObject-> listName;
    $UserId = $dataObject-> userId;

    session_start();    
    $mysqli->set_charset('utf8');
        
    $getlist = $mysqli -> prepare("SELECT * FROM lists WHERE  name= ? AND userId= ?");
    $getlist->bind_param('ss', $ListName, $UserId);
    $getlist->execute();
    $resultado = $getlist->get_result();
    if ($resultado->num_rows == 1) {
      $datos = $resultado->fetch_assoc();
      echo json_encode(array('mensaje' => 'hay peliculas', 'List' => array('ListId'=> $datos['listId'], 'ListName' => $datos['name'], 'FilmsId' => $datos['filmsId'], 'UserId' => $datos['userId']))); 
    }else{
      echo json_encode(array('mensaje' => 'no hay peliculas en la lista'));
    }
    $getlist -> close();

$mysqli->close();
?>
