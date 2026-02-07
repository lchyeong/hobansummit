import overviewMap from '../assets/images/overview/섹션7_이미지1.png';
import overviewMapMo from '../assets/images/overview/섹션7_이미지1_mo.png';

const OverviewSection = () => {
  return (
    <section id="overview" className="main-section-overview public-section" data-theme="light">
      <div className="overview-bg">
        <div className="overview-bg-box">
          <div className="overview-map-wrap">
            <picture>
              <source media="(max-width: 1200px)" srcSet={overviewMapMo} />
              <img
                className="overview-map"
                src={overviewMap}
                width={3294}
                height={2800}
                alt=""
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
          <a
            href="https://map.naver.com/p/entry/place/945516938?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202602032146&locale=ko&svcName=map_pcv5"
            className="moView overview-mo-big"
            target="_blank"
            rel="noreferrer"
          >
            지도로 살펴보기
          </a>
        </div>
      </div>
      <div className="overview-inner pcView">
        <h2 className="overview-inner-title">
          <p />
          <p>LOCATION</p>
        </h2>
        <a
          href="https://map.naver.com/p/entry/place/945516938?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202602032146&locale=ko&svcName=map_pcv5"
          className="overview-big"
          target="_blank"
          rel="noreferrer"
        >
          지도로<br />살펴보기
          <span>+</span>
        </a>
      </div>
      <div className="overview-box">
        <div className="overview-box-inner">
          <h2 className="overview-title">OVERVIEW</h2>
          <ul className="overview-list">
            <li>
              <div className="overview-desc">
                <p>호반써밋 ELITE CITY (구미)</p>
              </div>
              <span className="overview-line" />
              <div className="overview-name">
                <p>사업명</p>
              </div>
            </li>
            <li>
              <div className="overview-desc">
                <p>경북 구미시 산동읍 신당리 1474</p>
              </div>
              <span className="overview-line" />
              <div className="overview-name">
                <p>대지위치</p>
              </div>
            </li>
            <li>
              <div className="overview-desc">
                <p>18개동(101~118동) · 지하1~지상25층 · 2,092세대</p>
              </div>
              <span className="overview-line" />
              <div className="overview-name">
                <p>규모</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
