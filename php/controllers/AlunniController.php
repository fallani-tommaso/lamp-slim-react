<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AlunniController
{
  public function index(Request $request, Response $response, $args){
    sleep(1);
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function getOne(Request $request, Response $response, $args) {
    $mysqli_connection = new mysqli('my_mariadb', 'root', 'ciccio', 'scuola');
    $id = $args["id"];
    $raw_query = "SELECT * FROM alunni WHERE id ='$id'";
    $result = $mysqli_connection->query($raw_query);
    $results = $result->fetch_assoc();


    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function createOne(Request $request, Response $response, $args) {
    $conn = new mysqli("my_mariadb", "root", "ciccio", "scuola");
    $body = json_decode($request->getBody()->getContents(), true);    
    $nome = $body["nome"];
    $cognome = $body["cognome"];
    $raw_query = "INSERT INTO alunni(nome, cognome) VALUES('$nome', '$cognome')";
    $result = $conn->query($raw_query);
    if ($result && $conn->affected_rows > 0) {
      $response->getBody()->write(json_encode(array("message" => "Success")));
    } else {
      $response->getBody()->write(json_encode(array("message" => $conn->error)));
    }

    return $response->withHeader("content-type", "application/json")->withStatus(201);
  }

  public function updateOne(Request $request, Response $response, $args) {
    sleep(1);
    $conn = new mysqli("my_mariadb", "root", "ciccio", "scuola");
    $id = $args["id"];
    $body = json_decode($request->getBody()->getContents(), true);    
    $nome = $body["nome"];
    $cognome = $body["cognome"];

    $raw_query = "UPDATE alunni SET nome = '$nome', cognome = '$cognome' WHERE id = '$id'";
    $result = $conn->query($raw_query);
    if ($result && $conn->affected_rows > 0) {
      $response->getBody()->write(json_encode(array("message"=> "Success")));
    } else {
      $response->getBody()->write(json_encode(array("message"=> "Error")));
    }

    return $response->withHeader("Content-Type", "application/json");
  }

  public function deleteOne(Request $request, Response $response, $args) {
    $conn = new mysqli("my_mariadb", "root", "ciccio", "scuola");
    $id = $args["id"];

    $raw_query = "DELETE FROM alunni WHERE id = '$id'";
    $result = $conn->query($raw_query);
    if ($result && $conn->affected_rows > 0) {
      $response->getBody()->write(json_encode(array("message"=> "Deleted")));
    } else {
      $response->getBody()->write(json_encode(array("message"=> "Error")));
    }

    return $response;
  }
}
