import logo from '../../assets/images/onetouch_travel_logo.svg';
import geoPin from '../../assets/images/geo-pin.svg';
import lkuser from '../../assets/images/lk-user.svg';

function Header({ currencyBlock }) {
  return (
    <header className="topcontent-header-wrap">
      <div className="topcontent-header-inner">
        <div className="topcontent-header js-topcontent-menu-state" data-menu-state="closed">
          {/* Верхняя строка */}
          <div className="topcontent-header__top-row">
            {/* Логотип слева */}
            <a href="/" className="topcontent-header__logo">
              <img
                src={logo}
                width="68"
                height="58"
                alt="onetouch travel logo"
              />
            </a>
            <div className="topcontent-header-menu">
              {/* Страны */}
              <a href="/countries/" className="topcontent-header__nav-menu-link">
                <img
                  className="topcontent-header__location-img"
                  src={geoPin}
                  width="15"
                  height="15"
                  alt="Выбор страны"
                />
                Страны
              </a>

              {/* Основное меню */}
              <nav className="topcontent-header__nav-center">
                <ul className="topcontent-header__nav-menu">
                  <li className="topcontent-header__nav-menu-item">
                    <div className="topcontent-header__nav-menu-link topcontent-header__nav-menu-link_icon">
                      Агентствам
                    </div>
                    <ul className="topcontent-header__nav-submenu">
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/articles/o-kompanii/">
                          О компании
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/articles/sotrudnichestvo">
                          Сотрудничество
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/articles/sposoby-i-usloviya-oplaty/">
                          Способы и условия оплаты
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/articles/strakhovanie-turistov/">
                          Страхование туристов
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/events">
                          Мероприятия
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/excursion-tours/">
                          Экскурсионные туры
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/visas/">
                          Визы
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/articles/voprosy-i-otvety">
                          Вопросы-ответы
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/mailing-list">
                          Подписаться на рассылку
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/articles/sluzhba-podderzhki">
                          Служба поддержки
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/articles/bonusnaya-programma-leto-osen-2025">
                          Бонусная программа
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/articles/informatsiya-po-usloviyam-finansovogo-obespecheniya-ooo-vantach-trevel">
                          Финансовые гарантии
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="topcontent-header__nav-menu-item">
                    <div className="topcontent-header__nav-menu-link topcontent-header__nav-menu-link_icon">
                      Туристам
                    </div>
                    <ul className="topcontent-header__nav-submenu">
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/articles/o-kompanii">
                          О компании
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/news">
                          Новости
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a
                          className="topcontent-header__nav-submenu-item-link"
                          href="https://tourism.gov.ru/reestry/reestr-turoperatorov/show.php?id=101340"
                        >
                          Фин.гарантии туроператора
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <span className="topcontent-header__nav-submenu-item-link topcontent-header__nav-submenu-item-link_disabled">
                          Отзывы
                        </span>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/useful-documents/tourists">
                          Полезные документы
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="/excursion-tours/">
                          Экскурсионные туры
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <span className="topcontent-header__nav-submenu-item-link topcontent-header__nav-submenu-item-link_disabled">
                          Награды
                        </span>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a className="topcontent-header__nav-submenu-item-link" href="#">
                          Помощь
                        </a>
                      </li>
                      <li className="topcontent-header__nav-submenu-item">
                        <a
                          className="topcontent-header__nav-submenu-item-link"
                          href="https://online.onetouch.travel/cl_refer_person"
                        >
                          Личный кабинет
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="topcontent-header__nav-menu-item">
                    <a className="topcontent-header__nav-menu-link" href="/contacts/">
                      Контакты
                    </a>
                  </li>
                </ul>
              </nav>
              <a href="tel:+74951202299" className="topcontent-header__nav-menu-link">
                <span>+7 495 120-22-99</span>
              </a>

              {/* Блок валют — теперь может быть заменён через проп */}
              {currencyBlock ? (
                currencyBlock
              ) : (
                <div className="topcontent-header__currencies">
                  <span className="topcontent-header__currencies-names">USD / EUR</span>
                  <div className="topcontent-header__nav-submenu topcontent-header__nav-submenu_currencies">
                    <div className="topcontent-header__currencies-inner">
                      <div className="topcontent-header__currencies-inner-header">USD</div>
                      <div className="topcontent-header__currencies-inner-header">EUR</div>
                      <div className="topcontent-header__currencies-inner-rate">84.44 ₽</div>
                      <div className="topcontent-header__currencies-inner-rate">97.25 ₽</div>
                    </div>
                    <div className="topcontent-header__currencies-date">06.11.2025</div>
                    <div className="topcontent-header__currencies-date">
                      <a href="/exchange-rates">Архив курсов</a>
                    </div>
                  </div>
                </div>
              )}

              {/* Личный кабинет */}
              <a
                target="_blank"
                href="/authorization/"
                className="topcontent-header__cabinet-link"
                rel="noopener noreferrer"
              >
                <img
                  className="topcontent-header__cabinet-img"
                  src={lkuser}
                  width="15"
                  height="16"
                  alt=""
                />
                Личный кабинет
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;