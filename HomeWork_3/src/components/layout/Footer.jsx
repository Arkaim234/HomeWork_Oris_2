import rutube from '../../assets/images/icon_rutube.svg'
import tg from '../../assets/images/ficon_tg.svg'
import vk from '../../assets/images/icon_vk.svg'
import youtube from '../../assets/images/ficon_yt.svg'
import coatofarms from '../../assets/images/coat_of_arms.svg'
import rst from '../../assets/images/rst.svg'

function Footer() {
    return (
        <>
            <div id="ot-search-results"></div>
            <footer className="footer-all-wrap">
                <div className="cmn-l-block-wrap cmn-l-block-wrap_nobg">
                    {/* Верхний блок с 4 колонками */}
                    <div className="footer-block-grid">
                        {/* О нас */}
                        <div className="footer-block__item">
                            <div className="footer-block__item-title">О нас</div>
                            <div className="footer-block__item-inner">
                                <a href="/articles/o-kompanii/" className="footer-block__item-link">О компании</a>
                                <a href="/articles/sotrudnichestvo" className="footer-block__item-link">Сотрудничество</a>
                                <span className="footer-block__item-link footer-block__item-link_disabled">Пресса и партнеры о нас</span>
                                <a href="/articles/politika-konfidentsialnosti" className="footer-block__item-link">Политика конфиденциальности</a>
                            </div>
                        </div>

                        {/* Сайт */}
                        <div className="footer-block__item">
                            <div className="footer-block__item-title">Сайт</div>
                            <div className="footer-block__item-inner">
                                <a href="/countries" className="footer-block__item-link">Страны</a>
                                <a href="/search/" className="footer-block__item-link">Туры</a>
                                <a href="/excursion-tours/" className="footer-block__item-link">Экскурсионные туры</a>
                                <a href="/search/#avia" className="footer-block__item-link">Авиабилеты</a>
                            </div>
                        </div>

                        {/* Информация */}
                        <div className="footer-block__item">
                            <div className="footer-block__item-title">Информация</div>
                            <div className="footer-block__item-inner">
                                <a href="/news" className="footer-block__item-link">Новости</a>
                                <a href="/articles/gde-kupit" className="footer-block__item-link">Где купить</a>
                                <a href="/mailing-list" className="footer-block__item-link">Подписаться на рассылку</a>
                                <a href="https://tourism.gov.ru/agents/?ysclid=m0peqe7ev7514195847" className="footer-block__item-link">Реестр турагентств</a>
                            </div>
                        </div>

                        {/* Связаться с нами */}
                        <div className="footer-block__item">
                            <div className="footer-block__item-title">Связаться с нами</div>
                            <div className="footer-block__item-inner">
                                <a href="/contacts" className="footer-block__item-link">Контакты</a>
                                <a href="tel:+74951202299" className="footer-block__item-link footer-contact__contact-phone">+7 495 120-22-99</a>
                                <a href="mailto:agency@onetouch.travel" className="footer-block__item-link footer-contact__contact-mail">agency@onetouch.travel</a>
                                <div className="footer-contact__social">
                                    <a className="footer-contact__social-link" target="_blank" href="https://t.me/onetouchtravel" rel="noopener noreferrer">
                                        <img className="footer-contact__social-icon" src={tg} width="26" height="26" alt="" />
                                    </a>
                                    <a className="footer-contact__social-link" target="_blank" href="https://vk.com/onetouchtravel" rel="noopener noreferrer">
                                        <img className="footer-contact__social-icon" src={vk} width="26" height="26" alt="" />
                                    </a>
                                    <a className="footer-contact__social-link" target="_blank" href="https://www.youtube.com/@onetouchtravel3467" rel="noopener noreferrer">
                                        <img className="footer-contact__social-icon" src={youtube} width="26" height="26" alt="" />
                                    </a>
                                    <a className="footer-contact__social-link" target="_blank" href="https://rutube.ru/channel/25126845/" rel="noopener noreferrer">
                                        <img className="footer-contact__social-icon" src={rutube} width="26" height="26" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Горизонтальная разделительная линия */}
                    <hr className="footer-divider" />

                    {/* Нижний серый блок с двумя строками */}
                    <div className="footer-subfooter">
                        {/* Верхняя строка */}
                        <div className="footer-subfooter-row">
                            <div className="footer-reestr-item">
                                <img className="footer-reestr-logo" src={coatofarms} width="32" height="32" alt="Герб России" />
                                <div className="footer-reestr-content">
                                    <div className="footer-reestr-title">Мы в реестре туроператоров!</div>
                                    <div className="footer-reestr-text">ООО «Вантач Трэвел»</div>
                                    <div className="footer-reestr-id">РТО 017160</div>
                                </div>
                            </div>
                            <div className="footer-offer-text">
                                Все материалы и цены, размещенные на сайте, носят справочный характер и не являются публичной офертой, определяемой положениями Статьи 437 (2) Гражданского кодекса Российской Федерации.
                            </div>
                        </div>

                        {/* Внутренняя разделительная "палка" */}
                        <hr className="footer-subdivider" />

                        {/* Нижняя строка */}
                        <div className="footer-subfooter-row">
                            <div className="footer-reestr-item">
                                <img className="footer-reestr-logo" src={rst} width="32" height="32" alt="РСТ" />
                                <div className="footer-reestr-content">
                                    <div className="footer-reestr-title">Российский Союз Туриндустрии</div>
                                    <div className="footer-reestr-text">ООО «Вантач Трэвел»</div>
                                    <div className="footer-reestr-id">РСТ 760</div>
                                </div>
                            </div>
                            <div className="footer-copyright-text">
                                © ООО "Вантач Трэвел" Любое использование либо копирование материалов или подборки материалов сайта, элементов дизайна и оформления допускается лишь с разрешения правообладателя и только со ссылкой на источник:
                                <a href="https://onetouch.travel/">https://onetouch.travel/</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;