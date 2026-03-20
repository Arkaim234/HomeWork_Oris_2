import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import HotelGallery from '../components/gallery/Hotelgallery'
import geoPin from '../assets/images/geo-pin.svg'
import styles from './HotelPage.module.scss'

function InfoRow({ label, children }) {
  if (!children) return null

  return (
    <div className={styles['hotel-info-row']}>
      <div className={styles['hotel-info-label']}>{label}</div>
      <div className={styles['hotel-info-value']}>{children}</div>
    </div>
  )
}

function InfoList({ items }) {
  if (!items || items.length === 0) return <p>Нет данных.</p>

  return (
    <ul className={styles.plainList}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

function TabDescription({ hotel }) {
  return (
    <div className={styles['hotel-info-grid']}>
      <InfoRow label="Расположение">
        <p>
          {hotel.city}, {hotel.country}, {hotel.address}
        </p>
        <p>До аэропорта: {hotel.distanceToAirport}</p>
        <p>До центра: {hotel.distanceToCenter}</p>
      </InfoRow>

      <InfoRow label="Пляж">
        <InfoList items={hotel.beachInfo} />
      </InfoRow>

      <InfoRow label="Основная информация">
        {hotel.yearOpened && hotel.yearOpened > 0 && (
          <p>Год открытия: {hotel.yearOpened} г.</p>
        )}
        {hotel.yearRenovated && hotel.yearRenovated > 0 && (
          <p>Год реновации: {hotel.yearRenovated} г.</p>
        )}
        {hotel.totalAreaSquareMeters && hotel.totalAreaSquareMeters > 0 && (
          <p>
            Площадь территории: {hotel.totalAreaSquareMeters.toLocaleString()} м²
          </p>
        )}
        {hotel.totalArea && hotel.totalArea > 0 && (
          <p>Площадь территории: {hotel.totalArea.toLocaleString()} м²</p>
        )}
        {hotel.buildingInfo && <div>{hotel.buildingInfo}</div>}
      </InfoRow>

      {hotel.contacts && hotel.contacts.length > 0 && (
        <InfoRow label="Контакты">
          <ul className={styles['hotel-contacts']}>
            {hotel.contacts.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </InfoRow>
      )}

      <InfoRow label="Примечание">
        <div>{hotel.description}</div>
      </InfoRow>
    </div>
  )
}

function TabRooms({ hotel }) {
  return (
    <div className={styles['hotel-info-grid']}>
      <InfoRow label="В номере">
        <InfoList
          items={hotel.inRoomServices || hotel.services?.inRoom || []}
        />
      </InfoRow>

      <InfoRow label="Типы номеров">
        {hotel.roomTypes && hotel.roomTypes.length > 0 ? (
          <ul className={styles.plainList}>
            {hotel.roomTypes.map((room) => (
              <li key={room.id}>
                <strong>{room.name}</strong> — вид: {room.view}, кровати:{' '}
                {room.bedConfiguration}, макс. {room.maxOccupancy} чел.
                {room.areaSquareMeters > 0 && `, ${room.areaSquareMeters} м²`}
              </li>
            ))}
          </ul>
        ) : (
          <p>Информация о номерах уточняется.</p>
        )}
      </InfoRow>
    </div>
  )
}

function TabInfra({ hotel }) {
  return (
    <div className={styles['hotel-info-grid']}>
      <InfoRow label="Питание">
        {hotel.mealPlans && hotel.mealPlans.length > 0 ? (
          <ul className={styles.plainList}>
            {hotel.mealPlans.map((mp) => (
              <li key={mp.code}>
                <strong>{mp.code}</strong> — {mp.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет данных.</p>
        )}
      </InfoRow>

      <InfoRow label="Для детей">
        <InfoList
          items={hotel.childServices || hotel.services?.forChildren || []}
        />
      </InfoRow>

      <InfoRow label="Развлечения и спорт">
        {(hotel.freeEntertainment?.length > 0 ||
          hotel.paidEntertainment?.length > 0) && (
          <>
            {hotel.freeEntertainment?.length > 0 && (
              <>
                <p>
                  <strong>Бесплатно:</strong>
                </p>
                <InfoList items={hotel.freeEntertainment} />
              </>
            )}
            {hotel.paidEntertainment?.length > 0 && (
              <>
                <p>
                  <strong>Платно:</strong>
                </p>
                <InfoList items={hotel.paidEntertainment} />
              </>
            )}
          </>
        )}

        {!hotel.freeEntertainment?.length &&
          !hotel.paidEntertainment?.length && (
            <InfoList items={hotel.services?.entertainment || []} />
          )}
      </InfoRow>

      <InfoRow label="Услуги на территории">
        <InfoList
          items={hotel.onSiteServices || hotel.services?.onSite || []}
        />
      </InfoRow>
    </div>
  )
}

const TABS = [
  { key: 'description', label: 'Описание' },
  { key: 'rooms', label: 'Номера' },
  { key: 'infra', label: 'Инфраструктура' },
  { key: 'news', label: 'Акции и новости' },
]

function HotelPage() {
  const { slug } = useParams()
  const [hotel, setHotel] = useState(null)
  const [activeTab, setActiveTab] = useState('description')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadHotel() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch('/api/tours.json')

        if (!response.ok) {
          throw new Error('Не удалось загрузить отели')
        }

        const hotels = await response.json()
        const foundHotel = hotels.find((item) => item.slug === slug)

        if (!cancelled) {
          setHotel(foundHotel || null)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Ошибка загрузки отеля')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadHotel()

    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading) {
    return (
      <div className="cmn-l-content cmn-l-content_main">
        <div className="cmn-l-block-wrap">
          <p>Загрузка...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="cmn-l-content cmn-l-content_main">
        <div className="cmn-l-block-wrap">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!hotel) {
    return (
      <div className="cmn-l-content cmn-l-content_main">
        <div className="cmn-l-block-wrap">
          <h2 className="cmn-l-block-title">Отель не найден</h2>
          <p>
            Проверьте адрес или вернитесь на <Link to="/turkey/">главную</Link>.
          </p>
        </div>
      </div>
    )
  }

  const formatPrice = (v) =>
    String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${hotel.address}, ${hotel.city}, ${hotel.country}`
  )}`

  return (
    <div className="cmn-l-content cmn-l-content_main">
      <div className="cmn-l-breadcrumbs">
        <div className="cmn-l-breadcrumbs__items">
          <Link className="cmn-l-breadcrumbs__item" to="/turkey/">
            Главная
          </Link>{' '}
          »&nbsp;
          <Link className="cmn-l-breadcrumbs__item" to="/turkey/">
            Турция
          </Link>{' '}
          »&nbsp;
          <span className="cmn-l-breadcrumbs__item">{hotel.name}</span>
        </div>
      </div>

      <div className="cmn-l-block-wrap">
        <h2 className="cmn-l-block-title">{hotel.name}</h2>

        {hotel.hotelType && (
          <div className={styles.hotelTypeBadge}>{hotel.hotelType}</div>
        )}

        <div className={styles['hotel-location-line']}>
          <img src={geoPin} width="15" height="15" alt="" style={{ marginRight: 5 }} />
          <span className={styles['hotel-location-country']}>{hotel.country}</span>,
          <span className={styles['hotel-location-city']}>{hotel.city}</span>
        </div>

        <div className={styles['pages-main-nav']}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`${styles['pages-main-nav__item']} ${
                activeTab === tab.key
                  ? styles['pages-main-nav__item_active']
                  : ''
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <HotelGallery
          images={hotel.photos || (hotel.coverPhoto ? [hotel.coverPhoto] : [])}
          hotelName={hotel.name}
          mapUrl={mapUrl}
        />

        {activeTab === 'description' && (
          <>
            <TabDescription hotel={hotel} />
            <div className={styles['hotel-booking-row']}>
              <a
                href={`/search/?hotelId=${hotel.id}`}
                className={styles['hotel-booking-btn']}
              >
                Забронировать от {formatPrice(hotel.price)} ₽
              </a>
            </div>
          </>
        )}

        {activeTab === 'rooms' && <TabRooms hotel={hotel} />}
        {activeTab === 'infra' && <TabInfra hotel={hotel} />}
        {activeTab === 'news' && (
          <p style={{ padding: '20px 0', color: '#777' }}>
            Акции и новости по этому отелю появятся позже.
          </p>
        )}
      </div>
    </div>
  )
}

export default HotelPage