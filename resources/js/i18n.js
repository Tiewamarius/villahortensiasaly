import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./locales/fr.json";
import en from "./locales/en.json";

const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;

i18n.use(initReactI18next).init({
    resources: { fr: { translation: fr }, en: { translation: en } },
    lng: saved || "fr",
    fallbackLng: "fr",
    interpolation: { escapeValue: false },
});

/* Mémorise le choix et met à jour <html lang="..."> */
i18n.on("languageChanged", (lng) => {
    localStorage.setItem("lang", lng);
    document.documentElement.lang = lng;
});

export default i18n;