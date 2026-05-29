<?php
declare(strict_types=1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Client-P, X-Client-A, X-Client-B');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$configPaths = [
    dirname(__DIR__, 2) . '/payin-secrets.php',
];

$config = null;
foreach ($configPaths as $path) {
    if (is_file($path)) {
        $config = require $path;
        break;
    }
}

if (!is_array($config)) {
    http_response_code(503);
    echo json_encode([
        'status' => false,
        'message' => 'Payin config missing. Create payin-secrets.php on the server.',
    ]);
    exit;
}

function payin_request_input(): array
{
    if (!empty($_POST) && is_array($_POST)) {
        return $_POST;
    }

    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }

    $contentType = $_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '';
    if (str_contains($contentType, 'application/x-www-form-urlencoded')) {
        parse_str($raw, $parsed);
        return is_array($parsed) ? $parsed : [];
    }

    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function payin_store_path(): string
{
    return sys_get_temp_dir() . '/bbn_payin_store.json';
}

function payin_store_read(): array
{
    $path = payin_store_path();
    if (!is_file($path)) {
        return [];
    }
    $data = json_decode((string) file_get_contents($path), true);
    return is_array($data) ? $data : [];
}

function payin_store_write(array $store): void
{
    file_put_contents(payin_store_path(), json_encode($store), LOCK_EX);
}

function payin_valid_orderid(string $orderid): bool
{
    return (bool) preg_match('/^[A-Za-z0-9]{20}$/', $orderid);
}

function payin_fail(int $code, string $message): void
{
    http_response_code($code);
    echo json_encode(['status' => false, 'message' => $message]);
    exit;
}

function payin_ok(array $payload): void
{
    echo json_encode($payload);
    exit;
}
