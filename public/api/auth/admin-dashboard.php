<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    auth_fail(405, 'Method not allowed');
}

$token = auth_bearer_token();
$store = auth_load_users_store($usersFile, $secrets);
$session = auth_resolve_session($store, $token);

if ($session === null || ($session['role'] ?? '') !== 'admin') {
    auth_fail(403, 'Admin access required.');
}

$eventsStore = auth_store_read($eventsFile, ['events' => []]);
$events = $eventsStore['events'] ?? [];
if (!is_array($events)) {
    $events = [];
}

$users = array_map(static fn ($u) => auth_public_user($u), $store['users']);

auth_ok([
    'stats' => [
        'totalUsers' => count($users),
        'totalEvents' => count($events),
        'loginsToday' => count(array_filter($events, static function ($e) {
            if (($e['type'] ?? '') !== 'login' && ($e['type'] ?? '') !== 'admin_login') {
                return false;
            }
            $at = strtotime((string) ($e['at'] ?? ''));
            return $at >= strtotime('today');
        })),
    ],
    'users' => $users,
    'events' => array_slice($events, 0, 200),
]);
