import { useEffect, useState, type CSSProperties } from 'react';
import greenImg from '../assets/images/green/섹션5_이미지1.png';
import greenImgMo from '../assets/images/green/섹션5_이미지1_mo.png';
import greenCircle01 from '../assets/images/green/섹션5_이미지2.png';
import greenCircle01Mo from '../assets/images/green/섹션5_이미지2_mo.png';
import greenCircle02 from '../assets/images/green/섹션5_이미지3.png';
import greenCircle02Mo from '../assets/images/green/섹션5_이미지3_mo.png';
import unitArrow from '../assets/images/unit/unit-arrow.png';

const greenAmenities = [
  'GX룸',
  '휘트니스 클럽',
  '실내골프연습장',
  '독서실',
  '1인 독서실',
  '주민회의실',
  '다목적실',
  '키즈클럽',
  '볼풀장',
  '작은도서관',
  '카페테리아',
  '헬스케어실',
];

const greenSlides = [
  {
    id: 0,
    variant: 'split',
    image: greenImg,
    imageMo: greenImgMo,
    circleImages: [
      { src: greenCircle01, srcMo: greenCircle01Mo },
      { src: greenCircle02, srcMo: greenCircle02Mo },
    ],
  },
];

const GREEN_STAGE_WIDTH = 1740;
const GREEN_STAGE_HEIGHT = 980;
const GREEN_SCALE_WIDTH_PADDING = 48;
const GREEN_SCALE_HEIGHT_PADDING = 40;

const computeGreenStageScale = () => {
  if (typeof window === 'undefined') return 1;
  const scaleX = (window.innerWidth - GREEN_SCALE_WIDTH_PADDING) / GREEN_STAGE_WIDTH;
  const scaleY = (window.innerHeight - GREEN_SCALE_HEIGHT_PADDING) / GREEN_STAGE_HEIGHT;
  return Math.max(0, Math.min(1, scaleX, scaleY));
};

const GreenSection = () => {
  const [greenStageScale, setGreenStageScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      setGreenStageScale(computeGreenStageScale());
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  const greenStageStyle = {
    '--green-stage-scale': greenStageScale,
  } as CSSProperties;

  return (
    <section id="greenery" className="main-section-green public-section" data-theme="light">
      <div className="green-stage" style={greenStageStyle}>
        <div className="green-slide">
          <div className="swiper-wrapper">
            {greenSlides.map((slide, index) => (
              <div key={slide.id} className={`swiper-slide green-slide-0${index + 1}`}>
                <div className="green-slide-inner">
                  <div className="green-left">
                    <div className="green-copy">
                      <h2 className="green-title">
                        COMMUNITY <br className="moView" />
                        LOUNGE<span>Community</span>
                      </h2>
                      <p className="green-desc">
                        영어 교육 프로그램 2년 무상, 실내 골프연습장, 휘트니스, GX룸,<br />
                        <b>독서실·키즈클럽·작은도서관·카페테리아·주민회의실·다목적실</b>
                      </p>
                    </div>
                    <ul className="green-amenity" aria-label="커뮤니티 시설">
                      {greenAmenities.map((item, idx) => (
                        <li key={item} data-index={String(idx + 1)}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="green-right">
                    <div className="green-image-wrap">
                      {slide.image ? (
                        <img
                          src={slide.image}
                          srcSet={`${slide.imageMo} 1200w, ${slide.image} 2400w`}
                          sizes="(max-width: 1200px) 80vw, 50vw"
                          alt=""
                          className="green-img"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}
                      {slide.circleImages ? (
                        <div className="green-circle-group">
                          {slide.circleImages.map((image, imageIndex) => (
                            <div key={`${slide.id}-circle-${imageIndex}`} className="green-circle">
                              <img
                                src={image.src}
                                srcSet={`${image.srcMo} 1200w, ${image.src} 2400w`}
                                sizes="(max-width: 1200px) 30vw, 15vw"
                                alt=""
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="green-control">
          <div className="green-navigation">
            <div className="green-prev" role="button" tabIndex={0}>
              PREV <img src={unitArrow} alt="" />
            </div>
            <div className="green-next" role="button" tabIndex={0}>
              NEXT <img src={unitArrow} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreenSection;
