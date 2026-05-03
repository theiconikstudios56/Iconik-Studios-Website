import Layout from '../components/Layout';
import AboutHero from '../components/AboutHero';
import AboutStory from '../components/about/AboutStory';
import AboutPillars from '../components/about/AboutPillars';
import LogoParallax from '../components/LogoParallax';
import LatestInsights from '../components/LatestInsights';
import HomesContact from '../components/HomesContact';
import FinalCTA from '../components/FinalCTA';

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-tan text-ink selection:bg-burnt-orange selection:text-tan">
        <AboutHero />
        <AboutStory />
        <LogoParallax />
        <AboutPillars />
        <LatestInsights />
        <HomesContact />
      </div>
      <FinalCTA />
    </Layout>
  );
}
