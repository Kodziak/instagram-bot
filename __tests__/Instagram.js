const puppeteer = require("puppeteer");
const URL = "https://www.instagram.com/accounts/login/";
const URLTags = "https://www.instagram.com/explore/tags";
const LoginUtils = require("../utils/LoginUtils");
const config = require("../config.js");
const HEART_FILLED_SELECTOR = "glyphsSpriteHeart__filled__24__red_5 u-__7";
const FOLLOWED_USER_SELECTOR = "_8A5w5";
const TAG = "polishgirl";
const RANDOM_TIME = 2000 + Math.floor(Math.random() * 250);

// Google Sheet dependencies
const GoogleSpreadsheet = require("google-spreadsheet");
const { promisify } = require("util");
const creds = require("../g-credentials.json");

async function accessSpreadsheet(followed) {
  const doc = new GoogleSpreadsheet(
    "1518O0UfylfzujNqenkoGnpjBPnNMJ4EttLXpIY3g2hM"
  );
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];

  // Add row to sheet depends on headers.
  await promisify(sheet.addRow)(followed.nickname, followed.since);
}

describe("Instagram-bot.", () => {
  beforeAll(async () => {
    await puppeteer.launch();
    await LoginUtils.openBrowserWithPage(URL);
    jest.setTimeout(100 * 1000);
  });

  describe("Let's make some subs!", () => {
    test("Goto login card", async () => {
      await LoginUtils.login(config.credentials.login, config.credentials.pass);

      await page.waitForSelector(".aOOlW");
    });

    test("Goto tag", async () => {
      await page.goto(`${URLTags}/${TAG}/`, {
        waitUntil: "load"
      });

      await page.waitForSelector(".Nnq7C");

      for (let row = 1; row < 4; row++) {
        for (let img = 1; img < 4; img++) {
          await page.waitForSelector(
            `.EZdmt .Nnq7C:nth-child(${row}) .v1Nh3:nth-child(${img}) .FFVAD`
          );

          await page.click(
            `.EZdmt .Nnq7C:nth-child(${row}) .v1Nh3:nth-child(${img}) .FFVAD`
          );

          await page.waitFor(RANDOM_TIME);

          //Click on heart
          let isHeartFilled = await page.evaluate(selector => {
            return document
              .querySelector(".dCJp8")
              .firstElementChild.classList.contains(selector);
          }, HEART_FILLED_SELECTOR);

          if (!isHeartFilled) {
            await page.waitForSelector('[aria-label="Like"]');
            await page.click('[aria-label="Like"]');
            await page.waitFor(RANDOM_TIME);
          }

          //Follow user
          let isFollowing = await page.evaluate(selector => {
            return document
              .querySelector(".M9sTE .sqdOP")
              .classList.contains(selector);
          }, FOLLOWED_USER_SELECTOR);

          if (!isFollowing) {
            await page.waitForSelector(".M9sTE .sqdOP");
            await page.click(".M9sTE .sqdOP");
            await page.waitFor(RANDOM_TIME);
          }

          // await page.type(".Ypffh", "Excellent picture!");
          // await page.waitFor(2000);
          // await page.click('[type="submit"]');

          // followed - an object contains 2 properties: nickname and since
          await accessSpreadsheet(followed);

          await page.click(".ckWGn");
          await page.waitFor(RANDOM_TIME);
        }
      }
    });
  });
});
