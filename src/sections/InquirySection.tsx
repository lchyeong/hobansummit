import { useState, type ChangeEvent, type FormEvent } from 'react';
import { submitInquiry } from '../utils/inquiryApi';

const hourOptions = (() => {
  const options: string[] = [];
  for (let hour = 9; hour <= 18; hour += 1) {
    options.push(String(hour).padStart(2, '0'));
  }
  return options;
})();

const minuteOptions = (() => {
  const options: string[] = [];
  for (let minute = 0; minute < 60; minute += 10) {
    options.push(String(minute).padStart(2, '0'));
  }
  return options;
})();

type InquiryFormState = {
  name: string;
  phone: string;
  date: string;
  timeHour: string;
  timeMinute: string;
  consent: boolean;
  website: string;
};

const initialFormState: InquiryFormState = {
  name: '',
  phone: '',
  date: '',
  timeHour: '',
  timeMinute: '',
  consent: false,
  website: '',
};

const phonePattern = /^[0-9+\-()\s]{8,20}$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const isValidDateValue = (value: string) => {
  if (!datePattern.test(value)) return false;
  const time = Date.parse(value);
  return Number.isFinite(time);
};

const InquirySection = () => {
  const [form, setForm] = useState<InquiryFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const nextValue =
      event.target instanceof HTMLInputElement && event.target.type === 'checkbox'
        ? event.target.checked
        : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
    if (statusType !== 'idle') {
      setStatusType('idle');
      setStatusMessage('');
    }
  };

  const setError = (message: string) => {
    setStatusType('error');
    setStatusMessage(message);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmedName = form.name.trim();
    const trimmedPhone = form.phone.trim();

    if (form.website.trim()) {
      setStatusType('success');
      setStatusMessage('문의가 접수되었습니다.');
      return;
    }

    if (!trimmedName) {
      setError('이름을 입력해 주세요.');
      return;
    }
    if (!phonePattern.test(trimmedPhone)) {
      setError('연락처 형식을 확인해 주세요.');
      return;
    }
    if (!isValidDateValue(form.date)) {
      setError('방문 희망일을 확인해 주세요.');
      return;
    }
    if (!form.timeHour || !form.timeMinute) {
      setError('방문 희망 시간을 선택해 주세요.');
      return;
    }
    if (!form.consent) {
      setError('개인정보 수집·이용 동의가 필요합니다.');
      return;
    }

    setIsSubmitting(true);
    setStatusType('idle');
    setStatusMessage('');

    try {
      await submitInquiry({
        name: trimmedName,
        phone: trimmedPhone,
        visitDate: form.date,
        visitTime: `${form.timeHour}:${form.timeMinute}`,
        consent: true,
        website: '',
        userAgent: window.navigator.userAgent,
        submittedAt: new Date().toISOString(),
      });
      setStatusType('success');
      setStatusMessage('문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.');
      setForm(initialFormState);
    } catch (error) {
      setError(error instanceof Error ? error.message : '문의 접수 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="main-section-inquiry public-section" data-theme="light">
      <div className="inquiry-inner">
        <div className="inquiry-title-box">
          <span className="inquiry-sign">Visit Reservation</span>
          <h2 className="inquiry-title">
            문의하기
            <span>Consulting</span>
          </h2>
          <p className="inquiry-desc">
            빠른 상담과 방문 안내를 위해 필수 정보를 입력해 주세요.
          </p>
          <p className="inquiry-note">* 필수 입력 항목</p>
        </div>
        <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
          <label className="inquiry-honeypot" htmlFor="inquiry-website" aria-hidden="true">
            홈페이지
            <input
              id="inquiry-website"
              name="website"
              type="text"
              value={form.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
          <div className="inquiry-grid">
            <label className="inquiry-field" htmlFor="inquiry-name">
              <span>
                이름 <em>*</em>
              </span>
              <input
                id="inquiry-name"
                name="name"
                type="text"
                placeholder="성함을 입력하세요"
                required
                value={form.name}
                onChange={handleChange}
                maxLength={30}
              />
            </label>
            <label className="inquiry-field" htmlFor="inquiry-phone">
              <span>
                연락처 <em>*</em>
              </span>
              <input
                id="inquiry-phone"
                name="phone"
                type="tel"
                placeholder="연락처를 입력하세요"
                required
                value={form.phone}
                onChange={handleChange}
                maxLength={20}
              />
            </label>
            <label className="inquiry-field" htmlFor="inquiry-date">
              <span>
                방문 희망일 <em>*</em>
              </span>
              <input
                id="inquiry-date"
                name="date"
                type="date"
                required
                value={form.date}
                onChange={handleChange}
              />
            </label>
            <label className="inquiry-field" htmlFor="inquiry-time">
              <span>
                방문 희망 시간 <em>*</em>
              </span>
              <div className="inquiry-time-select">
                <select
                  id="inquiry-time"
                  name="timeHour"
                  required
                  aria-label="방문 희망 시"
                  value={form.timeHour}
                  onChange={handleChange}
                >
                  <option value="">시</option>
                  {hourOptions.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}시
                    </option>
                  ))}
                </select>
                <select
                  name="timeMinute"
                  required
                  aria-label="방문 희망 분"
                  value={form.timeMinute}
                  onChange={handleChange}
                >
                  <option value="">분</option>
                  {minuteOptions.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}분
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>
          <label className="inquiry-consent" htmlFor="inquiry-consent">
            <input
              id="inquiry-consent"
              name="consent"
              type="checkbox"
              required
              checked={form.consent}
              onChange={handleChange}
            />
            <span>개인정보 수집·이용에 동의합니다 (필수)</span>
          </label>
          <div className="inquiry-actions">
            <p className="inquiry-helper">
              담당자가 확인 후 빠르게 연락드리겠습니다.
            </p>
            <button type="submit" className="inquiry-submit" disabled={isSubmitting}>
              {isSubmitting ? '접수 중...' : '문의하기'}
            </button>
          </div>
          {statusType === 'success' ? (
            <p className="inquiry-status success" role="status">
              {statusMessage}
            </p>
          ) : null}
          {statusType === 'error' ? (
            <p className="inquiry-status error" role="alert">
              {statusMessage}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
};

export default InquirySection;
