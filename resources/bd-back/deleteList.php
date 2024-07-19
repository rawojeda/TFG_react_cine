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
    $User = $dataObject-> userId;
    $ListName = $dataObject-> listName;

    session_start();    
    $mysqli->set_charset('utf8');
    
    $delete = $mysqli -> prepare("DELETE FROM lists WHERE userId=? AND name=?");
    $delete->bind_param('ss', $User, $ListName);
    if($delete->execute()){
      echo json_encode(array('mensaje' => 'Comentario borrado correctamente'));
    }else{
      echo json_encode(array('mensaje' => 'Error a la hora de borrar el comentario'));
    }

$mysqli->close();
?>
