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
          
      $username = $dataObject-> username;
      $pas =	$dataObject-> pass;
      $mail = $dataObject-> email;
      $admin = 0;
      if(isset($dataObject-> username) && isset($dataObject-> pass)  && isset($dataObject-> email)  ){
        $user_exist = $mysqli -> prepare("SELECT * FROM users WHERE username = ?");
        $user_exist->bind_param('s', $username);
        $user_exist->execute();
        $resultado = $user_exist->get_result();
        if ($resultado->num_rows > 0) {
          $user_exist->close();
          echo json_encode(array('conectado'=>false, 'error' => 'El usuario ya existe en la base de datos'));
        }else{
          $user_exist->close();
          $new_user = "INSERT INTO users (username, pass, email, administrador)
          VALUES ('$username', '$pas', '$mail', '$admin' )";
          $mysqli -> query($new_user);
          $new_user_exist = $mysqli -> prepare("SELECT users.userId FROM users WHERE username = ?");
          $new_user_exist->bind_param('s', $username);
          $new_user_exist->execute();
          $resultado = $new_user_exist->get_result();
          $datos = $resultado->fetch_assoc();
          $db_userId = $datos['userId'];
          $new_user_exist->close();
          echo json_encode(array('conectado'=>true,'UserName'=>$username, 'Password'=>$pas,  'Email'=>$mail,  'Admin'=>$admin, 'UserId'=> $db_userId));
        }
    }else{          
      echo json_encode(array('conectado'=>false, 'error' => 'Faltan añadir datos'));
    }

  $mysqli->close();
?>
