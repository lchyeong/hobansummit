import Header from './components/Header';
import ScrollIndicator from './components/ScrollIndicator';
import useMainAnimations from './hooks/useMainAnimations';
import useSmoothScroll from './hooks/useSmoothScroll';
import VisualSection from './sections/VisualSection';
import InquirySection from './sections/InquirySection';
import UnitSection from './sections/UnitSection';
import ScheduleSection from './sections/ScheduleSection';
import LandSection from './sections/LandSection';
import GreenSection from './sections/GreenSection';
import PremiumSection from './sections/PremiumSection';
import BrandCardSection from './sections/BrandCardSection';
import LocationSection from './sections/LocationSection';
import FooterSection from './sections/FooterSection';

const App = () => {
  useSmoothScroll();
  useMainAnimations();

  return (
    <div className="public-page">
      <Header />
      <ScrollIndicator />
      <main id="wrap">
        <VisualSection />
        <InquirySection />
        <UnitSection />
        <ScheduleSection />
        <LandSection />
        <GreenSection />
        <PremiumSection />
        <LocationSection />
        <BrandCardSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default App;
