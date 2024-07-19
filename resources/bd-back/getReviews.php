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
        
    $get_reviews = $mysqli -> prepare("SELECT * FROM reviews ORDER BY reviews.Date DESC");
    $get_reviews->execute();
    $resultado = $get_reviews->get_result();
    $ReviewsTotal = $resultado->num_rows;
    $Reviews=array();
    while ($Row = $resultado->fetch_array(MYSQLI_NUM))
    {
      $Review = array('Title'=> $Row[1], 'Resumen' => $Row[2], 'Review' => $Row[3], 'Date' => $Row[4], 'FilmId' => $Row[5], 'ImageUrl'=>$Row[6]); 
      array_push($Reviews, $Review);
    }
    echo json_encode(array('NumReviews'=> $ReviewsTotal, 'Reviews' => $Reviews));
    $get_reviews -> close();

$mysqli->close();
?>
