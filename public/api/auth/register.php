<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    auth_fail(405, 'Method not allowed');
}

$body = auth_json_input();
$email = auth_normalize_email((string) ($body['email'] ?? ''));
$phone = auth_normalize_phone((string) ($body['phone'] ?? ''));
$password = (string) ($body['password'] ?? '');
$fullName = trim((string) ($body['fullName'] ?? ''));
$addressLine1 = trim((string) ($body['addressLine1'] ?? ''));
$addressLine2 = trim((string) ($body['addressLine2'] ?? ''));
$city = trim((string) ($body['city'] ?? ''));
$state = trim((string) ($body['state'] ?? ''));
$pinCode = trim((string) ($body['pinCode'] ?? ''));

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    auth_fail(400, 'Valid email is required.');
}
if (strlen($phone) !== 10) {
    auth_fail(400, 'Phone must be a 10-digit Indian mobile number.');
}
if (strlen($password) < 6) {
    auth_fail(400, 'Password must be at least 6 characters.');
}
if ($fullName === '' || $addressLine1 === '' || $city === '' || $state === '' || strlen($pinCode) !== 6) {
    auth_fail(400, 'Name, address, city, state, and 6-digit PIN are required.');
}

$store = auth_load_users_store($usersFile, $secrets);

foreach ($store['users'] as $existing) {
    if (($existing['email'] ?? '') === $email) {
        auth_fail(409, 'An account with this email already exists.');
    }
    if (($existing['phone'] ?? '') === $phone) {
        auth_fail(409, 'An account with this phone number already exists.');
    }
}

$user = [
    'id' => auth_new_id(),
    'email' => $email,
    'phone' => $phone,
    'passwordHash' => password_hash($password, PASSWORD_DEFAULT),
    'fullName' => $fullName,
    'addressLine1' => $addressLine1,
    'addressLine2' => $addressLine2,
    'city' => $city,
    'state' => $state,
    'pinCode' => $pinCode,
    'createdAt' => date('c'),
    'lastLoginAt' => date('c'),
];

$token = auth_new_token();
$session = [
    'token' => $token,
    'userId' => $user['id'],
    'role' => 'customer',
    'ip' => auth_client_ip(),
    'userAgent' => auth_user_agent(),
    'createdAt' => date('c'),
];

$store['users'][] = $user;
$store['sessions'][] = $session;
auth_save_users_store($usersFile, $store);

auth_log_event($eventsFile, [
    'id' => 'ev_' . bin2hex(random_bytes(6)),
    'type' => 'signup',
    'userId' => $user['id'],
    'email' => $email,
    'phone' => $phone,
    'fullName' => $fullName,
    'city' => $city,
    'state' => $state,
    'pinCode' => $pinCode,
    'addressLine1' => $addressLine1,
    'ip' => auth_client_ip(),
    'userAgent' => auth_user_agent(),
    'at' => date('c'),
]);

auth_ok([
    'token' => $token,
    'role' => 'customer',
    'user' => auth_public_user($user),
]);
