import Layout from '../components/Layout';
import AboutHero from '../components/AboutHero';
import AboutStory from '../components/about/AboutStory';
import AboutFuzzies from '../components/about/AboutFuzzies';
import AboutPillars from '../components/about/AboutPillars';
import LogoParallax from '../components/LogoParallax';
import LatestInsights from '../components/LatestInsights';
import HomesContact from '../components/HomesContact';
import FinalCTA from '../components/FinalCTA';
import { PAGE_SEO } from '../seo';

export default function AboutPage() {
  return (
    <Layout
      page="about"
      title={PAGE_SEO.about.title}
      description={PAGE_SEO.about.description}
    >
      <div className="bg-tan text-ink selection:bg-burnt-orange selection:text-tan">
        <AboutHero />
        <AboutStory />
        <AboutFuzzies />
        <LogoParallax />
        <AboutPillars />
        <LatestInsights />
        <HomesContact />
      </div>
      <FinalCTA />
    </Layout>
  );
}
