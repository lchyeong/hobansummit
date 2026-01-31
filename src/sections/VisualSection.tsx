import mainBg from '../assets/images/hero/main_bg.png';
import mainBgMo from '../assets/images/hero/main_bg_mo.png';

const VisualSection = () => {
  return (
    <section id="visual" className="main-section-visual public-section" data-theme="dark">
      <div className="visual-bg">
        <picture className="visual-bg-picture">
          <source media="(max-width: 1200px)" srcSet={mainBgMo} />
          <img src={mainBg} alt="" loading="eager" decoding="async" fetchPriority="high" />
        </picture>
        <p className="visual-info">※ 상기 CG는 소비자의 이해를 돕기 위해 제작된 것으로 실제와 다를 수 있습니다.</p>
      </div>
      <div className="visual-inner">
        <h2 className="visual-title">
          <p>옥계의 중심</p>
          <p>2,092세대 대단지</p>
        </h2>
        <p className="visual-highlight">
          <span className="visual-highlight-number">1,200만원</span>
          <span className="visual-highlight-label">현금 지원</span>
        </p>
        <p className="visual-logo">구미 옥계 호반 써밋 엘리트시티</p>
      </div>
    </section>
  );
};

export default VisualSection;
