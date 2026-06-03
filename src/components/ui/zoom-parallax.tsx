'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Twitter, Mail, MessageCircle, Globe, Circle, Target, Zap, Crosshair } from "lucide-react";
import { Link } from 'react-router-dom';
import IconikLogo from "../IconikLogo";

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	// Scale the text mask massively to "walk through" it
	// We zoom into the center of the word
	const textScale = useTransform(scrollYProgress, [0, 0.8], [1, 35]);

	// Zoom in on the background image as we zoom through the text
	// Stops zooming at 0.7
	const imageScale = useTransform(scrollYProgress, [0, 0.2, 0.7], [1, 1.05, 1.3]);

	// The "cover up" effect for the content
	// It starts below the screen and moves up
	const contentRevealY = useTransform(scrollYProgress, [0.7, 1], ["100%", "0%"]);
	// We also want a slight parallax on the image as it gets covered
	const imageCoverY = useTransform(scrollYProgress, [0.7, 1], ["0%", "-10%"]);

	return (
		<div ref={container} className="relative h-[400vh] min-h-screen">
			<div className="sticky top-0 h-screen overflow-hidden bg-ink">
				{/* The Background Image (The one we zoom into) */}
				<motion.div
					style={{ scale: imageScale, y: imageCoverY }}
					className="absolute inset-0 z-0"
				>
					<img
						src={images[0]?.src || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80'}
						alt="Background"
						className="w-full h-full object-cover opacity-50"
						referrerPolicy="no-referrer"
					/>
				</motion.div>

				{/* The Text Mask Overlay - only visible while zooming */}
				<motion.div
					style={{
						scale: textScale,
						opacity: useTransform(scrollYProgress, [0.7, 0.8], [1, 0])
					}}
					className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
				>
					<svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
						<defs>
							<mask id="iconikMask">
								<rect width="1000" height="1000" fill="white" />
								<text
									x="475"
									y="500"
									textAnchor="middle"
									dominantBaseline="middle"
									fill="black"
									style={{
										fontFamily: 'Anton, sans-serif',
										fontSize: '240px',
										fontWeight: '900',
										letterSpacing: '1px'
									}}
								>
									ICONIK
								</text>
							</mask>
						</defs>
						<rect width="1000" height="1000" fill="currentColor" className="text-ink" mask="url(#iconikMask)" />
					</svg>
				</motion.div>

				{/* The Content Reveal (COVERS THE IMAGE) */}
				<motion.div
					style={{ y: contentRevealY }}
					className="absolute inset-0 z-20 bg-ink flex flex-col items-center justify-center text-center p-6 md:p-12 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]"
				>
					{/* Corner Decorations */}
					<div className="absolute top-6 left-8 text-tan/40"><Circle size={20} /></div>
					<div className="absolute top-6 right-8 text-tan/40"><Target size={20} /></div>
					<div className="absolute bottom-6 left-8 text-tan/40"><Zap size={20} /></div>
					<div className="absolute bottom-6 right-8 text-tan/40"><Crosshair size={20} /></div>

					{/* "We Are" text styled exactly like '04 / THE COLLECTIVE' */}
					<motion.span
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="font-mono text-xs font-bold text-burnt-orange mb-6 block tracking-[0.4em] uppercase"
					>
						we / are
					</motion.span>

					{/* Massive Title */}
					<motion.h2
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="text-[12vw] md:text-[10vw] font-display text-tan leading-[0.85] uppercase mb-8 tracking-tighter flex flex-col gap-1"
					>
						<span>ICONIK</span>
						<span className="text-burnt-orange">STUDIOS</span>
					</motion.h2>

					{/* Description */}
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="max-w-xl mb-10"
					>
						<p className="text-base md:text-lg font-medium leading-tight text-tan opacity-100">
							A premium design and automation agency. We fuse high-end branding
							aesthetics with intelligent backend workflows to streamline your business
							and scale your bookings automatically.
						</p>
					</motion.div>

					{/* CTA Button */}
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4 }}
						className="mb-12"
					>
						<Link
							to="/about"
							className="relative group/btn inline-block"
						>
							<div className="absolute inset-0 bg-burnt-orange blur-2xl opacity-0 group-hover/btn:opacity-20 transition-opacity" />
							<div className="relative px-10 py-5 border border-tan/20 rounded-none hover:border-burnt-orange transition-all duration-500 overflow-hidden">
								<div className="absolute inset-0 bg-burnt-orange translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
								<span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold text-tan group-hover/btn:text-ink transition-colors">
									ABOUT ICONIK
								</span>
							</div>
						</Link>
					</motion.div>

					{/* Social Icons */}
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.6 }}
						className="flex gap-4"
					>
						{[Mail, Instagram, Globe, Twitter, MessageCircle].map((Icon, i) => (
							<motion.a
								key={i}
								href="#"
								whileHover={{
									scale: 1.1,
									backgroundColor: "#cd7f32",
									color: "#000000",
									borderColor: "#cd7f32"
								}}
								className={`w-10 h-10 rounded-full border border-tan/20 flex items-center justify-center transition-all duration-300 text-tan ${i === 2 ? 'bg-burnt-orange text-ink border-burnt-orange' : ''}`}
							>
								<Icon size={18} />
							</motion.a>
						))}
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
