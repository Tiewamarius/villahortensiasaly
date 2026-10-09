import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

import {
    FaFacebookF,
    FaInstagram,
    FaTiktok,
    FaYoutube,
    FaWhatsapp,
} from "react-icons/fa6";

import "./css/Footer.css";

const QUICK_LINKS = [
    { key: "nav.home", href: "/" },
    { key: "nav.rooms", href: "/rooms" },

    { href: "/#about", key: "nav.about" },
    // { key: "nav.dining", href: "/restauration" },
    // { key: "nav.contact", href: "/contact" },
];

const SOCIALS = [
    { label: "WhatsApp", href: "https://wa.me/221785946983", Icon: FaWhatsapp },
    { label: "TikTok", href: "https://www.tiktok.com/@villahortensiasaly", Icon: FaTiktok },
    { label: "Instagram", href: "https://www.instagram.com/villahortensiasaly", Icon: FaInstagram },
    {
        label: "Facebook",
        href: "https://www.facebook.com/share/1BkydohdQK/?mibextid=wwXIfr",
        Icon: FaFacebookF,
    },
    { label: "YouTube", href: "#", Icon: FaYoutube },
];

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="knsl-footer">
            <div className="knsl-footer__inner">
                {/* Partie supérieure */}
                <div className="knsl-footer__top">
                    {/* Identité */}
                    <div className="knsl-footer__brand">
                        <Link href="/" aria-label={t("footer.homeAria")}>
                            <img src="/img/logo.png" alt="Résidence Néhémie" />
                        </Link>

                        <p>{t("footer.tagline")}</p>

                        {/* Réseaux sociaux */}
                        <ul className="knsl-footer__socials">
                            {SOCIALS.map(({ label, href, Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        aria-label={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Navigation rapide */}
                    <nav className="knsl-footer__cols" aria-label={t("footer.navAria")}>
                        {QUICK_LINKS.map((link) => (
                            <Link key={link.href} href={link.href}>
                                {t(link.key)}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Copyright */}
                <div className="knsl-footer__bottom">
                    <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
                </div>
            </div>
        </footer>
    );
}