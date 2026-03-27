import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initAuth } from '../js/authorization.js';
import styles from './AuthPage.module.scss';
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'

const classMap = {
  hidden: styles.hidden,
  'rate-up': styles['rate-up'],
  'rate-down': styles['rate-down'],
};

function AuthPage() {
  const navigate = useNavigate();

  const formRef = useRef(null);
  const loginRadioRef = useRef(null);
  const claimRadioRef = useRef(null);
  const loginCaptionRef = useRef(null);
  const passwordCaptionRef = useRef(null);
  const loginInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const forgotPasswordRef = useRef(null);
  const logonTypeRef = useRef(null);
  const notifyContainerRef = useRef(null);
  const loginBoxRef = useRef(null);

  useEffect(() => {
    const elements = {
      form: formRef.current,
      loginRadio: loginRadioRef.current,
      claimRadio: claimRadioRef.current,
      loginCaption: loginCaptionRef.current,
      passwordCaption: passwordCaptionRef.current,
      loginInput: loginInputRef.current,
      passwordInput: passwordInputRef.current,
      forgotPasswordLink: forgotPasswordRef.current,
      logonTypeField: logonTypeRef.current,
      notifyContainer: notifyContainerRef.current,
      loginBox: loginBoxRef.current,
    };
    const cleanup = initAuth(elements, navigate, classMap);
    return cleanup;
  }, [navigate]);


  // Блок валют для страницы логина (таблица с курсами)
  const loginCurrencyBlock = (
    <div className={styles['currency-header']}>
      <table className={`${styles.currency} ${styles.res} ${styles.panel}`}>
        <thead>
          <tr>
            <th className={styles.first}>Дата</th>
            <th data-currency='{"currency":3,"base":1}' className={`${styles.rate} ${styles.symbol}`}>€</th>
            <th data-currency='{"currency":2,"base":1}' className={`${styles.rate} ${styles.symbol}`}>$</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.date}>11.11.2025</td>
            <td className={styles.rate}>
              97.6858 <span className={styles['rate-up']} title="0.0958"></span>
            </td>
            <td className={styles.rate}>
              84.2537 <span className={styles['rate-down']} title="-0.221"></span>
            </td>
          </tr>
          <tr>
            <td className={styles.date}>12.11.2025</td>
            <td className={styles.rate}>
              97.9632 <span className={styles['rate-up']} title="0.2774"></span>
            </td>
            <td className={styles.rate}>
              84.6104 <span className={styles['rate-up']} title="0.3567"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );


  return (
    <>
      <div id="header">
        <Header currencyBlock={loginCurrencyBlock} />

        <div className={styles['bottom-menu']}>
          <div className={styles.menu}>
            <nav className={styles.nav}>
              <ul className={styles['nav-center']}>
                <li>
                  <a className={styles['menu-caret']} href="#">Поиск</a>
                  <ul>
                    <li className={`${styles['menu-search_tour']} ${styles.oc5}`}><a href="#">Поиск тура</a></li>
                    <li className={`${styles['menu-search_hotel']} ${styles.oc7}`}><a href="#">Отели</a></li>
                    <li className={`${styles['menu-cl_wizard']} ${styles.oc32}`}><a href="#">Конструктор</a></li>
                    <li className={`${styles['menu-tickets']} ${styles.oc101}`}><a href="#">Билеты</a></li>
                    <li className={`${styles['menu-insures']} ${styles.oc107}`}><a href="#">Страхование</a></li>
                  </ul>
                </li>
                <li className={styles.selected}>
                  <a className={styles['menu-caret']} href="#">Туристам</a>
                  <ul>
                    <li className={`${styles['menu-sale']} ${styles.oc31}`}><a href="#">Где купить</a></li>
                    <li className={`${styles.auth} ${styles['menu-cl_refer_person']} ${styles.selected} ${styles.oc62}`}><a href="#">Просмотр заявок</a></li>
                    <li className={`${styles['menu-agencies']} ${styles.oc100}`}><a href="#">Проверка партнера</a></li>
                  </ul>
                </li>
                <li>
                  <a className={styles['menu-caret']} href="#">Заявки</a>
                  <ul>
                    <li className={`${styles.auth} ${styles['menu-cl_refer']} ${styles.oc16}`}><a href="#">Просмотр заявок</a></li>
                    <li className={`${styles.auth} ${styles['menu-claim_unpaid']} ${styles.oc40}`}><a href="#">Неоплаченные заявки</a></li>
                  </ul>
                </li>
                <li>
                  <a className={styles['menu-caret']} href="#">Агентство</a>
                  <ul>
                    <li className={`${styles.auth} ${styles['menu-edit_agency']} ${styles.oc22}`}><a href="#">Данные агентства</a></li>
                    <li className={`${styles.auth} ${styles['menu-rating_position']} ${styles.oc23}`}><a href="#">Рейтинги агентства</a></li>
                    <li className={`${styles.auth} ${styles['menu-warrant']} ${styles.oc37}`}><a href="#">Доверенности</a></li>
                    <li className={`${styles.auth} ${styles['menu-agreement']} ${styles.oc39}`}><a href="#">Печать договора</a></li>
                    <li className={`${styles.auth} ${styles['menu-bonus_manager']} ${styles.oc99}`}><a href="#">Бонусы менеджеров</a></li>
                    <li className={`${styles.auth} ${styles['menu-employees']} ${styles.oc134}`}><a href="#">Сотрудники</a></li>
                  </ul>
                </li>
                <li>
                  <a className={styles['menu-caret']} href="#">Информация</a>
                  <ul>
                    <li className={`${styles['menu-hotel_stopsale']} ${styles.oc9}`}><a href="#">Остановки продаж в гостиницах</a></li>
                    <li className={`${styles['menu-freight_monitor']} ${styles.oc10}`}><a href="#">Места на рейсах</a></li>
                    <li className={`${styles['menu-freight_time']} ${styles.oc11}`}><a href="#">Расписание рейсов</a></li>
                    <li className={`${styles['menu-hotels']} ${styles.oc28}`}><a href="#">Каталог отелей</a></li>
                    <li className={`${styles['menu-schedule_doc']} ${styles.oc29}`}><a href="#">График выдачи документов</a></li>
                    <li className={`${styles['menu-freight_changes']} ${styles.oc74}`}><a href="#">Изменения в расписании рейсов</a></li>
                  </ul>
                </li>
                <li>
                  <a className={styles['menu-caret']} href="#">Регистрация</a>
                  <ul>
                    <li className={`${styles['menu-registration']} ${styles.oc21}`}><a href="#">Новый пользователь</a></li>
                    <li className={`${styles['menu-register_agency']} ${styles.oc36}`}><a href="#">Новое агентство</a></li>
                  </ul>
                </li>
                <li className={`${styles['sign-in']} ${styles.auth}`}>
                  <a className={styles['login-action']} href="/autorization.html">Вход</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Основной блок авторизации */}
      <div className={`${styles.samo_container} ${styles['cl_refer_person']}`} ref={loginBoxRef} data-csrf-token="e6c9d3231fda059d74383846eef24031">
        <div className={styles.eraser}></div>
        <div className={styles['outdated-browser-alert-block']}>
          <div className={styles['outdated-browser-alert']}>
            <strong>Your web browser is out of date.</strong> Please, update your browser.
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles['logon-wrapper']}>
            <div className={styles.header}>
              <div className={`${styles.legend} ${styles.panel} ${styles.person}`}></div>
            </div>
            <div className={styles.panel} id="loginbox" data-orig-url="/cl_refer_person">
              <div className={styles.choose}>
                <span className={styles.legend}>Вход</span>
              </div>
              <div className={styles.fixer}></div>

              <form ref={formRef} method="post" id="loginForm" target="_self" data-modal-logon="">
                <div className={styles.choose}>
                  <div>
                    <input
                      type="radio"
                      id="login_radio"
                      name="login_type"
                      value="login"
                      defaultChecked
                      ref={loginRadioRef}
                    />
                    <label htmlFor="login_radio">Сотрудникам</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="claim_radio"
                      name="login_type"
                      value="claim"
                      ref={claimRadioRef}
                    />
                    <label htmlFor="claim_radio">Туристам</label>
                  </div>
                </div>

                <input type="hidden" name="samo_action" value="logon" />
                <input type="hidden" name="logon_type" id="logon_type" value="login" ref={logonTypeRef} />
                <input type="hidden" name="logon_key" id="logon_key" value="8b693726e55d238d2bb5b41d0225b757" />

                <div className={styles.row}>
                  <label htmlFor="login">
                    <span
                      ref={loginCaptionRef}
                      id="login_caption"
                      data-claim-caption="Номер заявки"
                      data-login-caption="E-mail/номер телефона/Логин"
                    >
                      E-mail/номер телефона
                    </span>
                    <input
                      ref={loginInputRef}
                      id="login"
                      type="text"
                      name="login"
                      autoComplete="username"
                      maxLength="64"
                    />
                  </label>
                </div>

                <div className={styles.fixer}></div>

                <div className={styles.row}>
                  <label htmlFor="password">
                    <span
                      ref={passwordCaptionRef}
                      id="password_caption"
                      data-claim-pswd-caption="Номер паспорта/дата рождения туриста"
                      data-login-pswd-caption="Пароль"
                    >
                      Пароль
                    </span>
                    <input
                      ref={passwordInputRef}
                      id="password"
                      autoComplete="current-password"
                      type="password"
                      name="password"
                    />
                  </label>
                </div>

                <div className={styles.fixer}></div>

                <div className={styles.row}>
                  <a
                    ref={forgotPasswordRef}
                    id="forgot_password"
                    tabIndex="-1"
                    className={styles.forgot}
                    href="https://online.onetouch.travel/profile_person?samo_action=recovery_password"
                  >
                    Забыли пароль?
                  </a>
                  <button className={styles.button} type="submit">Войти</button>
                </div>

                <div className={styles.fixer}></div>
              </form>
            </div>
          </div>
        </div>

        <br />
        <div ref={notifyContainerRef} id="notify-container" style={{ top: 20 }}></div>
      </div>

      <div id={styles['samo-circle-preloader']}>
        <div id={styles['samo-circle']}><strong></strong></div>
      </div>

      <Footer />
    </>
  );
}

export default AuthPage;