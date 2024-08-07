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
      
    if ($nueva_consulta = $mysqli->
    prepare("SELECT users.email, users.username, users.pass, users.administrador, users.userId
    FROM users WHERE username = ?")) {
          // le damos el username para la consulta
          $nueva_consulta->bind_param('s', $username);
          $nueva_consulta->execute();
          $resultado = $nueva_consulta->get_result();
          if ($resultado->num_rows == 1) {
              $datos = $resultado->fetch_assoc();
              echo json_encode(array('conectado'=>true,'UserName'=>$datos['username'], 'Password'=>$datos['pass'],  'Email'=>$datos['email'],  'Admin'=>$datos['administrador'], 'UserId'=>$datos['userId']));
          }
          else {
                echo json_encode(array('conectado'=>false, 'error' => 'El usuario no existe.'));
          }
          $nueva_consulta->close();
        }
        else{
          echo json_encode(array('conectado'=>false, 'error' => 'No se pudo conectar a BD'));
        }
  // }
  $mysqli->close();
?>
