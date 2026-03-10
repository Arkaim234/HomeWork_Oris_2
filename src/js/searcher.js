import { STATIC_HOTELS } from "../data/hotels.js";
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
  } = elements;

  // ===== Инициализация модалок =====
  function initCityModal() {
    if (!modalCity || !fromInput) return;

    if (!fromInput.dataset.lastValue && fromInput.value.trim()) {
      fromInput.dataset.lastValue = fromInput.value.trim();
      if (fromInput.dataset.value) fromInput.dataset.lastId = fromInput.dataset.value;
    }

    const handleInput = () => {
      filterModalList(modalCity, fromInput.value);
    };

    const handleBlur = () => {
      const current = fromInput.value.trim().toLowerCase();
      const listWrap = modalCity.querySelector(`.${classMap.modalList}`);
      let matchedItem = null;
      if (listWrap) {
        listWrap.querySelectorAll(`.${classMap.modalItem}`).forEach(item => {
          if (item.textContent.trim().toLowerCase() === current) matchedItem = item;
        });
      }
      if (matchedItem) {
        fromInput.value = matchedItem.textContent.trim();
        fromInput.dataset.value = matchedItem.dataset.id;
        fromInput.dataset.lastValue = fromInput.value;
        fromInput.dataset.lastId = matchedItem.dataset.id;
      } else if (fromInput.dataset.lastValue) {
        fromInput.value = fromInput.dataset.lastValue;
        if (fromInput.dataset.lastId) fromInput.dataset.value = fromInput.dataset.lastId;
        else delete fromInput.dataset.value;
      }
    };

    const handleClick = () => {
      fetch('/api/cities/russia')
        .then(r => r.json())
        .then(cities => {
          modalCity.innerHTML = `
            <div class="${classMap.modalList}">
              ${cities.map(c => `
                <div class="${classMap.modalItem}" data-id="${c.id}">${c.name}</div>
              `).join('')}
            </div>
          `;
          showModal(modalCity, fromInput);
          modalCity.querySelectorAll(`.${classMap.modalItem}`).forEach(item => {
            item.addEventListener('click', () => {
              fromInput.value = item.textContent.trim();
              fromInput.dataset.value = item.dataset.id;
              fromInput.dataset.lastValue = fromInput.value;
              fromInput.dataset.lastId = item.dataset.id;
              modalCity.classList.remove(classMap.open);
            });
          });
        })
        .catch(err => console.error('Ошибка загрузки городов вылета:', err));
    };

    fromInput.addEventListener('input', handleInput);
    fromInput.addEventListener('blur', handleBlur);
    fromInput.addEventListener('click', handleClick);

    return () => {
      fromInput.removeEventListener('input', handleInput);
      fromInput.removeEventListener('blur', handleBlur);
      fromInput.removeEventListener('click', handleClick);
    };
  }

  function initCountryModal() {
    if (!modalCountry || !toInput) return;

    if (!toInput.dataset.lastValue && toInput.value.trim()) {
      toInput.dataset.lastValue = toInput.value.trim();
      if (toInput.dataset.value) toInput.dataset.lastId = toInput.dataset.value;
    }

    const handleInput = () => filterModalList(modalCountry, toInput.value);
    const handleBlur = () => {
      const current = toInput.value.trim().toLowerCase();
      const listWrap = modalCountry.querySelector(`.${classMap.modalList}`);
      let matchedItem = null;
      if (listWrap) {
        listWrap.querySelectorAll(`.${classMap.modalItem}`).forEach(item => {
          if (item.textContent.trim().toLowerCase() === current) matchedItem = item;
        });
      }
      if (matchedItem) {
        toInput.value = matchedItem.textContent.trim();
        toInput.dataset.value = matchedItem.dataset.id;
        toInput.dataset.lastValue = toInput.value;
        toInput.dataset.lastId = matchedItem.dataset.id;
      } else if (toInput.dataset.lastValue) {
        toInput.value = toInput.dataset.lastValue;
        if (toInput.dataset.lastId) toInput.dataset.value = toInput.dataset.lastId;
        else delete toInput.dataset.value;
      }
    };

    const handleClick = () => {
      fetch('/api/countries')
        .then(r => r.json())
        .then(countries => {
          modalCountry.innerHTML = `
            <div class="${classMap.modalList}">
              ${countries.filter(x => x.id !== 1).map(c => `
                <div class="${classMap.modalItem}" data-id="${c.id}">${c.name}</div>
              `).join('')}
            </div>
          `;
          showModal(modalCountry, toInput);
          modalCountry.querySelectorAll(`.${classMap.modalItem}`).forEach(item => {
            item.addEventListener('click', () => {
              const countryId = item.dataset.id;
              toInput.value = item.textContent.trim();
              toInput.dataset.value = countryId;
              toInput.dataset.lastValue = toInput.value;
              toInput.dataset.lastId = countryId;
              modalCountry.classList.remove(classMap.open);
              // loadCities(countryId); – это загрузка городов для фильтров, должно быть в filters.js, поэтому убираем
            });
          });
        })
        .catch(err => console.error('Ошибка загрузки стран:', err));
    };

    toInput.addEventListener('input', handleInput);
    toInput.addEventListener('blur', handleBlur);
    toInput.addEventListener('click', handleClick);

    return () => {
      toInput.removeEventListener('input', handleInput);
      toInput.removeEventListener('blur', handleBlur);
      toInput.removeEventListener('click', handleClick);
    };
  }

  function initNightsModal() {
    if (!modalNights || !nightsInput) return;

    const handleClick = () => {
      let from = 6, to = 9;
      const match = nightsInput.value.match(/(\d+)\s*-\s*(\d+)/);
      if (match) {
        from = parseInt(match[1], 10);
        to = parseInt(match[2], 10);
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
      `;

      showModal(modalNights, nightsInput);

      const state = { from, to };

      const syncView = () => {
        modalNights.querySelector('#nightsFromValue').textContent = state.from;
        modalNights.querySelector('#nightsToValue').textContent = state.to;
        nightsInput.value = `${state.from} - ${state.to}`;
      };

      modalNights.querySelectorAll(`.${classMap.arrow}`).forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.target;
          const dir = btn.classList.contains('up') ? 1 : -1;
          if (target === 'from') {
            state.from = Math.max(1, state.from + dir);
            if (state.from > state.to) state.to = state.from;
          } else {
            state.to = Math.max(state.from, state.to + dir);
          }
          syncView();
        });
      });
    };

    nightsInput.addEventListener('click', handleClick);
    return () => nightsInput.removeEventListener('click', handleClick);
  }

  function initTouristsModal() {
    if (!modalTourists || !touristsInput) return;

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
      `;

      showModal(modalTourists, touristsInput);

      const adultsSpan = modalTourists.querySelector('.countA');
      const childsSpan = modalTourists.querySelector('.countC');

      const updateText = () => {
        touristsInput.value = `${adultsSpan.textContent} взр. / ${childsSpan.textContent} реб.`;
      };

      modalTourists.querySelector('.plusA').addEventListener('click', () => {
        adultsSpan.textContent = Number(adultsSpan.textContent) + 1;
        updateText();
      });
      modalTourists.querySelector('.minusA').addEventListener('click', () => {
        adultsSpan.textContent = Math.max(1, Number(adultsSpan.textContent) - 1);
        updateText();
      });
      modalTourists.querySelector('.plusC').addEventListener('click', () => {
        childsSpan.textContent = Number(childsSpan.textContent) + 1;
        updateText();
      });
      modalTourists.querySelector('.minusC').addEventListener('click', () => {
        childsSpan.textContent = Math.max(0, Number(childsSpan.textContent) - 1);
        updateText();
      });

      updateText();
    };

    touristsInput.addEventListener('click', handleClick);
    return () => touristsInput.removeEventListener('click', handleClick);
  }

  // Общая функция показа модалки
  function showModal(modal, trigger) {
    if (!modal || !trigger) return;
    // Закрываем все открытые модалки и убираем стрелки у их триггеров
    document.querySelectorAll(`.${classMap.modal}.${classMap.open}`).forEach(m => {
      m.classList.remove(classMap.open);
      if (m._triggerWrap) m._triggerWrap.removeAttribute('data-modal-open');
    });
    modal._trigger = trigger;
    modal._triggerWrap = trigger.parentElement; // .autocompleteBox или .itemValue
    if (modal._triggerWrap) modal._triggerWrap.setAttribute('data-modal-open', 'true');
    const rect = trigger.getBoundingClientRect();
    modal.style.top = rect.bottom + window.scrollY + 'px';
    modal.style.left = rect.left + window.scrollX + 'px';
    modal.classList.add(classMap.open);
  }

  // Глобальный клик для закрытия модалок
  function handleDocumentClick(e) {
    const openModals = document.querySelectorAll(`.${classMap.modal}.${classMap.open}`);
    openModals.forEach(modal => {
      const trigger = modal._trigger;
      const clickInside = modal.contains(e.target);
      const clickOnTrigger = trigger && (trigger === e.target || trigger.contains(e.target));
      if (!clickInside && !clickOnTrigger) {
        modal.classList.remove(classMap.open);
        if (modal._triggerWrap) modal._triggerWrap.removeAttribute('data-modal-open');
      }
    });
  }

  document.addEventListener('click', handleDocumentClick);

  // Функция фильтрации внутри модалки
  function filterModalList(modal, searchValue) {
    const listWrap = modal.querySelector(`.${classMap.modalList}`);
    if (!listWrap) return;
    const items = listWrap.querySelectorAll(`.${classMap.modalItem}`);
    const q = (searchValue || '').trim().toLowerCase();
    let visibleCount = 0;
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const match = !q || text.includes(q);
      item.style.display = match ? 'block' : 'none';
      if (match) visibleCount++;
    });
    let emptyEl = listWrap.querySelector(`.${classMap.modalEmpty}`);
    if (!emptyEl) {
      emptyEl = document.createElement('div');
      emptyEl.className = classMap.modalEmpty;
      emptyEl.textContent = 'Ничего не найдено';
      listWrap.appendChild(emptyEl);
    }
    emptyEl.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  // ===== Обработка отправки формы =====
  async function handleSubmit(e) {
    e.preventDefault();

    const fromId = fromInput.dataset.value || '';
    const toId = toInput.dataset.value || '';
    let dateFrom = '', dateTo = '';
    if (dateButton) {
      const m = dateButton.textContent.match(/(\d{2}\.\d{2}\.\d{2}).+?(\d{2}\.\d{2}\.\d{2})/);
      if (m) {
        dateFrom = m[1];
        dateTo = m[2];
      }
    }
    let nightsFrom = '', nightsTo = '';
    if (nightsInput && nightsInput.value) {
      const nm = nightsInput.value.match(/(\d+)\s*-\s*(\d+)/);
      if (nm) {
        nightsFrom = nm[1];
        nightsTo = nm[2];
      }
    }
    let adults = '', childs = '';
    if (touristsInput && touristsInput.value) {
      const tm = touristsInput.value.match(/(\d+)\s*взр\.\s*\/\s*(\d+)\s*реб\./i);
      if (tm) {
        adults = tm[1];
        childs = tm[2];
      }
    }

    // Данные из фильтров
    const selectedCities = cityList ? Array.from(cityList.querySelectorAll('input:checked')).map(i => i.value) : [];
    const selectedCategories = typeList ? Array.from(typeList.querySelectorAll('input:checked')).map(i => i.value) : [];
    const selectedHotels = hotelsList ? Array.from(hotelsList.querySelectorAll('input:checked')).map(i => i.value) : [];
    const selectedMeals = mealList ? Array.from(mealList.querySelectorAll('input:checked')).map(i => i.value) : [];

    const params = new URLSearchParams();
    if (fromId) params.set('fromCityId', fromId);
    if (toId) params.set('countryId', toId);
    if (dateFrom) params.set('dateFrom', dateFrom);
    if (dateTo) params.set('dateTo', dateTo);
    if (nightsFrom) params.set('nightsFrom', nightsFrom);
    if (nightsTo) params.set('nightsTo', nightsTo);
    if (adults) params.set('adults', adults);
    if (childs) params.set('children', childs);
    if (selectedCities.length) params.set('cityIds', selectedCities.join(','));
    if (selectedCategories.length) params.set('categoryIds', selectedCategories.join(','));
    if (selectedHotels.length) params.set('hotelIds', selectedHotels.join(','));
    if (selectedMeals.length) params.set('mealCodes', selectedMeals.join(','));

    // TODO: заменить на API-запрос когда бэкенд будет готов
    // try {
    //   const response = await fetch('/api/hotels/search?' + params.toString(), { ... });
    //   const data = await response.json();
    //   showResults(data);
    // }
    showResults(STATIC_HOTELS);
    cutPageToSearchbar();
  }

  function cutPageToSearchbar() {
    const searchWrap = form.closest('.js-ot-msf');
    if (searchWrap) {
      let prev = searchWrap.previousElementSibling;
      while (prev) {
        prev.style.display = 'none';
        prev = prev.previousElementSibling;
      }
    }
    const banner = document.querySelector('.page-top-banner');
    if (banner) banner.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ===== Отображение результатов =====
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, ch => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[ch]);
  }

  function formatPrice(value) {
    if (value == null) return '';
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  function renderTemplate(template, data) {
    return template.replace(/{{(\w+)}}/g, (match, key) => {
      if (data[key] == null) return '';
      return escapeHtml(String(data[key]));
    });
  }

  function showResults(list) {
    const container = resultsContainer;
    if (!container) return;

    const tplEl = document.getElementById('tour-card-template');
    if (!tplEl) {
      console.warn('Не найден шаблон #tour-card-template');
      return;
    }
    const templateHtml = tplEl.innerHTML.trim();

    container.innerHTML = '';
    if (!Array.isArray(list) || list.length === 0) {
      container.innerHTML = '<p>По вашему запросу ничего не найдено.</p>';
      return;
    }

    const title = document.createElement('h2');
    title.textContent = `Найдено туров: ${list.length}`;
    container.appendChild(title);

    let checkInText = '';
    let nightsText = '';
    if (dateButton) {
      const m = dateButton.textContent.match(/(\d{2}\.\d{2}\.\d{2})/);
      if (m) checkInText = m[1];
    }
    if (nightsInput && nightsInput.value) nightsText = nightsInput.value;

    list.forEach(hotel => {
      const meal = Array.isArray(hotel.mealPlans) && hotel.mealPlans.length ? hotel.mealPlans[0] : '';
      const dataForTemplate = {
        HotelUrl: `/hotels/${hotel.slug}/`,
        PhotoUrl: hotel.coverPhoto || hotel.photos?.[0] || '',
        HotelName: hotel.name || '',
        StarsHtml: '',
        CityName: hotel.city || '',
        RegionName: '',
        CheckInDate: checkInText,
        Nights: nightsText,
        RoomName: '',
        MealPlan: meal,
        Price: formatPrice(hotel.price),
      };
      const html = renderTemplate(templateHtml, dataForTemplate);
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      const card = wrapper.firstElementChild;
      if (card) container.appendChild(card);
    });
  }

  // ===== Подписка на события =====
  form.addEventListener('submit', handleSubmit);

  // Инициализация модалок
  const cleanupCity = initCityModal();
  const cleanupCountry = initCountryModal();
  const cleanupNights = initNightsModal();
  const cleanupTourists = initTouristsModal();

  // Возвращаем функцию очистки
  return function cleanup() {
    form.removeEventListener('submit', handleSubmit);
    document.removeEventListener('click', handleDocumentClick);
    if (cleanupCity) cleanupCity();
    if (cleanupCountry) cleanupCountry();
    if (cleanupNights) cleanupNights();
    if (cleanupTourists) cleanupTourists();
  };
}