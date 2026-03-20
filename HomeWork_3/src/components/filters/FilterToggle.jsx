import React, { forwardRef } from 'react';
import styles from './Filters.module.scss';

const FilterToggle = forwardRef(({ children }, ref) => {
  return (
    <button
      type="button"
      id="ot-filters-toggle-text"
      className={styles.filtersToggle}
      ref={ref}
    >
      {children}
    </button>
  );
});

export default FilterToggle;