import { Link, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import {
    FaPhone,
    FaEnvelope,
    FaWhatsapp,
    FaTiktok,
    FaInstagram,
    FaFacebookMessenger,
    FaLocationDot,
    FaXmark,
} from "react-icons/fa6";

import { useCallback, useEffect, useRef, useState } from "react";
import "./css/Header.css";

const MOBILE_BREAKPOINT = 991;

const NAV_ITEMS = [
    { href: "/", key: "nav.home" },
    { href: "/reservation", key: "nav.booking" },
    { href: "/rooms", key: "nav.rooms" },
    { href: "/restauration", key: "nav.dining" },
];

const CONTACT_LINKS = [
    { href: "https://wa.me/+2250500326868", icon: FaWhatsapp, label: "WhatsApp", external: true },
    { href: "https://www.tiktok.com/@residencenehemie2", icon: FaTiktok, label: "TikTok", external: true },
    { href: "https://www.instagram.com/residencenehemie", icon: FaInstagram, label: "Instagram", external: true },
    {
        href: "https://www.facebook.com/share/1BkydohdQK/?mibextid=wwXIfr",
        icon: FaFacebookMessenger,
        label: "Facebook Messenger",
        external: true,
    },
    { href: "tel:+2250500326868", icon: FaPhone, label: "+225 05 00 32 68 68" },
    { href: "mailto:info@residencenehemie.com", icon: FaEnvelope, labelKey: "contact.email" },
    {
        href: "https://www.google.com/maps/dir/?api=1&destination=5.389184494589828,-3.9155399255394325",
        icon: FaLocationDot,
        labelKey: "contact.directions",
        external: true,
    },
];

const BookmarkIcon = () => (
    <svg aria-hidden="true" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M336 0H48C21.49 0 0 21.49 0 48v464l192-112 192 112V48c0-26.51-21.49-48-48-48zm0 428.43l-144-84-144 84V54a6 6 0 0 1 6-6h276c3.314 0 6 2.683 6 5.996V428.43z" />
    </svg>
);

export default function Header() {
    const { t, i18n } = useTranslation();
    const isFr = i18n.language.startsWith("fr");
    const toggleLang = () => i18n.changeLanguage(isFr ? "en" : "fr");

    const { url } = usePage();
    const currentPath = url.split("?")[0].split("#")[0];

    const isActive = (href) =>
        href === "/"
            ? currentPath === "/"
            : currentPath === href || currentPath.startsWith(`${href}/`);

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);

    const menuButtonRef = useRef(null);
    const closeButtonRef = useRef(null);
    const wasOpen = useRef(false);

    const openMenu = useCallback(() => setMenuOpen(true), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);
    const openContact = useCallback(() => setContactOpen(true), []);
    const closeContact = useCallback(() => setContactOpen(false), []);
    const closeAll = useCallback(() => {
        setMenuOpen(false);
        setContactOpen(false);
    }, []);

    /* Effet scroll */
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* Sidebar ouvert : bloque le scroll + fermeture avec Échap */
    useEffect(() => {
        if (!menuOpen && !contactOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event) => {
            if (event.key === "Escape") closeAll();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [menuOpen, contactOpen, closeAll]);

    /* Gestion du focus */
    useEffect(() => {
        if (menuOpen) {
            closeButtonRef.current?.focus();
        } else if (wasOpen.current) {
            menuButtonRef.current?.focus();
        }
        wasOpen.current = menuOpen;
    }, [menuOpen]);

    /* Referme le sidebar si on repasse en desktop */
    useEffect(() => {
        const mediaQuery = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT + 1}px)`);
        const handleChange = (event) => {
            if (event.matches) setMenuOpen(false);
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return (
        <>
            <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
                <div className="header-container">
                    {/* Logo */}
                    <div className="header-logo-column">
                        <div className="knsl-logo-frame">
                            <Link href="/">
                                <img src="/img/logo.png" alt={t("header.logoAlt")} />
                            </Link>
                        </div>
                    </div>

                    {/* Menu desktop */}
                    <div className="header-menu-column">
                        <div className="knsl-menu">
                            <nav className="top-menu-nav" aria-label={t("header.mainNav")}>
                                <ul className="top-menu-nav-inner">
                                    {NAV_ITEMS.map((item) => (
                                        <li className="menu-item" key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={isActive(item.href) ? "active" : undefined}
                                                aria-current={isActive(item.href) ? "page" : undefined}
                                            >
                                                {t(item.key)}
                                            </Link>
                                        </li>
                                    ))}
                                    <li className="menu-item">
                                        <button type="button" onClick={openContact}>
                                            {t("nav.contact")}
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    {/* Langue + réservation + hamburger */}
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

                            <Link href="/reservation" className="knsl-btn">
                                <BookmarkIcon />
                                <span className="knsl-btn-label">{t("header.book")}</span>
                            </Link>

                            <button
                                ref={menuButtonRef}
                                type="button"
                                className="knsl-menu-btn"
                                aria-label={t("header.openMenu")}
                                aria-expanded={menuOpen}
                                aria-controls="mobile-sidebar"
                                onClick={openMenu}
                            >
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Fond sombre : un clic ailleurs ferme les sidebars */}
            <div
                className={`mobile-overlay ${menuOpen || contactOpen ? "open" : ""}`}
                onClick={closeAll}
                aria-hidden="true"
            />

            {/* Sidebar mobile (gauche) */}
            <aside
                id="mobile-sidebar"
                className={`mobile-sidebar left-sidebar ${menuOpen ? "open" : ""}`}
                aria-label={t("header.menu")}
                aria-hidden={!menuOpen}
            >
                <div className="mobile-sidebar-head">
                    <span className="mobile-sidebar-title">{t("header.menu")}</span>
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

                <nav className="mobile-sidebar-nav" aria-label={t("header.mainNav")}>
                    <ul>
                        {NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={isActive(item.href) ? "active" : undefined}
                                    aria-current={isActive(item.href) ? "page" : undefined}
                                    onClick={closeMenu}
                                >
                                    {t(item.key)}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button
                                type="button"
                                onClick={() => {
                                    closeMenu();
                                    openContact();
                                }}
                            >
                                {t("nav.contact")}
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className="mobile-sidebar-footer">
                    <button
                        type="button"
                        className="lang-switch-mobile"
                        onClick={toggleLang}
                        aria-label={t("header.switchLang")}
                    >
                        {isFr ? "English" : "Français"}
                    </button>

                    <Link href="/reservation" className="knsl-btn" onClick={closeMenu}>
                        <BookmarkIcon />
                        <span>{t("header.book")}</span>
                    </Link>
                </div>
            </aside>

            {/* Sidebar Contact (droite) */}
            <aside
                className={`contactsidebar ${contactOpen ? "active" : ""}`}
                id="contactsidebar"
                aria-label={t("contact.panelLabel")}
                aria-hidden={!contactOpen}
            >
                <div className="contactsidebar_header">
                    <h3>{t("contact.title")}</h3>
                    <button
                        type="button"
                        className="contactsidebar_close_btn"
                        aria-label={t("contact.close")}
                        onClick={closeContact}
                    >
                        <FaXmark aria-hidden="true" />
                    </button>
                </div>

                <div className="contactsidebar_content">
                    <p>{t("contact.text")}</p>
                    <ul>
                        {CONTACT_LINKS.map(({ href, icon: Icon, label, labelKey, external }) => (
                            <li key={href}>
                                <a
                                    href={href}
                                    className="contact-link"
                                    {...(external
                                        ? { target: "_blank", rel: "noopener noreferrer" }
                                        : {})}
                                >
                                    <Icon aria-hidden="true" />
                                    <span>{labelKey ? t(labelKey) : label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
}