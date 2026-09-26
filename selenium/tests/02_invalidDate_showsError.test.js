const {T,run,search,waitVisible,futureDates,assert} = require('./_helpers');
run('02_invalid_date',async driver=>{
 const d=futureDates();await search(driver,{checkin:d.checkout,checkout:d.checkin});
 assert.match((await (await waitVisible(driver,T('date-error'))).getText()).toLowerCase(),/after/);
});
