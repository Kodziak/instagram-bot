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
      await page.waitForSelector(".v1Nh3");
      let images = await page.$$(".v1Nh3");
      // console.log(images, images.length);

      await page.click(".v1Nh3");
      await page.waitFor(RANDOM_TIME);

      //Click on heart
      let heartSelector = await page.evaluate(() => {
        return document.querySelector(".dCJp8").firstElementChild.className;
      });

      if (heartSelector !== HEART_FILLED_SELECTOR) {
        await page.waitForSelector('[aria-label="Like"]');
        await page.click('[aria-label="Like"]');
        await page.waitFor(RANDOM_TIME);
      }

      let comments = await page.$$(".TlrDj");
      comments = Array.from(comments);
      comments.forEach(comment => {
        console.log(comment.textContent);
      });
      // comments.forEach(comment => {
      //   console.log(comment.textContent);
      // });

      // await page.type(".Ypffh", "Excellent picture!");
      // await page.waitFor(2000);
      // await page.click('[type="submit"]');
      // await page.waitFor(2000);

      await page.click(".ckWGn");
    });
  });
});
