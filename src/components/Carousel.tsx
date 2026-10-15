import { transform } from "next/dist/build/swc";
import { useEffect, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

type Screen = 'desktop' | 'tabplet' | ''

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
}

function Carousel<T>({
    items = [],
    renderItems,
    getKey,
    className = "",
    slideToShow = 1,
    gap = 0,
    autoPlay = true,
    interval = 6000,
    showArrow = true,
}: CarouselProps<T>) {
    // component state 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(true)


    const perView = Math.min(slideToShow > 0 ? slideToShow : 1, Math.max(1, items.length))
    const slides = [...items, ...items.slice(0, perView)]

    const basis = `calc((100% - ${(perView - 1) * gap}px) / ${perView})`
    const translate = `translateX(calc(-${currentIndex} * (100% + ${gap}px) / ${perView}  ))`

    const goNext = () => {
        if (currentIndex === items.length) {
            setTransitioning(false)
            setCurrentIndex(0)
            return
        }
        setCurrentIndex(prev => prev + 1)
    }

    const goPrevious = () => {
        if (currentIndex === 0) {
            setTransitioning(false)
            setCurrentIndex(items.length)
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTransitioning(true);
                    setCurrentIndex(items.length - 1);
                });
            });
            return
        }
        setTransitioning(true);
        setCurrentIndex(prev => prev - 1);
    }

    const handleTransiotionEnd = () => {
        if (currentIndex === items.length) {
            setTransitioning(false);
            setCurrentIndex(0)
        }
    }

    useEffect(() => {
        if (!transitioning) {
            const frame = requestAnimationFrame(() => {
                setTransitioning(true);
            })
            return () => cancelAnimationFrame(frame)
        };
    }, [transitioning])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prev => prev + 1)
        }, interval);
        return () => clearInterval(timer)
    }, [autoPlay])

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
