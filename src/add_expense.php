<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $description = $_POST['description'];
    $amount = $_POST['amount'];
    $date = date('Y-m-d'); // Pega a data atual

    $sql = "INSERT INTO gastos (description, amount, date) VALUES ('$description', '$amount', '$date')";

    if ($conn->query($sql) === TRUE) {
        header("Location: index.html");
    } else {
        header("Location: index.html?error=1");
    }

    $conn->close();
}
?>
