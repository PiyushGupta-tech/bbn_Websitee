<?php
declare(strict_types=1);

require __DIR__ . '/payin/bootstrap.php';

$token = trim((string) ($config['URBAN_API_TOKEN'] ?? ''));
$userid = trim((string) ($config['URBAN_USER_ID'] ?? ''));
$callbackUrl = trim((string) ($config['PAYIN_CALLBACK_URL'] ?? ''));

$probe = [
    'serverIp' => '187.77.185.148',
    'userid' => $userid,
    'callbackUrl' => $callbackUrl,
    'tokenSet' => $token !== '',
];

if ($token !== '' && $userid !== '') {
    $testOrder = 'BBN' . strtoupper(bin2hex(random_bytes(8)));
    $body = json_encode([
        'token' => $token,
        'userid' => $userid,
        'amount' => '1',
        'mobile' => '9876543210',
        'name' => 'Diag',
        'orderid' => $testOrder,
        'callback_url' => $callbackUrl,
    ]);
    $ch = curl_init('https://merchant.urbanrupee.in/api/pg/urbanpay/initiate');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Accept: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 20,
    ]);
    $raw = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $json = is_string($raw) ? json_decode($raw, true) : null;
    $probe['urbanHttp'] = $code;
    $probe['ipBlocked'] = $code === 403 && !is_array($json);
    $probe['urbanMessage'] = is_array($json)
        ? (string) ($json['message'] ?? 'ok')
        : 'non-json (likely IP firewall)';
    $probe['hasPaymentUrl'] = is_array($json) && !empty($json['url']);
    $probe['productActivated'] = is_array($json)
        && !str_contains(strtolower((string) ($json['message'] ?? '')), 'not activated');
    $probe['bridgeMode'] = $probe['ipBlocked'] ?? false;
}

payin_ok(['diagnostics' => $probe]);
