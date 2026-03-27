import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../configs/routes'

function CountryTabs() {
  return (
    <div className="pages-main-nav">
      <NavLink
        to={ROUTES.HOME}
        className={({ isActive }) =>
          `pages-main-nav__item ${isActive ? 'pages-main-nav__item_active' : ''}`
        }
      >
        О стране
      </NavLink>
      <NavLink
        to={ROUTES.EXCURSIONS}
        className={({ isActive }) =>
          `pages-main-nav__item ${isActive ? 'pages-main-nav__item_active' : ''}`
        }
      >
        Экскурсионные туры
      </NavLink>
      <NavLink
        to={ROUTES.IMPORTANT}
        className={({ isActive }) =>
          `pages-main-nav__item ${isActive ? 'pages-main-nav__item_active' : ''}`
        }
      >
        Важная информация
      </NavLink>
      <NavLink
        to={ROUTES.HOTELS}
        className={({ isActive }) =>
          `pages-main-nav__item ${isActive ? 'pages-main-nav__item_active' : ''}`
        }
      >
        Отели
      </NavLink>
    </div>
  )
}

export default CountryTabs