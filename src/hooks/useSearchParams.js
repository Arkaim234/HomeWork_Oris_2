import { useState } from 'react'

// Хранит всё состояние формы поиска в одном месте
export function useSearchParams() {
    const [fromCity, setFromCity] = useState({ id: null, name: 'Москва' })
    const [toCountry, setToCountry] = useState({ id: null, name: 'Турция' })
    const [nights, setNights] = useState({ from: 6, to: 9 })
    const [tourists, setTourists] = useState({ adults: 2, children: 0 })
    const [dates, setDates] = useState({ from: '', to: '' })

    // Собирает всё в один объект для передачи в api/tours.js
    function buildParams() {
        return {
            fromCityId: fromCity.id  || '',
            countryId:  toCountry.id || '',
            dateFrom:   dates.from,
            dateTo:     dates.to,
            nightsFrom: nights.from,
            nightsTo:   nights.to,
            adults:     tourists.adults,
            children:   tourists.children,
        }
    }

    return {
        fromCity,  setFromCity,
        toCountry, setToCountry,
        nights,    setNights,
        tourists,  setTourists,
        dates,     setDates,
        buildParams,
    }
}