// filters.js

export function initFilters(elements, classMap) {
  const {
    filtersExtra,
    toggleText,
    cityList,
    typeList,
    hotelsList,
    mealList,
    toInput, // поле "Куда?" для определения страны
  } = elements;

  if (!filtersExtra || !toggleText) return;

  // ===== Загрузка данных =====
  async function loadCities(countryId) {
    try {
      const url = countryId
        ? `/api/cities/by-country?countryId=${encodeURIComponent(countryId)}`
        : '/api/cities';
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const list = await res.json();
      if (cityList) {
        cityList.innerHTML = list.map(c => `
          <label>
            <input type="checkbox" value="${c.id}">
            ${c.name}
          </label>
        `).join('');
      }
    } catch (e) {
      console.error('Ошибка загрузки городов:', e);
    }
  }

  async function loadCategories() {
    try {
      const res = await fetch('/api/categories');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const list = await res.json();
      if (typeList) {
        typeList.innerHTML = list.map(c => `
          <label>
            <input type="checkbox" value="${c.id}">
            ${c.name}
          </label>
        `).join('');
      }
    } catch (e) {
      console.error('Ошибка категорий:', e);
    }
  }

  async function loadHotelsList() {
    try {
      const res = await fetch('/api/hotels/all');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const list = await res.json();
      if (hotelsList) {
        hotelsList.innerHTML = list.map(h => `
          <label>
            <input type="checkbox" value="${h.id}">
            ${h.name}
          </label>
        `).join('');
      }
    } catch (e) {
      console.error('Ошибка отелей:', e);
    }
  }

  async function loadMealPlans() {
    try {
      const res = await fetch('/api/mealplans');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const list = await res.json();
      if (mealList) {
        mealList.innerHTML = list.map(m => `
          <label>
            <input type="checkbox" value="${m.code}">
            ${m.code}
          </label>
        `).join('');
      }
    } catch (e) {
      console.error('Ошибка питания:', e);
    }
  }

  // ===== Переключение видимости =====
  function toggleFilters() {
    if (filtersExtra.classList.contains(classMap.open)) {
      filtersExtra.classList.remove(classMap.open);
      filtersExtra.style.display = 'none';
      toggleText.textContent = 'Показать дополнительные поля';
    } else {
      filtersExtra.classList.add(classMap.open);
      filtersExtra.style.display = 'grid';
      toggleText.textContent = 'Скрыть дополнительные поля';
    }
  }

  // ===== Фильтрация списков (поиск) =====
  function filterLocalList(listElement, searchValue) {
    const q = (searchValue || '').toLowerCase();
    const labels = listElement.querySelectorAll('label');
    labels.forEach(label => {
      const text = label.textContent.toLowerCase();
      label.style.display = text.includes(q) ? 'flex' : 'none';
    });
  }

  // ===== Привязываем события =====
  toggleText.addEventListener('click', toggleFilters);

  // Привязываем поиск к инпутам (если они есть)
    const searchInputs = filtersExtra.querySelectorAll(`input.${classMap.filterSearch}`);
    searchInputs.forEach((input, index) => {
    const listId = input.nextElementSibling?.id; // предполагаем, что список идёт после
    const list = listId ? document.getElementById(listId) : null;
    if (list) {
      input.addEventListener('input', (e) => filterLocalList(list, e.target.value));
    }
  });

  // ===== Инициализация загрузки =====
  (async () => {
    const initialCountryId = toInput?.dataset?.value || null;
    await loadCities(initialCountryId);
    await loadCategories();
    await loadHotelsList();
    await loadMealPlans();
  })();

  // ===== Очистка =====
  return function cleanup() {
    toggleText.removeEventListener('click', toggleFilters);
    // можно убрать и другие обработчики, но они не глобальные
  };
}