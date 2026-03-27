import React from 'react';
import styles from './SearchBar.module.scss';

const SearchTabsNav = () => {
  return (
    <div className={styles.tabsNav}>
      <button type="button" className={`${styles.tabItem} ${styles.tabItem_active}`}>
        <span className={styles.tabItem_text}>Туры</span>
      </button>
      <button type="button" className={styles.tabItem}>
        <span className={styles.tabItem_text}>Туры без перелёта</span>
      </button>
      <button type="button" className={styles.tabItem}>
        <span className={styles.tabItem_text}>Авиабилеты</span>
      </button>
      <div className={styles.tabItem}>
        <a href="https" className={styles.tabItem_link} target="_blank" rel="noopener noreferrer">
          Поиск для турагентств
        </a>
      </div>
      <div className={styles.tabItem}>
        <a href="https" className={styles.tabItem_link}>Экскурсионные туры</a>
      </div>
    </div>
  );
};

export default SearchTabsNav;