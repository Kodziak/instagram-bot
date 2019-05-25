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

      const pageTarget = this.page.target(); //save this to know that this was the opener
      const newTarget = await this.browser.waitForTarget(
        target => target.opener() === pageTarget
      ); //check that you opened this page, rather than just checking the url
      const newPage = await newTarget.page(); //get the page object
      // await newPage.once("load",()=>{}); //this doesn't work; wait till page is loaded
      await newPage.waitForSelector(".v1Nh3"); //wait for page to be loaded

      let images = await newPage.$$(".v1Nh3");
      images.forEach(async image => {
        await newPage.click(image);
        await newPage.waitForSelector('[aria-label="Like"]');
        await newPage.click('[aria-label="Like"]');
        await newPage.type(".Ypffh", "Excellent picture!");
      });
    });
  });
});
