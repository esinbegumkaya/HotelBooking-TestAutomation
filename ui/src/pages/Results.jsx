import React, { useEffect, useState } from 'react'

export default function Results(){
  const [hotels, setHotels] = useState([])
  const [error, setError] = useState('')
  const search = JSON.parse(localStorage.getItem('hotel_search') || '{}')
  const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

  useEffect(()=>{
    if (!API) { setError('API base URL not configured. Set VITE_API_URL.'); return }
    fetch(API + '/hotels')
      .then(r=> { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json() })
      .then(allHotels => {

        const normalizeCity = (city) => city.toLowerCase().replace(/[ıİ]/g, 'i').replace(/[şŞ]/g, 's').replace(/[ğĞ]/g, 'g').replace(/[üÜ]/g, 'u').replace(/[öÖ]/g, 'o').replace(/[çÇ]/g, 'c')
        const filtered = search.city 
          ? allHotels.filter(h => h.city && normalizeCity(h.city) === normalizeCity(search.city))
          : allHotels
        setHotels(filtered)
      })
      .catch(()=> setError('Failed to load hotels'))
  },[API, search.city])

  function selectHotel(h){
    const bookingSelection = { hotelId: h.id, hotelName: h.name, checkin: search.checkin, checkout: search.checkout, city: search.city }
    localStorage.setItem('hotel_selection', JSON.stringify(bookingSelection))
    window.location.hash = '#/booking'
  }

  if (error) return <main><div className="error">{error}</div></main>
  
  return (
    <main className="results-page">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏨</div>
        <h2>Available Hotels</h2>
        {search.city && (
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Found {hotels.length} hotel{hotels.length !== 1 ? 's' : ''} in {search.city}
          </p>
        )}
      </div>
      {hotels.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          background: 'var(--bg-primary)', 
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😔</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            No hotels found. Try a different search.
          </p>
        </div>
      ) : (
        <div>
          {hotels.map(h=> (
            <div className="card" key={h.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                <div style={{ fontSize: '2rem' }}>🏨</div>
                <div>
                  <div data-testid="hotel-name" style={{ fontWeight: 600, fontSize: '1.2rem', marginBottom: '0.25rem' }}>
                    {h.name}
                  </div>
                  {h.city && (
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      📍 {h.city}
                    </div>
                  )}
                </div>
              </div>
              <button data-testid="select-hotel-btn" onClick={()=>selectHotel(h)}>
                Select →
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
