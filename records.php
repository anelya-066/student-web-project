<?php
require 'db.php';
$scores = $pdo->query('SELECT player, game_time, created_at FROM scores ORDER BY game_time ASC, created_at ASC LIMIT 20')->fetchAll();
?>
<!DOCTYPE html>
<html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Records</title><link rel="stylesheet" href="portfolio.css"></head>
<body class="records-page"><div class="records-box">
    <h1>🏆 MINESWEEPER RECORDS</h1>
    <table><tr>
        <th>#</th>
        <th>Player</th>
        <th>Time</th>
        <th>Date</th>
    </tr>
    <?php foreach($scores as $i=>$score): ?>
        <tr>
            <td><?= $i+1 ?></td>
            <td><?= htmlspecialchars($score['player']) ?>
        </td>
        <td><?= (int)$score['game_time'] ?> sec</td>
        <td><?= htmlspecialchars($score['created_at']) ?></td>
    </tr><?php endforeach; ?>
</table>
<a href="index.php">← Back</a>
</div></body></html>
