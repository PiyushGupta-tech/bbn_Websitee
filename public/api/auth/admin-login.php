<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    auth_fail(405, 'Method not allowed');
}

$body = auth_json_input();
$email = auth_normalize_email((string) ($body['email'] ?? ''));
$password = (string) ($body['password'] ?? '');

if ($email === '' || $password === '') {
    auth_fail(400, 'Email and password are required.');
}

$store = auth_load_users_store($usersFile, $secrets);
$admin = null;
foreach ($store['admins'] as $row) {
    if (($row['email'] ?? '') === $email) {
        $admin = $row;
        break;
    }
}

if ($admin === null || !password_verify($password, (string) ($admin['passwordHash'] ?? ''))) {
    auth_fail(401, 'Invalid admin credentials.');
}

$token = auth_new_token();
$store['sessions'][] = [
    'token' => $token,
    'userId' => $admin['id'],
    'role' => 'admin',
    'ip' => auth_client_ip(),
    'userAgent' => auth_user_agent(),
    'createdAt' => date('c'),
];
auth_save_users_store($usersFile, $store);

auth_log_event($eventsFile, [
    'id' => 'ev_' . bin2hex(random_bytes(6)),
    'type' => 'admin_login',
    'userId' => $admin['id'],
    'email' => $admin['email'],
    'phone' => '',
    'fullName' => $admin['fullName'] ?? 'Admin',
    'city' => '',
    'state' => '',
    'pinCode' => '',
    'addressLine1' => '',
    'ip' => auth_client_ip(),
    'userAgent' => auth_user_agent(),
    'at' => date('c'),
]);

auth_ok([
    'token' => $token,
    'role' => 'admin',
    'admin' => [
        'id' => $admin['id'],
        'email' => $admin['email'],
        'fullName' => $admin['fullName'] ?? 'Admin',
    ],
]);
