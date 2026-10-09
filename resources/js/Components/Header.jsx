
import { Link, router, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBooking } from "../Components/HotelLinkWidget";
import "./css/Header.css";

const MOBILE_BREAKPOINT = 991;

const NAV_ITEMS = [
    { href: "/", key: "nav.home" },
    { href: "/#about", key: "nav.about" },
    { href: "/rooms", key: "nav.rooms" },
];

const BookmarkIcon = () => (
    <svg
        className="e-far-bookmark"
        viewBox="0 0 384 512"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M336 0H48C21.49 0 0 21.49 0 48v464l192-112 192 112V48c0-26.51-21.49-48-48-48zm0 428.43l-144-84-144 84V54a6 6 0 0 1 6-6h276c3.314 0 6 2.683 6 5.996V428.43z" />
    </svg>
);

export default function Header() {
    const { t, i18n } = useTranslation();
    const { url } = usePage();
    const { openBooking } = useBooking();

    const currentPath = url.split("?")[0].split("#")[0];
    const isFr = i18n.language?.startsWith("fr");

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const menuButtonRef = useRef(null);
    const closeButtonRef = useRef(null);
    const wasOpen = useRef(false);

    const toggleLang = () => {
        i18n.changeLanguage(isFr ? "en" : "fr");
    };

    const openMenu = useCallback(() => {
        setMenuOpen(true);
    }, []);

    const closeMenu = useCallback(() => {
        setMenuOpen(false);
    }, []);

    const closeAll = useCallback(() => {
        setMenuOpen(false);
    }, []);

 
/**
 * Défilement vers la section About.
 * Si l'utilisateur est sur une autre page,
 * revenir à l'accueil avant de défiler.
 */
const handleAboutClick = useCallback(
    (event) => {
        event.preventDefault();
        closeMenu();

        const scrollToAbout = () => {
            window.requestAnimationFrame(() => {
                const section = document.getElementById("about");

                if (!section) return;

                section.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                        ? "auto"
                        : "smooth",
                    block: "start",
                });
            });
        };

        if (currentPath === "/") {
            scrollToAbout();
            return;
        }

        router.visit("/", {
            onSuccess: () => {
                window.setTimeout(scrollToAbout, 150);
            },
        });
    },
    [currentPath, closeMenu]
); 

    /*
     * Header : détecter le défilement.
     */
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /*
     * Bloquer le scroll lorsque le menu mobile est ouvert.
     */
    useEffect(() => {
        if (!menuOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeAll();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [menuOpen, closeAll]);

    /*
     * Gestion du focus du menu mobile.
     */
    useEffect(() => {
        if (menuOpen) {
            closeButtonRef.current?.focus();
        } else if (wasOpen.current) {
            menuButtonRef.current?.focus();
        }

        wasOpen.current = menuOpen;
    }, [menuOpen]);

    /*
     * Fermer le menu lors du retour au format desktop.
     */
    useEffect(() => {
        const mediaQuery = window.matchMedia(
            `(min-width: ${MOBILE_BREAKPOINT + 1}px)`
        );

        const handleChange = (event) => {
            if (event.matches) {
                setMenuOpen(false);
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    /*
     * Réservation : ouverture de la modale existante.
     */
    const handleBookingClick = () => {
        openBooking();
    };

    const handleMobileBookingClick = () => {
        closeMenu();
        openBooking();
    };

const isActive = (item) => {
    // About est une section de l'accueil, pas une page active.
    if (item.key === "nav.about") {
        return false;
    }

    // Accueil est actif uniquement sur la page d'accueil.
    if (item.href === "/") {
        return currentPath === "/";
    }

    // Pages et éventuelles sous-pages.
    return (
        currentPath === item.href ||
        currentPath.startsWith(`${item.href}/`)
    );
}; 

 const renderNavItems = (mobile = false) =>
    NAV_ITEMS.map((item) => {
        const active = isActive(item);
        const isAbout = item.key === "nav.about";

        return (
            <li key={item.key}>
                <Link
                    href={item.href}
                    className={active ? "active" : ""}
                    aria-current={active ? "page" : undefined}
                    onClick={(event) => {
                        if (isAbout) {
                            handleAboutClick(event);
                        } else if (mobile) {
                            closeMenu();
                        }
                    }}
                >
                    {t(item.key)}
                </Link>
            </li>
        );
    }); 

    return (
        <>
            <header
                className={`site-header ${scrolled ? "scrolled" : ""}`}
            >
                <div className="header-container">
                    {/* LOGO */}
                    <div className="header-logo-column">
                        <Link
                            href="/"
                            className="header-logo-link"
                            aria-label={t("header.logoAlt")}
                        >
                            <img
                                src="/img/logo.png"
                                alt={t("header.logoAlt")}
                            />
                        </Link>
                    </div>

                    {/* NAVIGATION DESKTOP */}
                    <div className="header-menu-column">
                        <nav
                            className="main-navigation"
                            aria-label={t("header.mainNav")}
                        >
                            <ul>{renderNavItems()}</ul>
                        </nav>
                    </div>

                    {/* ACTIONS DESKTOP */}
                    <div className="header-action-column">
                        <div className="header-right">
                            <button
                                type="button"
                                className="lang-switch"
                                onClick={toggleLang}
                                aria-label={t("header.switchLang")}
                            >
                                {isFr ? "EN" : "FR"}
                            </button>

                            <button
                                type="button"
                                className="reserve-button"
                                onClick={handleBookingClick}
                            >
                                <BookmarkIcon />
                                <span>{t("header.book")}</span>
                            </button>

                            <button
                                ref={menuButtonRef}
                                type="button"
                                className="mobile-menu-button"
                                aria-label={t("header.openMenu")}
                                aria-expanded={menuOpen}
                                aria-controls="mobile-sidebar"
                                onClick={openMenu}
                            >
                                <span />
                                <span />
                                <span />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* OVERLAY MOBILE */}
            <div
                className={`mobile-overlay ${menuOpen ? "open" : ""}`}
                onClick={closeMenu}
                aria-hidden="true"
            />

            {/* SIDEBAR MOBILE */}
            <aside
                id="mobile-sidebar"
                className={`mobile-sidebar ${menuOpen ? "open" : ""}`}
                aria-label={t("header.menu")}
                aria-hidden={!menuOpen}
                inert={!menuOpen}
            >
                <div className="mobile-sidebar-head">
                    <span className="mobile-sidebar-title">
                        {t("header.menu")}
                    </span>

                    <button
                        ref={closeButtonRef}
                        type="button"
                        className="mobile-sidebar-close"
                        aria-label={t("header.closeMenu")}
                        onClick={closeMenu}
                    >
                        <span />
                        <span />
                    </button>
                </div>

                <nav
                    className="mobile-sidebar-nav"
                    aria-label={t("header.mainNav")}
                >
                    <ul>{renderNavItems(true)}</ul>
                </nav>

                <div className="mobile-sidebar-footer">
                    <button
                        type="button"
                        className="lang-switch-mobile"
                        onClick={toggleLang}
                    >
                        {isFr ? "English" : "Français"}
                    </button>

                    <button
                        type="button"
                        className="reserve-button mobile-reserve"
                        onClick={handleMobileBookingClick}
                    >
                        <BookmarkIcon />
                        <span>{t("header.book")}</span>
                    </button>
                </div>
            </aside>
        </>
    );
}