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
    jest.setTimeout(10 * 1000);
  });

  describe("Let's make some subs!", () => {
    test("Goto login card", async () => {
      await LoginUtils.login(config.config.login, config.config.pass);

      await page.waitForSelector('.aOOlW');
      await page.click('.aOOlW');
    });

    test("Goto tag", async () => {
      await page.goto(`https://www.instagram.com/explore/tags/${tag}/`);

      await page.waitForSelector('._7UhW9');
      let properTag = await page.$eval('._7UhW9', el => el.textContent);
      await expect(properTag).toBe(`#${tag}`);
    });
  });
});
