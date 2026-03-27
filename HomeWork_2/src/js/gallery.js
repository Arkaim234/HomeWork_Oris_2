// gallery.js
export function initGallery(container, classMap) {
  if (!container || !classMap) {
    console.error('initGallery: container или classMap не переданы');
    return;
  }

  // Ищем блок .photo-block__main внутри container
  const galleryMain = container.querySelector('.photo-block__main');
  if (!galleryMain) return;

  // Собираем все изображения из исходной разметки (они уже есть в DOM)
  const images = [];
  const imageLinks = container.querySelectorAll('.photoslider-block__img-link');

  imageLinks.forEach(link => {
    const img = link.querySelector('img');
    if (img && img.src) {
      images.push({
        src: img.src,
        alt: img.alt || 'Галерея изображений'
      });
    }
  });

  if (images.length === 0) return;

  const visibleCount = Math.min(images.length, 3);

  // Создаём карточку галереи с использованием classMap
  const galleryCard = document.createElement('div');
  galleryCard.className = classMap['gallery-card']; // используем модульный класс

  // Основное изображение
  const mainContainer = document.createElement('div');
  mainContainer.className = classMap['gallery-main'];

  const mainImg = document.createElement('img');
  mainImg.className = classMap['gallery-main-img'];
  mainImg.src = images[0].src;
  mainImg.alt = images[0].alt;
  mainImg.style.cursor = 'pointer';

  // Кнопки навигации
  const prevBtn = document.createElement('button');
  prevBtn.className = `${classMap['gallery-nav-btn']} ${classMap['gallery-nav-prev']}`;
  prevBtn.innerHTML = '←';
  prevBtn.setAttribute('aria-label', 'Предыдущее изображение');

  const nextBtn = document.createElement('button');
  nextBtn.className = `${classMap['gallery-nav-btn']} ${classMap['gallery-nav-next']}`;
  nextBtn.innerHTML = '→';
  nextBtn.setAttribute('aria-label', 'Следующее изображение');

  // Индикаторы
  const indicators = document.createElement('div');
  indicators.className = classMap['gallery-indicators'];

  for (let i = 0; i < visibleCount; i++) {
    const indicator = document.createElement('div');
    indicator.className = classMap['gallery-indicator'];
    indicator.dataset.index = i;
    if (i === 0) indicator.classList.add(classMap['active']);
    indicators.appendChild(indicator);
  }

  // Миниатюры
  const thumbnails = document.createElement('div');
  thumbnails.className = classMap['gallery-thumbnails'];

  for (let i = 0; i < visibleCount; i++) {
    const thumb = document.createElement('img');
    thumb.src = images[i].src;
    thumb.className = `${classMap['gallery-thumbnail']} ${i === 0 ? classMap['active'] : ''}`;
    thumb.dataset.index = i;
    thumbnails.appendChild(thumb);
  }

  // Сборка
  mainContainer.appendChild(mainImg);
  mainContainer.appendChild(prevBtn);
  mainContainer.appendChild(nextBtn);
  mainContainer.appendChild(indicators);
  galleryCard.appendChild(mainContainer);
  galleryCard.appendChild(thumbnails);
  galleryMain.parentNode.replaceChild(galleryCard, galleryMain);

  // --- Логика переключения ---
  let currentIndex = 0;

  const updateMainGallery = (index) => {
    currentIndex = index;
    mainImg.src = images[index].src;
    mainImg.alt = images[index].alt;

    // Индикаторы
    indicators.querySelectorAll(`.${classMap['gallery-indicator']}`).forEach((el, i) => {
      el.classList.toggle(classMap['active'], i === index);
    });

    // Миниатюры
    thumbnails.querySelectorAll(`.${classMap['gallery-thumbnail']}`).forEach((el, i) => {
      el.classList.toggle(classMap['active'], i === index);
    });
  };

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + visibleCount) % visibleCount;
    updateMainGallery(newIndex);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % visibleCount;
    updateMainGallery(newIndex);
  });

  indicators.addEventListener('click', (e) => {
    const target = e.target.closest(`.${classMap['gallery-indicator']}`);
    if (target) {
      e.stopPropagation();
      const index = parseInt(target.dataset.index);
      updateMainGallery(index);
    }
  });

  thumbnails.addEventListener('click', (e) => {
    const target = e.target.closest(`.${classMap['gallery-thumbnail']}`);
    if (target) {
      e.stopPropagation();
      const index = parseInt(target.dataset.index);
      updateMainGallery(index);
    }
  });

  // --- Модальное окно ---
  let modal = null;
  let modalInitialized = false;
  let modalCurrentIndex = 0;

  const createModal = () => {
    modal = document.createElement('div');
    modal.className = classMap['gallery-modal'];

    const modalImg = document.createElement('img');
    modalImg.className = classMap['gallery-modal-img'];
    modalImg.src = images[0].src;

    const modalNav = document.createElement('div');
    modalNav.className = classMap['gallery-modal-nav'];

    const modalPrev = document.createElement('button');
    modalPrev.className = classMap['gallery-modal-prev'];
    modalPrev.innerHTML = '←';
    modalPrev.setAttribute('aria-label', 'Предыдущее изображение');

    const modalNext = document.createElement('button');
    modalNext.className = classMap['gallery-modal-next'];
    modalNext.innerHTML = '→';
    modalNext.setAttribute('aria-label', 'Следующее изображение');

    const modalClose = document.createElement('span');
    modalClose.className = classMap['gallery-modal-close'];
    modalClose.innerHTML = '×';
    modalClose.setAttribute('aria-label', 'Закрыть галерею');

    const modalThumbnails = document.createElement('div');
    modalThumbnails.className = classMap['gallery-thumbnails-modal'];

    images.forEach((img, index) => {
      const thumb = document.createElement('img');
      thumb.src = img.src;
      thumb.alt = img.alt || 'Миниатюра';
      thumb.className = `${classMap['gallery-thumbnail-modal']} ${index === 0 ? classMap['active'] : ''}`;
      thumb.dataset.index = index;
      modalThumbnails.appendChild(thumb);
    });

    modalNav.appendChild(modalPrev);
    modalNav.appendChild(modalNext);
    modal.appendChild(modalClose);
    modal.appendChild(modalImg);
    modal.appendChild(modalNav);
    modal.appendChild(modalThumbnails);
    document.body.appendChild(modal);

    // Обработчики
    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', () => {
      modalCurrentIndex = (modalCurrentIndex - 1 + images.length) % images.length;
      updateModalGallery(modalCurrentIndex);
    });
    modalNext.addEventListener('click', () => {
      modalCurrentIndex = (modalCurrentIndex + 1) % images.length;
      updateModalGallery(modalCurrentIndex);
    });
    modalThumbnails.addEventListener('click', (e) => {
      const target = e.target.closest(`.${classMap['gallery-thumbnail-modal']}`);
      if (target) {
        const index = parseInt(target.dataset.index);
        updateModalGallery(index);
      }
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', handleModalKeydown);
  };

  const updateModalGallery = (index) => {
    modalCurrentIndex = index;
    const modalImg = modal.querySelector(`.${classMap['gallery-modal-img']}`);
    modalImg.src = images[index].src;
    modalImg.alt = images[index].alt;

    modal.querySelectorAll(`.${classMap['gallery-thumbnail-modal']}`).forEach((thumb, i) => {
      thumb.classList.toggle(classMap['active'], i === index);
    });

    const activeThumb = modal.querySelector(`.${classMap['gallery-thumbnail-modal']}[data-index="${index}"]`);
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const openModal = (index) => {
    if (!modalInitialized) {
      createModal();
      modalInitialized = true;
    }
    updateModalGallery(index);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  const handleModalKeydown = (e) => {
    if (!modal || modal.style.display !== 'flex') return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      modalCurrentIndex = (modalCurrentIndex - 1 + images.length) % images.length;
      updateModalGallery(modalCurrentIndex);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      modalCurrentIndex = (modalCurrentIndex + 1) % images.length;
      updateModalGallery(modalCurrentIndex);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    }
  };

  mainImg.addEventListener('click', () => {
    openModal(currentIndex);
  });

  return function cleanup() {
    if (modal) modal.remove();
  };
}