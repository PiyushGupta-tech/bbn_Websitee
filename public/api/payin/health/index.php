<?php
declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';

$token = trim((string) ($config['URBAN_API_TOKEN'] ?? ''));
$userid = trim((string) ($config['URBAN_USER_ID'] ?? ''));

payin_ok([
    'ok' => true,
    'payinConfigured' => $token !== '' && $userid !== '',
    'mockMode' => false,
]);
