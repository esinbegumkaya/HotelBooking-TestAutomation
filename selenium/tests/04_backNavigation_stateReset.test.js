const {T,run,search,waitVisible,futureDates,assert} = require('./_helpers');
run('04_back_navigation',async driver=>{
 await search(driver,futureDates());await waitVisible(driver,T('hotel-name'));
 await driver.navigate().back();await waitVisible(driver,T('city-input'));
 assert.equal(await driver.findElement(T('city-input')).getAttribute('value'),'');
});
