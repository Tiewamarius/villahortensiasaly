import { Link, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useRef, useState } from "react";
import "./css/Header.css";

const MOBILE_BREAKPOINT = 991;

const NAV_ITEMS = [
    { href: "/", key: "nav.home" },
    { href: "/about", key: "nav.about" },
    { href: "/rooms", key: "nav.rooms" },
];

const BookmarkIcon = () => (
    <svg aria-hidden="true" className="e-font-icon-svg e-far-bookmark" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M336 0H48C21.49 0 0 21.49 0 48v464l192-112 192 112V48c0-26.51-21.49-48-48-48zm0 428.43l-144-84-144 84V54a6 6 0 0 1 6-6h276c3.314 0 6 2.683 6 5.996V428.43z"></path></svg>
);

export default function Header() {
    const { t, i18n } = useTranslation();
    const { url } = usePage();

    const isFr = i18n.language.startsWith("fr");

    const currentPath = url.split("?")[0].split("#")[0];

    const isActive = (href) =>
        href === "/"
            ? currentPath === "/"
            : currentPath === href || currentPath.startsWith(`${href}/`);

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

    /*
    |--------------------------------------------------------------------------
    | Scroll
    |--------------------------------------------------------------------------
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
    |--------------------------------------------------------------------------
    | Bloquer le scroll lorsque le menu mobile est ouvert
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!menuOpen) return;

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
    |--------------------------------------------------------------------------
    | Focus
    |--------------------------------------------------------------------------
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
    |--------------------------------------------------------------------------
    | Fermer le menu en repassant desktop
    |--------------------------------------------------------------------------
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

    return (
        <>
            <header
                className={`site-header ${scrolled ? "scrolled" : ""}`}
            >
                <div className="header-container">

                    {/* =====================================================
                        LOGO
                    ===================================================== */}

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

                    {/* =====================================================
                        NAVIGATION DESKTOP
                    ===================================================== */}

                    <div className="header-menu-column">
                        <nav
                            className="main-navigation"
                            aria-label={t("header.mainNav")}
                        >
                            <ul>
                                {NAV_ITEMS.map((item) => {
                                    const active = isActive(item.href);

                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={
                                                    active ? "active" : ""
                                                }
                                                aria-current={
                                                    active
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {t(item.key)}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>

                    {/* =====================================================
                        ACTIONS
                    ===================================================== */}

                    <div className="header-action-column">
                        <div className="header-right">

                            {/* Langue */}
                            <button
                                type="button"
                                className="lang-switch"
                                onClick={toggleLang}
                                aria-label={t("header.switchLang")}
                            >
                                {isFr ? "EN" : "FR"}
                            </button>

                            {/* Réserver */}
                            <Link
                                href="/reservation"
                                className="reserve-button"
                            >
                                <BookmarkIcon />

                                <span>
                                    {t("header.book")}
                                </span>
                            </Link>

                            {/* Menu mobile */}
                            <button
                                ref={menuButtonRef}
                                type="button"
                                className="mobile-menu-button"
                                aria-label={t("header.openMenu")}
                                aria-expanded={menuOpen}
                                aria-controls="mobile-sidebar"
                                onClick={openMenu}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>

                        </div>
                    </div>
                </div>
            </header>

            {/* =============================================================
                OVERLAY MOBILE
            ============================================================= */}

            <div
                className={`mobile-overlay ${
                    menuOpen ? "open" : ""
                }`}
                onClick={closeMenu}
                aria-hidden="true"
            />

            {/* =============================================================
                SIDEBAR MOBILE
            ============================================================= */}

            <aside
                id="mobile-sidebar"
                className={`mobile-sidebar ${
                    menuOpen ? "open" : ""
                }`}
                aria-label={t("header.menu")}
                aria-hidden={!menuOpen}
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
                        <span></span>
                        <span></span>
                    </button>

                </div>

                <nav
                    className="mobile-sidebar-nav"
                    aria-label={t("header.mainNav")}
                >
                    <ul>
                        {NAV_ITEMS.map((item) => {
                            const active = isActive(item.href);

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={
                                            active ? "active" : ""
                                        }
                                        aria-current={
                                            active
                                                ? "page"
                                                : undefined
                                        }
                                        onClick={closeMenu}
                                    >
                                        {t(item.key)}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="mobile-sidebar-footer">

                    <button
                        type="button"
                        className="lang-switch-mobile"
                        onClick={toggleLang}
                    >
                        {isFr ? "English" : "Français"}
                    </button>

                    <Link
                        href="/reservation"
                        className="reserve-button mobile-reserve"
                        onClick={closeMenu}
                    >
                        <BookmarkIcon />

                        <span>
                            {t("header.book")}
                        </span>
                    </Link>

                </div>
            </aside>
        </>
    );
}