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
    $Comment = $dataObject-> comment;
    $Vote = $dataObject-> vote;

    session_start();    
    $mysqli->set_charset('utf8');
    
    $update = $mysqli -> prepare("UPDATE comments SET comment=?, vote=? WHERE userId=?");
    $update->bind_param('sis', $Comment, $Vote, $User);
    if($update->execute()){
      echo json_encode(array('mensaje' => 'Comentario actualizado correctamente', 'Comment' => $Comment, 'vote' => $Vote, 'User' => $User));
    }else{
      echo json_encode(array('mensaje' => 'Error a la hora de actualizar el comentario'));
    }

$mysqli->close();
?>
