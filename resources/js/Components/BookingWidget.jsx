import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./css/BookingWidget.css";

const HOST = "https://book.securebookings.net";

const WIDGET_ID =
    "6dfc3965-177b-1790682794-4a54-8af1-a5a33a0aef28";

const CSS_ID = "hbe-search-wdg-css";
const SECTION_ID = "hbe-bws-wrapper-widget-code";
const PROMO_INPUT_ID = "hbe_promo_code";

export default function BookingWidget() {
    const { t, i18n } = useTranslation();

    const lang = i18n.language?.startsWith("en")
        ? "en"
        : "fr";

    const initialLang = useRef(lang);

    const promoPlaceholder = useRef("");

    promoPlaceholder.current = t("hero.promoCode", {
        defaultValue:
            lang === "en"
                ? "Promo code"
                : "Code promo",
    });

    /*
    |--------------------------------------------------------------------------
    | Changement de langue
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (initialLang.current !== lang) {
            window.location.reload();
        }
    }, [lang]);

    /*
    |--------------------------------------------------------------------------
    | Initialisation SecureBookings
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (lang !== initialLang.current) {
            return undefined;
        }

        let cancelled = false;

        const addedScripts = [];

        /*
        |--------------------------------------------------------------------------
        | CSS SecureBookings
        |--------------------------------------------------------------------------
        */

        if (!document.getElementById(CSS_ID)) {
            const link = document.createElement("link");

            link.id = CSS_ID;
            link.rel = "stylesheet";
            link.href = `${HOST}/css/search-wdg.css`;

            document.head.appendChild(link);
        }

        /*
        |--------------------------------------------------------------------------
        | Chargement dynamique d'un script
        |--------------------------------------------------------------------------
        */

        const loadScript = (src) =>
            new Promise((resolve) => {
                const existing =
                    document.querySelector(
                        `script[src="${src}"]`
                    );

                if (existing) {
                    if (
                        existing.dataset.loaded ===
                        "true"
                    ) {
                        resolve();
                        return;
                    }

                    existing.addEventListener(
                        "load",
                        () => resolve(),
                        {
                            once: true,
                        }
                    );

                    return;
                }

                const script =
                    document.createElement(
                        "script"
                    );

                script.src = src;
                script.async = false;

                script.onload = () => {
                    script.dataset.loaded =
                        "true";

                    resolve();
                };

                script.onerror = () => {
                    console.error(
                        `SecureBookings : chargement impossible (${src})`
                    );

                    resolve();
                };

                document.body.appendChild(
                    script
                );

                addedScripts.push(script);
            });

        /*
        |--------------------------------------------------------------------------
        | Personnalisation du champ code promo
        |--------------------------------------------------------------------------
        */

        const applyPromoField = () => {
            const input =
                document.getElementById(
                    PROMO_INPUT_ID
                );

            if (!input) {
                return;
            }

            input.placeholder =
                promoPlaceholder.current;

            input.setAttribute(
                "aria-label",
                promoPlaceholder.current
            );

            input.setAttribute(
                "autocomplete",
                "off"
            );

            input.classList.add(
                "rn-promo-input"
            );
        };

        /*
        |--------------------------------------------------------------------------
        | Observer du widget SecureBookings
        |--------------------------------------------------------------------------
        |
        | SecureBookings construit le formulaire dynamiquement.
        | On observe donc son conteneur pour appliquer notre
        | personnalisation dès que les éléments apparaissent.
        |
        */

        const section =
            document.getElementById(
                SECTION_ID
            );

        let observer = null;

        if (section) {
            observer =
                new MutationObserver(() => {
                    applyPromoField();
                });

            observer.observe(section, {
                childList: true,
                subtree: true,
            });

            applyPromoField();
        }

        /*
        |--------------------------------------------------------------------------
        | Chargement SecureBookings
        |--------------------------------------------------------------------------
        */

        (async () => {
            await loadScript(
                `${HOST}/js/widget.search.js`
            );

            if (cancelled) {
                return;
            }

            await loadScript(
                `${HOST}/searchWidgetCustomize?lang=${lang}&id=${WIDGET_ID}&ajax=true`
            );

            if (cancelled) {
                return;
            }

            /*
            |--------------------------------------------------------------------------
            | Plusieurs passages car SecureBookings
            | construit certains champs après le chargement.
            |--------------------------------------------------------------------------
            */

            [100, 500, 1000, 2000].forEach(
                (delay) => {
                    setTimeout(() => {
                        if (!cancelled) {
                            applyPromoField();
                        }
                    }, delay);
                }
            );
        })();

        /*
        |--------------------------------------------------------------------------
        | Nettoyage
        |--------------------------------------------------------------------------
        */

        return () => {
            cancelled = true;

            if (observer) {
                observer.disconnect();
            }

            addedScripts.forEach(
                (script) => {
                    script.remove();
                }
            );

            if (section) {
                section.innerHTML = "";
            }
        };
    }, [lang]);

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="booking-widget">
            <section
                id={SECTION_ID}
                aria-label={t(
                    "hero.bookingLabel"
                )}
            />
        </div>
    );
} 