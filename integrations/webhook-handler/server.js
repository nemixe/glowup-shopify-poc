const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.raw({ type: 'application/json' }));

// ============ CONFIG ============
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET || '';
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || '';
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || '';
const PORT = process.env.PORT || 3000;

// ============ HMAC VERIFICATION ============
function verifyShopifyWebhook(req, res, next) {
  const hmac = req.get('X-Shopify-Hmac-Sha256');
  const topic = req.get('X-Shopify-Topic');
  const shop = req.get('X-Shopify-Shop-Domain');

  if (!hmac || !SHOPIFY_API_SECRET) {
    console.warn('Missing HMAC or API secret');
    return res.status(401).send('Unauthorized');
  }

  const digest = crypto
    .createHmac('sha256', SHOPIFY_API_SECRET)
    .update(req.body)
    .digest('base64');

  if (digest !== hmac) {
    console.warn('HMAC verification failed for', topic, 'from', shop);
    return res.status(401).send('Unauthorized');
  }

  req.webhookTopic = topic;
  req.webhookShop = shop;
  next();
}

// ============ WEBHOOK HANDLERS ============

// Handle order creation
function handleOrderCreated(topic, shop, data) {
  const order = JSON.parse(data.toString());
  const customerName = order.customer ? (order.customer.first_name + ' ' + order.customer.last_name) : 'Guest';
  const total = order.total_price;
  const items = order.line_items.map(i => `- ${i.title} x${i.quantity} ($${i.price})`).join('\n');

  const message = [
    `🛒 **New Order** from ${shop}`,
    `**Order #${order.order_number}**`,
    `**Customer:** ${customerName}`,
    `**Total:** $${total} ${order.currency}`,
    `**Items:**`,
    items,
    `**Shipping:** ${order.shipping_address ? order.shipping_address.city + ', ' + order.shipping_address.country : 'N/A'}`,
  ].join('\n');

  console.log('Order created:', order.order_number, '- $' + total);

  // Send to Discord
  if (DISCORD_WEBHOOK_URL) sendToDiscord(message);
  // Send to Slack
  if (SLACK_WEBHOOK_URL) sendToSlack(message);
}

// Handle order fulfillment
function handleOrderFulfilled(topic, shop, data) {
  const order = JSON.parse(data.toString());
  console.log('Order fulfilled:', order.order_number);
}

// Handle order cancellation
function handleOrderCancelled(topic, shop, data) {
  const order = JSON.parse(data.toString());
  const message = `⚠️ **Order Cancelled** #${order.order_number} - $${order.total_price}`;
  console.log('Order cancelled:', order.order_number);
  if (DISCORD_WEBHOOK_URL) sendToDiscord(message);
}

// ============ NOTIFICATION SENDERS ============

function sendToDiscord(message) {
  const payload = JSON.stringify({ content: message });
  const url = new URL(DISCORD_WEBHOOK_URL);

  const req = https.request({
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
  }, (res) => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => console.log('Discord response:', res.statusCode, body));
  });
  req.on('error', e => console.error('Discord error:', e.message));
  req.write(payload);
  req.end();
}

function sendToSlack(message) {
  const payload = JSON.stringify({ text: message });
  const url = new URL(SLACK_WEBHOOK_URL);

  const req = https.request({
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
  }, (res) => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => console.log('Slack response:', res.statusCode, body));
  });
  req.on('error', e => console.error('Slack error:', e.message));
  req.write(payload);
  req.end();
}

// ============ ROUTES ============

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Webhook endpoint
app.post('/webhooks/shopify', verifyShopifyWebhook, (req, res) => {
  const { webhookTopic, webhookShop } = req;

  console.log(`[${new Date().toISOString()}] Webhook: ${webhookTopic} from ${webhookShop}`);

  switch (webhookTopic) {
    case 'orders/create':
      handleOrderCreated(webhookTopic, webhookShop, req.body);
      break;
    case 'orders/fulfilled':
      handleOrderFulfilled(webhookTopic, webhookShop, req.body);
      break;
    case 'orders/cancelled':
      handleOrderCancelled(webhookTopic, webhookShop, req.body);
      break;
    default:
      console.log('Unhandled topic:', webhookTopic);
  }

  res.status(200).send('OK');
});

// ============ START ============

app.listen(PORT, () => {
  console.log(`🚀 GlowUp Shopify Webhook Handler running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Webhook: http://localhost:${PORT}/webhooks/shopify`);
  if (!SHOPIFY_API_SECRET) console.warn('⚠️  SHOPIFY_API_SECRET not set — webhook verification disabled');
  if (!DISCORD_WEBHOOK_URL && !SLACK_WEBHOOK_URL) console.warn('⚠️  No notification webhooks configured');
});
