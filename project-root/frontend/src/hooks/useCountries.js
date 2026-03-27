import { useState, useEffect } from 'react'

export function useCountries(isOpen) {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!isOpen) return
        setLoading(true)
        fetch('/api/countries')
            .then(res => {
                if (!res.ok) throw new Error('HTTP ' + res.status)
                return res.json()
            })
            .then(data => setCountries(data.filter(c => c.id !== 1))) // убираем Россию
            .catch(setError)
            .finally(() => setLoading(false))
    }, [isOpen])

    return { countries, loading, error }
}