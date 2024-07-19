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

      $userId = $dataObject-> userId;
      $comment =	$dataObject-> comment;
      $filmId = $dataObject-> filmId;
      $vote = $dataObject-> vote;
      $DateAndTime = date('Y-m-d h:i:s', time()); 
      $username = $dataObject-> username;
      $admin = $dataObject-> admin;

      $new_comment = "INSERT INTO comments (userId, comment, filmId, vote, insertDate, username, admin)
      VALUES ('$userId', '$comment', '$filmId', '$vote', '$DateAndTime', '$username', '$admin' )";
      $mysqli -> query($new_comment);
      $new_comment_exist = $mysqli -> prepare("SELECT comments.commentId FROM comments WHERE userId = ? AND filmId = ?");
      $new_comment_exist->bind_param('ss', $userId, $filmId);
      $new_comment_exist->execute();
      $resultado = $new_comment_exist->get_result();
      $datos = $resultado->fetch_assoc();
      $db_commentId = $datos['commentId'];
      $new_comment_exist->close();
      echo json_encode(array('mensaje'=>"usuario creado con exito",'CommendId' => $db_commentId));

  $mysqli->close();
?>
