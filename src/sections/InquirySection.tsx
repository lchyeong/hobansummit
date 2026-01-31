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

const InquirySection = () => {
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
        <form className="inquiry-form" onSubmit={(event) => event.preventDefault()}>
          <div className="inquiry-grid">
            <label className="inquiry-field" htmlFor="inquiry-name">
              <span>
                이름 <em>*</em>
              </span>
              <input id="inquiry-name" name="name" type="text" placeholder="성함을 입력하세요" required />
            </label>
            <label className="inquiry-field" htmlFor="inquiry-phone">
              <span>
                연락처 <em>*</em>
              </span>
              <input id="inquiry-phone" name="phone" type="tel" placeholder="연락처를 입력하세요" required />
            </label>
            <label className="inquiry-field" htmlFor="inquiry-date">
              <span>
                방문 희망일 <em>*</em>
              </span>
              <input id="inquiry-date" name="date" type="date" required />
            </label>
            <label className="inquiry-field" htmlFor="inquiry-time">
              <span>
                방문 희망 시간 <em>*</em>
              </span>
              <div className="inquiry-time-select">
                <select id="inquiry-time" name="timeHour" required aria-label="방문 희망 시">
                  <option value="">시</option>
                  {hourOptions.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}시
                    </option>
                  ))}
                </select>
                <select name="timeMinute" required aria-label="방문 희망 분">
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
            <input id="inquiry-consent" name="consent" type="checkbox" required />
            <span>개인정보 수집·이용에 동의합니다 (필수)</span>
          </label>
          <div className="inquiry-actions">
            <p className="inquiry-helper">
              담당자가 확인 후 빠르게 연락드리겠습니다.
            </p>
            <button type="submit" className="inquiry-submit">
              문의하기
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default InquirySection;
