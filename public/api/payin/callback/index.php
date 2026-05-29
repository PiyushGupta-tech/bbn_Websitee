<?php
declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    payin_fail(405, 'Method not allowed');
}

$body = payin_json_input();
$orderid = (string) ($body['client_txn_id'] ?? '');
$status = (string) ($body['status'] ?? '');
$utr = isset($body['utr']) ? (string) $body['utr'] : null;
$amount = isset($body['amount']) ? (string) $body['amount'] : null;

if ($orderid !== '' && payin_valid_orderid($orderid)) {
    $store = payin_store_read();
    $store[$orderid] = [
        'status' => $status === 'success' ? 'success' : 'failed',
        'utr' => $utr,
        'amount' => $amount,
        'updatedAt' => date('c'),
    ];
    payin_store_write($store);
}

payin_ok(['received' => true]);
