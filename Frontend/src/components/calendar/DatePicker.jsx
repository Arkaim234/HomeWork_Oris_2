import { useRef, useEffect, forwardRef } from 'react'
import { initCalendar } from '../../js/calendare.js'
import styles from './DatePicker.module.scss'
import searchStyles from '../search/SearchBar.module.scss'

const classMap = {
  'ot-calendar-popup':        styles['ot-calendar-popup'],
  'ot-calendar-header':       styles['ot-calendar-header'],
  'ot-calendar-days':         styles['ot-calendar-days'],
  'day-name':                 styles['day-name'],
  'day':                      styles['day'],
  'gds':                      styles['gds'],
  'charter':                  styles['charter'],
  'request':                  styles['request'],
  'few':                      styles['few'],
  'none':                     styles['none'],
  'selected-start':           styles['selected-start'],
  'selected-end':             styles['selected-end'],
  'in-range':                 styles['in-range'],
  'range-line':               styles['range-line'],
  'edge-highlight':           styles['edge-highlight'],
  'selection-indicator':      styles['selection-indicator'],
  'ot-calendar-legend':       styles['ot-calendar-legend'],
  'ot-calendar-legend-item':  styles['ot-calendar-legend-item'],
  'ot-calendar-legend-color': styles['ot-calendar-legend-color'],
  'top-arrow':                styles['top-arrow'],
}

const DatePicker = forwardRef((props, ref) => {
  const popupRef = useRef(null)

  useEffect(() => {
    const button = ref?.current
    const popup  = popupRef.current
    if (!button || !popup) return
    const cleanup = initCalendar(button, popup, classMap)
    return () => { if (cleanup) cleanup() }
  }, [])

  return (
    // Структурные классы — из SearchBar.module.scss (как у всех остальных formItem)
    <div className={searchStyles.formItem}>
      <div className={searchStyles.itemLabel}>Период вылета</div>
      <div className={searchStyles.itemValue}>
        <button ref={ref} type="button" className={styles['ot-date-button']}>
          🗓️ 11.11.25 - 14.11.25
        </button>
        <div
          ref={popupRef}
          id="calendarPopup"
          className={styles['ot-calendar-popup']}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
})

export default DatePicker