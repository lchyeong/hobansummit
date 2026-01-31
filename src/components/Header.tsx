import { useEffect, useState } from 'react';

import { HEADER_NAV_ITEMS, HAMBURGER_NAV_ITEMS } from '../data/headerNavigation';

const renderLabel = (label: string) =>
  label.split('\n').map((chunk, index) => (
    <span key={`${chunk}-${index}`}>
      {chunk}
      {index < label.split('\n').length - 1 ? <br /> : null}
    </span>
  ));

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLogoHidden, setIsLogoHidden] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  // 스크롤에 따른 헤더 색상 변경
  useEffect(() => {
    const checkCurrentSection = () => {
      const sections = document.querySelectorAll<HTMLElement>('.public-section');
      const headerHeight = 100; // 헤더 높이
      
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // 헤더 바로 아래에 있는 섹션을 찾기
        if (rect.top <= headerHeight && rect.bottom > headerHeight) {
          const theme = section.getAttribute('data-theme');
          setIsDark(theme === 'light');
          break;
        }
      }
    };

    // 초기 실행
    checkCurrentSection();

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', checkCurrentSection);

    return () => {
      window.removeEventListener('scroll', checkCurrentSection);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1200px)');
    let ticking = false;

    const updateLogoVisibility = () => {
      if (!media.matches) {
        setIsLogoHidden(false);
        return;
      }
      setIsLogoHidden(window.scrollY > 10);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        updateLogoVisibility();
      });
    };

    const onChange = () => updateLogoVisibility();

    updateLogoVisibility();
    window.addEventListener('scroll', onScroll, { passive: true });
    if (media.addEventListener) {
      media.addEventListener('change', onChange);
    } else {
      media.addListener(onChange);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (media.removeEventListener) {
        media.removeEventListener('change', onChange);
      } else {
        media.removeListener(onChange);
      }
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`header ${isMenuOpen ? 'active' : ''} ${isDark ? 'dark' : ''} ${isLogoHidden ? 'logo-hidden' : ''}`}
      >
        <div className="header-inner">
          <button
            className="hamburger"
            type="button"
            aria-label="모바일 메뉴 열기"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
          <h1 className="main-logo">
            <a href="#visual">호반써밋 ELITE CITY (구미)</a>
          </h1>
          <nav className="header-nav" aria-label="주요 메뉴">
            <ul>
              {HEADER_NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{renderLabel(item.label)}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <nav className="hamburger-nav" aria-label="모바일 메뉴">
        <ul>
          {HAMBURGER_NAV_ITEMS.map((item) => {
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => closeMenu()}
                >
                  {renderLabel(item.label)}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="hamburger-dim" role="presentation" onClick={closeMenu} />
    </>
  );
};

export default Header;
