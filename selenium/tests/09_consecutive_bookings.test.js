const {T,run,search,waitVisible,click,type,futureDates,API_URL,assert,waitBookingId}=require('./_helpers');
run('09_consecutive_bookings_cleanup',async driver=>{
 const ids=[];
 try {
 for(let n=1;n<=2;n++){
  await search(driver,futureDates());await waitVisible(driver,T('hotel-name'));await click(driver,T('select-hotel-btn'));
  await type(driver,T('firstname-input'),'Sequence');await type(driver,T('lastname-input'),'Tester'+n);
  await type(driver,T('email-input'),`sequence${n}@example.com`);await click(driver,T('confirm-booking-btn'));
  await waitVisible(driver,T('success-message'));const id=await waitBookingId(driver);
  assert.ok(id && id!=='Not found' && id!=='Error');ids.push(id);
 }
 assert.notEqual(ids[0],ids[1]);
 } finally {for(const id of ids) await fetch(`${API_URL}/bookings/${encodeURIComponent(id)}`,{method:'DELETE'})}
});
