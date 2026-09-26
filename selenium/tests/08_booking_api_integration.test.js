const {T,run,search,waitVisible,click,type,futureDates,API_URL,assert,waitBookingId} = require('./_helpers');
run('08_ui_api_integration_cleanup',async driver=>{
 const d=futureDates();let id;
 try {
  await search(driver,d);await waitVisible(driver,T('hotel-name'));await click(driver,T('select-hotel-btn'));
  await type(driver,T('firstname-input'),'Integration');await type(driver,T('lastname-input'),'Test');
  await type(driver,T('email-input'),'integration@example.com');await click(driver,T('confirm-booking-btn'));
  await waitVisible(driver,T('success-message'));id=await waitBookingId(driver);
  assert.ok(id && id!=='Not found' && id!=='Error');
  const result=await fetch(`${API_URL}/bookings/${encodeURIComponent(id)}`);
  assert.equal(result.status,200);const booking=await result.json();
  assert.equal(booking.firstname,'Integration');assert.equal(booking.email,'integration@example.com');
  assert.equal(booking.checkin,d.checkin);
 } finally {
  if(id) {const response=await fetch(`${API_URL}/bookings/${encodeURIComponent(id)}`,{method:'DELETE'});assert.ok([200,204].includes(response.status),'Test booking cleanup failed')}
 }
});
