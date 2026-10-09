import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import "./css/HomeSection.css";

/* =========================================================
   ICÔNE LOCALISATION
========================================================= */

const LocationIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
    >
        <path
            d="M12 21S19 14.5 19 9.5A7 7 0 1 0 5 9.5C5 14.5 12 21 12 21Z"
            stroke="currentColor"
            strokeWidth="1.7"
        />

        <circle
            cx="12"
            cy="9.5"
            r="2.3"
            stroke="currentColor"
            strokeWidth="1.7"
        />
    </svg>
);


/* =========================================================
   ICÔNE HÉBERGEMENT
========================================================= */

const HomeIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
    >
        <path
            d="M3 11L12 4L21 11V20H3V11Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
        />

        <path
            d="M9 20V13H15V20"
            stroke="currentColor"
            strokeWidth="1.7"
        />
    </svg>
);


/* =========================================================
   COMPOSANT
========================================================= */

export default function AboutVilla() {
    const { t } = useTranslation();

    return (
        <section id="about" className="about-villa-section">

            <div className="about-villa-container">

                {/* =====================================================
                    SECTION 1
                    IMAGE À GAUCHE / TEXTE À DROITE
                ===================================================== */}

                <article className="about-villa-card">

                    {/* IMAGE */}

                    <div className="about-villa-image">
                        <img
                            src="/img/BANNIERE/Apropos.jpg"
                            alt={t("about.imageAlt")}
                            loading="lazy"
                        />
                    </div>


                    {/* CONTENU */}

                    <div className="about-villa-content">

                        {/* <span className="about-villa-label">
                            {t("about.label")}
                        </span> */}

                        <h2>
                            {t("about.title")}
                        </h2>

                        <p>
                            {t("about.text1")}
                        </p>

                        <p>
                            {t("about.text2")}
                        </p>


                        {/* DÉTAILS */}

                        <div className="about-villa-details">

                            <div className="about-villa-detail">

                                {/* <span
                                    className="about-villa-detail-icon"
                                    aria-hidden="true"
                                >
                                    <LocationIcon />
                                </span>

                                <span>
                                    {t("about.location")}
                                </span> */}

                            </div>


                            <div className="about-villa-detail">
{/* 
                                <span
                                    className="about-villa-detail-icon"
                                    aria-hidden="true"
                                >
                                    <HomeIcon />
                                </span>

                                <span>
                                    {t("about.lodging")}
                                </span> */}

                            </div>

                        </div>


                        {/* BOUTON */}

                        <Link
                            href="/rooms"
                            className="about-villa-button"
                        >
                            {t("about.button")}

                            <span aria-hidden="true">
                                →
                            </span>
                        </Link>

                    </div>

                </article>


                {/* =====================================================
                    SECTION 2
                    TEXTE À GAUCHE / IMAGE À DROITE
                ===================================================== */}

                <article className="about-villa-card about-villa-card-reverse">

                    {/* CONTENU */}

                    <div className="about-villa-content">

                        {/* <span className="about-villa-label">
                            {t("about.secondLabel")}
                        </span> */}

                        <h2>
                            {t("aboutSecondair.title")}
                        </h2>

                        <p>
                            {t("aboutSecondair.text1")}
                        </p>

                        {/* <p>
                            {t("aboutSecondair.secondText2")}
                        </p> */}


                        {/* DÉTAILS */}

                        <div className="about-villa-details">

                            <div className="about-villa-detail">

                                {/* <span
                                    className="about-villa-detail-icon"
                                    aria-hidden="true"
                                >
                                    <LocationIcon />
                                </span>

                                <span>
                                    {t("aboutSecondair.secondLocation")}
                                </span> */}

                            </div>


                            <div className="about-villa-detail">

                                {/* <span
                                    className="about-villa-detail-icon"
                                    aria-hidden="true"
                                >
                                    <HomeIcon />
                                </span>

                                <span>
                                    {t("aboutSecondair.secondLodging")}
                                </span> */}

                            </div>

                        </div>


                        {/* BOUTON */}

                        <Link
                            href="/rooms"
                            className="about-villa-button"
                        >
                            {t("about.secondButton")}

                            <span aria-hidden="true">
                                →
                            </span>
                        </Link>

                    </div>


                    {/* IMAGE */}

                    <div className="about-villa-image">

                        <img
                            src="/img/BANNIERE/Apropos2.jpg"
                            alt={t("about.secondImageAlt")}
                            loading="lazy"
                        />

                    </div>

                </article>

            </div>

        </section>
    );
}