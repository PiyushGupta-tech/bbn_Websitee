<?php
declare(strict_types=1);

require __DIR__ . '/payin/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    payin_fail(405, 'Method not allowed');
}

$token = trim((string) ($config['URBAN_API_TOKEN'] ?? ''));
$userid = trim((string) ($config['URBAN_USER_ID'] ?? ''));
$callbackUrl = trim((string) ($config['PAYIN_CALLBACK_URL'] ?? ''));

if ($token === '' || $userid === '') {
    payin_fail(503, 'UrbanRupee credentials not configured.');
}

if ($callbackUrl === '' || !str_starts_with($callbackUrl, 'https://')) {
    payin_fail(503, 'Callback URL must be HTTPS.');
}

$input = payin_request_input();
$body = $input;
$mobileRaw = '';

$headerPhone = '';
if (!empty($_SERVER['HTTP_X_CLIENT_A']) && !empty($_SERVER['HTTP_X_CLIENT_B'])) {
    $headerPhone = str_replace(['z', 'x'], '', (string) $_SERVER['HTTP_X_CLIENT_A'] . (string) $_SERVER['HTTP_X_CLIENT_B']);
} elseif (!empty($_SERVER['HTTP_X_CLIENT_P'])) {
    $packed = base64_decode((string) $_SERVER['HTTP_X_CLIENT_P'], true);
    if (is_string($packed) && $packed !== '') {
        $unpacked = base64_decode($packed, true);
        $packed = is_string($unpacked) && $unpacked !== '' ? $unpacked : $packed;
        $headerPhone = str_replace(['z', 'x'], '', $packed);
    }
}
if ($headerPhone !== '' && ctype_xdigit($headerPhone) && strlen($headerPhone) % 2 === 0) {
    $contact = hex2bin($headerPhone);
    if (is_string($contact) && $contact !== '') {
        $mobileRaw = implode('', array_map(
            static fn (string $ch): string => chr(ord($ch) ^ 0x5A),
            str_split($contact),
        ));
    }
}

if (!empty($input['p']) && is_string($input['p'])) {
    $decoded = json_decode((string) base64_decode($input['p'], true), true);
    if (is_array($decoded)) {
        $body = array_merge($body, $decoded);
    }
}

if (!empty($input['o']) && is_string($input['o'])) {
    $decodedOrder = base64_decode($input['o'], true);
    if (is_string($decodedOrder) && $decodedOrder !== '') {
        $orderData = json_decode($decodedOrder, true);
        if (is_array($orderData) && !empty($orderData['id'])) {
            $body['orderid'] = (string) $orderData['id'];
            $contactToken = $orderData['v'] ?? $orderData['u'] ?? $orderData['c'] ?? null;
            if (is_string($contactToken) && $contactToken !== '') {
                if (ctype_xdigit($contactToken) && strlen($contactToken) % 2 === 0) {
                    $contact = hex2bin($contactToken);
                } else {
                    $contact = base64_decode($contactToken, true);
                }
                if (is_string($contact) && $contact !== '') {
                    $mobileRaw = implode('', array_map(
                        static fn (string $ch): string => chr(ord($ch) ^ 0x5A),
                        str_split($contact),
                    ));
                }
            }
        } else {
            $body['orderid'] = $decodedOrder;
        }
    }
}

$amount = (string) ($body['amount'] ?? '');

if ($mobileRaw === '') {
    $contactToken = null;
    if (!empty($body['w1']) && !empty($body['w2'])) {
        $contactToken = str_replace('x', '', (string) $body['w1'] . (string) $body['w2']);
    } elseif (!empty($body['wr']) && is_string($body['wr'])) {
        $contactToken = strrev($body['wr']);
    } else {
        $contactToken = $body['w'] ?? $body['v'] ?? null;
    }
    if (is_string($contactToken) && $contactToken !== '') {
        if (ctype_xdigit($contactToken) && strlen($contactToken) % 2 === 0) {
            $contact = hex2bin($contactToken);
        } else {
            $contact = base64_decode($contactToken, true);
        }
        if (is_string($contact) && $contact !== '') {
            $mobileRaw = implode('', array_map(
                static fn (string $ch): string => chr(ord($ch) ^ 0x5A),
                str_split($contact),
            ));
        }
    }
}

if ($mobileRaw === '') {
    if (!empty($input['a']) && is_string($input['a'])) {
        $decodedA = base64_decode($input['a'], true);
        if (is_string($decodedA) && $decodedA !== '') {
            $decodedTwice = base64_decode($decodedA, true);
            if (is_string($decodedTwice) && $decodedTwice !== '') {
                $mobileRaw = $decodedTwice;
                if (preg_match('/[^0-9]/', $mobileRaw)) {
                    $mobileRaw = implode('', array_map(
                        static fn (string $ch): string => chr(ord($ch) ^ 0x5A),
                        str_split($mobileRaw),
                    ));
                }
            } elseif (!empty($input['b'])) {
                $partB = base64_decode((string) $input['b'], true);
                if (is_string($partB)) {
                    $mobileRaw = $decodedA . $partB;
                }
            }
        }
    } elseif (!empty($body['digits']) && is_array($body['digits'])) {
        $mobileRaw = implode('', array_map(static fn ($d) => (string) $d, $body['digits']));
    } elseif (!empty($body['mr']) && is_string($body['mr'])) {
        $mobileRaw = strrev($body['mr']);
    } else {
        $mobileRaw = (string) ($body['m'] ?? $body['contact'] ?? $body['mobile'] ?? '');
    }
}

$mobile = preg_replace('/\D/', '', $mobileRaw);
$mobile = strlen($mobile) >= 10 ? substr($mobile, -10) : $mobile;
$name = trim((string) ($body['name'] ?? ''));
$orderid = (string) ($body['orderid'] ?? '');

if ($amount === '' || $mobile === '' || $name === '' || $orderid === '') {
    payin_fail(400, 'Missing required fields.');
}

if (!payin_valid_orderid($orderid)) {
    payin_fail(400, 'orderid must be exactly 20 alphanumeric characters.');
}

if (strlen($mobile) !== 10) {
    payin_fail(400, 'Phone must be 10 digits.');
}

$returnUrl = 'https://bbnshop.in/checkout/payment/return?orderid=' . rawurlencode($orderid);

$urbanBody = [
    'token' => $token,
    'userid' => $userid,
    'amount' => $amount,
    'mobile' => $mobile,
    'name' => $name,
    'orderid' => $orderid,
    'callback_url' => $callbackUrl,
    'return_url' => $returnUrl,
    'redirect_url' => $returnUrl,
];
$payload = json_encode($urbanBody);

$relayUrl = trim((string) ($config['URBAN_RELAY_URL'] ?? ''));
$targetUrl = $relayUrl !== ''
    ? $relayUrl
    : 'https://merchant.urbanrupee.in/api/pg/urbanpay/initiate';

$headers = [
    'Content-Type: application/json',
    'Accept: application/json',
    'User-Agent: BBN-Website/1.0',
];
$relaySecret = trim((string) ($config['URBAN_RELAY_SECRET'] ?? ''));
if ($relayUrl !== '' && $relaySecret !== '') {
    $headers[] = 'X-Relay-Secret: ' . $relaySecret;
}

$ch = curl_init($targetUrl);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 12,
    CURLOPT_TIMEOUT => 28,
]);

$response = curl_exec($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    payin_fail(500, 'Could not reach UrbanRupee: ' . $curlError);
}

$data = json_decode($response, true);
if (!is_array($data)) {
    if ($httpCode === 403) {
        $ticketId = bin2hex(random_bytes(16));
        $ticketPath = sys_get_temp_dir() . '/bbn_urban_' . $ticketId . '.json';
        file_put_contents(
            $ticketPath,
            json_encode(['payload' => $urbanBody, 'exp' => time() + 300]),
            LOCK_EX,
        );
        payin_ok([
            'status' => true,
            'message' => 'redirect',
            'url' => '/api/urban-bridge.php?t=' . $ticketId,
            'bridge' => true,
            'live' => true,
        ]);
    }
    payin_fail(400, 'UrbanRupee returned an invalid response (HTTP ' . $httpCode . '). Contact UrbanRupee support.');
}

if (isset($data['status']) && ($data['status'] === false || $data['status'] === 'false' || $data['status'] === 0)) {
    payin_fail(400, (string) ($data['message'] ?? 'UrbanRupee declined the payment request.'));
}

$paymentUrl = $data['url']
    ?? $data['payment_url']
    ?? $data['redirect_url']
    ?? $data['data']['url']
    ?? $data['data']['payment_url']
    ?? null;

if (!$paymentUrl) {
    $msg = (string) ($data['message'] ?? $data['msg'] ?? 'UrbanRupee did not return a payment URL');
    if ($httpCode === 403) {
        $msg = 'UrbanRupee blocked this server. Whitelist IP 187.77.185.148 for merchant UR113.';
    }
    payin_fail(400, $msg);
}

$store = payin_store_read();
$store[$orderid] = ['status' => 'pending', 'updatedAt' => date('c')];
payin_store_write($store);

payin_ok([
    'status' => true,
    'message' => $data['message'] ?? 'success',
    'url' => (string) $paymentUrl,
    'live' => true,
]);
