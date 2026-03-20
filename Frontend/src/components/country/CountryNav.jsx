import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../configs/routes'

function CountryNav() {
  return (
    <div className="countries-top-nav">
      <NavLink
        to={ROUTES.SEARCH}
        className={({ isActive }) =>
          `countries-top-nav__item ${isActive ? 'countries-top-nav__item_active' : ''}`
        }
      >
        Поиск тура
      </NavLink>
      <span className="countries-top-nav__item">Страны</span>
      <NavLink
        to={ROUTES.PROMOTIONS}
        className={({ isActive }) =>
          `countries-top-nav__item ${isActive ? 'countries-top-nav__item_active' : ''}`
        }
      >
        Акции
      </NavLink>
      <NavLink
        to={ROUTES.EVENTS}
        className={({ isActive }) =>
          `countries-top-nav__item ${isActive ? 'countries-top-nav__item_active' : ''}`
        }
      >
        Мероприятия
      </NavLink>
      <NavLink
        to={ROUTES.HOME}
        className={({ isActive }) =>
          `countries-top-nav__item ${isActive ? 'countries-top-nav__item_active' : ''}`
        }
      >
        Информация
      </NavLink>
      <NavLink
        to={ROUTES.DOCUMENTS}
        className={({ isActive }) =>
          `countries-top-nav__item ${isActive ? 'countries-top-nav__item_active' : ''}`
        }
      >
        Документы
      </NavLink>
    </div>
  )
}

export default CountryNav