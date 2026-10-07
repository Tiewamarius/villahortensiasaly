import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaLocationArrow,
} from "react-icons/fa";

import { useTranslation } from "react-i18next";
import "./css/SectionMap.css";

/*
|--------------------------------------------------------------------------
| INFORMATIONS DE LA RÉSIDENCE
|--------------------------------------------------------------------------
*/

const LOCATION = {
    name: "Résidence Néhémie",
    address: "1725 Rue Lambert Feh-Kesse, Bingerville",
    phone: "+225 05 00 32 68 68",
    email: "info@residencenehemie.com",
};

const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.1821716363106!2d-3.9155399255394325!3d5.389184494589828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc193d6ba52ab41%3A0xa69fdec5c7555353!2zUsOpc2lkZW5jZSBOw6low6ltaWU!5e0!3m2!1sfr!2sci!4v1757603653750!5m2!1sfr!2sci";

const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=5.389184494589828,-3.9155399255394325";

export default function MapSection() {
    const { t } = useTranslation();

    return (
        <section className="map-section" id="localisation">
            <div className="map-container">

                {/* En-tête */}
                <div className="map-header">
                    <span className="map-subtitle">
                        {t("map.subtitle")}
                    </span>

                    <h2 className="map-title">
                        {t("map.title")}
                    </h2>

                    <p className="map-description">
                        {t("map.description")}
                    </p>
                </div>

                {/* Carte et informations */}
                <div className="map-card">

                    {/* Informations */}
                    <div className="map-info">

                        <div className="map-info-item">
                            <div className="map-icon">
                                <FaMapMarkerAlt />
                            </div>

                            <div className="map-info-content">
                                <p>{LOCATION.address}</p>
                            </div>
                        </div>

                        <div className="map-info-item">
                            <div className="map-icon">
                                <FaPhoneAlt />
                            </div>

                            <div className="map-info-content">
                                <a
                                    href={`tel:${LOCATION.phone.replace(/\s/g, "")}`}
                                >
                                    {LOCATION.phone}
                                </a>
                            </div>
                        </div>

                        <div className="map-info-item">
                            <div className="map-icon">
                                <FaEnvelope />
                            </div>

                            <div className="map-info-content">
                                <a href={`mailto:${LOCATION.email}`}>
                                    {LOCATION.email}
                                </a>
                            </div>
                        </div>

                        <a
                            href={directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="map-directions-btn"
                        >
                            <FaLocationArrow />
                            {t("map.directions")}
                        </a>

                        <div className="map-signature">
                            {t("map.signature")}
                        </div>
                    </div>

                    {/* Google Maps */}
                    <div className="map-frame">
                        <iframe
                            title={t("map.iframeTitle")}
                            src={mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}