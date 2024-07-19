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
        
    $film = $dataObject-> filmId;
    $Comments= array(); 
    $get_film = $mysqli -> prepare("SELECT * FROM comments WHERE filmId = ? ORDER BY comments.insertDate DESC");
    $get_film->bind_param('i', $film);
    $get_film->execute();
    $resultado = $get_film->get_result();
    $CommentsTotal = $resultado->num_rows;
    $SumOfVotes = 0;
    $votes0 = 0;$votes1 = 0;$votes2 = 0;$votes3 = 0;$votes4 = 0;$votes5 = 0;
    $Votes=array();
    while ($fila = $resultado->fetch_array(MYSQLI_NUM))
      {
        $Comment = array('UserId'=>$fila[1],'Comment'=>$fila[2],'Vote'=>$fila[4],'Date'=>$fila[5],'Username'=>$fila[6],'Admin'=>$fila[7] ); 
        $SumOfVotes = $SumOfVotes + $fila[4];
        if($fila[4]<0.5){$votes0=$votes0+1;}
        elseif($fila[4]<1.5){$votes1=$votes1+1;}
        elseif($fila[4]<2.5){$votes2=$votes2+1;}
        elseif($fila[4]<3.5){$votes3=$votes3+1;}
        elseif($fila[4]<4.5){$votes4=$votes4+1;}
        else{$votes5=$votes5+1;}
        array_push($Comments, $Comment);
      }
      array_push($Votes,$votes0,$votes1,$votes2,$votes3,$votes4,$votes5);
    echo json_encode(array('NumComments'=> $CommentsTotal , 'Comments'=> $Comments, 'VotesSummary' => $SumOfVotes, 'Votes' => $Votes));
    $get_film -> close();

$mysqli->close();
?>
