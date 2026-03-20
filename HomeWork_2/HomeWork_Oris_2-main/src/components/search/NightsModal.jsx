import { forwardRef } from 'react'
import styles from './SearchBar.module.scss'

const NightsModal = forwardRef((props, ref) => {
  return (
    <div className={styles.formItem}>
      <div className={styles.itemLabel}>Ночей</div>
      <div className={styles.itemValue}>
        <input
          type="button"
          data-field="nights"
          defaultValue="6 - 9"
          ref={ref}
        />
      </div>
    </div>
  )
})

export default NightsModal