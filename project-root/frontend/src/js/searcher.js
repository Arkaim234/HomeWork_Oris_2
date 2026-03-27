export function initSearch(elements, classMap) {
  const {
    form,
    fromInput,
    toInput,
    dateButton,
    nightsInput,
    touristsInput,
    modalCity,
    modalCountry,
    modalNights,
    modalTourists,
    cityList,
    typeList,
    hotelsList,
    mealList,
    resultsContainer,
  } = elements

  async function loadJson(url) {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${url}`)
    }

    return response.json()
  }

  function getInputValue(el) {
    if (!el) return ''
    if ('value' in el && typeof el.value === 'string') return el.value.trim()
    return (el.textContent || '').trim()
  }

  function setInputValue(el, value) {
    if (!el) return
    if ('value' in el) {
      el.value = value
      return
    }
    el.textContent = value
  }

  function showModal(modal, trigger) {
    if (!modal || !trigger) return

    document.querySelectorAll(`.${classMap.modal}.${classMap.open}`).forEach((m) => {
      m.classList.remove(classMap.open)
      if (m._triggerWrap) {
        m._triggerWrap.removeAttribute('data-modal-open')
      }
    })

    modal._trigger = trigger
    modal._triggerWrap = trigger.parentElement

    if (modal._triggerWrap) {
      modal._triggerWrap.setAttribute('data-modal-open', 'true')
    }

    const rect = trigger.getBoundingClientRect()
    modal.style.top = `${rect.bottom + window.scrollY}px`
    modal.style.left = `${rect.left + window.scrollX}px`
    modal.classList.add(classMap.open)
  }

  function handleDocumentClick(e) {
    const openModals = document.querySelectorAll(`.${classMap.modal}.${classMap.open}`)

    openModals.forEach((modal) => {
      const trigger = modal._trigger
      const clickInside = modal.contains(e.target)
      const clickOnTrigger = trigger && (trigger === e.target || trigger.contains(e.target))

      if (!clickInside && !clickOnTrigger) {
        modal.classList.remove(classMap.open)
        if (modal._triggerWrap) {
          modal._triggerWrap.removeAttribute('data-modal-open')
        }
      }
    })
  }

  function filterModalList(modal, searchValue) {
    const listWrap = modal.querySelector(`.${classMap.modalList}`)
    if (!listWrap) return

    const items = listWrap.querySelectorAll(`.${classMap.modalItem}`)
    const q = String(searchValue || '').trim().toLowerCase()
    let visibleCount = 0

    items.forEach((item) => {
      const text = item.textContent.toLowerCase()
      const match = !q || text.includes(q)
      item.style.display = match ? 'block' : 'none'
      if (match) visibleCount += 1
    })

    let emptyEl = listWrap.querySelector(`.${classMap.modalEmpty}`)

    if (!emptyEl) {
      emptyEl = document.createElement('div')
      emptyEl.className = classMap.modalEmpty
      emptyEl.textContent = 'Ничего не найдено'
      listWrap.appendChild(emptyEl)
    }

    emptyEl.style.display = visibleCount === 0 ? 'block' : 'none'
  }

  function initCityModal() {
    if (!modalCity || !fromInput) return

    if (!fromInput.dataset.lastValue && getInputValue(fromInput)) {
      fromInput.dataset.lastValue = getInputValue(fromInput)
      if (fromInput.dataset.value) {
        fromInput.dataset.lastId = fromInput.dataset.value
      }
    }

    const handleInput = () => {
      filterModalList(modalCity, getInputValue(fromInput))
    }

    const handleBlur = () => {
      const current = getInputValue(fromInput).toLowerCase()
      const listWrap = modalCity.querySelector(`.${classMap.modalList}`)
      let matchedItem = null

      if (listWrap) {
        listWrap.querySelectorAll(`.${classMap.modalItem}`).forEach((item) => {
          if (item.textContent.trim().toLowerCase() === current) {
            matchedItem = item
          }
        })
      }

      if (matchedItem) {
        setInputValue(fromInput, matchedItem.textContent.trim())
        fromInput.dataset.value = matchedItem.dataset.id
        fromInput.dataset.lastValue = getInputValue(fromInput)
        fromInput.dataset.lastId = matchedItem.dataset.id
      } else if (fromInput.dataset.lastValue) {
        setInputValue(fromInput, fromInput.dataset.lastValue)
        if (fromInput.dataset.lastId) {
          fromInput.dataset.value = fromInput.dataset.lastId
        } else {
          delete fromInput.dataset.value
        }
      }
    }

    const handleClick = async () => {
      try {
        const cities = await loadJson('/api/cities.json')
        const russianCities = cities.filter((city) => String(city.countryId) === '1')

        modalCity.innerHTML = `
          <div class="${classMap.modalList}">
            ${russianCities
              .map(
                (city) =>
                  `<div class="${classMap.modalItem}" data-id="${city.id}">${city.name}</div>`
              )
              .join('')}
          </div>
        `

        showModal(modalCity, fromInput)

        modalCity.querySelectorAll(`.${classMap.modalItem}`).forEach((item) => {
          item.addEventListener('click', () => {
            setInputValue(fromInput, item.textContent.trim())
            fromInput.dataset.value = item.dataset.id
            fromInput.dataset.lastValue = getInputValue(fromInput)
            fromInput.dataset.lastId = item.dataset.id
            modalCity.classList.remove(classMap.open)
          })
        })
      } catch (err) {
        console.error('Ошибка загрузки городов вылета:', err)
      }
    }

    fromInput.addEventListener('input', handleInput)
    fromInput.addEventListener('blur', handleBlur)
    fromInput.addEventListener('click', handleClick)

    return () => {
      fromInput.removeEventListener('input', handleInput)
      fromInput.removeEventListener('blur', handleBlur)
      fromInput.removeEventListener('click', handleClick)
    }
  }

  function initCountryModal() {
    if (!modalCountry || !toInput) return

    if (!toInput.dataset.lastValue && getInputValue(toInput)) {
      toInput.dataset.lastValue = getInputValue(toInput)
      if (toInput.dataset.value) {
        toInput.dataset.lastId = toInput.dataset.value
      }
    }

    const handleInput = () => {
      filterModalList(modalCountry, getInputValue(toInput))
    }

    const handleBlur = () => {
      const current = getInputValue(toInput).toLowerCase()
      const listWrap = modalCountry.querySelector(`.${classMap.modalList}`)
      let matchedItem = null

      if (listWrap) {
        listWrap.querySelectorAll(`.${classMap.modalItem}`).forEach((item) => {
          if (item.textContent.trim().toLowerCase() === current) {
            matchedItem = item
          }
        })
      }

      if (matchedItem) {
        setInputValue(toInput, matchedItem.textContent.trim())
        toInput.dataset.value = matchedItem.dataset.id
        toInput.dataset.lastValue = getInputValue(toInput)
        toInput.dataset.lastId = matchedItem.dataset.id
      } else if (toInput.dataset.lastValue) {
        setInputValue(toInput, toInput.dataset.lastValue)
        if (toInput.dataset.lastId) {
          toInput.dataset.value = toInput.dataset.lastId
        } else {
          delete toInput.dataset.value
        }
      }
    }

    const handleClick = async () => {
      try {
        const countries = await loadJson('/api/countries.json')

        modalCountry.innerHTML = `
          <div class="${classMap.modalList}">
            ${countries
              .filter((country) => country.id !== 1)
              .map(
                (country) =>
                  `<div class="${classMap.modalItem}" data-id="${country.id}">${country.name}</div>`
              )
              .join('')}
          </div>
        `

        showModal(modalCountry, toInput)

        modalCountry.querySelectorAll(`.${classMap.modalItem}`).forEach((item) => {
          item.addEventListener('click', async () => {
            const countryId = item.dataset.id

            setInputValue(toInput, item.textContent.trim())
            toInput.dataset.value = countryId
            toInput.dataset.lastValue = getInputValue(toInput)
            toInput.dataset.lastId = countryId
            modalCountry.classList.remove(classMap.open)

            if (cityList) {
              try {
                const cities = await loadJson('/api/cities.json')
                const filteredCities = cities.filter(
                  (city) => String(city.countryId) === String(countryId)
                )

                cityList.innerHTML = filteredCities
                  .map(
                    (city) => `
                      <label>
                        <input type="checkbox" name="city" value="${city.id}">
                        ${city.name}
                      </label>
                    `
                  )
                  .join('')
              } catch (error) {
                console.error('Ошибка обновления городов фильтра:', error)
              }
            }
          })
        })
      } catch (err) {
        console.error('Ошибка загрузки стран:', err)
      }
    }

    toInput.addEventListener('input', handleInput)
    toInput.addEventListener('blur', handleBlur)
    toInput.addEventListener('click', handleClick)

    return () => {
      toInput.removeEventListener('input', handleInput)
      toInput.removeEventListener('blur', handleBlur)
      toInput.removeEventListener('click', handleClick)
    }
  }

  function initNightsModal() {
    if (!modalNights || !nightsInput) return

    const handleClick = () => {
      let from = 6
      let to = 9

      const match = getInputValue(nightsInput).match(/(\d+)\s*-\s*(\d+)/)

      if (match) {
        from = parseInt(match[1], 10)
        to = parseInt(match[2], 10)
      }

      modalNights.innerHTML = `
        <div class="${classMap.modalRow}">
          <div class="${classMap.modalLabel}">Ночей от</div>
          <div class="${classMap.modalSpinner}">
            <span class="${classMap.modalValue}" id="nightsFromValue">${from}</span>
            <div class="${classMap.modalArrows}">
              <button type="button" class="${classMap.arrow} up" data-target="from">▲</button>
              <button type="button" class="${classMap.arrow} down" data-target="from">▼</button>
            </div>
          </div>
        </div>
        <div class="${classMap.modalRow}">
          <div class="${classMap.modalLabel}">Ночей до</div>
          <div class="${classMap.modalSpinner}">
            <span class="${classMap.modalValue}" id="nightsToValue">${to}</span>
            <div class="${classMap.modalArrows}">
              <button type="button" class="${classMap.arrow} up" data-target="to">▲</button>
              <button type="button" class="${classMap.arrow} down" data-target="to">▼</button>
            </div>
          </div>
        </div>
      `

      showModal(modalNights, nightsInput)

      const state = { from, to }

      const syncView = () => {
        modalNights.querySelector('#nightsFromValue').textContent = state.from
        modalNights.querySelector('#nightsToValue').textContent = state.to
        setInputValue(nightsInput, `${state.from} - ${state.to}`)
      }

      modalNights.querySelectorAll(`.${classMap.arrow}`).forEach((btn) => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.target
          const dir = btn.classList.contains('up') ? 1 : -1

          if (target === 'from') {
            state.from = Math.max(1, state.from + dir)
            if (state.from > state.to) {
              state.to = state.from
            }
          } else {
            state.to = Math.max(state.from, state.to + dir)
          }

          syncView()
        })
      })
    }

    nightsInput.addEventListener('click', handleClick)
    return () => nightsInput.removeEventListener('click', handleClick)
  }

  function initTouristsModal() {
    if (!modalTourists || !touristsInput) return

    const handleClick = () => {
      modalTourists.innerHTML = `
        <div class="${classMap.touristsRow}">
          <div class="${classMap.touristsLabel}">Взрослые</div>
          <div class="${classMap.touristsControls}">
            <button type="button" class="${classMap.circleBtn} minusA">−</button>
            <span class="${classMap.touristsCount} countA">1</span>
            <button type="button" class="${classMap.circleBtn} plusA">+</button>
          </div>
        </div>
        <div class="${classMap.touristsRow}">
          <div class="${classMap.touristsLabel}">Дети</div>
          <div class="${classMap.touristsControls}">
            <button type="button" class="${classMap.circleBtn} minusC">−</button>
            <span class="${classMap.touristsCount} countC">0</span>
            <button type="button" class="${classMap.circleBtn} plusC">+</button>
          </div>
        </div>
      `

      showModal(modalTourists, touristsInput)

      const adultsSpan = modalTourists.querySelector('.countA')
      const childsSpan = modalTourists.querySelector('.countC')

      const updateText = () => {
        setInputValue(
          touristsInput,
          `${adultsSpan.textContent} взр. / ${childsSpan.textContent} реб.`
        )
      }

      modalTourists.querySelector('.plusA').addEventListener('click', () => {
        adultsSpan.textContent = Number(adultsSpan.textContent) + 1
        updateText()
      })

      modalTourists.querySelector('.minusA').addEventListener('click', () => {
        adultsSpan.textContent = Math.max(1, Number(adultsSpan.textContent) - 1)
        updateText()
      })

      modalTourists.querySelector('.plusC').addEventListener('click', () => {
        childsSpan.textContent = Number(childsSpan.textContent) + 1
        updateText()
      })

      modalTourists.querySelector('.minusC').addEventListener('click', () => {
        childsSpan.textContent = Math.max(0, Number(childsSpan.textContent) - 1)
        updateText()
      })

      updateText()
    }

    touristsInput.addEventListener('click', handleClick)
    return () => touristsInput.removeEventListener('click', handleClick)
  }

  function cutPageToSearchbar() {
    const searchWrap = form.closest('.js-ot-msf')

    if (searchWrap) {
      let prev = searchWrap.previousElementSibling
      while (prev) {
        prev.style.display = 'none'
        prev = prev.previousElementSibling
      }
    }

    const banner = document.querySelector('.page-top-banner')
    if (banner) {
      banner.style.display = 'none'
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function escapeHtml(str) {
    if (!str) return ''
    return String(str).replace(/[&<>"']/g, (ch) => {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      }[ch]
    })
  }

  function formatPrice(value) {
    if (value == null) return ''
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  function renderTemplate(template, data) {
    return template.replace(/{{(\w+)}}/g, (match, key) => {
      if (data[key] == null) return ''
      return escapeHtml(String(data[key]))
    })
  }

  function showResults(list) {
    const container = resultsContainer
    if (!container) return

    const tplEl = document.getElementById('tour-card-template')
    if (!tplEl) {
      console.warn('Не найден шаблон #tour-card-template')
      return
    }

    const templateHtml = tplEl.innerHTML.trim()

    container.innerHTML = ''

    if (!Array.isArray(list) || list.length === 0) {
      container.innerHTML = '<p>По вашему запросу ничего не найдено.</p>'
      return
    }

    const title = document.createElement('h2')
    title.textContent = `Найдено туров: ${list.length}`
    container.appendChild(title)

    let checkInText = ''
    let nightsText = ''

    if (dateButton) {
      const text = getInputValue(dateButton)
      const match = text.match(/(\d{2}\.\d{2}\.\d{2})/)
      if (match) {
        checkInText = match[1]
      }
    }

    if (nightsInput) {
      nightsText = getInputValue(nightsInput)
    }

    list.forEach((hotel) => {
      const meal =
        Array.isArray(hotel.mealPlans) && hotel.mealPlans.length
          ? hotel.mealPlans[0].code || hotel.mealPlans[0]
          : hotel.mealPlanCode || ''

      const dataForTemplate = {
        HotelUrl: `/hotels/${hotel.slug}/`,
        PhotoUrl: hotel.coverPhoto || hotel.photos?.[0] || '',
        HotelName: hotel.name || '',
        StarsHtml: '',
        CityName: hotel.city || '',
        CheckInDate: checkInText,
        Nights: nightsText,
        MealPlan: meal,
        Price: formatPrice(hotel.price),
      }

      const html = renderTemplate(templateHtml, dataForTemplate)
      const wrapper = document.createElement('div')
      wrapper.innerHTML = html
      const card = wrapper.firstElementChild

      if (card) {
        container.appendChild(card)
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await fetch('/api/tours.json')

      console.log('tours response status:', response.status)

      if (!response.ok) {
        throw new Error('Не удалось загрузить /api/tours.json')
      }

      const tours = await response.json()

      console.log('tours loaded:', tours)

      const selectedCategories = typeList
        ? Array.from(typeList.querySelectorAll('input:checked')).map((i) => i.value)
        : []

      const selectedHotels = hotelsList
        ? Array.from(hotelsList.querySelectorAll('input:checked')).map((i) => i.value)
        : []

      const selectedMeals = mealList
        ? Array.from(mealList.querySelectorAll('input:checked')).map((i) => i.value)
        : []

      console.log('selectedCategories:', selectedCategories)
      console.log('selectedHotels:', selectedHotels)
      console.log('selectedMeals:', selectedMeals)

      const filtered = tours.filter((hotel) => {
        const matchCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(hotel.category)

        const matchHotel =
          selectedHotels.length === 0 ||
          selectedHotels.includes(String(hotel.slug || hotel.id))

        const hotelMealCodes = Array.isArray(hotel.mealPlans)
          ? hotel.mealPlans.map((meal) =>
              typeof meal === 'string' ? meal : meal.code
            )
          : hotel.mealPlanCode
            ? [hotel.mealPlanCode]
            : []

        const matchMeal =
          selectedMeals.length === 0 ||
          hotelMealCodes.some((code) => selectedMeals.includes(code))

        return matchCategory && matchHotel && matchMeal
      })

      console.log('filtered tours:', filtered)

      showResults(filtered)
      cutPageToSearchbar()
    } catch (error) {
      console.error('Ошибка поиска туров:', error)
      showResults([])
    }
  }

  form.addEventListener('submit', handleSubmit)
  document.addEventListener('click', handleDocumentClick)

  const cleanupCity = initCityModal()
  const cleanupCountry = initCountryModal()
  const cleanupNights = initNightsModal()
  const cleanupTourists = initTouristsModal()

  return function cleanup() {
    form.removeEventListener('submit', handleSubmit)
    document.removeEventListener('click', handleDocumentClick)

    if (cleanupCity) cleanupCity()
    if (cleanupCountry) cleanupCountry()
    if (cleanupNights) cleanupNights()
    if (cleanupTourists) cleanupTourists()
  }
}