import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';

const useMainAnimations = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize,orientationchange',
    });
    const createdTriggers: ScrollTrigger[] = [];
    let refreshRafId = 0;

    const queueScrollTriggerRefresh = () => {
      if (refreshRafId) cancelAnimationFrame(refreshRafId);
      refreshRafId = requestAnimationFrame(() => {
        refreshRafId = 0;
        ScrollTrigger.refresh();
      });
    };

    const visualSplit = new SplitType('.visual-title > p', { types: 'chars' });
    const scheduleSplit = new SplitType('.schedule-title', { types: 'chars' });

    gsap.set('.visual-title .char', { opacity: 0, y: -50 });
    gsap.set('.visual-highlight', { opacity: 0, y: 30 });
    gsap.set('.schedule-title .char', { opacity: 0 });

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.innerWidth < 1024 || isTouch;

    const visualTl = gsap.timeline();
    visualTl
      .to(visualSplit.chars, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 2,
      })
      .to(
        '.visual-line',
        {
          clipPath: 'inset(0 0 0%)',
          duration: 1,
        },
        1.5
      )
      .to(
        '.visual-highlight',
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
        },
        1.9
      )
      .to(
        '.visual-logo',
        {
          opacity: 1,
          transform: 'translateY(0)',
          duration: 1.5,
        },
        2
      );

    const unitSwiper = new Swiper('.unit-slide', {
      modules: [Autoplay, Navigation],
      slidesPerView: 1,
      speed: 700,
      loop: true,
      loopAdditionalSlides: 1,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        prevEl: '.unit-prev',
        nextEl: '.unit-next',
      },
      on: {
        slideChange(swiper) {
          const realIndex = swiper.realIndex + 1;
          document.querySelectorAll('.unit-btn-box > li').forEach((item, index) => {
            item.classList.toggle('on', index + 1 === realIndex);
          });
        },
      },
    });

    const unitButtons = Array.from(document.querySelectorAll<HTMLElement>('.unit-btn-box > li'));
    const unitButtonHandlers = unitButtons.map((button, index) => {
      const handler = () => unitSwiper.slideToLoop(index);
      button.addEventListener('click', handler);
      return { button, handler };
    });

    const landSwiper = new Swiper('.land-slide', {
      modules: [Navigation, Autoplay],
      speed: 1000,
      loop: true,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      allowTouchMove: isMobile,
    });

    const landDots = Array.from(document.querySelectorAll<HTMLElement>('.land-pagination > li'));
    const landDotHandlers = landDots.map((dot, index) => {
      const handler = () => {
        const targetIndex = Number(dot.dataset.index ?? index);
        if (landSwiper.params.loop) {
          landSwiper.slideToLoop(targetIndex);
          return;
        }
        landSwiper.slideTo(targetIndex);
      };
      dot.addEventListener('click', handler);
      return { dot, handler };
    });


    const greenSwiper = new Swiper('.green-slide', {
      modules: [Navigation],
      speed: 1000,
      navigation: {
        prevEl: '.green-prev',
        nextEl: '.green-next',
      },
      allowTouchMove: isMobile,
    });

    const headerNavLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.header-nav a[href^="#"]')
    );
    const headerNavItems = headerNavLinks
      .map((link) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return null;
        const id = href.slice(1);
        const li = link.closest('li');
        if (!li) return null;
        return { id, li };
      })
      .filter((item): item is { id: string; li: HTMLLIElement } => Boolean(item));

    const setActiveHeaderNav = (id: string) => {
      headerNavItems.forEach((item) => {
        item.li.classList.toggle('active', item.id === id);
      });
    };

    const addSectionTrigger = (selector: string, _dark = false, onEnter?: () => void) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) return;
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top center+=200',
        end: 'bottom center',
        onEnter: () => {
          element.classList.add('active');
          onEnter?.();
        },
        onEnterBack: () => {
          element.classList.add('active');
          onEnter?.();
        },
        onLeave: () => {
        },
        onLeaveBack: () => {
          element.classList.remove('active');
        },
      });
      createdTriggers.push(trigger);
    };

    addSectionTrigger('.main-section-visual', true);
    addSectionTrigger('.main-section-inquiry', true);
    addSectionTrigger('.main-section-unit', true);
    addSectionTrigger('.main-section-schedule', false, () => {
      gsap.to(scheduleSplit.chars, {
        opacity: 1,
        stagger: {
          each: 0.1,
          from: 'random',
        },
        duration: 1,
      });
    });
    addSectionTrigger('.main-section-land', true);
    addSectionTrigger('.main-section-green', true);
    addSectionTrigger('.main-section-premium', true);
    addSectionTrigger('.brand-card-section', true);


    headerNavItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (!section) return;
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top center+=200',
        end: 'bottom center',
        onEnter: () => setActiveHeaderNav(item.id),
        onEnterBack: () => setActiveHeaderNav(item.id),
      });
      createdTriggers.push(trigger);
    });

    if (headerNavItems[0]) {
      setActiveHeaderNav(headerNavItems[0].id);
    }

    const premiumSlides = document.querySelectorAll('.premium-desc-box > div');
    const premiumCount = Math.max(1, premiumSlides.length);
    const premiumCredits = document.querySelectorAll('.premium-image-credit > span');
    const premiumEnd = () => {
      const width = window.innerWidth;
      if (width < 768) return '+=1000%';
      if (width < 1600) return '+=650%';
      return '+=650%';
    };
    const premiumTl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        id: 'premium-pin',
        trigger: '.main-section-premium',
        start: 'top top',
        end: premiumEnd,
        scrub: true,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
    if (premiumTl.scrollTrigger) createdTriggers.push(premiumTl.scrollTrigger);

    if (premiumCredits.length) {
      gsap.set(premiumCredits, { opacity: 0 });
      gsap.set(premiumCredits[0], { opacity: 1 });
    }

    if (premiumCount > 1) {
      for (let index = 1; index < premiumCount; index += 1) {
        const step = index - 1;
        const current = index;
        const next = index + 1;

        premiumTl
          .to(
            `.premium-bg > img:nth-child(${current})`,
            {
              maskImage: 'linear-gradient(to right, black 0%, transparent 0%)',
              duration: 1,
            },
            step
          )
          .to(
            `.premium-box-img > img:nth-child(${current})`,
            {
              maskImage: 'linear-gradient(to right, black 0%, transparent 0%)',
              duration: 1,
            },
            step
          )
          .to(
            `.premium-desc-box > div:nth-child(${current})`,
            {
              opacity: 0,
              duration: 0.5,
            },
            step
          )
          .to(
            `.premium-image-credit > span:nth-child(${current})`,
            {
              opacity: 0,
              duration: 0.3,
            },
            step
          )
          .to(
            `.premium-bg > img:nth-child(${next})`,
            {
              maskImage: 'linear-gradient(to right, transparent 0%, black 0%)',
              duration: 1,
            },
            step
          )
          .to(
            `.premium-box-img > img:nth-child(${next})`,
            {
              maskImage: 'linear-gradient(to right, transparent 0%, black 0%)',
              duration: 1,
            },
            step
          )
          .to(
            `.premium-desc-box > div:nth-child(${next})`,
            {
              opacity: 1,
              duration: 0.5,
            },
            step
          )
          .to(
            `.premium-image-credit > span:nth-child(${next})`,
            {
              opacity: 1,
              duration: 0.3,
            },
            step
          );
      }
    }
    addSectionTrigger('.main-section-overview', true);

    const scrollIndicator = document.querySelector<HTMLElement>('.scroll');
    const handleScrollIndicator = () => {
      if (!scrollIndicator) return;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      scrollIndicator.classList.toggle('hide', scrollTop + windowHeight >= documentHeight - 100);
    };

    const refreshOnImageLoadTargets = Array.from(
      document.querySelectorAll<HTMLImageElement>(
        '.main-section-green img, .main-section-premium img, .main-section-overview img, .brand-card-section img'
      )
    );
    const imageRefreshCleanups: Array<() => void> = [];

    refreshOnImageLoadTargets.forEach((image) => {
      if (image.complete) return;
      const handleLoad = () => queueScrollTriggerRefresh();
      image.addEventListener('load', handleLoad, { once: true });
      image.addEventListener('error', handleLoad, { once: true });
      imageRefreshCleanups.push(() => {
        image.removeEventListener('load', handleLoad);
        image.removeEventListener('error', handleLoad);
      });
    });

    const observedSections = [
      document.querySelector<HTMLElement>('.main-section-green'),
      document.querySelector<HTMLElement>('.main-section-premium'),
    ].filter((section): section is HTMLElement => Boolean(section));
    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            queueScrollTriggerRefresh();
          });

    observedSections.forEach((section) => resizeObserver?.observe(section));
    let isFontsReadyCancelled = false;
    document.fonts?.ready.then(() => {
      if (!isFontsReadyCancelled) queueScrollTriggerRefresh();
    });
    const delayedRefreshId = window.setTimeout(() => {
      queueScrollTriggerRefresh();
    }, 350);

    window.addEventListener('scroll', handleScrollIndicator);
    window.addEventListener('resize', queueScrollTriggerRefresh);
    window.addEventListener('orientationchange', queueScrollTriggerRefresh);
    handleScrollIndicator();
    queueScrollTriggerRefresh();

    return () => {
      window.removeEventListener('scroll', handleScrollIndicator);
      window.removeEventListener('resize', queueScrollTriggerRefresh);
      window.removeEventListener('orientationchange', queueScrollTriggerRefresh);
      if (refreshRafId) cancelAnimationFrame(refreshRafId);
      window.clearTimeout(delayedRefreshId);
      isFontsReadyCancelled = true;
      imageRefreshCleanups.forEach((cleanup) => cleanup());
      resizeObserver?.disconnect();
      visualSplit.revert();
      scheduleSplit.revert();
      unitButtonHandlers.forEach(({ button, handler }) => button.removeEventListener('click', handler));
      landDotHandlers.forEach(({ dot, handler }) => dot.removeEventListener('click', handler));
      unitSwiper.destroy(true, true);
      landSwiper.destroy(true, true);
      greenSwiper.destroy(true, true);
      createdTriggers.forEach((trigger) => trigger.kill());
    };
  }, []);
};

export default useMainAnimations;
