import { forwardRef } from 'react'
import styles from './SearchBar.module.scss'

const CityModal = forwardRef((props, ref) => {
  return (
    <div className={styles.formItem}>
      <div className={styles.itemLabel}>Вылет из</div>
      <div className={styles.autocompleteBox}>
        <input
          type="text"
          id="fromInput"
          data-field="from"
          defaultValue="Москва"
          autoComplete="off"
          ref={ref}
        />
      </div>
    </div>
  )
})

export default CityModal