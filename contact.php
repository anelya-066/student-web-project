<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: index.php'); exit; }
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') die('Проверьте заполнение формы.');
$stmt = $pdo->prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)');
$stmt->execute([$name, $email, $message]);
header('Location: index.php?sent=1');
exit;
