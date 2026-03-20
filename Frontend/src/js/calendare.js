export function initCalendar(dateButton, calendarPopup, classMap) {
  // Проверяем, что элементы существуют
  if (!dateButton || !calendarPopup || !classMap) {
    console.error('Элементы или classMap не переданы в initCalendar');
    return;
  }

  let startDate = null;
  let endDate = null;
  let currentMonth = new Date();
  currentMonth.setDate(1);

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  }

  function formatRange() {
    if (!startDate || !endDate) return 'Выберите даты';
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }

  function updateButtonText() {
    dateButton.innerHTML = `🗓️ ${formatRange()}`;
  }

  function initDefaultDates() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    startDate = new Date(today);
    endDate = new Date(today);
    endDate.setDate(today.getDate() + 3);
    updateButtonText();
  }

  function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  function positionCalendar() {
    if (calendarPopup.style.display !== 'block') return;

    const buttonRect = dateButton.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const popupHeight = calendarPopup.offsetHeight || 300;
    const buffer = 8;

    let topPosition;
    let isTop = false;

    if (buttonRect.bottom + popupHeight + buffer <= viewportHeight) {
      topPosition = buttonRect.bottom + buffer;
    } else {
      if (buttonRect.top - popupHeight - buffer >= 0) {
        topPosition = buttonRect.top - popupHeight - buffer;
        isTop = true;
      } else {
        topPosition = buffer;
      }
    }

    calendarPopup.style.position = 'fixed';
    calendarPopup.style.top = `${topPosition}px`;
    calendarPopup.style.left = `${buttonRect.left}px`;

    if (isTop) {
      calendarPopup.classList.add(classMap['top-arrow']);
    } else {
      calendarPopup.classList.remove(classMap['top-arrow']);
    }
  }

  function onScroll() {
    if (calendarPopup.style.display === 'block') {
      positionCalendar();
    }
  }

  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onScroll);

  function renderCalendar() {
    calendarPopup.innerHTML = '';

    // Заголовок
    const header = document.createElement('div');
    header.className = classMap['ot-calendar-header'];

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '←';
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentMonth.setMonth(currentMonth.getMonth() - 1);
      renderCalendar();
    });

    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const monthYear = document.createElement('span');
    monthYear.textContent = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '→';
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentMonth.setMonth(currentMonth.getMonth() + 1);
      renderCalendar();
    });

    header.appendChild(prevBtn);
    header.appendChild(monthYear);
    header.appendChild(nextBtn);
    calendarPopup.appendChild(header);

    // Сетка дней
    const daysGrid = document.createElement('div');
    daysGrid.className = classMap['ot-calendar-days'];

    // Названия дней недели
    const weekDays = ['П', 'В', 'С', 'Ч', 'П', 'С', 'В'];
    weekDays.forEach(day => {
      const dayEl = document.createElement('div');
      dayEl.className = classMap['day-name'];
      dayEl.textContent = day;
      daysGrid.appendChild(dayEl);
    });

    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay() || 7;

    // Пустые ячейки до начала месяца
    for (let i = 1; i < startDayOfWeek; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = `${classMap['day-name']} ${classMap['none']}`;
      daysGrid.appendChild(emptyDay);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayEl = document.createElement('div');
      dayEl.textContent = day;
      dayEl.className = classMap['day'];
      dayEl.style.position = 'relative';

      if (date < today) {
        dayEl.classList.add(classMap['none']);
        dayEl.style.color = '#ccc';
      } else if (day % 11 === 0) {
        dayEl.classList.add(classMap['request']);
      } else if (day % 7 === 0) {
        dayEl.classList.add(classMap['few']);
      } else if ([0, 6].includes(date.getDay())) {
        dayEl.classList.add(classMap['charter']);
      } else {
        dayEl.classList.add(classMap['gds']);
      }

      const isStart = startDate && isSameDay(date, startDate);
      const isEnd = endDate && isSameDay(date, endDate);
      const isInRange = startDate && endDate && date > startDate && date < endDate;

      if (isStart || isEnd || isInRange) {
        dayEl.style.fontWeight = '600';

        if (isInRange) {
          dayEl.style.backgroundColor = '#e0f0ff';
          dayEl.style.color = '#007bff';

          if (!dayEl.querySelector('.' + classMap['range-line'])) {
            const line = document.createElement('div');
            line.className = classMap['range-line'];
            line.style.cssText = `
              position: absolute;
              left: 0;
              width: 100%;
              height: 2px;
              opacity: 0.7;
            `;
            dayEl.appendChild(line);
          }
        }

        if (isStart || isEnd) {
          dayEl.style.color = '#0055cc';
          dayEl.style.fontWeight = '600';

          const oldHighlight = dayEl.querySelector('.' + classMap['edge-highlight']);
          if (oldHighlight) oldHighlight.remove();

          const highlight = document.createElement('div');
          highlight.className = classMap['edge-highlight'];
          highlight.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 85, 204, 0.1);
            border-radius: 50%;
            z-index: -1;
          `;
          dayEl.appendChild(highlight);

          if (isStart && !endDate) {
            const oldIndicator = dayEl.querySelector('.' + classMap['selection-indicator']);
            if (oldIndicator) oldIndicator.remove();

            const indicator = document.createElement('div');
            indicator.className = classMap['selection-indicator'];
            indicator.style.cssText = `
              position: absolute;
              top: -4px;
              right: -4px;
              width: 12px;
              height: 12px;
              background: #0055cc;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 1px 2px rgba(0,0,0,0.2);
              z-index: 10;
            `;
            dayEl.appendChild(indicator);
          }
        }
      }

      if (date >= today) {
        dayEl.addEventListener('click', (e) => {
          e.stopPropagation();

          if (!startDate || (startDate && endDate)) {
            startDate = new Date(date);
            endDate = null;
          } else if (startDate && !endDate && date >= startDate) {
            endDate = new Date(date);
          } else if (startDate && date < startDate) {
            endDate = new Date(startDate);
            startDate = new Date(date);
          }

          renderCalendar();
          updateButtonText();
        });
      }

      daysGrid.appendChild(dayEl);
    }

    calendarPopup.appendChild(daysGrid);

    // Легенда
    const legend = document.createElement('div');
    legend.className = classMap['ot-calendar-legend'];

    const legendItems = [
      { color: '#007bff', text: 'есть места (gds)' },
      { color: '#28a745', text: 'есть (чартер)', opacity: 1 },
      { color: '#28a745', text: 'по запросу', opacity: 0.6 },
      { color: '#ffc107', text: 'мало мест (чартер)' },
      { color: '#dc3545', text: 'мест нет' }
    ];

    legendItems.forEach(item => {
      const legendItem = document.createElement('div');
      legendItem.className = classMap['ot-calendar-legend-item'];

      const colorBox = document.createElement('div');
      colorBox.className = classMap['ot-calendar-legend-color'];
      colorBox.style.backgroundColor = item.color;
      if (item.opacity !== undefined) colorBox.style.opacity = item.opacity;

      const text = document.createElement('span');
      text.textContent = item.text;

      legendItem.appendChild(colorBox);
      legendItem.appendChild(text);
      legend.appendChild(legendItem);
    });

    calendarPopup.appendChild(legend);

    positionCalendar();
  }

  // Обработчик клика по кнопке — именованная функция, чтобы убрать в cleanup
  const handleButtonClick = (e) => {
    e.stopPropagation();

    if (calendarPopup.style.display === 'block') {
      calendarPopup.style.display = 'none';
      dateButton.parentElement?.removeAttribute('data-modal-open'); // стрелка вниз
    } else {
      calendarPopup.style.display = 'block';
      dateButton.parentElement?.setAttribute('data-modal-open', 'true'); // стрелка вверх

      if (!calendarPopup.innerHTML.trim()) {
        renderCalendar();
      } else {
        positionCalendar();
      }
    }
  };
  dateButton.addEventListener('click', handleButtonClick);

  // Обработчик клика вне календаря
  function handleDocumentClick(e) {
    if (!dateButton.contains(e.target) && !calendarPopup.contains(e.target) &&
        calendarPopup.style.display === 'block') {

      calendarPopup.style.display = 'none';
      dateButton.parentElement?.removeAttribute('data-modal-open'); // стрелка вниз

      if (startDate && !endDate) {
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 3);
        updateButtonText();
      }

      if (!startDate && !endDate) {
        initDefaultDates();
      }
    }
  }

  document.addEventListener('click', handleDocumentClick);

  // Инициализация дат по умолчанию
  initDefaultDates();

  // Возвращаем функцию для очистки (чтобы убрать обработчики при размонтировании)
  return function cleanup() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    document.removeEventListener('click', handleDocumentClick);
    dateButton.removeEventListener('click', handleButtonClick);
  };
}