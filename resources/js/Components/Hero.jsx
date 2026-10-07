import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BookingWidget from '../Components/BookingWidget'; // ajuste le chemin
import './css/Hero.css';

const SLIDE_DURATION = 7000;
const SWIPE_THRESHOLD = 50;

const slides = [
    { image: '/img/Hero-Gallery/Accueil/1.jpg', altKey: 'hero.slides.welcome' },
    { image: '/img/Hero-Gallery/Accueil/2.jpg', altKey: 'hero.slides.welcome' },
    { image: '/img/Hero-Gallery/Accueil/3.jpg', altKey: 'hero.slides.common' },
    { image: '/img/Hero-Gallery/Accueil/4.jpg', altKey: 'hero.slides.lounge' },
    { image: '/img/Hero-Gallery/Accueil/5.jpg', altKey: 'hero.slides.lounge' },
];

export default function Hero() {
    const { t } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);
    const touchStartX = useRef(null);

    const nextSlide = useCallback(() => {
        setCurrentSlide((current) => (current + 1) % slides.length);
    }, []);

    const previousSlide = useCallback(() => {
        setCurrentSlide((current) => (current - 1 + slides.length) % slides.length);
    }, []);

    /* Défilement automatique (désactivé si l'utilisateur préfère moins d'animations) */
    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) return;

        const timeout = setTimeout(nextSlide, SLIDE_DURATION);
        return () => clearTimeout(timeout);
    }, [currentSlide, nextSlide]);

    /* Swipe tactile (ignoré sur le widget de réservation) */
    const handleTouchStart = (event) => {
        if (event.target.closest('.booking-widget')) {
            touchStartX.current = null;
            return;
        }
        touchStartX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = (event) => {
        if (touchStartX.current === null) return;

        const distance = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;

        if (Math.abs(distance) < SWIPE_THRESHOLD) return;

        if (distance < 0) nextSlide();
        else previousSlide();
    };

    return (
        <section className="hero" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {/* Background slides */}
            <div className="hero__background">
                {slides.map((slide, index) => (
                    <div
                        key={`${slide.image}-${index}`}
                        className={`hero__slide ${index === currentSlide ? 'hero__slide--active' : ''}`}
                        style={{ backgroundImage: `url("${slide.image}")` }}
                        role="img"
                        aria-label={t(slide.altKey)}
                        aria-hidden={index !== currentSlide}
                    />
                ))}
            </div>

            {/* Overlay */}
            <div className="hero__overlay" />

            {/* Hero content */}
            <div className="hero__content">
                <div className="hero__title">
                    <h1 className="hero__title-main">{t('hero.title')}</h1>
                    <p className="hero__title-subtitle">{t('hero.subtitle')}</p>
                </div>

                {/* Widget de disponibilités (FR / EN selon la langue du site) */}
                <BookingWidget />
            </div>

            {/* Slider previous (desktop uniquement) */}
            <button
                type="button"
                className="hero__slider-button hero__slider-button--prev"
                onClick={previousSlide}
                aria-label={t('hero.prev')}
            >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Slider next (desktop uniquement) */}
            <button
                type="button"
                className="hero__slider-button hero__slider-button--next"
                onClick={nextSlide}
                aria-label={t('hero.next')}
            >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Scroll indicator */}
            <a href="#content" className="hero__scroll" aria-label={t('hero.scrollAria')}>
                <span className="hero__mouse">
                    <span className="hero__mouse-wheel" />
                </span>
                <span className="hero__scroll-text">{t('hero.scroll')}</span>
            </a>

            {/* Slide indicators */}
            <div className="hero__indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`hero__indicator ${index === currentSlide ? 'hero__indicator--active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={t('hero.showSlide', { number: index + 1 })}
                        aria-current={index === currentSlide}
                    />
                ))}
            </div>
        </section>
    );
}