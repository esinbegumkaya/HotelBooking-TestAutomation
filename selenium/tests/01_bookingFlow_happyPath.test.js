const {T,run,click,type,search,waitVisible,futureDates,assert,waitBookingId,API_URL} = require('./_helpers');
run('01_booking_happy_path',async driver=>{
 const d=futureDates();await search(driver,d);await waitVisible(driver,T('hotel-name'));
 await click(driver,T('select-hotel-btn'));
 await type(driver,T('firstname-input'),'Automation');await type(driver,T('lastname-input'),'Tester');
 await type(driver,T('email-input'),'automation@example.com');await click(driver,T('confirm-booking-btn'));
 await waitVisible(driver,T('success-message'));const id=await waitBookingId(driver);
 assert.ok(id);
 const deleted=await fetch(`${API_URL}/bookings/${encodeURIComponent(id)}`,{method:'DELETE'});assert.ok(deleted.ok);
});
