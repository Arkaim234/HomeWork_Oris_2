import React, { forwardRef } from 'react';
import styles from './Filters.module.scss';

const FilterCheckboxList = forwardRef(({ title, listRef, searchPlaceholder }, ref) => {
  return (
    <div className={styles.filterCol} ref={ref}>
      <div className={styles.filterTitle}>{title}</div>
      {searchPlaceholder && (
        <input
          className={styles.filterSearch}
          placeholder={searchPlaceholder}
        />
      )}
      <div className={styles.filterList} ref={listRef}></div>
    </div>
  );
});

export default FilterCheckboxList;