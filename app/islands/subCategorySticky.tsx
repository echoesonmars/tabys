/** @jsxImportSource hono/jsx */
import { useState, useEffect, useRef } from 'hono/jsx';

export default function SubCategorySticky({
	children,
	currentLang,
	active,
}: any) {
	if (!active) return null;

	const [isVisible, setIsVisible] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const lastY = useRef<number>(0);
	const scrollRef = useRef<HTMLDivElement>(null);
	const ticking = useRef(false);

	useEffect(() => {
		requestAnimationFrame(() => {
			const activeEl = scrollRef.current?.querySelector(
				'[data-active="true"]',
			);
			if (activeEl) {
				activeEl.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'center',
				});
			}
		});

		const observer = new MutationObserver(() => {
			const isLocked = document.body.style.overflow === 'hidden';
			setIsMenuOpen(isLocked);
		});

		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ['style'],
		});

		const updateScroll = () => {
			if (isMenuOpen) {
				ticking.current = false;
				return;
			}

			const y = window.scrollY;
			const currentY = lastY.current!;
			const diff = Math.abs(y - currentY);

			if (diff > 5) {
				const movingDown = y > currentY;
				if (y > 200) {
					setIsVisible(!movingDown);
				} else {
					setIsVisible(true);
				}
				lastY.current = y;
			}
			ticking.current = false;
		};

		const onScroll = () => {
			if (!ticking.current) {
				requestAnimationFrame(updateScroll);
				ticking.current = true;
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
			observer.disconnect();
		};
	}, [isMenuOpen]);

	return (
		<div
			className={`
                sticky top-0 w-full bg-gray-50/90 backdrop-blur-md
                transition-transform duration-300 ease-in-out
                ${isVisible && !isMenuOpen ? 'translate-y-0' : '-translate-y-full'}
                ${isMenuOpen ? 'z-0' : 'z-50'}
            `}>
			<div className="border-b border-gray-100">
				{(!isVisible || isMenuOpen) && (
					<div className="absolute inset-0 bg-white shadow-sm -z-10" />
				)}
				<div
					ref={scrollRef}
					className="flex no-scrollbar overflow-x-auto scroll-smooth py-3 px-4 gap-3 md:gap-4 items-center">
					{children}
				</div>
			</div>
		</div>
	);
}
