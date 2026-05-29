<?php
declare(strict_types=1);

/**
 * Browser-side UrbanRupee initiate (avoids VPS IP firewall).
 * One-time ticket from urban-start.php.
 */
$ticketId = preg_replace('/[^a-f0-9]/', '', (string) ($_GET['t'] ?? ''));
if (strlen($ticketId) < 16) {
    http_response_code(400);
    echo 'Invalid payment session.';
    exit;
}

$ticketPath = sys_get_temp_dir() . '/bbn_urban_' . $ticketId . '.json';
if (!is_file($ticketPath)) {
    http_response_code(410);
    echo 'Payment session expired. Please go back and try Pay Online again.';
    exit;
}

$raw = file_get_contents($ticketPath);
@unlink($ticketPath);

$ticket = json_decode((string) $raw, true);
if (!is_array($ticket) || empty($ticket['payload']) || !is_array($ticket['payload'])) {
    http_response_code(400);
    echo 'Invalid payment session data.';
    exit;
}

if (!empty($ticket['exp']) && time() > (int) $ticket['exp']) {
    http_response_code(410);
    echo 'Payment session expired. Please try again.';
    exit;
}

$payload = $ticket['payload'];
$payloadJson = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT);
if ($payloadJson === false) {
    http_response_code(500);
    echo 'Could not start payment.';
    exit;
}

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Redirecting to UrbanRupee…</title>
  <style>
    body { font-family: Georgia, serif; background: #1a0a0e; color: #f5e6e8; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .box { text-align: center; max-width: 28rem; padding: 2rem; }
    .spinner { width: 40px; height: 40px; border: 3px solid rgba(245,230,232,.2); border-top-color: #c9a227; border-radius: 50%; animation: spin .8s linear infinite; margin: 0 auto 1rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
    a { color: #c9a227; }
    .err { color: #ffb4b4; margin-top: 1rem; }
  </style>
</head>
<body>
  <div class="box">
    <div class="spinner" aria-hidden="true"></div>
    <p id="msg">Opening UrbanRupee secure checkout…</p>
    <p class="err" id="err" hidden></p>
    <p id="back" hidden><a href="https://bbnshop.in/checkout/payment">← Back to payment options</a></p>
  </div>
  <script>
    (function () {
      const payload = <?= $payloadJson ?>;
      const msg = document.getElementById('msg');
      const err = document.getElementById('err');
      const back = document.getElementById('back');

      fetch('https://merchant.urbanrupee.in/api/pg/urbanpay/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
        .then(function (res) {
          const d = res.data || {};
          const payUrl = d.url || d.payment_url || d.redirect_url || (d.data && (d.data.url || d.data.payment_url));
          if (payUrl) {
            window.location.replace(payUrl);
            return;
          }
          msg.hidden = true;
          err.hidden = false;
          back.hidden = false;
          var m = d.message || 'UrbanRupee did not return a payment link.';
          if (/not activated/i.test(m)) {
            m = 'UrbanRupee Payin is not activated on merchant UR113 yet. Ask UrbanRupee support to enable the payment gateway product, then try again.';
          }
          err.textContent = m;
        })
        .catch(function (e) {
          msg.hidden = true;
          err.hidden = false;
          back.hidden = false;
          err.textContent = 'Could not reach UrbanRupee. Check your connection and try again.';
        });
    })();
  </script>
</body>
</html>
