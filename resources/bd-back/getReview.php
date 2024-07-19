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
    $film = $dataObject-> filmId;

    session_start();    
    $mysqli->set_charset('utf8');

    $get_reviews = $mysqli -> prepare("SELECT * FROM reviews WHERE filmId = ?");
    $get_reviews->bind_param('s', $film);
    $get_reviews->execute();
    $resultado = $get_reviews->get_result();
    if ($resultado->num_rows == 1) {
      $datos = $resultado->fetch_assoc();
      $get_reviews -> close();
      echo json_encode(array('mensaje' => 'hay reseña', 'Review' => array('Title'=> $datos['titulo'], 'Resumen' => $datos['Resumen'], 'Review' => $datos['Review'], 'Date' => $datos['Date'], 'FilmId' => $film, 'ImageUrl'=>$datos['imageUrl'])));
    }else{
      echo json_encode(array('mensaje' => 'Todavía no hay ninguna reseña sobre esta película'));
    }
$mysqli->close();
?>
