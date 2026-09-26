const {T,run,search,waitVisible,futureDates,assert}=require('./_helpers');
run('10_mobile_viewport',async driver=>{
 await driver.manage().window().setRect({width:390,height:844});
 await search(driver,futureDates());assert.ok(await (await waitVisible(driver,T('hotel-name'))).isDisplayed());
});
