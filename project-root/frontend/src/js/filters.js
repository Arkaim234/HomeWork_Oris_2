export function initFilters(elements, classMap) {
  const {
    filtersExtra,
    toggleText,
    cityList,
    typeList,
    hotelsList,
    mealList,
    toInput,
  } = elements

  if (!filtersExtra || !toggleText) {
    return () => {}
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;')
  }

  async function loadJson(url) {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${url}`)
    }

    return res.json()
  }

  function renderList(container, items, getValue, getLabel, inputName) {
    if (!container) return

    container.innerHTML = items
      .map((item) => {
        const value = escapeHtml(getValue(item))
        const label = escapeHtml(getLabel(item))

        return `
          <label>
            <input type="checkbox" name="${inputName}" value="${value}">
            ${label}
          </label>
        `
      })
      .join('')
  }

  function getSelectedCountryName() {
    if (!toInput) return ''

    const datasetValue =
      toInput.dataset?.value ||
      toInput.dataset?.country ||
      toInput.dataset?.countryName ||
      ''

    if (datasetValue) {
      return String(datasetValue).trim()
    }

    if ('value' in toInput && toInput.value) {
      return String(toInput.value).trim()
    }

    const text = toInput.textContent || ''
    return text.trim()
  }

  async function loadCities() {
    try {
      const [cities, countries] = await Promise.all([
        loadJson('/api/cities.json'),
        loadJson('/api/countries.json'),
      ])

      const selectedCountryName = getSelectedCountryName()

      let filteredCities = cities

      if (selectedCountryName) {
        const selectedCountry = countries.find(
          (country) => country.name === selectedCountryName
        )

        if (selectedCountry) {
          filteredCities = cities.filter(
            (city) => String(city.countryId) === String(selectedCountry.id)
          )
        }
      }

      renderList(
        cityList,
        filteredCities,
        (item) => item.id,
        (item) => item.name,
        'city'
      )
    } catch (e) {
      console.error('Ошибка загрузки городов:', e)

      if (cityList) {
        cityList.innerHTML = '<p>Не удалось загрузить города</p>'
      }
    }
  }

  async function loadCategories() {
    try {
      const categories = await loadJson('/api/categories.json')

      renderList(
        typeList,
        categories,
        (item) => item.name,
        (item) => item.name,
        'category'
      )
    } catch (e) {
      console.error('Ошибка загрузки категорий:', e)

      if (typeList) {
        typeList.innerHTML = '<p>Не удалось загрузить категории</p>'
      }
    }
  }

  async function loadHotelsList() {
    try {
      const tours = await loadJson('/api/tours.json')

      renderList(
        hotelsList,
        tours,
        (item) => item.slug || item.id,
        (item) => item.name,
        'hotel'
      )
    } catch (e) {
      console.error('Ошибка загрузки отелей:', e)

      if (hotelsList) {
        hotelsList.innerHTML = '<p>Не удалось загрузить отели</p>'
      }
    }
  }

  async function loadMealPlans() {
    try {
      const mealplans = await loadJson('/api/mealplans.json')

      renderList(
        mealList,
        mealplans,
        (item) => item.code,
        (item) => item.code,
        'mealPlan'
      )
    } catch (e) {
      console.error('Ошибка загрузки питания:', e)

      if (mealList) {
        mealList.innerHTML = '<p>Не удалось загрузить питание</p>'
      }
    }
  }

  function toggleFilters() {
    const isOpen = filtersExtra.classList.contains(classMap.open)

    if (isOpen) {
      filtersExtra.classList.remove(classMap.open)
      filtersExtra.style.display = 'none'
      toggleText.textContent = 'Показать дополнительные поля'
    } else {
      filtersExtra.classList.add(classMap.open)
      filtersExtra.style.display = 'grid'
      toggleText.textContent = 'Скрыть дополнительные поля'
    }
  }

  function filterLocalList(listElement, searchValue) {
    if (!listElement) return

    const q = String(searchValue || '').toLowerCase()
    const labels = listElement.querySelectorAll('label')

    labels.forEach((label) => {
      const text = (label.textContent || '').toLowerCase()
      label.style.display = text.includes(q) ? 'flex' : 'none'
    })
  }

  function bindLocalSearches() {
    const searchInputs = filtersExtra.querySelectorAll(
      `input.${classMap.filterSearch}`
    )

    searchInputs.forEach((input) => {
      const list = input.parentElement?.querySelector('div, ul')

      if (!list) return

      input.addEventListener('input', (e) => {
        filterLocalList(list, e.target.value)
      })
    })
  }

  async function init() {
    await Promise.all([
      loadCities(),
      loadCategories(),
      loadHotelsList(),
      loadMealPlans(),
    ])

    bindLocalSearches()
  }

  toggleText.addEventListener('click', toggleFilters)

  init()

  return function cleanup() {
    toggleText.removeEventListener('click', toggleFilters)
  }
}