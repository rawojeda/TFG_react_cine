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
      $pos = strpos($filmlistbd, $film);  
      if($pos!==false){
        $sustituidor = array(" ");
        $listwithoutspaces = str_replace($sustituidor, "", $filmlistbd);
        $list_array = explode(",", $listwithoutspaces);
        $newFilmList = array_diff($list_array, array($film));
        $newFilmList_s = implode(', ', $newFilmList);
        $update = $mysqli -> prepare("UPDATE lists SET filmsId=? WHERE name= ? AND userId=?");
        $update->bind_param('sss', $newFilmList_s, $listname, $user);
        $update->execute();
        echo json_encode(array('mensaje' => 'lista actualizada con éxito'));

      }else{
        echo json_encode(array('mensaje' => 'La BD no encontró la película en la lista'));
      }
    }else{
      echo json_encode(array('mensaje' => 'La BD no econtró la lista'));
    }
    $getlist -> close();

$mysqli->close();
?>
