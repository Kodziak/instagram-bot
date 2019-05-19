const puppeteer = require("puppeteer");
const LoginUtils = require("../utils/LoginUtils");
const config = require("../config.js");

describe("Instagram-bot.", () => {
  const loginPage = "https://www.instagram.com/accounts/login/";
  const tag = 'car';  

  beforeAll(async () => {
    await puppeteer.launch();
    await LoginUtils.openBrowserWithPage(loginPage);
    jest.setTimeout(100 * 1000);
  });

  afterAll(async () => {
    await page.close();
    jest.setTimeout(100 * 1000);
  });

  describe("Let's make some subs!", () => {
    test("Goto login card", async () => {
      await LoginUtils.login(config.config.login, config.config.pass);

      await page.waitForSelector('.aOOlW');
      await page.click('.aOOlW');
    });

    test("Goto tag", async () => {
      // await page.goto(`https://www.instagram.com/explore/tags/${tag}/`, {
      //   waitUntil: 'load'
      // });

      await page.waitForSelector('.XTCLo');
      await page.click('.XTCLo');

      await page.keyboard.type('#car');
      await page.waitFor(500);
      await page.click(`[href="/explore/tags/${tag}/"]`);
    });

    test("Check tag", async () => {
      await page.waitForSelector('h1');
      let properTag = await page.$eval('h1', el => el.textContent);
      await expect(properTag).toBe(`#${tag}`);
    })
  });
});
