const {T,run,search,waitVisible,futureDates,assert} = require('./_helpers');
run('03_same_day_rejected_by_ui',async driver=>{
 const d=futureDates();await search(driver,{checkin:d.checkin,checkout:d.checkin});
 assert.match(await (await waitVisible(driver,T('date-error'))).getText(),/after/i);
});
