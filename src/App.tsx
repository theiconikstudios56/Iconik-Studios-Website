import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { trackPage } from './lib/rmdTracking';
import { inEditor, reportRoute } from './content';
import { chatAvailable } from './lib/rmdChat';
import './lib/arrival'; // notes where the visit came from, for the contact form and the shop
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import { lazy, Suspense, useState, useEffect } from 'react';

import FinalCTA from './components/FinalCTA';


// Modular Sections

import Layout from './components/Layout';

import StackedServices from './components/StackedServices';
import { FAQ } from './components/PricingFAQ';
import TemplateShowcase from './components/shop/TemplateShowcase';
// The shop's pages are where campaign posts land, so they come with the first download (no second round trip).
import TemplatesPage from './pages/TemplatesPage';
import TemplatePage from './pages/TemplatePage';
import SuccessSection from './components/SuccessSection';
import MeetTheFuzzies from './components/MeetTheFuzzies';
import FuzzyLineupSection from './components/FuzzyLineupSection';
import HomesContact from './components/HomesContact';

// Every page but the homepage loads its own code when it's opened, so the
// first visit downloads only what the homepage needs.
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WebDesign = lazy(() => import('./pages/WebDesign'));
const AIWorkflows = lazy(() => import('./pages/AIWorkflows'));
const Maintenance = lazy(() => import('./pages/Maintenance'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const HomesPage = lazy(() => import('./pages/HomesPage'));
const ProjectPage = lazy(() => import('./components/ProjectPage'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ChatWidget = lazy(() => import('./components/chat/ChatWidget'));

// Pages where the chat bubble doesn't belong.
const NO_CHAT = /^\/intake(\/|$)/;

/** The chat bubble, loaded once the page has finished loading, so it never slows the first view. */
function ChatLauncher() {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!chatAvailable) return;
    // After the page has loaded, then when the browser is idle: the chat never slows the first screen.
    let idle: number | undefined;
    let timer: number | undefined;
    const start = () => setReady(true);
    const whenIdle = () => {
      if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(start, { timeout: 4000 });
      else timer = window.setTimeout(start, 2500);
    };
    if (document.readyState === 'complete') whenIdle();
    else window.addEventListener('load', whenIdle, { once: true });
    return () => {
      window.removeEventListener('load', whenIdle);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);
  if (!ready || inEditor || NO_CHAT.test(pathname)) return null;
  return (
    <Suspense fallback={null}>
      <ChatWidget />
    </Suspense>
  );
}

function Home() {


  return (
    <Layout
      page="home"
      title="Med Spa Website Design & AI Automation | Iconik Studios"
      description="Med spa websites, online booking and AI follow-up that turn ad clicks into booked appointments. Built in Phoenix, Arizona, and run on Remedy, our own CRM."
    >
      <div className="relative z-10 bg-ink">
        <Hero />
        <SuccessSection />
        <StackedServices />
        <MeetTheFuzzies />
        <FuzzyLineupSection />
        <TemplateShowcase />
        <FAQ />
        <HomesContact />
      </div>
      <FinalCTA />
    </Layout>
  );
}

/** Sends each page view to RMD's visitor statistics (see lib/rmdTracking). */
function RmdTracking() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    // Inside RMD's website editor, nothing is counted as a visit.
    if (inEditor) return reportRoute(pathname);
    trackPage(pathname, search);
    // A new page is a new view; a changed query string on the same page isn't.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <RmdTracking />
      <ScrollToTop />
      {/* While a page's code loads: the site's dark background, no flash of white. */}
      <Suspense fallback={<div className="min-h-screen bg-ink" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services/web-design" element={<WebDesign />} />
        <Route path="/services/ai-automation" element={<AIWorkflows />} />
        <Route path="/services/maintenance" element={<Maintenance />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/templates/:slug" element={<TemplatePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/homes" element={<HomesPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
        {/* The old proposal, contract and admin pages were retired: proposals and
            contracts now live in RMD. Old links land on the contact page. */}
        <Route path="/proposals/*" element={<Navigate to="/contact" replace />} />
        <Route path="/contract" element={<Navigate to="/contact" replace />} />
        <Route path="/admin/*" element={<Navigate to="/contact" replace />} />
        {/* Onboarding questions now come from RMD's questionnaire link; old links land on Contact. */}
        <Route path="/intake" element={<Navigate to="/contact" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
      <ChatLauncher />
    </Router>
  );
}
