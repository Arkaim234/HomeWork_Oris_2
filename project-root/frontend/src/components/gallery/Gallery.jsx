import { useState, useEffect, useCallback } from 'react'
import styles from './Gallery.module.scss'

import img1 from '../../assets/images/turkey/1200-0__use_origin_data_94391727777056.jpg'
import img2 from '../../assets/images/turkey/1200-0__use_origin_data_32031707731074.jpg'
import img3 from '../../assets/images/turkey/1200-0__use_origin_data_37331727776642.jpg'
import img4 from '../../assets/images/turkey/1200-0__use_origin_data_41761727777259.jpg'
import img5 from '../../assets/images/turkey/1200-0__use_origin_data_54681727777547.jpg'
import img6 from '../../assets/images/turkey/1200-0__use_origin_data_61191727776533.jpg'
import img7 from '../../assets/images/turkey/1200-0__use_origin_data_69901727776217.jpg'
import img8 from '../../assets/images/turkey/1200-0__use_origin_data_71391727776800.jpg'
import img9 from '../../assets/images/turkey/220-140_40921727777329.jpg'
import geoPin2 from '../../assets/images/geo-pin2.svg'

const IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8, img9]
const THUMBS_COUNT = 3 // миниатюр справа

function Gallery() {
  const [current, setCurrent]     = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIdx, setModalIdx]   = useState(0)

  const prev = useCallback(() =>
    setCurrent(i => (i - 1 + IMAGES.length) % IMAGES.length), [])
  const next = useCallback(() =>
    setCurrent(i => (i + 1) % IMAGES.length), [])

  const modalPrev = useCallback(() =>
    setModalIdx(i => (i - 1 + IMAGES.length) % IMAGES.length), [])
  const modalNext = useCallback(() =>
    setModalIdx(i => (i + 1) % IMAGES.length), [])

  const openModal = (idx) => { setModalIdx(idx); setModalOpen(true) }
  const closeModal = () => setModalOpen(false)

  // Клавиатура для модалки
  useEffect(() => {
    if (!modalOpen) return
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  modalPrev()
      if (e.key === 'ArrowRight') modalNext()
      if (e.key === 'Escape')     closeModal()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [modalOpen, modalPrev, modalNext])

  // Первые 3 миниатюры для панели справа
  const thumbImages = IMAGES.slice(0, THUMBS_COUNT)
  // У последней миниатюры показываем «+N фотографий»
  const remaining = IMAGES.length - THUMBS_COUNT

  return (
    <>
      {/* ── Основная галерея ── */}
      <div className={styles['gallery-card']}>

        {/* Главное изображение */}
        <div className={styles['gallery-main']}>
          <img
            className={styles['gallery-main-img']}
            src={IMAGES[current]}
            alt={`Турция фото ${current + 1}`}
            onClick={() => openModal(current)}
          />

          {/* Стрелки */}
          <button
            className={`${styles['gallery-nav-btn']} ${styles['gallery-nav-prev']}`}
            onClick={prev}
            aria-label="Предыдущее"
          >←</button>
          <button
            className={`${styles['gallery-nav-btn']} ${styles['gallery-nav-next']}`}
            onClick={next}
            aria-label="Следующее"
          >→</button>

          {/* Индикаторы-точки */}
          <div className={styles['gallery-indicators']}>
            {thumbImages.map((_, i) => (
              <div
                key={i}
                className={`${styles['gallery-indicator']}${i === current % THUMBS_COUNT ? ` ${styles.active}` : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>

        {/* Миниатюры справа */}
        <div className={styles['gallery-thumbnails']}>
          {thumbImages.map((img, i) => {
            const isLast = i === THUMBS_COUNT - 1
            return (
              <div
                key={i}
                className={`${styles['gallery-thumbnail']}${i === current ? ` ${styles.active}` : ''}`}
                onClick={() => { setCurrent(i); if (isLast) openModal(i) }}
              >
                <img src={img} alt={`Миниатюра ${i + 1}`} />
                {isLast && remaining > 0 && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0.45)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 600, fontSize: 14, pointerEvents: 'none'
                  }}>
                    +{remaining} фотографий
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* «На карте» */}
      <div className={styles['photo-block-map-toggler-wrap']}>
        <span className={styles['photo-block-map-toggler-img-wrap']}>
          <img src={geoPin2} alt="" />
        </span>
        <span className={styles['photo-block-map-toggler']}>На карте</span>
      </div>

      {/* ── Модальное окно ── */}
      {modalOpen && (
        <div
          className={styles['gallery-modal']}
          style={{ display: 'flex' }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <span className={styles['gallery-modal-close']} onClick={closeModal}>×</span>

          <img
            className={styles['gallery-modal-img']}
            src={IMAGES[modalIdx]}
            alt={`Фото ${modalIdx + 1}`}
          />

          <div className={styles['gallery-modal-nav']}>
            <button className={styles['gallery-modal-prev']} onClick={modalPrev}>←</button>
            <button className={styles['gallery-modal-next']} onClick={modalNext}>→</button>
          </div>

          <div className={styles['gallery-thumbnails-modal']}>
            {IMAGES.map((img, i) => (
              <img
                key={i}
                className={`${styles['gallery-thumbnail-modal']}${i === modalIdx ? ` ${styles.active}` : ''}`}
                src={img}
                alt={`Миниатюра ${i + 1}`}
                onClick={() => setModalIdx(i)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Gallery