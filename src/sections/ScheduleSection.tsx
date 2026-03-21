import scheduleBg from '../assets/images/schedule/혜택섹션_배경이미지.png';
import scheduleBgMo from '../assets/images/schedule/혜택섹션_배경이미지_mo.png';

const scheduleItems = [
  { title: '현금지원', singleLine: true },
  {
    title: '국민주택기금 승계 가능',
    date: '7,000만원',
  },
  {
    title: '70-80%',
    date: (
      <>
        대출 가능
        <br />
        이율 2 ~ 3%대
      </>
    ),
  },
  { title: '평당 분양가', date: '600만원대' },
  {
    title: '1억대~',
    date: '25평아파트',
  },
  { title: '즉시 입주 가능', date: '분양·임대' },
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
                key={`schedule-${index}`}
                className={`hover_ani${item.singleLine ? ' is-single-line' : ''}`}
                data-color="#C3A07E"
              >
                <span className="line" />
                <span className="line" />
                <span className="line" />
                <span className="line" />
                <span className="con">
                  <span className="con-text">{item.title}</span>
                </span>
                {item.date ? <p className="day">{item.date}</p> : null}
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
