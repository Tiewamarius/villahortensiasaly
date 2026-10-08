import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "./css/Noschambres.css";

const SITE = "https://villahortensiasaly.com";
const UPLOADS = `${SITE}/wp-content/uploads`;

// Données non textuelles. Les textes sont dans fr.json / en.json sous rooms.items.<key>
const ROOMS = [
  { id: 1943, key: "economyClassic", slug: "economy-classic-room", image: `${UPLOADS}/2024/07/IMG-20240624-WA0029.jpg`, adults: 2, size: 20 },
  { id: 1189, key: "tripleClassic", slug: "triple-classic-room", image: `${UPLOADS}/2024/07/IMG-20240624-WA0030.jpg`, adults: 3, size: 42 },
  { id: 986, key: "standard", slug: "standard-room", image: `${UPLOADS}/2024/07/IMG-20240624-WA0050.jpg`, adults: 2, size: 50 },
  { id: 1006, key: "double", slug: "double-room", image: `${UPLOADS}/2021/12/room-3.jpg`, adults: 2, size: 35 },
];

const BedIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20v-4M20 20v-4M3 16h18v-3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3zM6 11V6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5" />
  </svg>
);

const SizeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <rect x="8" y="8" width="8" height="8" rx="2" />
  </svg>
);

const BookmarkIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3h12v18l-6-4-6 4z" />
  </svg>
);

export default function Noschambre() {
  const { t } = useTranslation();
  const [swiper, setSwiper] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = (s) => {
    setPage((s.snapIndex ?? 0) + 1);
    setPages(s.snapGrid.length);
    setAtStart(s.isBeginning);
    setAtEnd(s.isEnd);
  };

  return (
    <section className="noschambre">
      <div className="container">
        <header className="noschambre__head">
          <h2 className="noschambre__title">{t("rooms.heading.title")}</h2>
          <p className="noschambre__lead">{t("rooms.heading.text")}</p>
          <a href="/kinsley/accommodations/" className="noschambre__cta">
            {t("rooms.heading.cta")}
          </a>
        </header>

        <div className="knsl-uni-slider">
          <Swiper
            modules={[Navigation]}
            onSwiper={(s) => {
              setSwiper(s);
              sync(s);
            }}
            onSlideChange={sync}
            onResize={sync}
            onSnapGridLengthChange={sync}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {ROOMS.map((room) => {
              const title = t(`rooms.items.${room.key}.title`);
              const roomUrl = `${SITE}/accommodation/${room.slug}/`;

              return (
                <SwiperSlide key={room.id}>
                  <article className="room-card">
                    <a className="room-card__thumb" href={roomUrl}>
                      <img src={room.image} alt={title} loading="lazy" decoding="async" />
                    </a>

                    <div className="room-card__body">
                      <ul className="room-card__meta">
                        <li>
                          <span className="room-card__icon"><BedIcon /></span>
                          <span className="room-card__label">{t("rooms.adults")}{room.adults}</span>
                        </li>
                        <li>
                          <span className="room-card__icon"><SizeIcon /></span>
                          <span className="room-card__label">
                            {t("rooms.size")}{t("rooms.sizeValue", { value: room.size })}
                          </span>
                        </li>
                      </ul>

                      <h3 className="room-card__title">
                        <a href={roomUrl}>{title}</a>
                      </h3>

                      <p className="room-card__text">{t(`rooms.items.${room.key}.description`)}</p>

                      <a className="room-card__btn" href={`${roomUrl}#booking-form-${room.id}`} aria-label={`${t("rooms.book")} – ${title}`}>
                        <BookmarkIcon />
                        <span>{t("rooms.book")}</span>
                      </a>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="knsl-uni-slider-nav-panel">
            <div className="knsl-uni-slider-pagination" aria-live="polite">
              <span>{page}</span> / <span>{pages}</span>
            </div>
            <div className="knsl-uni-nav">
              <button type="button" className="knsl-uni-slider-prev" aria-label={t("rooms.prev")} onClick={() => swiper?.slidePrev()} disabled={atStart}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              </button>
              <button type="button" className="knsl-uni-slider-next" aria-label={t("rooms.next")} onClick={() => swiper?.slideNext()} disabled={atEnd}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}