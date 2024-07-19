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
    $UserId = $dataObject-> userId;

    session_start();    
    $mysqli->set_charset('utf8');
        
    $getLists = $mysqli -> prepare("SELECT * FROM lists WHERE userId = ?");
    $getLists->bind_param('s', $UserId);
    $getLists->execute();
    $resultado = $getLists->get_result();
    $Lists=array();
    if ($resultado->num_rows == 0) {
      echo json_encode(array('mensaje' => 'Todavía no has creado ninguna lista', 'Lists' => $Lists));      
    }else{
      while ($Row = $resultado->fetch_array(MYSQLI_NUM))
      {
        $List = array('ListId'=> $Row[0], 'ListName' => $Row[1], 'FilmsId' => $Row[2], 'UserId' => $Row[3]); 
        array_push($Lists,$List); 
      }
      echo json_encode(array('Lists' => $Lists));
    }
    $getLists -> close();

    

$mysqli->close();
?>
