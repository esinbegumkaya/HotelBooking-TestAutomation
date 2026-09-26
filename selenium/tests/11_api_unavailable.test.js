const {T,run,search,waitVisible,futureDates,assert}=require('./_helpers');
run('11_api_unavailable',async driver=>{
 // Intercept API requests within Chrome via CDP is version-sensitive; instead validate the UI error branch by blocking the API URL using Chrome DevTools.
 const {API_URL}=require('./_helpers');
 await driver.sendDevToolsCommand('Network.enable',{});
 await driver.sendDevToolsCommand('Network.setBlockedURLs',{urls:[API_URL+'/*']});
 await search(driver,futureDates());
 const err=await waitVisible(driver,{using:'css selector',value:'.error'});
 assert.match(await err.getText(),/failed to load hotels/i);
});
