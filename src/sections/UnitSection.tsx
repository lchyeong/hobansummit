import type { CSSProperties } from 'react';

import unitBg from '../assets/images/unit/유닛섹션_배경이미지.png';
import unitBgMo from '../assets/images/unit/유닛섹션_배경이미지_mo.png';
import unit59A1 from '../assets/images/unit/섹션2_ 59A_1.png';
import unit59A1Mo from '../assets/images/unit/섹션2_ 59A_1_mo.png';
import unit59A2 from '../assets/images/unit/섹션2_ 59A_2.png';
import unit59A2Mo from '../assets/images/unit/섹션2_ 59A_2_mo.png';
import unit59B1 from '../assets/images/unit/섹션2_ 59B_1.png';
import unit59B1Mo from '../assets/images/unit/섹션2_ 59B_1_mo.png';
import unit59B2 from '../assets/images/unit/섹션2_ 59B_2.png';
import unit59B2Mo from '../assets/images/unit/섹션2_ 59B_2_mo.png';
import unitArrow from '../assets/images/unit/unit-arrow.png';

const unitSlides = [
  {
    name: '59A',
    desc: '59A 타입 <b>3D 평면도</b>',
    image: unit59A1,
    imageMo: unit59A1Mo,
  },
  {
    name: '59A',
    desc: '59A 타입 <b>공간배치 평면도</b>',
    image: unit59A2,
    imageMo: unit59A2Mo,
  },
  {
    name: '59B',
    desc: '59B 타입 <b>3D 평면도</b>',
    image: unit59B1,
    imageMo: unit59B1Mo,
  },
  {
    name: '59B',
    desc: '59B 타입 <b>공간배치 평면도</b>',
    image: unit59B2,
    imageMo: unit59B2Mo,
  },
];

const UnitSection = () => {
  return (
    <section id="unit" className="main-section-unit public-section" data-theme="light">
      <div className="unit-bg">
        <img
          src={unitBg}
          srcSet={`${unitBgMo} 1200w, ${unitBg} 2400w`}
          sizes="100vw"
          alt=""
          className="unit-bg-img"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="unit-inner">
        <div className="unit-left">
          <h2 className="unit-title">
            UNIT PLAN<span>Design</span>
          </h2>
          <p className="unit-desc">
            옥계 호반 써밋의 전용 59㎡ 평형 <b>59A · 59B</b>를 확인하세요!
          </p>
        </div>
        <div className="unit-right">
          <div className="unit-slide-box">
            <div className="unit-slide">
              <div className="swiper-wrapper">
                {unitSlides.map((slide) => (
                  <div key={slide.name} className="swiper-slide">
                    <h3 className="unit-slide-tit">{slide.name}</h3>
                    <p className="unit-slide-desc" dangerouslySetInnerHTML={{ __html: slide.desc }} />
                    <img
                      src={slide.image}
                      srcSet={`${slide.imageMo} 1200w, ${slide.image} 2400w`}
                      sizes="(max-width: 1200px) 80vw, 40vw"
                      alt=""
                      className={`unit-slide-img${slide.name === '59B' ? ' unit-slide-img--b' : ''}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
            <a href="#unit" className="unit-rotate-btn">
              Unit
              <br />
              PLAN
            </a>
            <ul className="unit-btn-box">
              {unitSlides.map((slide, index) => (
                <li
                  key={slide.name}
                  data-slide={index + 1}
                  className={index === 0 ? 'on' : ''}
                  style={{ '--i': index + 1 } as CSSProperties}
                >
                  <div className="unit-btn-img">
                    <img
                      src={slide.image}
                      alt=""
                      className={slide.name === '59B' ? 'unit-btn-img--b' : ''}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  {slide.name}
                </li>
              ))}
            </ul>
            <div className="unit-navigation">
              <div className="unit-prev" role="button" tabIndex={0}>
                PREV <img src={unitArrow} alt="" />
              </div>
              <div className="unit-next" role="button" tabIndex={0}>
                NEXT <img src={unitArrow} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnitSection;
