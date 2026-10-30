import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import finalFuzzyHero from '../assets/images/web/chill-office.webp';
import rooftopFuzzies from '../assets/images/web/rooftop-fuzzy-hd.webp';
import fuzzyCollab from '../assets/images/web/fuzzy-collab.webp';
import officeWide from '../assets/videos/hero-office-1080.mp4';
import officeNarrow from '../assets/videos/hero-office-720.mp4';
import loungeWide from '../assets/videos/hero-lounge-1080.mp4';
import loungeNarrow from '../assets/videos/hero-lounge-720.mp4';
import rooftopWide from '../assets/videos/hero-rooftop-1080.mp4';
import rooftopNarrow from '../assets/videos/hero-rooftop-720.mp4';
import { T, useEditor, useImage, useText } from '../content';

// Each hero picture, animated (Ricky, 2026-10-29): played in turn, each one
// cross-fading into the next as it ends. 1080p on wide screens, 720p on phones.
const HERO_VIDEOS = [
  { wide: officeWide, narrow: officeNarrow },
  { wide: loungeWide, narrow: loungeNarrow },
  { wide: rooftopWide, narrow: rooftopNarrow },
];
/** How long the cross-fade takes; the next video starts this long before the current one ends. */
const FADE_S = 1.2;

export default function Hero() {
  const HERO_IMAGES = [
    useImage('home.hero.image1', finalFuzzyHero, { label: 'Hero picture 1' }),
    useImage('home.hero.image2', fuzzyCollab, { label: 'Hero picture 2' }),
    useImage('home.hero.image3', rooftopFuzzies, { label: 'Hero picture 3' }),
  ];
  const heroAlt = useText('home.hero.image-alt', 'Iconik Lounge', { label: 'Hero pictures: description', max: 200 });
  const editing = useEditor().on;

  // `current` is on top and fading in; `previous` stays fully shown beneath it until the fade is over.
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  // Videos play unless the visitor asked for less motion or the browser won't autoplay; then the pictures take turns.
  const [still, setStill] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [narrow] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const advancing = useRef(false);

  const advance = useCallback(() => {
    setCurrent((i) => {
      setPrevious(i);
      return (i + 1) % HERO_VIDEOS.length;
    });
  }, []);

  // Start the video now on top from its beginning, and fetch the one after it.
  useEffect(() => {
    if (still) return;
    const video = videos.current[current];
    if (!video) return;
    advancing.current = false;
    video.currentTime = 0;
    video.play().catch(() => setStill(true));
    const next = videos.current[(current + 1) % HERO_VIDEOS.length];
    if (next) next.preload = 'auto';
    // Once the fade is over, the one beneath stops and hides.
    const done = window.setTimeout(() => setPrevious(null), FADE_S * 1000 + 100);
    return () => window.clearTimeout(done);
  }, [current, still]);

  useEffect(() => {
    if (previous === null) videos.current.forEach((v, i) => i !== current && v?.pause());
  }, [previous, current]);

  // Pictures instead of videos: the old five-second turns.
  useEffect(() => {
    if (!still) return;
    const timer = window.setInterval(advance, 5000);
    return () => window.clearInterval(timer);
  }, [still, advance]);

  const nearEnd = (i: number) => (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (i !== current || advancing.current || !v.duration) return;
    if (v.currentTime >= v.duration - FADE_S) {
      advancing.current = true;
      advance();
    }
  };

  const layer = (i: number) => ({
    zIndex: i === current ? 2 : i === previous ? 1 : 0,
    opacity: i === current || i === previous ? 1 : 0,
    // The incoming scene settles from a slight zoom; the outgoing one holds still beneath it.
    transform: i === current || i === previous ? 'scale(1)' : 'scale(1.04)',
    transition: i === current ? `opacity ${FADE_S}s ease-in-out, transform ${FADE_S * 4}s cubic-bezier(0.22, 1, 0.36, 1)` : 'none',
  });

  return (
    <section data-bg="dark" className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden text-tan max-lg:h-auto max-lg:min-h-svh max-lg:pt-36 max-lg:pb-20">
      {/* Background: the three animated scenes, stacked, the one playing on top. */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-ink">
        <div className="absolute inset-0 opacity-75 brightness-[.60]">
          {/* The first picture is there from the start and loads first: it's the first thing
              visitors see, and what Google times as "main content shown". The first video plays over it. */}
          <img
            src={HERO_IMAGES[0]}
            fetchPriority="high"
            alt={heroAlt}
            {...(editing ? { 'data-img-k': 'home.hero.image1' } : {})}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {HERO_VIDEOS.map((video, i) =>
            still ? (
              <img
                key={i}
                src={HERO_IMAGES[i]}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                {...(editing ? { 'data-img-k': `home.hero.image${i + 1}` } : {})}
                style={layer(i)}
                className="absolute inset-0 w-full h-full object-cover will-change-[opacity,transform]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <video
                key={i}
                ref={(el) => {
                  videos.current[i] = el;
                }}
                src={narrow ? video.narrow : video.wide}
                poster={HERO_IMAGES[i]}
                muted
                playsInline
                disablePictureInPicture
                preload={i === 0 ? 'auto' : 'none'}
                aria-hidden="true"
                tabIndex={-1}
                onTimeUpdate={nearEnd(i)}
                onEnded={nearEnd(i)}
                {...(editing ? { 'data-img-k': `home.hero.image${i + 1}` } : {})}
                style={layer(i)}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-[opacity,transform]"
              />
            ),
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px]">
        {/* The headline shows as soon as the page draws: it's the first thing a visitor reads. */}
        <motion.div className="flex flex-col items-start text-left">
          <h1 className="text-5xl md:text-6xl lg:text-[4.5vw] xl:text-[5vw] font-display uppercase tracking-tighter leading-[1.05] mb-2 max-w-[90%] lg:max-w-[60%]">
            <motion.span
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="block text-white opacity-[0.85]"
            >
              <T k="home.hero.title" br="hidden lg:block">{"Turn your ad spend into\na fully booked calendar\nautomatically."}</T>
            </motion.span>
          </h1>

          <div className="flex flex-col items-start w-full mt-4 gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-sm md:text-base font-light max-w-2xl text-tan leading-relaxed font-sans"
            >
              <T k="home.hero.text">{"We help med spas capture, engage and keep every patient lead that standard websites miss. With conversion-focused design and AI automation that never sleeps, we end slow follow-ups, so your marketing dollars turn into booked appointments, not missed opportunities."}</T>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                id="hero-cta-primary"
                aria-label="Automate My Bookings - Get started with Iconik Studios"
                title="Automate My Bookings"
                className="relative group inline-block"
              >
                <div className="absolute inset-0 bg-burnt-orange blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative px-10 py-5 border border-ink bg-burnt-orange text-ink hover:border-burnt-orange hover:bg-black/40 backdrop-blur-md hover:text-burnt-orange transition-all duration-500 rounded-none">
                  <span className="relative z-10 text-xs uppercase tracking-[0.25em] font-bold">
                    <T k="home.hero.button1">{"Automate My Bookings"}</T>
                  </span>
                </div>
              </Link>

              <Link
                to="/portfolio"
                id="hero-cta-secondary"
                aria-label="Explore Our Portfolio - View our case studies and web design projects"
                title="Explore Our Portfolio"
                className="relative group inline-block"
              >
                <div className="absolute inset-0 bg-burnt-orange blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative px-10 py-5 border border-white/20 bg-black/40 backdrop-blur-md text-white hover:border-burnt-orange hover:bg-transparent hover:text-burnt-orange transition-all duration-500 rounded-none">
                  <span className="relative z-10 text-xs uppercase tracking-[0.25em] font-bold">
                    <T k="home.hero.button2">{"Explore Our Portfolio"}</T>
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Vertical Rail Text */}
      <div className="absolute right-12 bottom-12 hidden lg:block">
        <div className="writing-vertical-rl text-[10px] uppercase tracking-[0.5em] opacity-80 font-mono">
          <T k="home.hero.rail" label="Side text (large screens)">{"DESIGN // AUTOMATION // STRATEGY"}</T>
        </div>
      </div>
    </section>
  );
}
