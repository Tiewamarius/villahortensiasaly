import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import './css/HomeSection.css';

export default function AboutVilla() {
    const { t } = useTranslation();

    return (
        <section className="about-villa-section">
            <div className="about-villa-card">
                {/* Image */}
                <div className="about-villa-image">
                    <img
                        src="/img/BANNIERE/Apropos.jpg"
                        alt={t('about.imageAlt')}
                        loading="lazy"
                    />
                </div>

                {/* Content */}
                <div className="about-villa-content">
                    <span className="about-villa-label">{t('about.label')}</span>

                    <h2>{t('about.title')}</h2>

                    <p>{t('about.text1')}</p>

                    <p>{t('about.text2')}</p>

                    <div className="about-villa-details">
                        <div className="about-villa-detail">
                            <span className="about-villa-detail-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12 21S19 14.5 19 9.5A7 7 0 1 0 5 9.5C5 14.5 12 21 12 21Z"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                    />
                                    <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.7" />
                                </svg>
                            </span>

                            <span>{t('about.location')}</span>
                        </div>

                        <div className="about-villa-detail">
                            <span className="about-villa-detail-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M3 11L12 4L21 11V20H3V11Z"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinejoin="round"
                                    />
                                    <path d="M9 20V13H15V20" stroke="currentColor" strokeWidth="1.7" />
                                </svg>
                            </span>

                            <span>{t('about.lodging')}</span>
                        </div>
                    </div>

                    <Link href="/rooms" className="about-villa-button">
                        {t('about.button')}
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}