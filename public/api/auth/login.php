<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    auth_fail(405, 'Method not allowed');
}

$body = auth_json_input();
$loginId = trim((string) ($body['loginId'] ?? $body['email'] ?? $body['phone'] ?? ''));
$password = (string) ($body['password'] ?? '');

if ($loginId === '' || $password === '') {
    auth_fail(400, 'Email or phone and password are required.');
}

$store = auth_load_users_store($usersFile, $secrets);
$emailTry = auth_normalize_email($loginId);
$phoneTry = auth_normalize_phone($loginId);

$user = null;
foreach ($store['users'] as $candidate) {
    $matchEmail = ($candidate['email'] ?? '') === $emailTry;
    $matchPhone = ($candidate['phone'] ?? '') === $phoneTry && strlen($phoneTry) === 10;
    if ($matchEmail || $matchPhone) {
        $user = $candidate;
        break;
    }
}

if ($user === null || !password_verify($password, (string) ($user['passwordHash'] ?? ''))) {
    auth_fail(401, 'Invalid email/phone or password.');
}

$user['lastLoginAt'] = date('c');
foreach ($store['users'] as $i => $row) {
    if (($row['id'] ?? '') === $user['id']) {
        $store['users'][$i] = $user;
        break;
    }
}

$token = auth_new_token();
$store['sessions'][] = [
    'token' => $token,
    'userId' => $user['id'],
    'role' => 'customer',
    'ip' => auth_client_ip(),
    'userAgent' => auth_user_agent(),
    'createdAt' => date('c'),
];
auth_save_users_store($usersFile, $store);

auth_log_event($eventsFile, [
    'id' => 'ev_' . bin2hex(random_bytes(6)),
    'type' => 'login',
    'userId' => $user['id'],
    'email' => $user['email'],
    'phone' => $user['phone'],
    'fullName' => $user['fullName'],
    'city' => $user['city'],
    'state' => $user['state'],
    'pinCode' => $user['pinCode'],
    'addressLine1' => $user['addressLine1'],
    'ip' => auth_client_ip(),
    'userAgent' => auth_user_agent(),
    'at' => date('c'),
]);

auth_ok([
    'token' => $token,
    'role' => 'customer',
    'user' => auth_public_user($user),
]);
