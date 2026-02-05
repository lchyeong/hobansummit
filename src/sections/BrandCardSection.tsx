import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import cardLogo from '../assets/images/brand/card-logo.png';
import cardImage1 from '../assets/images/brandcard/01.png';
import cardImage1Mo from '../assets/images/brandcard/01_mo.png';
import cardImage2 from '../assets/images/brandcard/02.jpg';
import cardImage2Mo from '../assets/images/brandcard/02_mo.jpg';
import cardImage3 from '../assets/images/brandcard/03.jpg';
import cardImage3Mo from '../assets/images/brandcard/03_mo.jpg';

const CARD_IMAGES = {
  card1: { pc: cardImage1, mo: cardImage1Mo },
  card2: { pc: cardImage2, mo: cardImage2Mo },
  card3: { pc: cardImage3, mo: cardImage3Mo },
};

const BrandCardSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const selector = gsap.utils.selector(sectionRef);
    let cardTargets: HTMLElement[] = [];
    const onMouseMove = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = 0.2 * (x - rect.width / 2);
      const rotateX = 0.2 * (y - rect.height / 2);
      const inner = target.querySelector<HTMLElement>('.card-inner');
      if (!inner) return;
      gsap.to(inner, {
        scale: 1.4,
        rotateY,
        rotateX,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement;
      const inner = target.querySelector<HTMLElement>('.card-inner');
      if (!inner) return;
      gsap.to(inner, {
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const ctx = gsap.context(() => {
      const cardSlide = selector('.card-slide')[0] as HTMLElement | undefined;
      const cardBox = selector('.card-box')[0] as HTMLElement | undefined;
      const card1 = selector('.card1')[0] as HTMLElement | undefined;
      const card2 = selector('.card2')[0] as HTMLElement | undefined;
      const card3 = selector('.card3')[0] as HTMLElement | undefined;
      const desc01 = selector('.card-desc-01 > div > p');
      const desc02 = selector('.card-desc-02 > div > p');
      const desc03 = selector('.card-desc-03 > div > p');
      const cardText = selector('.card-desc1 > div > div > p, .card-desc2 > div > div > p');
      const logoImgs = selector('.card-desc-logo img');

      if (!cardSlide || !cardBox || !card1 || !card2 || !card3) return;
      const isMobile = window.matchMedia('(max-width: 1200px)').matches;

      const getOffsets = () => {
        const style = window.getComputedStyle(cardBox);
        const offset1 = Number.parseFloat(style.getPropertyValue('--card-offset-1')) || 16;
        const offset2 = Number.parseFloat(style.getPropertyValue('--card-offset-2')) || 32;
        return { offset1, offset2 };
      };

      const resetCards = () => {
        const { offset1, offset2 } = getOffsets();
        gsap.set([card1, card2, card3], { yPercent: 0, force3D: true });
        gsap.set(card1, { y: 0 });
        gsap.set(card2, { y: offset1 });
        gsap.set(card3, { y: offset2 });
      };
      const resetText = () => {
        gsap.set(desc01, { transform: 'translateY(0%)' });
        gsap.set(desc02, { transform: 'translateY(110%)' });
        gsap.set(desc03, { transform: 'translateY(110%)' });
      };

      resetCards();
      resetText();
      gsap.set(cardSlide, { backgroundColor: '#c16d60' });
      gsap.set(cardText, { color: '#ffffff' });
      gsap.set(logoImgs, { filter: 'brightness(0) invert(1)' });

      ScrollTrigger.getById('brand-card-pin')?.kill();
      const cardTl = gsap.timeline({ defaults: { ease: 'none' }, paused: true });

      cardTl
        .to(
          cardSlide,
          {
            backgroundColor: '#ffffff',
            duration: 0.5,
          },
          0
        )
        .to(
          cardText,
          {
            color: '#175a5b',
            duration: 0.5,
          },
          0
        )
        .to(
          logoImgs,
          {
            filter: 'brightness(1) invert(0)',
            duration: 0.5,
          },
          0
        )
        .to(desc01, { transform: 'translateY(-110%)' }, 0)
        .to(desc02, { transform: 'translateY(0%)' }, 0)
        .to(card1, { yPercent: -200, duration: 1 }, 0)
        .to(card2, { y: 0, duration: 1 }, 0)
        .to(card3, { y: () => getOffsets().offset1, duration: 1 }, 0)
        .to(desc02, { transform: 'translateY(-110%)' }, 1)
        .to(desc03, { transform: 'translateY(0%)' }, 1)
        .to(card2, { yPercent: -200, duration: 1 }, 1)
        .to(card3, { y: 0, duration: 1 }, 1);

      ScrollTrigger.create({
        id: 'brand-card-pin',
        trigger: sectionRef.current,
        start: 'top top',
        end: isMobile ? 'bottom top' : '+=360%',
        scrub: true,
        pin: isMobile ? false : cardSlide,
        pinSpacing: !isMobile,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        animation: cardTl,
        onRefreshInit: () => {
          resetCards();
          resetText();
          gsap.set(cardSlide, { backgroundColor: '#c16d60' });
          gsap.set(cardText, { color: '#ffffff' });
          gsap.set(logoImgs, { filter: 'brightness(0) invert(1)' });
        },
        onRefresh: (self) => {
          if (self.progress === 0) {
            resetCards();
            resetText();
            gsap.set(cardSlide, { backgroundColor: '#c16d60' });
            gsap.set(cardText, { color: '#ffffff' });
            gsap.set(logoImgs, { filter: 'brightness(0) invert(1)' });
          }
        },
        onLeaveBack: () => {
          resetCards();
          resetText();
          gsap.set(cardSlide, { backgroundColor: '#c16d60' });
          gsap.set(cardText, { color: '#ffffff' });
          gsap.set(logoImgs, { filter: 'brightness(0) invert(1)' });
        },
      });

      cardTargets = Array.from(
        sectionRef.current?.querySelectorAll<HTMLElement>('.card-box > div') ?? []
      );

      cardTargets.forEach((target) => {
        target.addEventListener('mousemove', onMouseMove);
        target.addEventListener('mouseleave', onMouseLeave);
      });
    }, sectionRef);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener('load', handleLoad);
      cardTargets.forEach((target) => {
        target.removeEventListener('mousemove', onMouseMove);
        target.removeEventListener('mouseleave', onMouseLeave);
      });
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="brand" className="brand-card-section public-section" data-theme="light">
      <div className="card-slide">
        <div className="card-desc1">
          <div className="card-desc-01">
            <div>
              <p className="card-desc-title">SUMMIT</p>
            </div>
            <div>
              <p className="card-desc-logo">
                <img src={cardLogo} alt="" />
              </p>
            </div>
          </div>
          <div className="card-desc-02">
            <div>
              <p className="card-desc-title">QUALITY</p>
            </div>
            <div>
              <p className="card-desc-logo">
                <img src={cardLogo} alt="" />
              </p>
            </div>
          </div>
          <div className="card-desc-03">
            <div>
              <p className="card-desc-title">LIFESTYLE</p>
            </div>
            <div>
              <p className="card-desc-logo">
                <img src={cardLogo} alt="" />
              </p>
            </div>
          </div>
        </div>
        <div className="card-box">
          <div className="card1">
            <div
              className="card-inner"
              style={
                {
                  '--card-bg': `url(${CARD_IMAGES.card1.pc})`,
                  '--card-bg-mo': `url(${CARD_IMAGES.card1.mo})`,
                } as CSSProperties
              }
            />
          </div>
          <div className="card2">
            <div
              className="card-inner"
              style={
                {
                  '--card-bg': `url(${CARD_IMAGES.card2.pc})`,
                  '--card-bg-mo': `url(${CARD_IMAGES.card2.mo})`,
                } as CSSProperties
              }
            />
          </div>
          <div className="card3">
            <div
              className="card-inner"
              style={
                {
                  '--card-bg': `url(${CARD_IMAGES.card3.pc})`,
                  '--card-bg-mo': `url(${CARD_IMAGES.card3.mo})`,
                } as CSSProperties
              }
            />
          </div>
        </div>
        <div className="card-desc2">
          <div className="card-desc-01">
            <div>
              <p>완성도 높은</p>
            </div>
            <div>
              <p>단지 설계</p>
            </div>
          </div>
          <div className="card-desc-02">
            <div>
              <p>브랜드가 만든</p>
            </div>
            <div>
              <p>품격</p>
            </div>
          </div>
          <div className="card-desc-03">
            <div>
              <p>일상을 채우는</p>
            </div>
            <div>
              <p>커뮤니티</p>
            </div>
            <div>
              <p>라이프</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCardSection;
