import React, { useEffect, useState } from 'react'

export default function Confirmation(){
  const [resId, setResId] = useState('')
  const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  useEffect(()=>{
    const params = new URLSearchParams(window.location.hash.split('?')[1])
    const id = params.get('id')
    if (!id) { setResId('N/A'); return }
    if (!API) { setResId('API not configured'); return }
    fetch(API + '/bookings/' + id)
      .then(r=> { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json() })
      .then(b=> setResId(b && b.id ? b.id : 'Not found'))
      .catch(()=> setResId('Error'))
  },[API])

  return (
    <main className="confirmation-page">
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem', animation: 'fadeIn 0.5s ease-in' }}>✅</div>
        <h2 data-testid="success-message">Booking Confirmed!</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Your reservation has been successfully created
        </p>
        <div style={{ marginTop: '2rem' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
            Reservation ID:
          </div>
          <div data-testid="reservation-id" style={{ 
            display: 'inline-block', 
            background: 'var(--bg-gradient)', 
            color: 'white', 
            padding: '1rem 2.5rem', 
            borderRadius: 'var(--border-radius-sm)', 
            fontWeight: 600, 
            fontSize: '1.5rem', 
            boxShadow: 'var(--shadow-lg)',
            letterSpacing: '0.05em'
          }}>
            {resId}
          </div>
        </div>
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
          <button 
            onClick={() => window.location.hash = '#/'} 
            style={{ 
              background: 'transparent', 
              color: 'var(--primary-color)', 
              border: '2px solid var(--primary-color)',
              boxShadow: 'none',
              maxWidth: '250px'
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </main>
  )
}
