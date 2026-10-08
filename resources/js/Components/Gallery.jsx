import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import "./css/Gallery.css";

const UPLOADS = "https://villahortensiasaly.com/wp-content/uploads";

// Pour ajouter une image : une entrée ici + son titre dans fr.json / en.json (gallery.items.<key>).
// Les filtres sont générés automatiquement à partir des catégories utilisées (ex. ajoutez "salon").
const GALLERY = [
  { key: "deluxe", category: "chambre", src: `${UPLOADS}/2021/08/room-1.jpg`, ratio: "1000 / 666" },
  { key: "economyClassic", category: "chambre", src: `${UPLOADS}/2024/07/IMG-20240624-WA0029.jpg`, ratio: "4 / 3" },
  { key: "tripleClassic", category: "chambre", src: `${UPLOADS}/2024/07/IMG-20240624-WA0030.jpg`, ratio: "4 / 3" },
  { key: "business", category: "chambre", src: `${UPLOADS}/2024/07/IMG-20240624-WA0054.jpg`, ratio: "810 / 1080" },
  { key: "royal", category: "chambre", src: `${UPLOADS}/2021/12/room-6.jpg`, ratio: "1000 / 667" },
  { key: "superiorOcean", category: "chambre", src: `${UPLOADS}/2021/12/room-5.jpg`, ratio: "1000 / 667" },
  { key: "standard", category: "chambre", src: `${UPLOADS}/2024/07/IMG-20240624-WA0050.jpg`, ratio: "607 / 1080" },
  { key: "double", category: "chambre", src: `${UPLOADS}/2021/12/room-3.jpg`, ratio: "1000 / 667" },
  { key: "classic", category: "chambre", src: `${UPLOADS}/2021/12/IMG-20240624-WA0034.jpg`, ratio: "4 / 3" },
  { key: "eastTerrace", category: "terrasse", src: `${UPLOADS}/2021/09/about-2.jpg`, ratio: "3 / 2" },
  { key: "westTerrace", category: "terrasse", src: `${UPLOADS}/2021/09/about-3.jpg`, ratio: "3 / 2" },
  { key: "seaView", category: "vue", src: `${UPLOADS}/2021/09/about-1.jpg`, ratio: "3 / 2" },
  { key: "beachView", category: "vue", src: `${UPLOADS}/2021/09/about-4.jpg`, ratio: "3 / 2" },
];

const CATEGORIES = [...new Set(GALLERY.map((g) => g.category))];

export default function Galerie() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null); // index dans la liste filtrée

  const items = useMemo(
    () => (filter === "all" ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter]
  );

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length)), [items.length]);
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, prev, next]);

  const current = open !== null ? items[open] : null;

  return (
    <section className="galerie">
      <div className="container">
        <div className="galerie__filters" role="group" aria-label={t("gallery.filterLabel")}>
          {["all", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`galerie__filter${filter === cat ? " is-active" : ""}`}
              aria-pressed={filter === cat}
              onClick={() => setFilter(cat)}
            >
              {t(`gallery.filters.${cat}`)}
            </button>
          ))}
        </div>

        <div className="galerie__grid">
          {items.map((item, index) => {
            const title = t(`gallery.items.${item.key}`);
            return (
              <figure className="galerie__item" key={item.key}>
                <button
                  type="button"
                  className="galerie__link"
                  onClick={() => setOpen(index)}
                  aria-label={`${t("gallery.zoom")} : ${title}`}
                >
                  <img
                    src={item.src}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    style={{ aspectRatio: item.ratio }}
                  />
                  <figcaption className="galerie__title">{title}</figcaption>
                </button>
              </figure>
            );
          })}
        </div>
      </div>

      {current && (
        <div className="galerie__lightbox" role="dialog" aria-modal="true" aria-label={t(`gallery.items.${current.key}`)} onClick={close}>
          <button type="button" className="galerie__lb-close" aria-label={t("gallery.close")} onClick={close}>×</button>
          <button type="button" className="galerie__lb-arrow galerie__lb-prev" aria-label={t("gallery.prev")} onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={t(`gallery.items.${current.key}`)} />
            <figcaption>{t(`gallery.items.${current.key}`)}</figcaption>
          </figure>
          <button type="button" className="galerie__lb-arrow galerie__lb-next" aria-label={t("gallery.next")} onClick={(e) => { e.stopPropagation(); next(); }}>›</button>
        </div>
      )}
    </section>
  );
}