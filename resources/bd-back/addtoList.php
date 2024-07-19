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
    $user = $dataObject-> userId;
    $listname = $dataObject-> listName;
    $film = $dataObject-> filmId;

    session_start();    
    $mysqli->set_charset('utf8');
        
    $getlist = $mysqli -> prepare("SELECT * FROM lists WHERE  name= ? AND userId= ?");
    $getlist->bind_param('ss', $listname, $user);
    $getlist->execute();
    $resultado = $getlist->get_result();
    if ($resultado->num_rows == 1) {
      $datos = $resultado->fetch_assoc();
      $filmlistbd = $datos['filmsId'];
      $var2 = '';
      if(strcmp($filmlistbd, $var2) == 0){
        $firstfilm = $mysqli -> prepare("UPDATE lists SET filmsId=? WHERE name= ? AND userId=?");
        $firstfilm->bind_param('sss', $film, $listname, $user);
        $firstfilm->execute();
        echo json_encode(array('mensaje' => 'Pelicula agregada correctamente')); 
        $firstfilm -> close();
      }else{
        $var2 = ',';
        if(strcmp($filmlistbd, $var2) == 0){
          // si contiene mas de un valor
          $sustituidor = array(" ");
          $listwithoutspaces = str_replace($sustituidor, "", $filmlistbd);
          $list_array = explode(",", $listwithoutspaces);
          array_push($list_array, $film);
          $newFilmList_s = implode(',', $newFilmList);
          $update = $mysqli -> prepare("UPDATE lists SET filmsId=? WHERE name= ? AND userId=?");
          $update->bind_param('sss', $newFilmList_s, $listname, $user);
          $update->execute();
          echo json_encode(array('mensaje' => 'Pelicula añadida a la lista correctamente'));
        }else{
          // si va a ser el segundo valor le agregamos una coma
          $newFilmList_s = $filmlistbd . ', ' . $film ;
          $update = $mysqli -> prepare("UPDATE lists SET filmsId=? WHERE name= ? AND userId=?");
          $update->bind_param('sss', $newFilmList_s, $listname, $user);
          $update->execute();
          echo json_encode(array('mensaje' => 'Pelicula añadida a la lista correctamente'));
        }
        
      }
      
    }else{
      echo json_encode(array('mensaje' => 'no existe dicha lista'));
    }
    $getlist -> close();

$mysqli->close();
?>
