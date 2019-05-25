const puppeteer = require("puppeteer");
const LoginUtils = require("../utils/LoginUtils");
const config = require("../config.js");

describe("Instagram-bot.", () => {
  const loginPage = "https://www.instagram.com/accounts/login/";
  const tag = "car";

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
      await page.goto(`https://www.instagram.com/explore/tags/${tag}/`, {
        waitUntil: "load"
      });

      await page.waitForSelector(".v1Nh3");

      await page.click(".v1Nh3");
      await page.waitFor(2000);
      await page.waitForSelector('[aria-label="Like"]');
      await page.click('[aria-label="Like"]');
      await page.waitFor(2000);

      await page.type(".Ypffh", "Excellent picture!");
      await page.waitFor(2000);
    });
  });
});
