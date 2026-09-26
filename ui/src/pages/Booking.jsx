import React, { useState } from 'react'

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}
export default function Booking(){
  const selection = JSON.parse(localStorage.getItem('hotel_selection') || '{}')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  async function onConfirm(){
    if (!firstname.trim() || !lastname.trim() || !email.trim()){ setError('Please fill all fields.'); return }
    if (!isValidEmail(email)){ setError('Please enter a valid email address.'); return }
    if (!selection.hotelId || !selection.checkin || !selection.checkout){ setError('Please select a hotel first.'); return }
    if (!API){ setError('API base URL not configured.'); return }
    setError('')
    const payload = { firstname: firstname.trim(), lastname: lastname.trim(), email: email.trim(), hotelId: selection.hotelId, checkin: selection.checkin, checkout: selection.checkout }
    try {
      const response = await fetch(API + '/bookings', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
      if (!response.ok) throw new Error('HTTP ' + response.status)
      const data = await response.json()
      if (data.id === undefined || data.id === null) throw new Error('Missing booking ID')
      window.location.hash = '#/confirmation?id=' + encodeURIComponent(data.id)
    } catch { setError('Failed to create booking.') }
  }
  return (
    <main className="booking-page">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}><div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✍️</div><h2>Booking Form</h2><p style={{ color: 'var(--text-secondary)' }}>Complete your reservation details</p></div>
      {selection.hotelName && <div id="hotelInfo"><strong>{selection.hotelName}</strong><p>📅 {selection.checkin} → {selection.checkout}</p></div>}
      <div className="form-row"><label htmlFor="firstname">First name</label><input id="firstname" data-testid="firstname-input" value={firstname} onChange={e=>setFirstname(e.target.value)} placeholder="Enter your first name" /></div>
      <div className="form-row"><label htmlFor="lastname">Last name</label><input id="lastname" data-testid="lastname-input" value={lastname} onChange={e=>setLastname(e.target.value)} placeholder="Enter your last name" /></div>
      <div className="form-row"><label htmlFor="email">Email</label><input id="email" data-testid="email-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your.email@example.com" /></div>
      <div className="form-row"><div data-testid="form-error" className="error" role="alert" aria-live="polite">{error}</div></div>
      <div className="form-row"><button data-testid="confirm-booking-btn" onClick={onConfirm}>✅ Confirm Booking</button></div>
    </main>
  )
}
