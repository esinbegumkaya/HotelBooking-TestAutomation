const {T,run,search,waitVisible,futureDates,assert} = require('./_helpers');
run('05_refresh_results',async driver=>{
 await search(driver,futureDates());await waitVisible(driver,T('hotel-name'));await driver.navigate().refresh();
 assert.ok((await driver.findElements(T('hotel-name'))).length>0);
});
