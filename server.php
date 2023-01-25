<?php
$json = trim(file_get_contents("php://input"));

// $json = '[{"name":"a","position":"Аналитик","age":"a","skills":"a"},{"name":"b","position":"Аналитик","age":"b","skills":"b"}]';
// $json = html_entity_decode($json);
$str_json = json_decode($json, true);

if(json_last_error() == 0) {
    echo 'true';
} else {
    echo 'false';
}

// echo var_dump($str_json);
// echo json_last_error();