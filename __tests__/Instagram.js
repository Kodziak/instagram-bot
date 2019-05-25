const puppeteer = require("puppeteer");
const LoginUtils = require("../utils/LoginUtils");
const config = require("../config.js");
const HEART_FILLED_SELECTOR = "glyphsSpriteHeart__filled__24__red_5 u-__7";
const TAG = "car";
const RANDOM_TIME = 2250 + Math.floor(Math.random() * 250);

describe("Instagram-bot.", () => {
  const loginPage = "https://www.instagram.com/accounts/login/";

  beforeAll(async () => {
    await puppeteer.launch();
    await LoginUtils.openBrowserWithPage(loginPage);
    jest.setTimeout(100 * 1000);
  });

  afterAll(async () => {
    // await page.close();
    // await this._browser.close();
    // jest.setTimeout(100 * 1000);
  });

  describe("Let's make some subs!", () => {
    test("Goto login card", async () => {
      await LoginUtils.login(config.credentials.login, config.credentials.pass);

      await page.waitForSelector(".aOOlW");
    });

    test("Goto tag", async () => {
      await page.goto(`https://www.instagram.com/explore/tags/${TAG}/`, {
        waitUntil: "load"
      });

      //Click on photo
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
          let isFollowing = await page.evaluate(() => {
            return document
              .querySelector(".M9sTE .sqdOP")
              .classList.contains("_8A5w5");
          });

          if (!isFollowing) {
            await page.waitForSelector(".M9sTE .sqdOP");
            await page.click(".M9sTE .sqdOP");
            await page.waitFor(RANDOM_TIME);
          }

          // await page.type(".Ypffh", "Excellent picture!");
          // await page.waitFor(2000);
          // await page.click('[type="submit"]');
          // await page.waitFor(2000);

          await page.click(".ckWGn");
          await page.waitFor(RANDOM_TIME);
        }
      }
    });
  });
});
