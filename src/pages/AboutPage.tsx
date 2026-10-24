import Layout from '../components/Layout';
import AboutHero from '../components/AboutHero';
import AboutStory from '../components/about/AboutStory';
import AboutFuzzies from '../components/about/AboutFuzzies';
import AboutPillars from '../components/about/AboutPillars';
import LogoParallax from '../components/LogoParallax';
import LatestInsights from '../components/LatestInsights';
import HomesContact from '../components/HomesContact';
import FinalCTA from '../components/FinalCTA';

export default function AboutPage() {
  return (
    <Layout
      page="about"
      title="About Iconik Studios | Med Spa Web Design & Automation Agency"
      description="Iconik Studios is a Phoenix design and automation studio for med spas: websites, online booking and follow-up systems, built on Remedy, our own CRM."
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
