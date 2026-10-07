import { Head } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './css/HotelLinkWidget.css';

const HOTEL_LINK_SCRIPT =
    'https://book.securebookings.net/js/v2/widget.all.js';

const WIDGET_ID =
    '6dfc3965-177b-1790682794-4a54-8af1-a5a33a0aef28';

const customizeUrl = (lang) =>
    `https://book.securebookings.net/widgetCustomize?lang=${lang}&widgetType=Widget&id=${WIDGET_ID}&ajax=true`;


/* =========================================================
   ICON
========================================================= */

const Icon = ({ d }) => (
    <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true"
    >
        <path d={d} fill="currentColor" />
    </svg>
);


/* =========================================================
   TRUST
========================================================= */

const TRUST = [
    [
        'booking.trust.secure',
        'M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z',
    ],
    [
        'booking.trust.rate',
        'M3 12 12 3h9v9l-9 9z',
    ],
    [
        'booking.trust.cancel',
        'M6 10V8a6 6 0 1 1 12 0v2h2v12H4V10z',
    ],
];


/* =========================================================
   HERO
========================================================= */

function Hero() {
    const { t } = useTranslation();

    return (
        <section className="booking-hero">
            <div className="booking-hero__content">

                <p className="booking-hero__eyebrow">
                    {t('booking.eyebrow')}
                </p>

                <h1>
                    {t('booking.title')}
                </h1>

                <p className="booking-hero__sub">
                    {t('booking.subtitle')}
                </p>

                <ul className="booking-trust">
                    {TRUST.map(([key, d]) => (
                        <li key={key}>
                            <Icon d={d} />
                            {t(key)}
                        </li>
                    ))}
                </ul>

            </div>
        </section>
    );
}


/* =========================================================
   STICKY SEARCH
========================================================= */

const STICKY_TOP = 108;

const SEARCH_BAR_SELECTOR = null;

const STICKY_DEBUG = false;

const SEARCH_LABEL =
    /^\s*(rechercher?|search|buscar)\s*$/i;


function useStickySearchBar(top = STICKY_TOP) {
    useEffect(() => {

        const wrapper =
            document.getElementById(
                'hbe-bws-wrapper'
            );

        if (!wrapper) {
            return undefined;
        }

        const log = (...args) => {
            if (STICKY_DEBUG) {
                console.log(
                    '[sticky]',
                    ...args
                );
            }
        };

        let bar = null;
        let stuck = false;
        let offset = 0;
        let frame = 0;

        const findBar = () => {

            if (SEARCH_BAR_SELECTOR) {
                return wrapper.querySelector(
                    SEARCH_BAR_SELECTOR
                );
            }

            const label = [
                ...wrapper.querySelectorAll('*'),
            ].find((el) => {

                return (
                    (
                        el.children.length === 0 &&
                        SEARCH_LABEL.test(
                            el.textContent
                        )
                    ) ||
                    (
                        el.tagName === 'INPUT' &&
                        SEARCH_LABEL.test(
                            el.value
                        )
                    )
                );
            });

            if (!label) {
                return null;
            }

            let el = label;

            while (
                el.parentElement &&
                el.parentElement !== wrapper &&
                el.parentElement.offsetHeight <= 200
            ) {
                el = el.parentElement;
            }

            return el;
        };

        const release = () => {

            if (!bar) {
                return;
            }

            bar.classList.remove(
                'is-stuck'
            );

            [
                'position',
                'top',
                'left',
                'width',
                'zIndex',
            ].forEach(
                (property) => {
                    bar.style[property] = '';
                }
            );

            if (bar.parentElement) {
                bar.parentElement.style.minHeight =
                    '';
            }

            stuck = false;
        };

        const update = () => {

            frame = 0;

            if (
                window.innerWidth < 768
            ) {
                release();
                return;
            }

            if (
                !bar ||
                !bar.isConnected
            ) {

                stuck = false;

                bar = findBar();

                if (bar) {
                    log(
                        'barre détectée',
                        bar
                    );
                }
            }

            if (
                !bar ||
                !bar.parentElement
            ) {
                return;
            }

            const parent =
                bar.parentElement;

            if (!stuck) {

                const rect =
                    bar.getBoundingClientRect();

                if (
                    rect.top <= top &&
                    rect.height > 0
                ) {

                    offset =
                        rect.top -
                        parent.getBoundingClientRect().top;

                    parent.style.minHeight =
                        `${parent.offsetHeight}px`;

                    Object.assign(
                        bar.style,
                        {
                            position: 'fixed',
                            left: `${rect.left}px`,
                            width: `${rect.width}px`,
                            zIndex: 50,
                        }
                    );

                    bar.classList.add(
                        'is-stuck'
                    );

                    stuck = true;

                    log('barre fixée');
                }

            } else if (
                parent.getBoundingClientRect().top +
                offset >
                top
            ) {

                release();

                log(
                    'barre relâchée'
                );

                return;
            }

            if (stuck) {

                const end =
                    wrapper.getBoundingClientRect().bottom -
                    bar.offsetHeight;

                bar.style.top =
                    `${Math.min(
                        top,
                        end
                    )}px`;
            }
        };

        const schedule = () => {

            if (!frame) {
                frame =
                    requestAnimationFrame(
                        update
                    );
            }
        };

        const onMutate = () => {

            if (!stuck) {
                bar = null;
            }

            schedule();
        };

        const onResize = () => {

            release();

            bar = null;

            schedule();
        };

        const observer =
            new MutationObserver(
                onMutate
            );

        observer.observe(
            wrapper,
            {
                childList: true,
                subtree: true,
            }
        );

        window.addEventListener(
            'scroll',
            schedule,
            {
                passive: true,
                capture: true,
            }
        );

        window.addEventListener(
            'resize',
            onResize
        );

        schedule();

        return () => {

            observer.disconnect();

            window.removeEventListener(
                'scroll',
                schedule,
                {
                    capture: true,
                }
            );

            window.removeEventListener(
                'resize',
                onResize
            );

            cancelAnimationFrame(
                frame
            );

            release();
        };

    }, [top]);
}


/* =========================================================
   RÉCUPÉRATION DES DATES DEPUIS L'URL
========================================================= */

function getReservationDates() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return {
        checkIn:
            params.get('check_in') || '',

        checkOut:
            params.get('check_out') || '',
    };
}


/* =========================================================
   APPLICATION D'UNE DATE À UN INPUT
========================================================= */

function setDateFieldValue(
    field,
    value
) {

    if (
        !field ||
        !value
    ) {
        return false;
    }

    const setter =
        Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            'value'
        )?.set;

    if (setter) {
        setter.call(
            field,
            value
        );
    } else {
        field.value =
            value;
    }

    field.dispatchEvent(
        new Event(
            'input',
            {
                bubbles: true,
            }
        )
    );

    field.dispatchEvent(
        new Event(
            'change',
            {
                bubbles: true,
            }
        )
    );

    field.dispatchEvent(
        new Event(
            'blur',
            {
                bubbles: true,
            }
        )
    );

    return true;
}


/* =========================================================
   APPLICATION DES DATES SECUREBOOKINGS
========================================================= */

function applyReservationDates() {

    const {
        checkIn,
        checkOut,
    } = getReservationDates();

    if (
        !checkIn &&
        !checkOut
    ) {
        return false;
    }

    const wrapper =
        document.getElementById(
            'hbe-bws-wrapper'
        );

    if (!wrapper) {
        return false;
    }


    /* -----------------------------------------
       ARRIVÉE
    ----------------------------------------- */

    const checkInSelectors = [
        '[name="check_in"]',
        '[name="check-in"]',
        '[name="checkIn"]',
        '[name="arrival"]',
        '[name="arrival_date"]',

        '#check_in',
        '#check-in',
        '#checkIn',
        '#arrival',
        '#arrival_date',
    ];


    /* -----------------------------------------
       DÉPART
    ----------------------------------------- */

    const checkOutSelectors = [
        '[name="check_out"]',
        '[name="check-out"]',
        '[name="checkOut"]',
        '[name="departure"]',
        '[name="departure_date"]',

        '#check_out',
        '#check-out',
        '#checkOut',
        '#departure',
        '#departure_date',
    ];


    let applied = false;


    /* -----------------------------------------
       Recherche arrivée
    ----------------------------------------- */

    for (
        const selector
        of checkInSelectors
    ) {

        const field =
            wrapper.querySelector(
                selector
            );

        if (field) {

            setDateFieldValue(
                field,
                checkIn
            );

            applied = true;

            break;
        }
    }


    /* -----------------------------------------
       Recherche départ
    ----------------------------------------- */

    for (
        const selector
        of checkOutSelectors
    ) {

        const field =
            wrapper.querySelector(
                selector
            );

        if (field) {

            setDateFieldValue(
                field,
                checkOut
            );

            applied = true;

            break;
        }
    }


    return applied;
}


/* =========================================================
   HOTEL LINK WIDGET
========================================================= */

function HotelLinkWidget() {

    const { i18n } =
        useTranslation();

    const lang =
        i18n.language?.startsWith(
            'en'
        )
            ? 'en'
            : 'fr';


    const initialLang =
        useRef(lang);


    /* -----------------------------------------
       Changement de langue
    ----------------------------------------- */

    useEffect(() => {

        if (
            initialLang.current !==
            lang
        ) {
            window.location.reload();
        }

    }, [lang]);


    useStickySearchBar();


    /* -----------------------------------------
       Chargement SecureBookings
    ----------------------------------------- */

    useEffect(() => {

        if (
            lang !==
            initialLang.current
        ) {
            return undefined;
        }


        let cancelled = false;

        const addedScripts = [];

        let dateObserver = null;


        /* -----------------------------------------
           Dates reçues
        ----------------------------------------- */

        const dates =
            getReservationDates();

        const hasDates =
            Boolean(
                dates.checkIn ||
                dates.checkOut
            );


        /* -----------------------------------------
           Observer du widget
        ----------------------------------------- */

        const startDateObserver = () => {

            if (!hasDates) {
                return;
            }

            const wrapper =
                document.getElementById(
                    'hbe-bws-wrapper'
                );

            if (!wrapper) {
                return;
            }


            /*
             * Première tentative
             */
            applyReservationDates();


            /*
             * SecureBookings construit
             * ses éléments dynamiquement.
             */
            dateObserver =
                new MutationObserver(
                    () => {

                        applyReservationDates();

                    }
                );


            dateObserver.observe(
                wrapper,
                {
                    childList: true,
                    subtree: true,
                }
            );


            /*
             * Tentatives après
             * initialisation.
             */
            [
                100,
                300,
                700,
                1200,
                2000,
            ].forEach(
                (delay) => {

                    setTimeout(
                        () => {

                            if (
                                !cancelled
                            ) {
                                applyReservationDates();
                            }

                        },
                        delay
                    );

                }
            );
        };


        /* -----------------------------------------
           Chargement script
        ----------------------------------------- */

        const loadScript = (
            src,
            callback
        ) => {

            const existing =
                document.querySelector(
                    `script[src="${src}"]`
                );

            if (existing) {

                if (
                    existing.dataset.loaded ===
                    'true'
                ) {
                    callback?.();
                } else {

                    existing.addEventListener(
                        'load',
                        () => callback?.(),
                        {
                            once: true,
                        }
                    );
                }

                return;
            }


            const script =
                document.createElement(
                    'script'
                );

            script.src =
                src;

            script.async =
                false;

            script.onload = () => {

                script.dataset.loaded =
                    'true';

                if (
                    !cancelled
                ) {
                    callback?.();
                }
            };

            script.onerror = () => {

                console.error(
                    `SecureBookings : chargement impossible (${src})`
                );

            };

            document.body.appendChild(
                script
            );

            addedScripts.push(
                script
            );
        };


        /* -----------------------------------------
           SecureBookings
        ----------------------------------------- */

        loadScript(
            HOTEL_LINK_SCRIPT,
            () => {

                loadScript(
                    customizeUrl(lang),
                    () => {

                        startDateObserver();

                    }
                );

            }
        );


        /* -----------------------------------------
           Cleanup
        ----------------------------------------- */

        return () => {

            cancelled = true;

            if (dateObserver) {
                dateObserver.disconnect();
            }

            addedScripts.forEach(
                (script) => {
                    script.remove();
                }
            );
        };

    }, [lang]);


    return (
        <div className="hotel-link-widget-container">

            <div className="hbe-bws">

                <section id="hbe-bws-page">

                    <div
                        id="hbe-bws-wrapper"
                    />

                </section>

            </div>

        </div>
    );
}


/* =========================================================
   PAGE RÉSERVATION
========================================================= */

export default function BookingPage() {

    const { t } =
        useTranslation();

    return (
        <div className="booking-page">

            <Head
                title={t(
                    'booking.pageTitle'
                )}
            />

            <Hero />

            <main>

                <HotelLinkWidget />

            </main>

        </div>
    );
} 