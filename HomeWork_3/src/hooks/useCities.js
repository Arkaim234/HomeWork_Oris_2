import { useState, useEffect } from 'react'
import { fetchCitiesRussia } from '../api/cities'

export function useCities(isOpen) {
    const [cities, setCities] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!isOpen) return  // не грузим пока не нужно
        setLoading(true)
        fetchCitiesRussia()
            .then(setCities)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [isOpen])

    return { cities, loading, error }
}