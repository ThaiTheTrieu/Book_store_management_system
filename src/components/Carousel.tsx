import { transform } from "next/dist/build/swc";
import { useEffect, useRef, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

type Screen = 'desktop' | 'tablet' | 'mobile'

type CarouselProps<T> = {
    items: T[];
    renderItems: (item: T, idx: number) => React.ReactNode;
    getKey?: (item: T, idx: number) => number | string;
    className?: string;
    slideToShow?: number;
    gap?: number;
    autoPlay?: boolean;
    interval?: number;
    showArrow?: boolean;
    responesive?: { screen: Screen, slidesToShow: number }[]
}

function getCurrentScreen<Screen>() {
    if (window.innerWidth >= 1024)
        return 'desktop';
    else if (window.innerWidth >= 640)
        return 'tablet';
    return 'mobile';
}

function Carousel<T>({
    items = [],
    renderItems,
    getKey,
    className = "",
    slideToShow = 1,
    gap = 0,
    autoPlay = true,
    interval = 3000,
    showArrow = true,
    responesive
}: CarouselProps<T>) {
    // component state 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(true)
    const [screen, setScreen] = useState<Screen>('desktop');
    const isAnimating = useRef<boolean>(false)

    const responesiveSlides = responesive?.find(config => config.screen == screen)?.slidesToShow || slideToShow;
    const perView = Math.min(responesiveSlides > 0 ? responesiveSlides : 1, Math.max(1, items.length))
    const slides = [...items, ...items.slice(0, perView)]

    const basis = `calc((100% - ${(perView - 1) * gap}px) / ${perView})`
    const translate = `translateX(calc(-${currentIndex} * (100% + ${gap}px) / ${perView}  ))`

    const goNext = () => {
        if (isAnimating.current) return;

        isAnimating.current = true
        setTransitioning(true);
        setCurrentIndex(prev => Math.min(prev + 1, items.length))
        // setTimeout(() => {
        //     isAnimating.current = false;
        // }, 500);
    }

    const goPrevious = () => {
        if (currentIndex === 0) {
            setTransitioning(false)
            setCurrentIndex(items.length)
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    isAnimating.current = true;
                    setTransitioning(true);
                    setCurrentIndex(items.length - 1);
                });
            });
            // setTimeout(() => {
            //     isAnimating.current = false;
            // }, 500);
            return
        }
        isAnimating.current = true;
        setTransitioning(true);
        setCurrentIndex(prev => prev - 1);
        // setTimeout(() => {
        //     isAnimating.current = false;
        // }, 500);

    }

    const handleTransiotionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return

        isAnimating.current = false;
        if (currentIndex === items.length) {
            setTransitioning(false);
            setCurrentIndex(0)
        }
    }

    useEffect(() => {
        const updateScreen = () => {
            setScreen(getCurrentScreen())
        }
        updateScreen();
        window.addEventListener("resize", updateScreen)
        return () => window.removeEventListener('resize', updateScreen)
    }, [])

    useEffect(() => {
        if (!transitioning) {
            let frame2 = 0;
            const frame1 = requestAnimationFrame(() => {
                frame2 = requestAnimationFrame(() => {
                    setTransitioning(true);
                })
            })
            return () => { cancelAnimationFrame(frame1); cancelAnimationFrame(frame2) }
        };
    }, [transitioning])

    useEffect(() => {
        if (!autoPlay || isAnimating.current)
            return;
        isAnimating.current = true;
        const timer = setInterval(() => {
            setTransitioning(true);
            setCurrentIndex(prev => Math.min(prev + 1, items.length));
        }, interval);
        return () => clearInterval(timer)
    }, [autoPlay, interval, items.length])

    return (

        <div className={`relative ${className}`}>
            {/* Carsousel */}
            <div className={`w-full overflow-hidden`}>
                <div className={`flex flex-nowrap ${transitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
                    style={{
                        gap: gap,
                        transform: translate
                    }}
                    onTransitionEnd={handleTransiotionEnd}
                >
                    {slides.map((item, idx) =>
                        <div className="shrink-0" key={`${getKey?.(item, idx)}-${idx}`}
                            style={{
                                flexBasis: basis
                            }}
                        >
                            {renderItems(item, idx)}
                        </div>
                    )}
                </div>
            </div>
            {/* Arrow button */}
            {showArrow && (
                <div className="absolute inset-0 flex justify-between p-5 text-white/60 text-lg md:text-xl">
                    <button className="group transition-colors duration-400" onClick={goPrevious}><FaArrowCircleLeft className="group-hover:text-white" /></button>
                    <button className="group transition-colors duration-400 ease-in" onClick={goNext} ><FaArrowCircleRight className="group-hover:text-white" /></button>
                </div>
            )}
        </div>
    )
}

export default Carousel
