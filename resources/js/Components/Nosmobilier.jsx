import { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "./css/Nosmobilier.css";

const BASE = "https://villahortensiasaly.com/wp-content/uploads/2021/09";

const GALLERY = [
  { id: 1, title: "View from the sea", src: `${BASE}/about-1.jpg` },
  { id: 2, title: "East terrace", src: `${BASE}/about-2.jpg` },
  { id: 3, title: "West terrace", src: `${BASE}/about-3.jpg` },
  { id: 4, title: "View from the beach", src: `${BASE}/about-4.jpg` },
  { id: 5, title: "East terrace", src: `${BASE}/about-5.jpg` },
  { id: 6, title: "West terrace", src: `${BASE}/about-6.jpg` },
  { id: 7, title: "View from the sea", src: `${BASE}/about-7.jpg` },
  { id: 8, title: "East terrace", src: `${BASE}/about-8.jpg` },
];

export default function Nosmobilier() {
  const [swiper, setSwiper] = useState(null);
  const [current, setCurrent] = useState(1);
  const [lightbox, setLightbox] = useState(null); // index ou null

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevLightbox = useCallback(
    () => setLightbox((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length)),
    []
  );
  const nextLightbox = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % GALLERY.length)),
    []
  );

  // Clavier pour la lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, prevLightbox, nextLightbox]);

  return (
    <section className="knsl-transition-top knsl-p-0-100 nosmobilier">
      <img
        src={`${BASE.replace("/uploads/2021/09", "")}/themes/kinsley/assets/img/palm.svg`}
        className="knsl-deco-left"
        alt="palm"
        decoding="async"
      />

      <div className="container">
        <div className="knsl-center knsl-title-frame knsl-mb-100">
          <h2 className="knsl-title--h knsl-mb-20">
            <span>La Villa Hortensia vous attend</span>
          </h2>
          <div className="knsl-text knsl-mb-30">
            <p>
              <span>
                Un service sur mesure et des prestations haut de gamme pour une
                expérience inoubliable et personnalisée.
              </span>
            </p>
          </div>
          <a href="/kinsley/gallery/" className="knsl-btn knsl-btn-md">
            <span>Nos mobiliers</span>
          </a>
        </div>

        <div className="knsl-about-slider">
          <Swiper
            modules={[Navigation]}
            onSwiper={setSwiper}
            onSlideChange={(s) => setCurrent(s.activeIndex + 1)}
            slidesPerView={1.2}
            spaceBetween={20}
            centeredSlides
            initialSlide={1}
            breakpoints={{
              768: { slidesPerView: 1.6 },
              1200: { slidesPerView: 2 },
            }}
          >
            {GALLERY.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div className="knsl-image-frame">
                  <button
                    type="button"
                    className="knsl-image-link"
                    onClick={() => setLightbox(index)}
                    aria-label={`Agrandir : ${item.title}`}
                  >
                    <img src={item.src} alt={item.title} decoding="async" />
                    <div className="knsl-badge">
                      <span>{item.title}</span>
                    </div>
                    <span className="knsl-zoom" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
                      </svg>
                    </span>
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="knsl-slider-nav-panel">
            <div className="knsl-about-slider-1-pagination">
              <span>{current}</span> / <span>{GALLERY.length}</span>
            </div>
            <div className="knsl-about-slider-nav">
              <button
                type="button"
                className="knsl-about-slider-1-prev"
                aria-label="Diapositive précédente"
                onClick={() => swiper?.slidePrev()}
                disabled={current === 1}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                className="knsl-about-slider-1-next"
                aria-label="Diapositive suivante"
                onClick={() => swiper?.slideNext()}
                disabled={current === GALLERY.length}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="knsl-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={GALLERY[lightbox].title}
          onClick={closeLightbox}
        >
          <button type="button" className="knsl-lightbox-close" aria-label="Fermer" onClick={closeLightbox}>
            ×
          </button>
          <button
            type="button"
            className="knsl-lightbox-arrow knsl-lightbox-prev"
            aria-label="Image précédente"
            onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
          >
            ‹
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={GALLERY[lightbox].src} alt={GALLERY[lightbox].title} />
            <figcaption>{GALLERY[lightbox].title}</figcaption>
          </figure>
          <button
            type="button"
            className="knsl-lightbox-arrow knsl-lightbox-next"
            aria-label="Image suivante"
            onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}