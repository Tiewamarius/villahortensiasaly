import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "./css/Nosmobilier.css";

const BASE =
    "https://villahortensiasaly.com/wp-content/uploads/2021/09";

const GALLERY = [
    { id: 1, key: "seaView", src: `/img/SALY HORTENSIA/1.jpg` },
    { id: 2, key: "eastTerrace", src: `${BASE}/about-2.jpg` },
    { id: 3, key: "westTerrace", src: `/img/SALY HORTENSIA/1.jpg` },
    { id: 4, key: "beachView", src: `${BASE}/about-4.jpg` },
    { id: 5, key: "eastTerrace", src: `${BASE}/about-5.jpg` },
    { id: 6, key: "westTerrace", src: `${BASE}/about-6.jpg` },
    { id: 7, key: "seaView", src: `${BASE}/about-7.jpg` },
    { id: 8, key: "eastTerrace", src: `${BASE}/about-8.jpg` },
];

export default function Nosmobilier() {
    const { t } = useTranslation();

    const [swiper, setSwiper] = useState(null);
    const [current, setCurrent] = useState(1);
    const [lightbox, setLightbox] = useState(null);

    const closeLightbox = useCallback(() => {
        setLightbox(null);
    }, []);

    const prevLightbox = useCallback(() => {
        setLightbox((index) =>
            index === null
                ? index
                : (index - 1 + GALLERY.length) % GALLERY.length
        );
    }, []);

    const nextLightbox = useCallback(() => {
        setLightbox((index) =>
            index === null
                ? index
                : (index + 1) % GALLERY.length
        );
    }, []);

    useEffect(() => {
        if (lightbox === null) return;

        const onKeyDown = (event) => {
            if (event.key === "Escape") closeLightbox();
            if (event.key === "ArrowLeft") prevLightbox();
            if (event.key === "ArrowRight") nextLightbox();
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [lightbox, closeLightbox, prevLightbox, nextLightbox]);

    const getTitle = (item) =>
        t(`nosmobilier.gallery.${item.key}`);

    return (
        <section className="knsl-transition-top knsl-p-0-100 nosmobilier">
            <img
                src="/themes/kinsley/assets/img/palm.svg"
                className="knsl-deco-left"
                alt=""
                aria-hidden="true"
                decoding="async"
            />

            <div className="container">
                <div className="knsl-center knsl-title-frame knsl-mb-100">
                    <h2 className="knsl-title--h knsl-mb-20">
                        <span>{t("nosmobilier.heading")}</span>
                    </h2>

                    <div className="knsl-text knsl-mb-30">
                        <p>
                            <span>{t("nosmobilier.description")}</span>
                        </p>
                    </div>

                    <a
                        href="/rooms"
                        className="knsl-btn knsl-btn-md"
                    >
                        <span>{t("nosmobilier.cta")}</span>
                    </a>
                </div>

                <div className="knsl-about-slider">
                    <Swiper
                        modules={[Navigation]}
                        onSwiper={setSwiper}
                        onSlideChange={(instance) =>
                            setCurrent(instance.activeIndex + 1)
                        }
                        slidesPerView={1.2}
                        spaceBetween={20}
                        centeredSlides
                        initialSlide={1}
                        breakpoints={{
                            768: { slidesPerView: 1.6 },
                            1200: { slidesPerView: 2 },
                        }}
                    >
                        {GALLERY.map((item, index) => {
                            const title = getTitle(item);

                            return (
                                <SwiperSlide key={item.id}>
                                    <div className="knsl-image-frame">
                                        <button
                                            type="button"
                                            className="knsl-image-link"
                                            onClick={() =>
                                                setLightbox(index)
                                            }
                                            aria-label={t(
                                                "nosmobilier.enlarge",
                                                { title }
                                            )}
                                        >
                                            <img
                                                src={item.src}
                                                alt={title}
                                                loading="lazy"
                                                decoding="async"
                                            />

                                            <div className="knsl-badge">
                                                <span>{title}</span>
                                            </div>

                                            <span
                                                className="knsl-zoom"
                                                aria-hidden="true"
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    width="18"
                                                    height="18"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <circle
                                                        cx="11"
                                                        cy="11"
                                                        r="7"
                                                    />
                                                    <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    <div className="knsl-slider-nav-panel">
                        <div
                            className="knsl-about-slider-1-pagination"
                            aria-live="polite"
                        >
                            <span>{current}</span>
                            {" / "}
                            <span>{GALLERY.length}</span>
                        </div>

                        <div className="knsl-about-slider-nav">
                            <button
                                type="button"
                                className="knsl-about-slider-1-prev"
                                aria-label={t("nosmobilier.previous")}
                                onClick={() => swiper?.slidePrev()}
                                disabled={current === 1}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    width="18"
                                    height="18"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                className="knsl-about-slider-1-next"
                                aria-label={t("nosmobilier.next")}
                                onClick={() => swiper?.slideNext()}
                                disabled={current === GALLERY.length}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    width="18"
                                    height="18"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {lightbox !== null && (
                <div
                    className="knsl-lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label={getTitle(GALLERY[lightbox])}
                    onClick={closeLightbox}
                >
                    <button
                        type="button"
                        className="knsl-lightbox-close"
                        aria-label={t("nosmobilier.close")}
                        onClick={closeLightbox}
                    >
                        ×
                    </button>

                    <button
                        type="button"
                        className="knsl-lightbox-arrow knsl-lightbox-prev"
                        aria-label={t("nosmobilier.previousImage")}
                        onClick={(event) => {
                            event.stopPropagation();
                            prevLightbox();
                        }}
                    >
                        ‹
                    </button>

                    <figure
                        onClick={(event) => event.stopPropagation()}
                    >
                        <img
                            src={GALLERY[lightbox].src}
                            alt={getTitle(GALLERY[lightbox])}
                        />
                        <figcaption>
                            {getTitle(GALLERY[lightbox])}
                        </figcaption>
                    </figure>

                    <button
                        type="button"
                        className="knsl-lightbox-arrow knsl-lightbox-next"
                        aria-label={t("nosmobilier.nextImage")}
                        onClick={(event) => {
                            event.stopPropagation();
                            nextLightbox();
                        }}
                    >
                        ›
                    </button>
                </div>
            )}
        </section>
    );
} 