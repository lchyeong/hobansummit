import premiumBg01 from '../assets/images/premium/섹션6_이미지1_WORK.jpg';
import premiumBg01Mo from '../assets/images/premium/섹션6_이미지1_WORK_mo.jpg';
import premiumBg02 from '../assets/images/premium/섹션6_이미지2_LIFE.jpg';
import premiumBg02Mo from '../assets/images/premium/섹션6_이미지2_LIFE_mo.jpg';
import premiumBg03 from '../assets/images/premium/섹션6_이미지3_EDUCATION.png';
import premiumBg03Mo from '../assets/images/premium/섹션6_이미지3_EDUCATION_mo.png';
import premiumBg04 from '../assets/images/premium/섹션6_이미지4_PLAN.png';
import premiumBg04Mo from '../assets/images/premium/섹션6_이미지4_PLAN_mo.png';
import premiumBg05 from '../assets/images/premium/섹션6_이미지5_BRAND.jpg';
import premiumBg05Mo from '../assets/images/premium/섹션6_이미지5_BRAND_mo.jpg';
import premium01 from '../assets/images/premium/섹션6_이미지1_WORK.jpg';
import premium01Mo from '../assets/images/premium/섹션6_이미지1_WORK_mo.jpg';
import premium02 from '../assets/images/premium/섹션6_이미지2_LIFE.jpg';
import premium02Mo from '../assets/images/premium/섹션6_이미지2_LIFE_mo.jpg';
import premium03 from '../assets/images/premium/섹션6_이미지3_EDUCATION.png';
import premium03Mo from '../assets/images/premium/섹션6_이미지3_EDUCATION_mo.png';
import premium04 from '../assets/images/premium/섹션6_이미지4_PLAN.png';
import premium04Mo from '../assets/images/premium/섹션6_이미지4_PLAN_mo.png';
import premium05 from '../assets/images/premium/섹션6_이미지5_BRAND.jpg';
import premium05Mo from '../assets/images/premium/섹션6_이미지5_BRAND_mo.jpg';
import premiumLogo from '../assets/images/premium/premium-logo.png';

const premiumBackgrounds = [
  { pc: premiumBg01, mo: premiumBg01Mo },
  { pc: premiumBg02, mo: premiumBg02Mo },
  { pc: premiumBg03, mo: premiumBg03Mo },
  { pc: premiumBg04, mo: premiumBg04Mo },
  { pc: premiumBg05, mo: premiumBg05Mo },
];

const premiumImages = [
  { pc: premium01, mo: premium01Mo },
  { pc: premium02, mo: premium02Mo },
  { pc: premium03, mo: premium03Mo },
  { pc: premium04, mo: premium04Mo },
  { pc: premium05, mo: premium05Mo },
];

const premiumImageCredits = [
  '출처: 구미시청',
  '이미지컷',
  '이미지컷',
  '단지전경',
  '이미지컷',
];

const premiumSlides = [
  {
    name: 'WORK',
    desc: '구미 국가산업단지 1·2·3·4단지 인접<br />출퇴근이 가까운 직주근접 입지',
    title: '직주근접 산업단지 프리미엄',
  },
  {
    name: 'LIFE',
    desc: '옥계생활권 중심, 해마루공원 인접<br />근린생활시설 예정',
    title: '생활 인프라 중심 입지',
  },
  {
    name: 'EDUCATION',
    desc: '단지 인접 학교용지 2곳<br />옥계동부초·중, 해마루초·중 인접',
    title: '안심 교육 환경',
  },
  {
    name: 'PLAN',
    desc: '전 세대 전용 59㎡ 단일 평형<br />4Bay-3Room, 판상형 위주 설계',
    title: '효율적인 주거 설계',
  },
  {
    name: 'BRAND',
    desc: '브랜드 대단지 임대아파트<br />총 2,092세대 스케일',
    title: '호반써밋 브랜드 프리미엄',
  },
];

const PremiumSection = () => {
  return (
    <section id="premium" className="main-section-premium public-section" data-theme="light">
      <div className="premium-bg">
        {premiumBackgrounds.map((bg, index) => (
          <img
            key={`premium-bg-${index}`}
            src={bg.pc}
            srcSet={`${bg.mo} 1200w, ${bg.pc} 2400w`}
            sizes="100vw"
            alt=""
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
      <div className="premium-inner">
        <div className="premium-box">
          <div className="premium-box-img">
            {premiumImages.map((image, index) => (
              <img
                key={`premium-img-${index}`}
                src={image.pc}
                srcSet={`${image.mo} 1200w, ${image.pc} 2400w`}
                sizes="(max-width: 1200px) 80vw, 40vw"
                alt=""
                loading="lazy"
                decoding="async"
              />
            ))}
            <div className="premium-image-credit">
              {premiumImageCredits.map((credit, index) => (
                <span key={`premium-credit-${index}`} className={credit ? '' : 'is-empty'}>
                  {credit}
                </span>
              ))}
            </div>
          </div>
          <div className="premium-desc-box">
            {premiumSlides.map((slide) => (
              <div key={slide.name}>
                <h4 className="premium-name">{slide.name}</h4>
                <p className="premium-desc" dangerouslySetInnerHTML={{ __html: slide.desc }} />
                <h3 className="premium-box-title">{slide.title}</h3>
              </div>
            ))}
          </div>
          <a href="#premium" className="premium-rotate-btn">
            <div className="premium-rotate-circle">
              <img src={premiumLogo} alt="" className="premium-rotate-logo" />
            </div>
            <svg className="premium-rotate-text" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path
                  id="premiumRotatePath"
                  d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0"
                />
              </defs>
              <text>
                <textPath href="#premiumRotatePath" startOffset="0">
                  • HOBAN SUMMIT ELITE CITY • HOBAN SUMMIT ELITE CITY • HOBAN SUMMIT ELITE CITY •
                </textPath>
              </text>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
