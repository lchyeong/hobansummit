export type InquirySubmissionPayload = {
  name: string;
  phone: string;
  visitDate: string;
  visitTime: string;
  consent: true;
  website: string;
  userAgent: string;
  submittedAt: string;
};

type InquiryApiResponse = {
  ok?: boolean;
  message?: string;
};

const normalizeApiUrl = (value: string | undefined) => value?.trim() ?? '';

const inquiryApiUrl = normalizeApiUrl(import.meta.env.VITE_INQUIRY_API_URL);

export const submitInquiry = async (payload: InquirySubmissionPayload) => {
  if (!inquiryApiUrl) {
    throw new Error('문의 API 주소가 설정되지 않았습니다. (VITE_INQUIRY_API_URL)');
  }

  const response = await fetch(inquiryApiUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let body: InquiryApiResponse | null = null;
  try {
    body = (await response.json()) as InquiryApiResponse;
  } catch {
    body = null;
  }

  if (!response.ok || body?.ok === false) {
    throw new Error(body?.message || '문의 접수 중 오류가 발생했습니다.');
  }
};
