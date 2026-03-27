import { useRef, useEffect } from 'react'
import { initSearch } from '../../js/searcher'
import { initFilters } from '../../js/filters'
import styles from './SearchBar.module.scss'

import SearchTabsNav from './SearchTabsNav'
import CityModal from './CityModal'
import CountryModal from './CountryModal'
import NightsModal from './NightsModal'
import TouristsModal from './TouristsModal'
import DatePicker from '../calendar/DatePicker'

import FilterPanel from '../filters/FilterPanel'
import FilterToggle from '../filters/FilterToggle'
import FilterCheckboxList from '../filters/FilterCheckboxList'
import filterStyles from '../filters/Filters.module.scss'

const classMap = {
  modal:            styles.modal,
  open:             styles.open,
  modalList:        styles.modalList,
  modalItem:        styles.modalItem,
  modalEmpty:       styles.modalEmpty,
  modalRow:         styles.modalRow,
  modalLabel:       styles.modalLabel,
  modalSpinner:     styles.modalSpinner,
  modalValue:       styles.modalValue,
  modalArrows:      styles.modalArrows,
  arrow:            styles.arrow,
  touristsRow:      styles.touristsRow,
  touristsLabel:    styles.touristsLabel,
  touristsControls: styles.touristsControls,
  touristsCount:    styles.touristsCount,
  circleBtn:        styles.circleBtn,
}

const filterClassMap = {
  open:         filterStyles.open,
  filterSearch: filterStyles.filterSearch,
}

function SearchBar() {
  const formRef          = useRef(null)
  const fromInputRef     = useRef(null)
  const toInputRef       = useRef(null)
  const dateButtonRef    = useRef(null)
  const nightsInputRef   = useRef(null)
  const touristsInputRef = useRef(null)
  const modalCityRef     = useRef(null)
  const modalCountryRef  = useRef(null)
  const modalNightsRef   = useRef(null)
  const modalTouristsRef = useRef(null)
  const resultsRef       = useRef(null)

  const filtersExtraRef  = useRef(null)
  const toggleTextRef    = useRef(null)
  const cityListRef      = useRef(null)
  const typeListRef      = useRef(null)
  const hotelsListRef    = useRef(null)
  const mealListRef      = useRef(null)

  useEffect(() => {
    const cleanup = initSearch({
      form:             formRef.current,
      fromInput:        fromInputRef.current,
      toInput:          toInputRef.current,
      dateButton:       dateButtonRef.current,
      nightsInput:      nightsInputRef.current,
      touristsInput:    touristsInputRef.current,
      modalCity:        modalCityRef.current,
      modalCountry:     modalCountryRef.current,
      modalNights:      modalNightsRef.current,
      modalTourists:    modalTouristsRef.current,
      cityList:         cityListRef.current,
      typeList:         typeListRef.current,
      hotelsList:       hotelsListRef.current,
      mealList:         mealListRef.current,
      resultsContainer: resultsRef.current,
    }, classMap)
    return cleanup
  }, [])

  useEffect(() => {
    const cleanup = initFilters({
      filtersExtra: filtersExtraRef.current,
      toggleText:   toggleTextRef.current,
      cityList:     cityListRef.current,
      typeList:     typeListRef.current,
      hotelsList:   hotelsListRef.current,
      mealList:     mealListRef.current,
      toInput:      toInputRef.current,
    }, filterClassMap)
    return cleanup
  }, [])

  // НЕТ внешнего div.wrap — SearchLayout уже даёт cmn-l-block-wrap
  return (
    <>
      <SearchTabsNav />

      <div className={styles.tabsContent}>
        {/* Только поля формы внутри <form> */}
        <form className={styles.form} ref={formRef}>
          <CityModal ref={fromInputRef} />
          <CountryModal ref={toInputRef} />
          <DatePicker ref={dateButtonRef} />
          <NightsModal ref={nightsInputRef} />
          <TouristsModal ref={touristsInputRef} />

          <div className={styles.submit}>
            <input type="submit" className={styles.submitButton} value="Найти" />
          </div>

          {/* Контейнеры модалок — JS заполняет их сам */}
          <div className={styles.modal} ref={modalCityRef}></div>
          <div className={styles.modal} ref={modalCountryRef}></div>
          <div className={`${styles.modal} ${styles.nightsModal}`} ref={modalNightsRef}></div>
          <div className={`${styles.modal} ${styles.touristsModal}`} ref={modalTouristsRef}></div>
        </form>

        {/* FilterToggle и FilterPanel — СНАРУЖИ формы */}
        <FilterToggle ref={toggleTextRef}>
          Показать дополнительные поля
        </FilterToggle>

        <FilterPanel ref={filtersExtraRef}>
          <FilterCheckboxList
            title="Город"
            listRef={cityListRef}
            searchPlaceholder="Поиск по городам"
          />
          <FilterCheckboxList
            title="Категория"
            listRef={typeListRef}
          />
          <FilterCheckboxList
            title="Отели"
            listRef={hotelsListRef}
            searchPlaceholder="Поиск по отелям"
          />
          <FilterCheckboxList
            title="Питание"
            listRef={mealListRef}
          />
        </FilterPanel>
      </div>

      <div className={styles.results} ref={resultsRef}></div>

      {/* Шаблон карточки тура — JS-рендерер берёт его через document.getElementById */}
      <script type="text/x-template" id="tour-card-template" dangerouslySetInnerHTML={{ __html: `
        <div class="tour-card">
          <div class="tour-card__inner">
            <div class="tour-card__left">
              <a class="tour-card__image-link" href="{{HotelUrl}}">
                <img class="tour-card__image" src="{{PhotoUrl}}" alt="{{HotelName}}">
              </a>
            </div>
            <div class="tour-card__center">
              <div class="tour-card__top-row">
                <div class="tour-card__stars">{{StarsHtml}}</div>
                <a class="tour-card__name" href="{{HotelUrl}}">{{HotelName}}</a>
              </div>
              <div class="tour-card__location">{{CityName}}</div>
              <div class="tour-card__info-row">
                <div class="tour-card__info-item">Заезд: {{CheckInDate}}</div>
                <div class="tour-card__info-item">Ночей: {{Nights}}</div>
              </div>
              <div class="tour-card__info-row">
                <div class="tour-card__info-item">Питание: {{MealPlan}}</div>
              </div>
            </div>
            <div class="tour-card__right">
              <div class="tour-card__price">{{Price}} ₽</div>
              <a class="tour-card__more" href="{{HotelUrl}}">Подробнее</a>
            </div>
          </div>
        </div>
      `}} />
    </>
  )
}

export default SearchBar