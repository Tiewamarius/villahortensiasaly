import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import "./css/Gallery.css";

/* ============================================================================
   HERO
   Image ou vidéo choisie aléatoirement à chaque chargement
============================================================================ */

const heroMedia = [
    {
        type: "image",
        src: "/img/BANNIERE/Bannière 3.jpg",
        altKey: "heroMedia.residence",
    },
    {
        type: "image",
        src: "/img/BANNIERE/Bannière 4.jpg",
        altKey: "heroMedia.apartment",
    },
    {
        type: "image",
        src: "/img/BANNIERE/Bannière 5.jpg",
        altKey: "heroMedia.outdoor",
    },
];

/* ============================================================================
   APPARTEMENTS
============================================================================ */

const apartments = [
    {
        id: 1,
        key: "signature",
        locationKey: "bingerville",

        images: [
            // Chambres
            {
                src: "/img/Gallery/Chambre (1).jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/Gallery/Appart3/Chambre/Chambre 2.jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/Gallery/Chambre (4).jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/BANNIERE/Bannière 5.jpg",
                captionKey: "Espace commun",
            },
            {
                src: "/img/Gallery/Appart3/Chambre/Chambre 3.jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/Gallery/Appart1/Chambre 02.jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/Gallery/Chambre (22).jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/Gallery/Chambre (18).jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/Gallery/Chambre (27).jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/Gallery/Appart1/Chambre 06.jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/Gallery/Chambre (28).jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/Gallery/Chambre (29).jpg",
                captionKey: "Chambre",
            },
        ],
    },

    {
        id: 2,
        key: "elegance",
        locationKey: "bingerville",

        images: [
            // Salon
            {
                src: "/img/Gallery/Appart2/Bureau.jpg",
                captionKey: "Salon",
            },
            {
                src: "/img/Gallery/Appart1/Salon 02.jpg",
                captionKey: "Salon",
            },
            {
                src: "/img/Gallery/Appart1/RN2_Salon 2.jpg",
                captionKey: "Salon",
            },
            {
                src: "/img/Gallery/Appart1/Salon 04.jpg",
                captionKey: "Salon",
            },
            {
                src: "/img/Gallery/Appart2/Salon 03.jpg",
                captionKey: "Salon",
            },
            {
                src: "/img/Gallery/Chambre (29).jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/Gallery/Appart2/Salon 02.jpg",
                captionKey: "Salon",
            },

            // Cuisine
            {
                src: "/img/Gallery/Appart2/Cuisine.jpg",
                captionKey: "Cuisine",
            },
            {
                src: "/img/Gallery/Appart2/Cuisine 02.jpg",
                captionKey: "Cuisine",
            },
            {
                src: "/img/Gallery/Appart2/Cuisine lavabo.jpg",
                captionKey: "Cuisine",
            },
            {
                src: "/img/Gallery/Appart1/Cuisine.jpg",
                captionKey: "Cuisine",
            },
            {
                src: "/img/Gallery/Appart1/Cuisine 03.jpg",
                captionKey: "Cuisine",
            },
            {
                src: "/img/Gallery/Appart1/Cuisine 04.jpg",
                captionKey: "Cuisine",
            },
            {
                src: "/img/Gallery/Appart1/Cuisine 05.jpg",
                captionKey: "Cuisine",
            },
            {
                src: "/img/Gallery/Appart1/Chauffe eau.jpg",
                captionKey: "Chauffe-eau",
            },
            {
                src: "/img/Gallery/Appart1/Planch_repasser.jpg",
                captionKey: "Planche à repasser",
            },

            // Salle de bain
            {
                src: "/img/Gallery/Appart1/Salle e bain.jpg",
                captionKey: "Salle de bain",
            },
            {
                src: "/img/Gallery/Appart1/Toilette.jpg",
                captionKey: "Salle de bain",
            },
            {
                src: "/img/Gallery/Appart1/Shattaf.jpg",
                captionKey: "Salle de bain",
            },
            {
                src: "/img/Gallery/Appart2/Salle de bain.jpg",
                captionKey: "Salle de bain",
            },
            {
                src: "/img/Gallery/Appart3/Chambre/Chambre 2.jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/Gallery/Appart2/Salle bain.jpg",
                captionKey: "Salle de bain",
            },

            // Balcon
            {
                src: "/img/Gallery/Appart2/Balcon.jpg",
                captionKey: "Balcon",
            },
             // Espace commun
            {
                src: "/img/BANNIERE/Bannière 3.jpg",
                captionKey: "Espace commun",
            },
            {
                src: "/img/BANNIERE/Bannière 4.jpg",
                captionKey: "Espace commun",
            }
        ],
    },

    {
        id: 3,
        key: "prestige",
        locationKey: "bingerville",

        images: [
            // Salon
            {
                src: "/img/Gallery/Appart3/Salon/SALON.jpg",
                captionKey: "SALON",
            },
            {
                src: "/img/Gallery/Appart3/Chambre/2Ch-Salon (2).jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/Gallery/Appart3/Salon/SALON 1.jpg",
                captionKey: "SALON",
            },
            {
                src: "/img/Gallery/Appart3/Salon/SALON 2.jpg",
                captionKey: "SALON",
            },
            {
                src: "/img/Gallery/Appart3/Salon/SALON 3.jpg",
                captionKey: "SALON",
            },
            {
                src: "/img/Gallery/Appart3/Salon/SALON 4.jpg",
                captionKey: "SALON",
            },
            {
                src: "/img/Gallery/Appart3/Salon/SALON 6.jpg",
                captionKey: "SALON",
            },

            // Chambres
            {
                src: "/img/Gallery/Appart3/Chambre/Chambre 3.jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/Gallery/Appart3/Chambre/Chambre 1.jpg",
                captionKey: "Chambre",
            },
            {
                src: "/img/Gallery/Appart3/Chambre/Chambre 5.jpg",
                captionKey: "Chambre",
            },

            // Cuisine
            {
                src: "/img/Gallery/Appart3/Cuisine/CUISINE.jpg",
                captionKey: "Cuisine",
            },
            {
                src: "/img/Gallery/Appart3/Cuisine/CUISINE 3.jpg",
                captionKey: "Cuisine",
            },
            {
                src: "/img/Gallery/Appart3/Cuisine/CUISINE 5.jpg",
                captionKey: "Cuisine",
            },

            // Salle de bain
            {
                src: "/img/Gallery/Appart3/Salle de bain/Salle_bain.jpg",
                captionKey: "Salle de bain",
            },
            {
                src: "/img/Gallery/Appart2/Salon 03.jpg",
                captionKey: "Salon",
            },
            {
                src: "/img/Gallery/Appart3/Salle de bain/Salle de bain 1.jpg",
                captionKey: "Salle de bain",
            },
            {
                src: "/img/Gallery/Appart3/Salle de bain/Salle de bain.jpg",
                captionKey: "Salle de bain",
            },

            // Espace commun
            {
                src: "/img/BANNIERE/Bannière 3.jpg",
                captionKey: "Espace commun",
            },
            {
                src: "/img/BANNIERE/Bannière 4.jpg",
                captionKey: "Espace commun",
            },
        ],
    },
];

/* ============================================================================
   OUTILS
============================================================================ */

/**
 * Clé de traduction du nom de l'appartement
 */
const nameKey = (apartment) =>
    `appart.items.${apartment.key}.name`;

/**
 * Appartement initial depuis ?apartment=
 */
const getInitialApartment = () => {
    const params = new URLSearchParams(window.location.search);

    const apartmentKey = params.get("apartment");

    const apartmentExists = apartments.some(
        (item) => item.key === apartmentKey
    );

    return apartmentExists ? apartmentKey : "signature";
};

/* ============================================================================
   COMPOSANT
============================================================================ */

export default function Gallery() {
    const { t } = useTranslation();

    /* ------------------------------------------------------------------------
       ÉTATS
    ------------------------------------------------------------------------ */

    const [activeApartment, setActiveApartment] =
        useState(getInitialApartment);

    const [selectedImage, setSelectedImage] =
        useState(null);

    const [heroMediaItem, setHeroMediaItem] =
        useState(null);

    /* ------------------------------------------------------------------------
       APPARTEMENT ACTIF
    ------------------------------------------------------------------------ */

    const apartment =
        apartments.find(
            (item) => item.key === activeApartment
        ) || apartments[0];

    /* ------------------------------------------------------------------------
       TRADUCTIONS
    ------------------------------------------------------------------------ */

    const apartmentTitle = t(
        nameKey(apartment)
    );

    const apartmentLocation = t(
        `gallery.locations.${apartment.locationKey}`
    );

    /* =========================================================================
       HERO ALÉATOIRE
    ========================================================================= */

    useEffect(() => {
        const randomIndex = Math.floor(
            Math.random() * heroMedia.length
        );

        setHeroMediaItem(heroMedia[randomIndex]);
    }, []);

    /* =========================================================================
       FERMETURE + NAVIGATION LIGHTBOX AU CLAVIER
    ========================================================================= */

    useEffect(() => {
        if (!selectedImage) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            /* ----------------------------------------------------------------
               ESC : fermer
            ---------------------------------------------------------------- */

            if (event.key === "Escape") {
                event.preventDefault();
                setSelectedImage(null);
                return;
            }

            /* ----------------------------------------------------------------
               FLÈCHE GAUCHE : photo précédente
            ---------------------------------------------------------------- */

            if (event.key === "ArrowLeft") {
                event.preventDefault();

                setSelectedImage((current) => {
                    if (!current) {
                        return null;
                    }

                    const previousIndex =
                        current.index <= 0
                            ? apartment.images.length - 1
                            : current.index - 1;

                    const image =
                        apartment.images[previousIndex];

                    return {
                        ...image,
                        title: apartmentTitle,
                        location: apartmentLocation,
                        caption: t(image.captionKey),
                        index: previousIndex,
                    };
                });

                return;
            }

            /* ----------------------------------------------------------------
               FLÈCHE DROITE : photo suivante
            ---------------------------------------------------------------- */

            if (event.key === "ArrowRight") {
                event.preventDefault();

                setSelectedImage((current) => {
                    if (!current) {
                        return null;
                    }

                    const nextIndex =
                        current.index >=
                        apartment.images.length - 1
                            ? 0
                            : current.index + 1;

                    const image =
                        apartment.images[nextIndex];

                    return {
                        ...image,
                        title: apartmentTitle,
                        location: apartmentLocation,
                        caption: t(image.captionKey),
                        index: nextIndex,
                    };
                });
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [
        selectedImage,
        apartment,
        apartmentTitle,
        apartmentLocation,
        t,
    ]);

    /* =========================================================================
       OUVRIR UNE IMAGE
    ========================================================================= */

    const openLightbox = (image, index) => {
        setSelectedImage({
            ...image,
            title: apartmentTitle,
            location: apartmentLocation,
            caption: t(image.captionKey),
            index,
        });
    };

    /* =========================================================================
       PHOTO PRÉCÉDENTE
    ========================================================================= */

    const showPreviousImage = (event) => {
        event.stopPropagation();

        if (!selectedImage) {
            return;
        }

        const previousIndex =
            selectedImage.index <= 0
                ? apartment.images.length - 1
                : selectedImage.index - 1;

        const image =
            apartment.images[previousIndex];

        setSelectedImage({
            ...image,
            title: apartmentTitle,
            location: apartmentLocation,
            caption: t(image.captionKey),
            index: previousIndex,
        });
    };

    /* =========================================================================
       PHOTO SUIVANTE
    ========================================================================= */

    const showNextImage = (event) => {
        event.stopPropagation();

        if (!selectedImage) {
            return;
        }

        const nextIndex =
            selectedImage.index >=
            apartment.images.length - 1
                ? 0
                : selectedImage.index + 1;

        const image =
            apartment.images[nextIndex];

        setSelectedImage({
            ...image,
            title: apartmentTitle,
            location: apartmentLocation,
            caption: t(image.captionKey),
            index: nextIndex,
        });
    };

    /* =========================================================================
       FERMER LIGHTBOX
    ========================================================================= */

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    /* =========================================================================
       CHANGER D'APPARTEMENT
    ========================================================================= */

    const changeApartment = (apartmentKey) => {
        setActiveApartment(apartmentKey);

        /* Ferme automatiquement la lightbox */
        setSelectedImage(null);

        /* Met à jour l'URL sans recharger la page */
        const url = new URL(
            window.location.href
        );

        url.searchParams.set(
            "apartment",
            apartmentKey
        );

        window.history.replaceState(
            {},
            "",
            url
        );
    };

    /* =========================================================================
       RENDER
    ========================================================================= */

    return (
        <main className="gallery-page">

            {/* =================================================================
                HERO
            ================================================================= */}

            <section className="gallery-hero">

                {/* HERO VIDÉO */}
                {heroMediaItem?.type === "video" && (
                    <video
                        className="gallery-hero__media"
                        src={heroMediaItem.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-hidden="true"
                    />
                )}

                {/* HERO IMAGE */}
                {heroMediaItem?.type === "image" && (
                    <img
                        className="gallery-hero__media"
                        src={heroMediaItem.src}
                        alt={t(
                            `gallery.${heroMediaItem.altKey}`
                        )}
                    />
                )}

                {/* OVERLAY */}
                <div
                    className="gallery-hero__overlay"
                    aria-hidden="true"
                />

                {/* CONTENU */}
                <div className="gallery-hero__content">
                    <span className="gallery-hero__subtitle">
                        {t(
                            "gallery.hero.subtitle"
                        )}
                    </span>

                    <h1>
                        {t(
                            "gallery.hero.title"
                        )}
                    </h1>

                    <p>
                        {t(
                            "gallery.hero.description"
                        )}
                    </p>
                </div>
            </section>

            {/* =================================================================
                GALERIE
            ================================================================= */}

            <section className="gallery-section">
                <div className="gallery-container">

                    {/* =========================================================
                        TITRE + RÉSERVATION
                    ========================================================= */}

                    <div className="gallery-heading">
                        <div>
                            <h2>
                                {apartmentTitle}
                            </h2>
                        </div>

                        <Link
                            href="/reservation"
                            className="gallery-reservation-btn"
                        >
                            {t("gallery.book")}
                        </Link>
                    </div>

                    {/* =========================================================
                        ONGLETS APPARTEMENTS
                    ========================================================= */}

                    <div className="gallery-tabs-wrapper">
                        <div
                            className="gallery-tabs"
                            role="tablist"
                            aria-label={t(
                                "gallery.chooseApartment"
                            )}
                        >
                            {apartments.map(
                                (item) => {
                                    const isActive =
                                        activeApartment ===
                                        item.key;

                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            role="tab"
                                            aria-selected={
                                                isActive
                                            }
                                            className={
                                                isActive
                                                    ? "gallery-tab active"
                                                    : "gallery-tab"
                                            }
                                            onClick={() =>
                                                changeApartment(
                                                    item.key
                                                )
                                            }
                                        >
                                            {t(
                                                nameKey(
                                                    item
                                                )
                                            )}
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    </div>

                    {/* =========================================================
                        INFORMATIONS
                    ========================================================= */}

                    <div className="gallery-location">
                        <span>
                            {apartmentLocation}
                        </span>

                        <span className="gallery-photo-count">
                            {apartment.images.length}{" "}
                            {t(
                                "gallery.photos"
                            )}
                        </span>
                    </div>

                    {/* =========================================================
                        GRILLE PHOTOS
                    ========================================================= */}

                    <div className="gallery-grid">
                        {apartment.images.map(
                            (image, index) => {
                                const caption = t(
                                    image.captionKey
                                );

                                return (
                                    <article
                                        className="gallery-card"
                                        key={`${image.src}-${index}`}
                                    >
                                        <button
                                            type="button"
                                            className="gallery-image-button"
                                            onClick={() =>
                                                openLightbox(
                                                    image,
                                                    index
                                                )
                                            }
                                            aria-label={t(
                                                "gallery.viewPhoto",
                                                {
                                                    caption,
                                                }
                                            )}
                                        >
                                            {/* IMAGE */}
                                            <img
                                                src={
                                                    image.src
                                                }
                                                alt={
                                                    caption
                                                }
                                                loading="lazy"
                                            />

                                            {/* OVERLAY */}
                                            <div className="gallery-card__overlay">
                                                <div className="gallery-card__caption">

                                                    <span className="gallery-card__line" />

                                                    <p>
                                                        {
                                                            caption
                                                        }
                                                    </p>

                                                </div>
                                            </div>
                                        </button>
                                    </article>
                                );
                            }
                        )}
                    </div>
                </div>
            </section>

            {/* =================================================================
                LIGHTBOX
            ================================================================= */}

            {selectedImage && (
                <div
                    className="gallery-lightbox"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label={t(
                        "gallery.lightbox.preview"
                    )}
                >

                    {/* =========================================================
                        FERMER
                    ========================================================= */}

                    <button
                        type="button"
                        className="gallery-lightbox__close"
                        onClick={closeLightbox}
                        aria-label={t(
                            "gallery.lightbox.close"
                        )}
                    >
                        ×
                    </button>

                    {/* =========================================================
                        PHOTO PRÉCÉDENTE
                    ========================================================= */}

                    <button
                        type="button"
                        className="gallery-lightbox__nav gallery-lightbox__nav--prev"
                        onClick={
                            showPreviousImage
                        }
                        aria-label={t(
                            "gallery.lightbox.previous",
                            {
                                defaultValue:
                                    "Photo précédente",
                            }
                        )}
                    >
                        ‹
                    </button>

                    {/* =========================================================
                        IMAGE
                    ========================================================= */}

                    <img
                        src={selectedImage.src}
                        alt={selectedImage.caption}
                        className="gallery-lightbox__image"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    />

                    {/* =========================================================
                        PHOTO SUIVANTE
                    ========================================================= */}

                    <button
                        type="button"
                        className="gallery-lightbox__nav gallery-lightbox__nav--next"
                        onClick={
                            showNextImage
                        }
                        aria-label={t(
                            "gallery.lightbox.next",
                            {
                                defaultValue:
                                    "Photo suivante",
                            }
                        )}
                    >
                        ›
                    </button>

                    {/* =========================================================
                        LÉGENDE
                    ========================================================= */}

                    <div
                        className="gallery-lightbox__caption"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <span>
                            {selectedImage.title}
                        </span>

                        <h3>
                            {
                                selectedImage.caption
                            }
                        </h3>
                    </div>
                </div>
            )}
        </main>
    );
}