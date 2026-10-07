import { Head, Link } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Header from "../Components/Header";
import "./css/Restauration.css";

const SLIDES = [
    {
        image: "/img/RESTAURATION/3.jpg",
        titleKey: "slides.table.title",
        textKey: "slides.table.text",
    },
    {
        image: "/img/RESTAURATION/1.jpg",
        titleKey: "slides.anywhere.title",
        textKey: "slides.anywhere.text",
    },
    {
        image: "/img/RESTAURATION/2.jpg",
        titleKey: "slides.flavors.title",
        textKey: "slides.flavors.text",
    }
];

const OFFERS = [
    {
        titleKey: "offers.breakfast.title",
        textKey: "offers.breakfast.text",
    },
    {
        titleKey: "offers.lunchDinner.title",
        textKey: "offers.lunchDinner.text",
    },
    {
        titleKey: "offers.roomService.title",
        textKey: "offers.roomService.text",
    },
];

const HOURS = [
    {
        labelKey: "hours.breakfast.label",
        time: "07h00 – 10h30",
    },
    {
        labelKey: "hours.lunch.label",
        time: "12h00 – 15h00",
    },
    {
        labelKey: "hours.dinner.label",
        time: "18h30 – 22h30",
    },
];

const AUTOPLAY_MS = 6000;

export default function Restauration() {
    const { t } = useTranslation();

    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const goTo = useCallback((index) => {
        setCurrent(
            (index + SLIDES.length) % SLIDES.length
        );
    }, []);

    useEffect(() => {
        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (paused || reduced) {
            return;
        }

        const id = setInterval(() => {
            setCurrent(
                (currentSlide) =>
                    (currentSlide + 1) % SLIDES.length
            );
        }, AUTOPLAY_MS);

        return () => clearInterval(id);
    }, [paused]);

    return (
        <>
            <Head title={t("restauration.pageTitle")} />

            <Header />

            <main className="resto-page">

                {/* =====================================================
                    HERO SLIDER
                ====================================================== */}
                <section
                    className="resto-hero"
                    aria-roledescription="carousel"
                    aria-label={t(
                        "restauration.hero.ariaLabel"
                    )}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                >
                    {SLIDES.map((slide, i) => (
                        <div
                            key={`${slide.image}-${i}`}
                            className={`resto-slide ${
                                i === current ? "active" : ""
                            }`}
                            style={{
                                backgroundImage: `url("${slide.image}")`,
                            }}
                            aria-hidden={i !== current}
                        >
                            <div className="resto-slide-content">
                                <h1 className="resto-slide-title">
                                    {t(
                                        `restauration.${slide.titleKey}`
                                    )}
                                </h1>

                                <p>
                                    {t(
                                        `restauration.${slide.textKey}`
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Previous */}
                    <button
                        type="button"
                        className="resto-arrow prev"
                        aria-label={t(
                            "restauration.hero.previous"
                        )}
                        onClick={() =>
                            goTo(current - 1)
                        }
                    >
                        <FaChevronLeft aria-hidden="true" />
                    </button>

                    {/* Next */}
                    <button
                        type="button"
                        className="resto-arrow next"
                        aria-label={t(
                            "restauration.hero.next"
                        )}
                        onClick={() =>
                            goTo(current + 1)
                        }
                    >
                        <FaChevronRight aria-hidden="true" />
                    </button>

                    {/* Dots */}
                    <div className="resto-dots">
                        {SLIDES.map((slide, i) => (
                            <button
                                key={`${slide.image}-dot-${i}`}
                                type="button"
                                className={
                                    i === current
                                        ? "active"
                                        : ""
                                }
                                aria-label={t(
                                    "restauration.hero.goToSlide",
                                    {
                                        number: i + 1,
                                    }
                                )}
                                aria-current={
                                    i === current
                                }
                                onClick={() => goTo(i)}
                            />
                        ))}
                    </div>
                </section>

                {/* =====================================================
                    INTRODUCTION
                ====================================================== */}
                <section className="resto-section resto-intro">
                    <h2>
                        {t(
                            "restauration.intro.title"
                        )}
                    </h2>

                    <p>
                        {t(
                            "restauration.intro.text"
                        )}
                    </p>
                </section>

                {/* =====================================================
                    OFFRES
                ====================================================== */}
                <section className="resto-section resto-offers">
                    {OFFERS.map((offer) => (
                        <article
                            key={offer.titleKey}
                            className="resto-offer"
                        >
                            <h3>
                                {t(
                                    `restauration.${offer.titleKey}`
                                )}
                            </h3>

                            <p>
                                {t(
                                    `restauration.${offer.textKey}`
                                )}
                            </p>
                        </article>
                    ))}
                </section>

                {/* =====================================================
                    HORAIRES + CONTACT
                ====================================================== */}
                <section className="resto-section resto-hours">

                    {/* Horaires */}
                    <div>
                        <h2>
                            {t(
                                "restauration.hours.title"
                            )}
                        </h2>

                        <dl>
                            {HOURS.map((hour) => (
                                <div
                                    key={hour.labelKey}
                                    className="resto-hours-row"
                                >
                                    <dt>
                                        {t(
                                            `restauration.${hour.labelKey}`
                                        )}
                                    </dt>

                                    <dd>
                                        {hour.time}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* CTA */}
                    <div className="resto-cta">
                        <h2>
                            {t(
                                "restauration.cta.title"
                            )}
                        </h2>

                        <p>
                            {t(
                                "restauration.cta.text"
                            )}
                        </p>

                        <div className="resto-cta-actions">

                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/2250500326868"
                                className="resto-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t(
                                    "restauration.cta.whatsapp"
                                )}
                            </a>

                            {/* Réservation */}
                            <Link
                                href="/reservation"
                                className="resto-btn outline"
                            >
                                {t(
                                    "restauration.cta.reservation"
                                )}
                            </Link>

                        </div>
                    </div>

                </section>
            </main>
        </>
    );
} 