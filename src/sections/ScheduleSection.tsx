import scheduleBg from '../assets/images/schedule/혜택섹션_배경이미지.png';
import scheduleBgMo from '../assets/images/schedule/혜택섹션_배경이미지_mo.png';

const scheduleItems = [
  { title: '현금 지원', date: <span className="point">1,200만원</span> },
  {
    title: '국민주택기금 승계',
    date: '7,000만원',
  },
  {
    title: '70-80%',
    date: (
      <>
        대출 가능
        <br />
        이율 2%~3%
      </>
    ),
  },
  { title: '평당 분양가', date: '600만원대' },
  { title: '옥계 산동 아파트', date: '300만원으로 끝' },
  { title: '즉시 입주', date: '가능' },
];

const ScheduleSection = () => {
  return (
    <section id="schedule" className="section main-section-schedule public-section" data-theme="dark">
      <div className="schedule-bg">
        <img
          src={scheduleBg}
          srcSet={`${scheduleBgMo} 1200w, ${scheduleBg} 2400w`}
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="schedule-inner">
        <span className="schedule-sign">Unconventional</span>
        <h2 className="schedule-title">BENEFITS</h2>
        <p className="schedule-desc">
          경북 구미 옥계의 호반 써밋의 파격적인 혜택을 확인하세요!
        </p>
        <div className="schedule-table-box">
          <ul className="schedule-table">
            {scheduleItems.map((item, index) => (
              <li
                key={`${item.title}-${item.date}`}
                className={`hover_ani${index === 0 ? ' is-highlight' : ''}`}
                data-color="#C3A07E"
              >
                <span className="line" />
                <span className="line" />
                <span className="line" />
                <span className="line" />
                <span className="con">
                  <span className="con-text">{item.title}</span>
                </span>
                <p className="day">{item.date}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="schedule-btn-box">
          <a href="tel:1844-1474">전화상담하기</a>
          <a href="#inquiry">방문예약하기</a>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
