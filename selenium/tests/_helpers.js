
const { Builder, By, until } = require('selenium-webdriver');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { Options } = require('selenium-webdriver/chrome');

const BASE_URL = (
  process.env.BASE_URL || 'http://localhost:5173'
).replace(/\/$/, '');

const API_URL = (
  process.env.API_URL || 'http://localhost:3001'
).replace(/\/$/, '');

const T = id => By.css(`[data-testid="${id}"]`);

const futureDates = () => {
  const today = new Date();
  today.setUTCHours(12, 0, 0, 0);

  const date = offset => {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() + offset);
    return d.toISOString().slice(0, 10);
  };

  return {
    checkin: date(30),
    checkout: date(32),
    earlier: date(29)
  };
};

async function waitVisible(driver, locator, timeout = 20000) {
  const el = await driver.wait(
    until.elementLocated(locator),
    timeout
  );

  await driver.wait(
    until.elementIsVisible(el),
    timeout
  );

  return el;
}

async function click(driver, locator) {
  const el = await waitVisible(driver, locator);
  await el.click();
}

async function type(driver, locator, value) {
  const el = await waitVisible(driver, locator);
  const inputType = await el.getAttribute('type');

  // Use the native setter for HTML date inputs.
  // This avoids Chrome locale-dependent sendKeys behavior.
  if (inputType === 'date') {
    await driver.executeScript(`
      const input = arguments[0];
      const value = arguments[1];

      const nativeSetter =
        Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          'value'
        ).set;

      nativeSetter.call(input, value);

      input.dispatchEvent(
        new Event('input', { bubbles: true })
      );

      input.dispatchEvent(
        new Event('change', { bubbles: true })
      );
    `, el, value);

    await driver.wait(
      async () => (await el.getAttribute('value')) === value,
      5000,
      'Date input value was not applied correctly'
    );

    return;
  }

  await el.clear();
  await el.sendKeys(value);
}

async function search(
  driver,
  { checkin, checkout, city = 'Istanbul' }
) {
  await driver.get(BASE_URL);

  await click(driver, T('start-booking-btn'));

  await type(driver, T('city-input'), city);
  await type(driver, T('checkin-input'), checkin);
  await type(driver, T('checkout-input'), checkout);

  assert.equal(
    await (await waitVisible(driver, T('checkin-input')))
      .getAttribute('value'),
    checkin,
    'Check-in input mismatch'
  );

  assert.equal(
    await (await waitVisible(driver, T('checkout-input')))
      .getAttribute('value'),
    checkout,
    'Check-out input mismatch'
  );

  await click(driver, T('search-btn'));
}

async function waitBookingId(driver) {
  const el = await waitVisible(
    driver,
    T('reservation-id')
  );

  await driver.wait(async () => {
    const value = (await el.getText()).trim();

    return value &&
      ![
        'Not found',
        'Error',
        'N/A',
        'API not configured'
      ].includes(value);
  }, 20000);

  return (await el.getText()).trim();
}

async function run(name, callback) {
  const options = new Options();

  if (process.env.HEADLESS !== '0') {
    options.addArguments(
      '--headless=new',
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--window-size=1365,900'
    );
  }

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await callback(driver);
    console.log(`PASS ${name}`);
  } catch (error) {
    const out = path.join(
      __dirname,
      '..',
      'artifacts',
      'screenshots'
    );

    fs.mkdirSync(out, { recursive: true });

    const filename =
      name.replace(/[^a-z0-9_-]/gi, '_') + '.png';

    try {
      fs.writeFileSync(
        path.join(out, filename),
        await driver.takeScreenshot(),
        'base64'
      );

      console.error(
        'Screenshot: ' + path.join(out, filename)
      );
    } catch (e) {
      console.error(
        'Screenshot unavailable: ' + e.message
      );
    }

    console.error(error);
    process.exitCode = 1;
  } finally {
    await driver.quit();
  }
}

module.exports = {
  BASE_URL,
  API_URL,
  T,
  assert,
  run,
  click,
  type,
  search,
  waitVisible,
  futureDates,
  waitBookingId
};
