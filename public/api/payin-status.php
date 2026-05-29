<?php
declare(strict_types=1);

require __DIR__ . '/payin/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    payin_fail(405, 'Method not allowed');
}

$orderid = (string) ($_GET['orderid'] ?? '');

if (!payin_valid_orderid($orderid)) {
    payin_fail(400, 'Invalid order id');
}

$store = payin_store_read();
$record = $store[$orderid] ?? null;

if (!$record) {
    payin_ok(['status' => 'pending', 'client_txn_id' => $orderid]);
}

payin_ok([
    'status' => $record['status'] ?? 'pending',
    'client_txn_id' => $orderid,
    'utr' => $record['utr'] ?? null,
    'amount' => $record['amount'] ?? null,
]);
