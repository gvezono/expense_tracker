<?php
include 'db.php';

$sql = "SELECT description, amount, date, total_parcelas, parcela_atual FROM gastos";
$result = $conn->query($sql);

$expenses = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $expenses[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode(['expenses' => $expenses]);
?>
