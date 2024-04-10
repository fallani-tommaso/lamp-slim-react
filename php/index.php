<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/controllers/AlunniController.php';

$app = AppFactory::create();

$app->get('/alunni', "AlunniController:index");
$app->get("/alunni/{id}", "AlunniController:getOne");
$app->post("/alunni", "AlunniController:createOne");
$app->put("/alunni/{id}", "AlunniController:updateOne");
$app->delete("/alunni/{id}", "AlunniController:deleteOne");

$app->run();
