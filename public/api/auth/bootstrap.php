<?php
declare(strict_types=1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$dataDir = dirname(__DIR__, 2) . '/data';

function auth_ensure_data_dir(string $dataDir): void
{
    if (!is_dir($dataDir) && !@mkdir($dataDir, 0775, true)) {
        auth_fail(503, 'Auth data directory could not be created. Create /data and make it writable by PHP (www user).');
    }
    if (!is_dir($dataDir) || !is_writable($dataDir)) {
        auth_fail(503, 'Auth data folder is not writable. On the server: chown -R www:www data && chmod 775 data');
    }
}

auth_ensure_data_dir($dataDir);

$usersFile = $dataDir . '/users.json';
$eventsFile = $dataDir . '/events.json';

$secretsPath = dirname(__DIR__, 2) . '/auth-secrets.php';
$secrets = is_file($secretsPath) ? require $secretsPath : [];
if (!is_array($secrets)) {
    $secrets = [];
}

function auth_json_input(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function auth_fail(int $code, string $message): void
{
    http_response_code($code);
    echo json_encode(['ok' => false, 'message' => $message]);
    exit;
}

function auth_ok(array $payload): void
{
    echo json_encode(array_merge(['ok' => true], $payload));
    exit;
}

function auth_store_read(string $path, array $default): array
{
    if (!is_file($path)) {
        return $default;
    }
    $data = json_decode((string) file_get_contents($path), true);
    return is_array($data) ? $data : $default;
}

function auth_store_write(string $path, array $data): void
{
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        auth_fail(500, 'Could not encode auth data.');
    }
    if (@file_put_contents($path, $json, LOCK_EX) === false) {
        auth_fail(503, 'Could not save auth data. Check permissions on the data folder.');
    }
}

function auth_new_id(): string
{
    return 'u' . bin2hex(random_bytes(8));
}

function auth_new_token(): string
{
    return bin2hex(random_bytes(24));
}

function auth_client_ip(): string
{
    return (string) ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '');
}

function auth_user_agent(): string
{
    return substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 500);
}

function auth_public_user(array $user): array
{
    return [
        'id' => $user['id'],
        'email' => $user['email'],
        'phone' => $user['phone'],
        'fullName' => $user['fullName'],
        'addressLine1' => $user['addressLine1'],
        'addressLine2' => $user['addressLine2'] ?? '',
        'city' => $user['city'],
        'state' => $user['state'],
        'pinCode' => $user['pinCode'],
        'createdAt' => $user['createdAt'],
        'lastLoginAt' => $user['lastLoginAt'] ?? null,
    ];
}

function auth_log_event(string $eventsFile, array $event): void
{
    $store = auth_store_read($eventsFile, ['events' => []]);
    $events = $store['events'] ?? [];
    if (!is_array($events)) {
        $events = [];
    }
    array_unshift($events, $event);
    $events = array_slice($events, 0, 5000);
    auth_store_write($eventsFile, ['events' => $events]);
}

function auth_seed_users(string $usersFile, array $secrets): void
{
    if (is_file($usersFile)) {
        return;
    }

    $customerPass = (string) ($secrets['SEED_CUSTOMER_PASSWORD'] ?? 'Customer@123');
    $adminPass = (string) ($secrets['SEED_ADMIN_PASSWORD'] ?? 'Admin@bbn2024');

    $users = [
        [
            'id' => 'u_demo_customer',
            'email' => 'customer@bbnshop.in',
            'phone' => '9876543210',
            'passwordHash' => password_hash($customerPass, PASSWORD_DEFAULT),
            'fullName' => 'Demo Customer',
            'addressLine1' => '12 MG Road',
            'addressLine2' => 'Near City Mall',
            'city' => 'Mumbai',
            'state' => 'Maharashtra',
            'pinCode' => '400001',
            'createdAt' => date('c'),
            'lastLoginAt' => null,
        ],
    ];

    $admins = [
        [
            'id' => 'admin_main',
            'email' => 'admin@bbnshop.in',
            'fullName' => 'BBN Admin',
            'passwordHash' => password_hash($adminPass, PASSWORD_DEFAULT),
            'createdAt' => date('c'),
        ],
    ];

    auth_store_write($usersFile, ['users' => $users, 'sessions' => [], 'admins' => $admins]);
}

function auth_load_users_store(string $usersFile, array $secrets): array
{
    auth_seed_users($usersFile, $secrets);
    $store = auth_store_read($usersFile, ['users' => [], 'sessions' => [], 'admins' => []]);
    if (!isset($store['users']) || !is_array($store['users'])) {
        $store['users'] = [];
    }
    if (!isset($store['sessions']) || !is_array($store['sessions'])) {
        $store['sessions'] = [];
    }
    if (!isset($store['admins']) || !is_array($store['admins'])) {
        $store['admins'] = [];
    }
    return $store;
}

function auth_save_users_store(string $usersFile, array $store): void
{
    auth_store_write($usersFile, $store);
}

function auth_bearer_token(): ?string
{
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/^Bearer\s+(\S+)$/i', $header, $m)) {
        return $m[1];
    }
    return null;
}

function auth_resolve_session(array $store, ?string $token): ?array
{
    if ($token === null || $token === '') {
        return null;
    }
    foreach ($store['sessions'] as $session) {
        if (($session['token'] ?? '') === $token) {
            return $session;
        }
    }
    return null;
}

function auth_normalize_phone(string $phone): string
{
    $digits = preg_replace('/\D/', '', $phone);
    return strlen($digits) >= 10 ? substr($digits, -10) : $digits;
}

function auth_normalize_email(string $email): string
{
    return strtolower(trim($email));
}
