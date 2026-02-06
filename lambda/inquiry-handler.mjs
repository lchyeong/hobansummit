import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const DEFAULT_ALLOWED_ORIGINS = [
  'https://xn--1844-1474-9m57a229agmz5laj6cj13rshgea.com',
  'https://www.xn--1844-1474-9m57a229agmz5laj6cj13rshgea.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const originWhitelist = new Set(
  allowedOrigins.length > 0 ? allowedOrigins : DEFAULT_ALLOWED_ORIGINS
);

const sesClient = new SESClient({
  region:
    process.env.SES_REGION ||
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION ||
    'ap-northeast-2',
});

const json = (statusCode, payload, origin = '') => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,X-Requested-With',
    Vary: 'Origin',
  },
  body: JSON.stringify(payload),
});

const normalizeText = (value, max = 120) =>
  String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, max);

const phonePattern = /^[0-9+\-()\s]{8,20}$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^(0[9]|1[0-8]):(00|10|20|30|40|50)$/;

const isValidDate = (value) => datePattern.test(value) && Number.isFinite(Date.parse(value));

const ensureAllowedOrigin = (origin) => {
  if (!origin || !originWhitelist.has(origin)) {
    return {
      ok: false,
      response: json(403, { ok: false, message: '허용되지 않은 Origin 입니다.' }),
    };
  }
  return { ok: true };
};

const sendBySes = async ({ name, phone, visitDate, visitTime }) => {
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;
  if (!from || !to) {
    throw new Error('메일 전송 설정이 누락되었습니다. (MAIL_FROM/MAIL_TO)');
  }

  const subject = `[방문예약] ${name} / ${phone}`;
  const text = [
    '방문 예약 문의',
    `이름: ${name}`,
    `연락처: ${phone}`,
    `방문 희망일: ${visitDate}`,
    `방문 희망시간: ${visitTime}`,
  ].join('\n');
  const html = [
    '<h2>방문 예약 문의</h2>',
    `<p><strong>이름:</strong> ${name}</p>`,
    `<p><strong>연락처:</strong> ${phone}</p>`,
    `<p><strong>방문 희망일:</strong> ${visitDate}</p>`,
    `<p><strong>방문 희망시간:</strong> ${visitTime}</p>`,
  ].join('');

  await sesClient.send(
    new SendEmailCommand({
      Source: from,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject, Charset: 'UTF-8' },
        Body: {
          Text: { Data: text, Charset: 'UTF-8' },
          Html: { Data: html, Charset: 'UTF-8' },
        },
      },
    })
  );
};

export const handler = async (event) => {
  const method = event?.requestContext?.http?.method ?? event?.httpMethod ?? 'GET';
  const origin = event?.headers?.origin || event?.headers?.Origin || '';

  if (method === 'OPTIONS') {
    const checked = ensureAllowedOrigin(origin);
    if (!checked.ok) return checked.response;
    return json(204, { ok: true }, origin);
  }

  const checked = ensureAllowedOrigin(origin);
  if (!checked.ok) return checked.response;

  if (method !== 'POST') {
    return json(405, { ok: false, message: '허용되지 않은 메서드입니다.' }, origin);
  }

  const rawBody = event?.body ?? '';
  if (!rawBody || rawBody.length > 10_000) {
    return json(400, { ok: false, message: '요청 데이터가 유효하지 않습니다.' }, origin);
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return json(400, { ok: false, message: 'JSON 형식이 잘못되었습니다.' }, origin);
  }

  const name = normalizeText(body.name, 40);
  const phone = normalizeText(body.phone, 24);
  const visitDate = normalizeText(body.visitDate, 10);
  const visitTime = normalizeText(body.visitTime, 5);
  const website = normalizeText(body.website, 120); // honeypot

  if (website) {
    return json(200, { ok: true, message: '문의가 접수되었습니다.' }, origin);
  }

  if (!name) return json(400, { ok: false, message: '이름을 확인해 주세요.' }, origin);
  if (!phonePattern.test(phone)) {
    return json(400, { ok: false, message: '연락처 형식을 확인해 주세요.' }, origin);
  }
  if (!isValidDate(visitDate)) {
    return json(400, { ok: false, message: '방문 희망일을 확인해 주세요.' }, origin);
  }
  if (!timePattern.test(visitTime)) {
    return json(400, { ok: false, message: '방문 희망 시간을 확인해 주세요.' }, origin);
  }

  try {
    await sendBySes({ name, phone, visitDate, visitTime });
    return json(200, { ok: true, message: '문의가 접수되었습니다.' }, origin);
  } catch (error) {
    console.error('inquiry-mail-send-failed', error);
    return json(500, { ok: false, message: '메일 전송 중 오류가 발생했습니다.' }, origin);
  }
};
