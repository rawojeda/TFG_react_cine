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
    
    $userId = $dataObject-> userId;
    $void = '';
    $listName = $dataObject-> listName;

    session_start();    
    $mysqli->set_charset('utf8');
    
    $getlist = $mysqli -> prepare("SELECT * FROM lists WHERE  name= ? AND userId= ?");
    $getlist->bind_param('ss', $listName, $userId);
    $getlist->execute();
    $resultado = $getlist->get_result();
    if ($resultado->num_rows == 1) {
      echo json_encode(array('mensaje'=>"Ya existe una lista con ese nombre"));
    }else{
      $new_list = "INSERT INTO lists (name, filmsId, userId) VALUES ('$listName', '$void', '$userId')";
      $mysqli -> query($new_list);
      echo json_encode(array('mensaje'=>"lista creada con exito"));
    }
    

$mysqli->close();
?>
