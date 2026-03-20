import React, { forwardRef } from 'react';
import styles from './Filters.module.scss';

const FilterPanel = forwardRef(({ children, className = '' }, ref) => {
  return (
    <div
      id="ot-filters-extra"
      className={`${styles.filtersExtra} ${className}`}
      ref={ref}
      style={{ display: 'none' }}
    >
      {children}
    </div>
  );
});

export default FilterPanel;