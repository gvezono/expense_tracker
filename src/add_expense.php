<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $description = $_POST['description'];
    $amount = $_POST['amount'];
    $total_parcelas = $_POST['total_parcelas'];
    $parcela_atual = $_POST['parcela_atual'];
    $date = date('Y-m-d'); // Pega a data atual

    $sql = "INSERT INTO gastos (description, amount, date, total_parcelas, parcela_atual) VALUES ('$description', '$amount', '$date', '$total_parcelas', '$parcela_atual')";

    if ($conn->query($sql) === TRUE) {
        header("Location: ../public/index.html");
    } else {
        header("Location: ../public/index.html?error=1");
    }

    $conn->close();
}
?>
