<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    auth_fail(405, 'Method not allowed');
}

$token = auth_bearer_token();
if ($token === null) {
    auth_ok(['message' => 'Already signed out.']);
}

$store = auth_load_users_store($usersFile, $secrets);
$store['sessions'] = array_values(array_filter(
    $store['sessions'],
    static fn ($s) => ($s['token'] ?? '') !== $token
));
auth_save_users_store($usersFile, $store);

auth_ok(['message' => 'Signed out.']);
