import { forwardRef } from 'react'
import styles from './SearchBar.module.scss'

const CountryModal = forwardRef((props, ref) => {
  return (
    <div className={styles.formItem}>
      <div className={styles.itemLabel}>Куда?</div>
      <div className={styles.autocompleteBox}>
        <input
          type="text"
          id="toInput"
          data-field="to"
          defaultValue="Турция"
          autoComplete="off"
          ref={ref}
        />
      </div>
    </div>
  )
})

export default CountryModal