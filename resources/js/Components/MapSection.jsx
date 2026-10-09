import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaLocationArrow,
} from "react-icons/fa";

import { useTranslation } from "react-i18next";
import "./css/SectionMap.css";

/* --------------------------------------------------------------------------
   INFORMATIONS DE LA RÉSIDENCE
-------------------------------------------------------------------------- */

const LOCATION = {
    name: "Villa Hortensia",
    address: "FX54+9C, Saly, Sénégal",
    phone: "+225 05 00 32 68 68",
    email: "info@villahortensiasaly.com",
};

/* --------------------------------------------------------------------------
   NOUVELLE LOCALISATION GOOGLE MAPS
-------------------------------------------------------------------------- */
const googleMapsUrl =
    "https://maps.app.goo.gl/S2tPoQ4dPizxVtEa6?g_st=ipc";

// Carte intégrée dans la page
const mapEmbedUrl =
    "https://maps.google.com/maps?q=VILLA%20HORTENSIA%2C%20FX54%2B9C%2C%20Saly%2C%20S%C3%A9n%C3%A9gal&output=embed";

// Bouton pour ouvrir l'itinéraire Google Maps
const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=14.4584256,-17.0439352";
/* --------------------------------------------------------------------------
   SECTION LOCALISATION
-------------------------------------------------------------------------- */

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

                    {/* Informations de contact */}
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