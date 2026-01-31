import landImg01 from '../assets/images/land/섹션4_이미지1.png';
import landImg01Mo from '../assets/images/land/섹션4_이미지1_mo.png';
import landImg02 from '../assets/images/land/섹션4_이미지2.png';
import landImg02Mo from '../assets/images/land/섹션4_이미지2_mo.png';
import landImg03 from '../assets/images/land/섹션4_이미지3.png';
import landImg03Mo from '../assets/images/land/섹션4_이미지3_mo.png';
import landImg04 from '../assets/images/land/섹션4_이미지4.png';
import landImg04Mo from '../assets/images/land/섹션4_이미지4_mo.png';

const landSlides = [
  {
    id: 0,
    image: landImg01,
    imageMo: landImg01Mo,
    title: "에버랜드 'LOST VALLEY'를 모티브로한 모험 공간",
    desc: '모험을 통해 튼튼한 몸과 마음을 길러주는 창의적 놀이터',
    features: [
      '계곡 탐험을 떠나는 듯한 테마 동선과 놀이 구역이 이어집니다.',
      '활동과 도전을 통해 아이들의 체력과 자립심을 키워주는 모험 놀이터입니다.',
    ],
  },
  {
    id: 1,
    image: landImg02,
    imageMo: landImg02Mo,
    reverse: true,
    title: '상상을 현실로 옮겨놓은 이솝 동화나라',
    desc: '이솝동화 속 한 장면처럼 다채로운 컬러들이 가득한 감성 자극 놀이터',
    features: [
      '이솝 동화 속 장면을 구현한 컬러·오브제가 상상력을 자극합니다.',
      '감성적인 색채와 스토리가 어우러진 창의 놀이 테마존입니다.',
    ],
  },
  {
    id: 2,
    image: landImg03,
    imageMo: landImg03Mo,
    title: '단지 곳곳 시원함을 담은 수공간',
    desc: '단지 안에서 가족들이 즐거운 시간을 보낼 수 있는 다양한 수공간',
    features: [
      '가족이 함께 머무는 수공간이 단지 곳곳에 배치됩니다.',
      '물놀이·휴식·산책이 자연스럽게 이어지는 워터 플레이 존입니다.',
    ],
  },
  {
    id: 3,
    image: landImg04,
    imageMo: landImg04Mo,
    reverse: true,
    title: "에버랜드 'PANDA WORLD'를 모티브로한 놀이 공간",
    desc: '귀여운 판다모형들과 초록빛 기구들이 어우러져 심리적 안정을 돕는 놀이터',
    features: [
      '판다 테마 조형과 초록빛 기구가 편안한 분위기를 만듭니다.',
      '차분한 색감과 구성으로 심리적 안정을 돕는 힐링 놀이터입니다.',
    ],
  },
];

const LandSection = () => {
  return (
    <section id="landscape" className="main-section-land public-section" data-theme="light">
      <div className="land-slide">
        <div className="swiper-wrapper">
          {landSlides.map((slide) => (
            <div
              key={slide.id}
              className={`swiper-slide land-slide-0${slide.id + 1} ${slide.reverse ? 'land-slide-02' : ''}`}
            >
              {slide.reverse ? (
                <>
                  <div className="land-right">
                    <div className="land-title-box">
                      <h2 className="land-title">
                        LANDSCAPE <span>Beyond</span>
                      </h2>
                      <p className="land-desc">
                        {slide.title}
                        <br />
                        <b>{slide.desc}</b>
                      </p>
                      <ul className="land-pagination">
                        {landSlides.map((dot, dotIndex) => (
                          <li
                            key={dot.id}
                            className={dotIndex === slide.id ? 'on' : ''}
                            data-index={dotIndex}
                          />
                        ))}
                      </ul>
                    </div>
                    <ul className="land-feature">
                      {slide.features.map((feature) => (
                        <li key={feature}>
                          <span className="land-feature-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="land-left">
                    <img
                      src={slide.image}
                      srcSet={`${slide.imageMo} 1200w, ${slide.image} 2400w`}
                      sizes="(max-width: 1200px) 100vw, 60vw"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="land-left">
                    <img
                      src={slide.image}
                      srcSet={`${slide.imageMo} 1200w, ${slide.image} 2400w`}
                      sizes="(max-width: 1200px) 100vw, 60vw"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="land-right">
                    <div className="land-title-box">
                      <h2 className="land-title">
                        LANDSCAPE <span>Beyond</span>
                      </h2>
                      <p className="land-desc">
                        {slide.title}
                        <br />
                        <b>{slide.desc}</b>
                      </p>
                      <ul className="land-pagination">
                        {landSlides.map((dot, dotIndex) => (
                          <li
                            key={dot.id}
                            className={dotIndex === slide.id ? 'on' : ''}
                            data-index={dotIndex}
                          />
                        ))}
                      </ul>
                    </div>
                    <ul className="land-feature">
                      {slide.features.map((feature) => (
                        <li key={feature}>
                          <span className="land-feature-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandSection;
