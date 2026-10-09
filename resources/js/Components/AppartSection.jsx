
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { useBooking } from "../Components/HotelLinkWidget";

import "./css/AppartSection.css";


const residences = [
    {
        id: 1,
        key: "signature",
        address: "Rue Lambert Feh-Kesse, Bingerville",
        price: 30000,
        image: "/img/Gallery/Appart1/Chambre 02.jpg",
        booking: "/reservation",
        details: "/rooms?apartment=signature",
    },
    {
        id: 2,
        key: "elegance",
        address: "Résidence Néhémie, Bingerville",
        price: 40000,
        image: "/img/NOS APPARTEMENTS/3.jpg",
        booking: "/reservation",
        details: "/rooms?apartment=elegance",
    },
    {
        id: 3,
        key: "prestige",
        address: "Rue Lambert Feh-Kesse, Bingerville",
        price: 60000,
        image: "/img/NOS APPARTEMENTS/1.jpg",
        booking: "/reservation",
        details: "/rooms?apartment=prestige",
    },
];

/* ---------------------------------------------------------------------------
   ICÔNE LOCALISATION
--------------------------------------------------------------------------- */

const PinIcon = () => (
    <svg className="appart-pin" viewBox="0 0 24 24" fill="none"
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

/* ---------------------------------------------------------------------------
   ICÔNE CHECK
--------------------------------------------------------------------------- */

const CheckIcon = () => (
    <span className="appart-check" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
            <path
                d="M5 12.5L10 17.5L19 7"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </span>
);

/* ---------------------------------------------------------------------------
   COMPOSANT
--------------------------------------------------------------------------- */

export default function AppartSection() {
    const { t, i18n } = useTranslation();

    const { openBooking } = useBooking();

    /*
     * Français :
     * 35 000 FCFA
     *
     * Anglais :
     * 35,000 FCFA
     */
    const numberLocale = i18n.language?.startsWith("en")
        ? "en-US"
        : "fr-FR";

    return (
        <section className="appart-section" id="locations">
            <div className="appart-container">

                {/* =========================================================
                    EN-TÊTE
                ========================================================= */}
                <div className="appart-header">
                    <span className="appart-subtitle">
                        {t("appart.subtitle")}
                    </span>

                    <h2 className="appart-title">
                        {t("appart.title1")}
                        <br />
                        <span>{t("appart.title2")}</span>
                    </h2>
                </div>

                {/* =========================================================
                    GRILLE DES APPARTEMENTS
                ========================================================= */}
                <div className="appart-grid">
                    {residences.map((residence, index) => {
                        const base = `appart.items.${residence.key}`;

                        const features = t(`${base}.features`, {
                            returnObjects: true,
                        });

                        return (
                            <article
                                className="appart-card"
                                key={residence.id}
                                style={{
                                    "--card-index": index,
                                }}
                            >
                                {/* Image de fond */}
                                <div
                                    className="appart-card-bg"
                                    style={{
                                        backgroundImage: `url("${residence.image}")`,
                                    }}
                                    aria-hidden="true"
                                />

                                {/* Voile */}
                                <div
                                    className="appart-card-overlay"
                                    aria-hidden="true"
                                />

                                {/* =================================================
                                    PRIX
                                ================================================= */}
                                <div className="appart-card-top">
                                    <div className="appart-price">
                                        <span className="appart-price-from">
                                            {t("appart.from")}
                                        </span>

                                        <strong>
                                            {residence.price.toLocaleString(
                                                numberLocale
                                            )}
                                            {"\u00A0"}FCFA
                                        </strong>

                                        <small>
                                            {t("appart.perNight")}
                                        </small>
                                    </div>
                                </div>

                                {/* =================================================
                                    CONTENU
                                ================================================= */}
                                <div className="appart-card-content">
                                    <div className="appart-card-heading">
                                        <span className="appart-category">
                                            {t(`${base}.category`)}
                                        </span>

                                        <h3>
                                            {t(`${base}.name`)}
                                        </h3>

                                        <p className="appart-address">
                                            <PinIcon />

                                            <span>
                                                {residence.address}
                                            </span>
                                        </p>
                                    </div>

                                    {/* =================================================
                                        CONTENU AU SURVOL
                                        Visible au survol desktop et selon le CSS
                                        sur mobile/tablette.
                                    ================================================= */}
                                    <div className="appart-hover-content">
                                        <div className="appart-hover-inner">

                                            {/* Atouts */}
                                            <ul className="appart-features">
                                                {Array.isArray(features) &&
                                                    features.map(
                                                        (feature) => (
                                                            <li
                                                                className="appart-feature"
                                                                key={feature}
                                                            >
                                                                <CheckIcon />

                                                                <span>
                                                                    {feature}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                            </ul>

                                            {/* Description */}
                                            <p className="appart-description">
                                                {t(`${base}.description`)}
                                            </p>

                                            {/* Actions */}
                                            <div className="appart-actions">

                                                {/* Réserver */}
                                                <Link
                                                    href={
                                                        residence.booking
                                                    }
                                                    className="appart-btn appart-btn-primary"
                                                >
                                                    {t("appart.book")}

                                                    <span aria-hidden="true">
                                                        ↗
                                                    </span>
                                                </Link>

                                                {/* Galerie de l'appartement
                                                    correspondant */}
                                                <Link
                                                    href={
                                                        residence.details
                                                    }
                                                    className="appart-btn appart-btn-ghost"
                                                >
                                                    {t("appart.discover")}

                                                    <span aria-hidden="true">
                                                        →
                                                    </span>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Espace inférieur */}
                <div className="appart-bottom"></div>
            </div>
        </section>
    );
}