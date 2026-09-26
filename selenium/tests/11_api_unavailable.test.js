
const {
  run,
  search,
  futureDates,
  assert,
  API_URL
} = require('./_helpers');

run('11_api_unavailable', async driver => {
  // Block API requests to simulate backend unavailability.
  await driver.sendDevToolsCommand('Network.enable', {});

  await driver.sendDevToolsCommand('Network.setBlockedURLs', {
    urls: [API_URL + '/*']
  });

  await search(driver, futureDates());

  // Read the current DOM on each attempt rather than retaining
  // a WebElement that React may replace during re-rendering.
  const errorMessage = await driver.wait(
    async () => {
      const message = await driver.executeScript(`
        const element = document.querySelector('.error');
        return element ? element.textContent.trim() : '';
      `);

      return /failed to load hotels/i.test(message)
        ? message
        : false;
    },
    20000,
    'Expected API failure message was not displayed'
  );

  assert.match(
    errorMessage,
    /failed to load hotels/i
  );
});
