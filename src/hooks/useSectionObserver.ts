import { useEffect } from 'react';

const useSectionObserver = () => {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.public-section'));
    if (sections.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('active'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
};

export default useSectionObserver;
