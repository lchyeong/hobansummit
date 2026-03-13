import { useEffect, useState } from 'react';

import logo from '../assets/images/common/main-logo.png';

const FooterSection = () => {
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  useEffect(() => {
    if (!isChecklistOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsChecklistOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isChecklistOpen]);

  return (
    <footer id="footer" className="footer">
      <div className="footer-inner">
        <div className="footer-right">
          <img src={logo} alt="" className="footer-logo" />
          <div className="footer-box">
            <ul className="footer-list footer-list-grid">
              <li>사업명 : 호반써밋 ELITE CITY (구미)</li>
              <li>주소 : 경북 구미시 산동읍 신당리 1474</li>
              <li>대표번호 1844-1474</li>
              <li>상호명 : 서브웰 주식회사</li>
              <li>대표자 : 박상완</li>
              <li>사업자번호 : 167-86-01723</li>
            </ul>
            <ul className="footer-disclaimer">
              <li>
                ※ 본 홈페이지에 사용된 사진, 그래픽, 일러스트 및 내용 등은 소비자의 이해를 돕기 위한 것으로 실제와 다소 차이가 있을 수 있습니다.
              </li>
              <li>
                ※ 본 홈페이지는 제작, 편집, 인쇄과정상 오류가 있을 수 있으니, 중요사항 및 세부사항은 견본주택 관계자에게 문의하시기 바랍니다.
              </li>
            </ul>
            <button
              type="button"
              className="infomation"
              onClick={() => setIsChecklistOpen(true)}
            >
              개인정보처리방침
            </button>
          </div>
        </div>
      </div>

      {isChecklistOpen ? (
        <div className="checklist-modal" role="dialog" aria-modal="true" aria-labelledby="checklist-title">
          <div className="checklist-dim" onClick={() => setIsChecklistOpen(false)} role="presentation" />
          <div className="checklist-content">
            <div className="checklist-head">
              <h3 id="checklist-title" className="checklist-title">
                개인정보처리방침
              </h3>
              <button
                type="button"
                className="checklist-close"
                onClick={() => setIsChecklistOpen(false)}
              >
                닫기
              </button>
            </div>
            <p className="checklist-sub">상담 및 방문예약을 위해 아래와 같이 개인정보를 수집·이용합니다.</p>
            <ul className="checklist-list">
              <li>수집 항목: 이름, 연락처, 방문 희망일, 방문 희망 시간</li>
              <li>이용 목적: 상담 및 방문예약 안내</li>
              <li>보유 및 이용 기간: 목적 달성 후 지체 없이 파기 (관련 법령에 따라 보관이 필요한 경우 해당 기간 보관)</li>
              <li>동의 거부 권리: 개인정보 수집·이용에 대한 동의를 거부할 권리가 있으며, 거부 시 상담 및 방문예약 안내가 제한될 수 있습니다.</li>
              <li>문의처: 대표번호 1844-1474</li>
            </ul>
          </div>
        </div>
      ) : null}
    </footer>
  );
};

export default FooterSection;
