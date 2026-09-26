const {T,run,search,waitVisible,click,type,futureDates,assert} = require('./_helpers');
run('07_invalid_email',async driver=>{
 await search(driver,futureDates());await waitVisible(driver,T('hotel-name'));await click(driver,T('select-hotel-btn'));
 await type(driver,T('firstname-input'),'Automation');await type(driver,T('lastname-input'),'Tester');
 await type(driver,T('email-input'),'invalid-email');await click(driver,T('confirm-booking-btn'));
 assert.match(await (await waitVisible(driver,T('form-error'))).getText(),/valid email/i);
});
