import { forwardRef } from 'react'
import styles from './SearchBar.module.scss'

const TouristsModal = forwardRef((props, ref) => {
  return (
    <div className={styles.formItem}>
      <div className={styles.itemLabel}>Туристы</div>
      <div className={styles.itemValue}>
        <input
          type="button"
          data-field="tourists"
          defaultValue="2 взр. / 0 реб."
          ref={ref}
        />
      </div>
    </div>
  )
})

export default TouristsModal