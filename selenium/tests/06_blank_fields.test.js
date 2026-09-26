const {T,run,search,waitVisible,click,futureDates,assert} = require('./_helpers');
run('06_blank_fields',async driver=>{
 await search(driver,futureDates());await waitVisible(driver,T('hotel-name'));await click(driver,T('select-hotel-btn'));
 await click(driver,T('confirm-booking-btn'));
 assert.match(await (await waitVisible(driver,T('form-error'))).getText(),/fill all fields/i);
});
