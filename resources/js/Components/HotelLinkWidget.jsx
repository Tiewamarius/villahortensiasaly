import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import './css/HotelLinkWidget.css';

/* =========================================================
   CONFIG SECUREBOOKINGS
========================================================= */

const HOTEL_LINK_SCRIPT = 'https://book.securebookings.net/js/v2/widget.all.js';

const WIDGET_ID = '6dfc3965-177b-1790682794-4a54-8af1-a5a33a0aef28';

const customizeUrl = (lang) =>
    `https://book.securebookings.net/widgetCustomize?lang=${lang}&widgetType=Widget&id=${WIDGET_ID}&ajax=true`;

/* =========================================================
   ICON + TRUST
========================================================= */

const Icon = ({ d }) => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path d={d} fill="currentColor" />
    </svg>
);

const TRUST = [
    ['booking.trust.secure', 'M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z'],
    ['booking.trust.rate', 'M3 12 12 3h9v9l-9 9z'],
    ['booking.trust.cancel', 'M6 10V8a6 6 0 1 1 12 0v2h2v12H4V10z'],
];

/* =========================================================
   BARRE DE RECHERCHE COLLANTE
   Fixée en haut de la zone scrollable de la modale.
========================================================= */

const SEARCH_BAR_SELECTOR = null;
const SEARCH_LABEL = /^\s*(rechercher?|search|buscar)\s*$/i;

function useStickySearchBar(enabled, scrollRef) {
    useEffect(() => {
        if (!enabled) return undefined;

        const wrapper = document.getElementById('hbe-bws-wrapper');
        if (!wrapper) return undefined;

        let bar = null;
        let stuck = false;
        let offset = 0;
        let frame = 0;

        const findBar = () => {
            if (SEARCH_BAR_SELECTOR) {
                return wrapper.querySelector(SEARCH_BAR_SELECTOR);
            }

            const label = [...wrapper.querySelectorAll('*')].find(
                (el) =>
                    (el.children.length === 0 && SEARCH_LABEL.test(el.textContent)) ||
                    (el.tagName === 'INPUT' && SEARCH_LABEL.test(el.value))
            );

            if (!label) return null;

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
            if (!bar) return;

            bar.classList.remove('is-stuck');
            ['position', 'top', 'left', 'width', 'zIndex'].forEach((property) => {
                bar.style[property] = '';
            });

            if (bar.parentElement) bar.parentElement.style.minHeight = '';
            stuck = false;
        };

        const update = () => {
            frame = 0;

            if (window.innerWidth < 768) {
                release();
                return;
            }

            // Haut de la zone scrollable de la modale
            const top = scrollRef.current?.getBoundingClientRect().top ?? 0;

            if (!bar || !bar.isConnected) {
                stuck = false;
                bar = findBar();
            }

            if (!bar || !bar.parentElement) return;

            const parent = bar.parentElement;

            if (!stuck) {
                const rect = bar.getBoundingClientRect();

                if (rect.top <= top && rect.height > 0) {
                    offset = rect.top - parent.getBoundingClientRect().top;
                    parent.style.minHeight = `${parent.offsetHeight}px`;

                    Object.assign(bar.style, {
                        position: 'fixed',
                        left: `${rect.left}px`,
                        width: `${rect.width}px`,
                        zIndex: 50,
                    });

                    bar.classList.add('is-stuck');
                    stuck = true;
                }
            } else if (parent.getBoundingClientRect().top + offset > top) {
                release();
                return;
            }

            if (stuck) {
                const end = wrapper.getBoundingClientRect().bottom - bar.offsetHeight;
                bar.style.top = `${Math.min(top, end)}px`;
            }
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        const onMutate = () => {
            if (!stuck) bar = null;
            schedule();
        };

        const onResize = () => {
            release();
            bar = null;
            schedule();
        };

        const observer = new MutationObserver(onMutate);
        observer.observe(wrapper, { childList: true, subtree: true });

        window.addEventListener('scroll', schedule, { passive: true, capture: true });
        window.addEventListener('resize', onResize);

        schedule();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', schedule, { capture: true });
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(frame);
            release();
        };
    }, [enabled, scrollRef]);
}

/* =========================================================
   DATES (props, avec repli sur ?check_in= & ?check_out=)
========================================================= */

function resolveDates(checkIn, checkOut) {
    const params = new URLSearchParams(window.location.search);

    return {
        checkIn: checkIn || params.get('check_in') || '',
        checkOut: checkOut || params.get('check_out') || '',
    };
}

function setDateFieldValue(field, value) {
    if (!field || !value) return false;

    const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value'
    )?.set;

    if (setter) setter.call(field, value);
    else field.value = value;

    ['input', 'change', 'blur'].forEach((type) =>
        field.dispatchEvent(new Event(type, { bubbles: true }))
    );

    return true;
}

const CHECK_IN_SELECTORS = [
    '[name="check_in"]', '[name="check-in"]', '[name="checkIn"]',
    '[name="arrival"]', '[name="arrival_date"]',
    '#check_in', '#check-in', '#checkIn', '#arrival', '#arrival_date',
];

const CHECK_OUT_SELECTORS = [
    '[name="check_out"]', '[name="check-out"]', '[name="checkOut"]',
    '[name="departure"]', '[name="departure_date"]',
    '#check_out', '#check-out', '#checkOut', '#departure', '#departure_date',
];

function fillFirstMatch(wrapper, selectors, value) {
    for (const selector of selectors) {
        const field = wrapper.querySelector(selector);
        if (field) return setDateFieldValue(field, value);
    }
    return false;
}

function applyReservationDates({ checkIn, checkOut }) {
    if (!checkIn && !checkOut) return false;

    const wrapper = document.getElementById('hbe-bws-wrapper');
    if (!wrapper) return false;

    const a = fillFirstMatch(wrapper, CHECK_IN_SELECTORS, checkIn);
    const b = fillFirstMatch(wrapper, CHECK_OUT_SELECTORS, checkOut);

    return a || b;
}

/* =========================================================
   WIDGET SECUREBOOKINGS
   Chargé une seule fois, à la première ouverture.
========================================================= */

function HotelLinkWidget({ active, ready, onReady, dates, scrollRef }) {
    const { i18n } = useTranslation();

    const lang = i18n.language?.startsWith('en') ? 'en' : 'fr';
    const loadedLang = useRef(null);

    /* Changement de langue après chargement : le widget doit être réinitialisé */
    useEffect(() => {
        if (loadedLang.current && loadedLang.current !== lang) {
            window.location.reload();
        }
    }, [lang]);

    useStickySearchBar(active && ready, scrollRef);

    /* Chargement des scripts */
    useEffect(() => {
        if (loadedLang.current && loadedLang.current !== lang) return undefined;

        let cancelled = false;
        const addedScripts = [];

        const loadScript = (src, callback) => {
            const existing = document.querySelector(`script[src="${src}"]`);

            if (existing) {
                if (existing.dataset.loaded === 'true') callback?.();
                else existing.addEventListener('load', () => callback?.(), { once: true });
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.async = false;

            script.onload = () => {
                script.dataset.loaded = 'true';
                if (!cancelled) callback?.();
            };

            script.onerror = () => {
                console.error(`SecureBookings : chargement impossible (${src})`);
            };

            document.body.appendChild(script);
            addedScripts.push(script);
        };

        loadedLang.current = lang;

        loadScript(HOTEL_LINK_SCRIPT, () => {
            loadScript(customizeUrl(lang), () => {
                if (!cancelled) onReady();
            });
        });

        return () => {
            cancelled = true;
            addedScripts.forEach((script) => script.remove());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang]);

    /* Application des dates à chaque ouverture */
    useEffect(() => {
        if (!active || !ready) return undefined;

        const resolved = resolveDates(dates.checkIn, dates.checkOut);
        if (!resolved.checkIn && !resolved.checkOut) return undefined;

        const wrapper = document.getElementById('hbe-bws-wrapper');
        if (!wrapper) return undefined;

        let cancelled = false;
        const apply = () => !cancelled && applyReservationDates(resolved);

        apply();

        // SecureBookings construit ses éléments dynamiquement
        const observer = new MutationObserver(apply);
        observer.observe(wrapper, { childList: true, subtree: true });

        const stop = setTimeout(() => observer.disconnect(), 5000);
        const timers = [100, 300, 700, 1200, 2000].map((delay) => setTimeout(apply, delay));

        return () => {
            cancelled = true;
            observer.disconnect();
            clearTimeout(stop);
            timers.forEach(clearTimeout);
        };
    }, [active, ready, dates.checkIn, dates.checkOut]);

    return (
        <div className="hotel-link-widget-container">
            <div className="hbe-bws">
                <section id="hbe-bws-page">
                    <div id="hbe-bws-wrapper" />
                </section>
            </div>
        </div>
    );
}

/* =========================================================
   MODALE DE RÉSERVATION
========================================================= */

export default function BookingModal({ open, onClose, checkIn = '', checkOut = '' }) {
    const { t } = useTranslation();

    const [mounted, setMounted] = useState(false); // widget monté à la 1re ouverture
    const [ready, setReady] = useState(false);

    const panelRef = useRef(null);
    const scrollRef = useRef(null);
    const closeRef = useRef(null);
    const lastFocused = useRef(null);

    useEffect(() => {
        if (open) setMounted(true);
    }, [open]);

    /* Scroll bloqué + focus + clavier (Échap, piège à focus) */
    useEffect(() => {
        if (!open) return undefined;

        lastFocused.current = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== 'Tab' || !panelRef.current) return;

            const focusables = [
                ...panelRef.current.querySelectorAll(
                    'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                ),
            ].filter((el) => el.offsetParent !== null);

            if (!focusables.length) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
            lastFocused.current?.focus?.();
        };
    }, [open, onClose]);

    if (!mounted || typeof document === 'undefined') return null;

    return createPortal(
        <div
            className={open ? 'booking-modal' : 'booking-modal is-closed'}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            aria-hidden={!open}
        >
            <div className="booking-modal__backdrop" onClick={onClose} />

            <div className="booking-modal__panel" ref={panelRef}>
                <header className="booking-modal__header">
                    <div>
                        <p className="booking-modal__eyebrow">{t('booking.eyebrow')}</p>
                        <h2 id="booking-modal-title">{t('booking.title')}</h2>
                    </div>

                    <button
                        type="button"
                        ref={closeRef}
                        className="booking-modal__close"
                        onClick={onClose}
                        aria-label={t('booking.close', { defaultValue: 'Fermer' })}
                    >
                        ×
                    </button>
                </header>

                <div className="booking-modal__body" ref={scrollRef}>
                    <HotelLinkWidget
                        active={open}
                        ready={ready}
                        onReady={() => setReady(true)}
                        dates={{ checkIn, checkOut }}
                        scrollRef={scrollRef}
                    />
                </div>

                <footer className="booking-modal__footer">
                    <ul className="booking-trust">
                        {TRUST.map(([key, d]) => (
                            <li key={key}>
                                <Icon d={d} />
                                {t(key)}
                            </li>
                        ))}
                    </ul>
                </footer>
            </div>
        </div>,
        document.body
    );
}

/* =========================================================
   PROVIDER + HOOK
   <BookingProvider> une seule fois dans le layout, puis
   const { openBooking } = useBooking();
   <button onClick={() => openBooking()}>Réserver</button>
   <button onClick={() => openBooking({ checkIn: '2026-11-02', checkOut: '2026-11-05' })}>
========================================================= */

const BookingContext = createContext({
    openBooking: () => {},
    closeBooking: () => {},
});

export const useBooking = () => useContext(BookingContext);

export function BookingProvider({ children }) {
    const [state, setState] = useState({ open: false, checkIn: '', checkOut: '' });

    const openBooking = useCallback((dates) => {
        setState({
            open: true,
            checkIn: typeof dates?.checkIn === 'string' ? dates.checkIn : '',
            checkOut: typeof dates?.checkOut === 'string' ? dates.checkOut : '',
        });
    }, []);

    const closeBooking = useCallback(
        () => setState((current) => ({ ...current, open: false })),
        []
    );

    const value = useMemo(
        () => ({ openBooking, closeBooking }),
        [openBooking, closeBooking]
    );

    return (
        <BookingContext.Provider value={value}>
            {children}
            <BookingModal
                open={state.open}
                onClose={closeBooking}
                checkIn={state.checkIn}
                checkOut={state.checkOut}
            />
        </BookingContext.Provider>
    );
}