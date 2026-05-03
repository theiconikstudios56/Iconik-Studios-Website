'use client';
import React from 'react';
import { cn } from '../lib/utils';
import Lenis from '@studio-freight/lenis'
import { ZoomParallax } from "./ui/zoom-parallax";

export default function ZoomParallaxSection() {
	React.useEffect(() => {
        const lenis = new Lenis()
       
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
        return () => lenis.destroy();
    }, [])

	const images = [
		{
			src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Modern architecture building',
		},
		{
			src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Urban cityscape at sunset',
		},
		{
			src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Abstract geometric pattern',
		},
		{
			src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Mountain landscape',
		},
		{
			src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Minimalist design elements',
		},
		{
			src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Mountain range',
		},
		{
			src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Forest path',
		},
		{
			src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Golden hour mountains',
		},
		{
			src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Alpine lake',
		},
		{
			src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Mountain lake',
		},
		{
			src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Green valley',
		},
		{
			src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Yosemite valley',
		},
		{
			src: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Pine forest',
		},
	];

	return (
		<section data-bg="dark" className="relative w-full">
			<ZoomParallax images={images} />
		</section>
	);
}
