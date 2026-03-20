import SearchLayout from '../containers/SearchLayout'
import CountryNav from '../components/country/CountryNav'
import CountryTabs from '../components/country/CountryTabs'
import CountryInfo from '../components/country/CountryInfo'
import Gallery from '../components/gallery/Gallery'

function MainPage() {
  return (
    <>
      <div className="cmn-l-breadcrumbs">
        <div className="cmn-l-breadcrumbs__items">
          <a className="cmn-l-breadcrumbs__item" href="/">Главная</a> »
          <a className="cmn-l-breadcrumbs__item" href="/countries/">Страны</a> »
          <span className="cmn-l-breadcrumbs__item">Турция</span>
        </div>
      </div>

      <div className="cmn-l-block-wrap">
        <CountryNav />
      </div>

      <div className="cmn-l-block-wrap">
        <h2 className="cmn-l-block-title">Турция</h2>
        <CountryTabs />
        <Gallery />
      </div>

      {/* Сначала текст о стране, потом поиск над футером */}
      <div className="cmn-l-block-wrap">
        <CountryInfo />
      </div>

      <SearchLayout />
    </>
  )
}

export default MainPage