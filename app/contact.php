<?php

$json = file_get_contents('php://input');

$data = json_decode($json, true);

$name = htmlspecialchars($data['name']);
$surname = htmlspecialchars($data['surname']);
$email = htmlspecialchars($data['email']);
$phone = htmlspecialchars($data['phone']);
$message = htmlspecialchars($data['message']);

$to = 'tk.korec@gmail.com';
$subject = 'Zpráva z webu psychologické poradny';
$mail_message = $message;
$headers = array(
    'From' => $email,
    'Reply-To' => $to,
    'X-Mailer' => 'PHP/' . phpversion()
);

mail($to, $subject, $mail_message, $headers);

echo 'Váš kontakt a zpráva byly úspěšně odeslány.';
