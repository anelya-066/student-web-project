<?php
header('Content-Type: application/json; charset=utf-8');
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$player = trim($data['player'] ?? '');
$time = (int)($data['time'] ?? 0);

if ($player === '' || $time <= 0 || $time > 999) {
    echo json_encode(['success'=>false, 'message'=>'Некорректные данные.']);
    exit;
}

$stmt = $pdo->prepare('INSERT INTO scores (player, game_time) VALUES (?, ?)');
$stmt->execute([$player, $time]);
echo json_encode(['success'=>true, 'message'=>'Результат сохранён!']);
