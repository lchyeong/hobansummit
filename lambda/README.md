# Inquiry Lambda

`inquiry-handler.mjs`는 문의하기 API용 Lambda 샘플입니다.

## Environment Variables

- `ALLOWED_ORIGINS`
  - 쉼표(`,`)로 구분한 Origin 화이트리스트
  - 예시: `https://xn--1844-1474-9m57a229agmz5laj6cj13rshgea.com,https://www.xn--1844-1474-9m57a229agmz5laj6cj13rshgea.com`
- `MAIL_FROM`
  - 예시: `no-reply@newzest.kr`
- `MAIL_TO`
  - 예시: `lchyoeng@newzest.kr`
- `SES_REGION` (선택)
  - 예시: `ap-northeast-2`
  - 설정하지 않으면 Lambda의 기본 리전(`AWS_REGION`)을 사용

## IAM Permission

Lambda 실행 Role에 최소 아래 권한이 필요합니다.

- `ses:SendEmail`

## API

- `POST /contact`
- `OPTIONS /contact` (CORS preflight)

요청 예시:

```json
{
  "name": "홍길동",
  "phone": "010-1234-5678",
  "visitDate": "2026-02-07",
  "visitTime": "14:30",
  "consent": true,
  "userAgent": "Mozilla/5.0 ...",
  "submittedAt": "2026-02-06T12:34:56.000Z",
  "website": ""
}
```

## Frontend Variable

프론트에서는 `.env`의 `VITE_INQUIRY_API_URL`에 API Gateway URL을 넣으면 됩니다.
