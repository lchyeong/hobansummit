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

const COMPACT_BREAKPOINT = 1200;
const PHASE_DISTANCE_MULTIPLIER_COMPACT = 2.5;
const PHASE_DISTANCE_MULTIPLIER_DESKTOP = 2.1;
const PHASE_DISTANCE_MIN_COMPACT = 560;
const PHASE_DISTANCE_MIN_DESKTOP = 760;
const COMPACT_START_EXTRA_PX = 8;
const OUTRO_DISTANCE_MULTIPLIER_COMPACT = 0.95;
const OUTRO_DISTANCE_MULTIPLIER_DESKTOP = 0.55;

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
      const pinWrap = selector('.brand-pin')[0] as HTMLElement | undefined;
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
      const phaseDuration = 1;
      const firstPhaseStart = 0;
      const secondPhaseStart = firstPhaseStart + phaseDuration;
      const compactMedia = window.matchMedia(`(max-width: ${COMPACT_BREAKPOINT}px)`);

      const getOffsets = () => {
        const style = window.getComputedStyle(cardBox);
        const offset1 = Number.parseFloat(style.getPropertyValue('--card-offset-1')) || 16;
        const offset2 = Number.parseFloat(style.getPropertyValue('--card-offset-2')) || 32;
        return { offset1, offset2 };
      };
      const getHeaderHeight = () => {
        const rootStyle = window.getComputedStyle(document.documentElement);
        const raw = rootStyle.getPropertyValue('--header-height');
        const parsed = Number.parseFloat(raw);
        return Number.isFinite(parsed) ? parsed : 0;
      };
      const getCardMetrics = () => {
        const compact = compactMedia.matches;
        const slideRect = cardSlide.getBoundingClientRect();
        const cardRect = cardBox.getBoundingClientRect();
        const { offset1, offset2 } = getOffsets();
        const topGap = Math.max(0, cardRect.top - slideRect.top);
        const bottomGap = Math.max(0, slideRect.bottom - cardRect.bottom);
        const cardHeight = Math.max(1, cardRect.height);
        const phaseMultiplier = compact
          ? PHASE_DISTANCE_MULTIPLIER_COMPACT
          : PHASE_DISTANCE_MULTIPLIER_DESKTOP;
        const phaseMin = compact ? PHASE_DISTANCE_MIN_COMPACT : PHASE_DISTANCE_MIN_DESKTOP;
        const phaseDistancePx = Math.round(Math.max(cardHeight * phaseMultiplier, phaseMin));
        const headerHeight = getHeaderHeight();
        const startOffsetPx = compact
          ? Math.max(0, Math.round(topGap - headerHeight + COMPACT_START_EXTRA_PX))
          : 0;
        const outroMultiplier = compact
          ? OUTRO_DISTANCE_MULTIPLIER_COMPACT
          : OUTRO_DISTANCE_MULTIPLIER_DESKTOP;
        const outroDistancePx = Math.round(
          Math.max(bottomGap + Math.abs(offset1), cardHeight * outroMultiplier, Math.abs(offset2 - offset1))
        );
        const scrollDistancePx = Math.round(phaseDistancePx * 2 + outroDistancePx);
        const outroHoldUnits = Math.max(0.2, outroDistancePx / phaseDistancePx);
        return {
          compact,
          startOffsetPx,
          scrollDistancePx,
          outroHoldUnits,
        };
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
      let cardMetrics = getCardMetrics();
      const cardTl = gsap.timeline({ defaults: { ease: 'none' }, paused: true });
      const holdProxy = { value: 0 };

      const rebuildTimeline = () => {
        cardTl.clear();
        holdProxy.value = 0;
        cardTl
          .to(
            cardSlide,
            {
              backgroundColor: '#ffffff',
              duration: phaseDuration * 0.5,
            },
            firstPhaseStart
          )
          .to(
            cardText,
            {
              color: '#175a5b',
              duration: phaseDuration * 0.5,
            },
            firstPhaseStart
          )
          .to(
            logoImgs,
            {
              filter: 'brightness(1) invert(0)',
              duration: phaseDuration * 0.5,
            },
            firstPhaseStart
          )
          .to(desc01, { transform: 'translateY(-110%)' }, firstPhaseStart)
          .to(desc02, { transform: 'translateY(0%)' }, firstPhaseStart)
          .to(card1, { yPercent: -200, duration: phaseDuration }, firstPhaseStart)
          .to(card2, { y: 0, duration: phaseDuration }, firstPhaseStart)
          .to(card3, { y: () => getOffsets().offset1, duration: phaseDuration }, firstPhaseStart)
          .to(desc02, { transform: 'translateY(-110%)' }, secondPhaseStart)
          .to(desc03, { transform: 'translateY(0%)' }, secondPhaseStart)
          .to(card2, { yPercent: -200, duration: phaseDuration }, secondPhaseStart)
          .to(card3, { y: 0, duration: phaseDuration }, secondPhaseStart)
          .to(
            holdProxy,
            {
              value: 1,
              duration: cardMetrics.outroHoldUnits,
            },
            secondPhaseStart + phaseDuration
          );
      };

      rebuildTimeline();

      ScrollTrigger.create({
        id: 'brand-card-pin',
        trigger: pinWrap ?? sectionRef.current,
        start: () => {
          cardMetrics = getCardMetrics();
          if (!cardMetrics.compact) return 'top top';
          return `top+=${cardMetrics.startOffsetPx} top`;
        },
        end: () => {
          cardMetrics = getCardMetrics();
          return `+=${cardMetrics.scrollDistancePx}`;
        },
        scrub: true,
        pin: cardSlide,
        pinSpacing: true,
        pinType: compactMedia.matches ? 'transform' : 'fixed',
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        animation: cardTl,
        onRefreshInit: () => {
          cardMetrics = getCardMetrics();
          rebuildTimeline();
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

    return () => {
      cardTargets.forEach((target) => {
        target.removeEventListener('mousemove', onMouseMove);
        target.removeEventListener('mouseleave', onMouseLeave);
      });
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="brand" className="brand-card-section public-section" data-theme="light">
      <div className="brand-entry" aria-hidden="true" />
      <div className="brand-pin">
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
      </div>
    </section>
  );
};

export default BrandCardSection;
