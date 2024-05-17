<?php
$servername = "sql112.infinityfree.com";
$username = "if0_36562948";
$password = "IIS1nzB0m8Qc";
$dbname = "if0_36562948_controle_de_gastos";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Checar conexão
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
