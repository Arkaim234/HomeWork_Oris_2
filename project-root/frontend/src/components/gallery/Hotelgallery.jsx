import { useState, useEffect, useCallback } from 'react'
import styles from './Gallery.module.scss'
import geoPin2 from '../../assets/images/geo-pin2.svg'

/**
 * HotelGallery — та же галерея что на главной (Gallery.jsx),
 * но принимает images / hotelName / mapUrl как пропсы.
 * Использует Gallery.module.scss напрямую — один источник стилей.
 */

const THUMBS_COUNT = 3

function HotelGallery({ images = [], hotelName = '', mapUrl = '' }) {
  const [current,   setCurrent]   = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIdx,  setModalIdx]  = useState(0)

  const total      = images.length
  const thumbImages = images.slice(0, THUMBS_COUNT)
  const remaining  = total - THUMBS_COUNT

  const prev = useCallback(() =>
    setCurrent(i => (i - 1 + total) % total), [total])
  const next = useCallback(() =>
    setCurrent(i => (i + 1) % total), [total])

  const modalPrev = useCallback(() =>
    setModalIdx(i => (i - 1 + total) % total), [total])
  const modalNext = useCallback(() =>
    setModalIdx(i => (i + 1) % total), [total])

  const openModal  = (idx) => { setModalIdx(idx); setModalOpen(true) }
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

  if (!total) return null

  return (
    <>
      {/* ── Основная галерея ── */}
      <div className={styles['gallery-card']}>

        {/* Главное изображение */}
        <div className={styles['gallery-main']}>
          <img
            className={styles['gallery-main-img']}
            src={images[current]}
            alt={`${hotelName} фото ${current + 1}`}
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
                <img src={img} alt={`${hotelName} миниатюра ${i + 1}`} />
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
        {mapUrl
          ? <a className={styles['photo-block-map-toggler']} href={mapUrl} target="_blank" rel="noopener noreferrer">На карте</a>
          : <span className={styles['photo-block-map-toggler']}>На карте</span>
        }
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
            src={images[modalIdx]}
            alt={`${hotelName} фото ${modalIdx + 1}`}
          />

          <div className={styles['gallery-modal-nav']}>
            <button className={styles['gallery-modal-prev']} onClick={modalPrev}>←</button>
            <button className={styles['gallery-modal-next']} onClick={modalNext}>→</button>
          </div>

          <div className={styles['gallery-thumbnails-modal']}>
            {images.map((img, i) => (
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

export default HotelGallery