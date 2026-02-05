import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const useSmoothScroll = () => {
  useEffect(() => {
    const previousBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return () => {
        document.documentElement.style.scrollBehavior = previousBehavior;
      };
    }

    const lenis = new Lenis({
      duration: 1.6,
      smoothWheel: true,
      syncTouch: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 0.9,
      infinite: false,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.style.scrollBehavior = previousBehavior;
    };
  }, []);
};

export default useSmoothScroll;
