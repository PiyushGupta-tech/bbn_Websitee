<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = auth_bearer_token();
    $store = auth_load_users_store($usersFile, $secrets);
    $session = auth_resolve_session($store, $token);
    if ($session === null) {
        auth_fail(401, 'Not signed in.');
    }

    if (($session['role'] ?? '') === 'admin') {
        foreach ($store['admins'] as $admin) {
            if (($admin['id'] ?? '') === ($session['userId'] ?? '')) {
                auth_ok([
                    'role' => 'admin',
                    'admin' => [
                        'id' => $admin['id'],
                        'email' => $admin['email'],
                        'fullName' => $admin['fullName'] ?? 'Admin',
                    ],
                ]);
            }
        }
        auth_fail(401, 'Session expired.');
    }

    foreach ($store['users'] as $user) {
        if (($user['id'] ?? '') === ($session['userId'] ?? '')) {
            auth_ok(['role' => 'customer', 'user' => auth_public_user($user)]);
        }
    }
    auth_fail(401, 'Session expired.');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = auth_bearer_token();
    $store = auth_load_users_store($usersFile, $secrets);
    $session = auth_resolve_session($store, $token);
    if ($session === null || ($session['role'] ?? '') !== 'customer') {
        auth_fail(401, 'Not signed in.');
    }

    $body = auth_json_input();
    $updated = null;
    foreach ($store['users'] as $i => $user) {
        if (($user['id'] ?? '') !== ($session['userId'] ?? '')) {
            continue;
        }
        if (isset($body['fullName'])) {
            $user['fullName'] = trim((string) $body['fullName']);
        }
        if (isset($body['phone'])) {
            $phone = auth_normalize_phone((string) $body['phone']);
            if (strlen($phone) !== 10) {
                auth_fail(400, 'Phone must be 10 digits.');
            }
            foreach ($store['users'] as $other) {
                if (($other['id'] ?? '') !== $user['id'] && ($other['phone'] ?? '') === $phone) {
                    auth_fail(409, 'Phone number already in use.');
                }
            }
            $user['phone'] = $phone;
        }
        if (isset($body['addressLine1'])) {
            $user['addressLine1'] = trim((string) $body['addressLine1']);
        }
        if (isset($body['addressLine2'])) {
            $user['addressLine2'] = trim((string) $body['addressLine2']);
        }
        if (isset($body['city'])) {
            $user['city'] = trim((string) $body['city']);
        }
        if (isset($body['state'])) {
            $user['state'] = trim((string) $body['state']);
        }
        if (isset($body['pinCode'])) {
            $user['pinCode'] = trim((string) $body['pinCode']);
        }
        $store['users'][$i] = $user;
        $updated = $user;
        break;
    }

    if ($updated === null) {
        auth_fail(404, 'User not found.');
    }

    auth_save_users_store($usersFile, $store);
    auth_ok(['role' => 'customer', 'user' => auth_public_user($updated)]);
}

auth_fail(405, 'Method not allowed');
