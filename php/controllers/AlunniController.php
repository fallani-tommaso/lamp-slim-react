<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AlunniController
{
  public function index(Request $request, Response $response, $args){
    sleep(2);

    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results, JSON_NUMERIC_CHECK));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function insert(Request $request, Response $response, $args){
    sleep(2);

    $data = json_decode($request->getBody()->getContents(), true);
    $nome = $data['nome'];
    $cognome = $data['cognome'];

    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("INSERT INTO alunni (nome, cognome) VALUES ('$nome', '$cognome')");


    return $response->withHeader("Content-type", "application/json")->withStatus(201);
  }

  public function delete(Request $request, Response $response, $args){
    sleep(2);

    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $mysqli_connection->query("DELETE FROM alunni WHERE id = ". $args["id"]);

    return $response->withHeader("Content-type", "application/json")->withStatus(201);
  }
}
