const puppeteer = require("puppeteer");
const LoginUtils = require("../utils/LoginUtils");
const config = require("../config.js");

describe("Instagram-bot.", () => {
  const page = "https://www.instagram.com/";
  const loginPage = "https://www.instagram.com/accounts/login/";
  jest.setTimeout(10 * 1000);

  beforeAll(async () => {
    await puppeteer.launch();
    await LoginUtils.openBrowserWithPage(loginPage);
  });

  afterAll(async () => {
    await page.close();
  });

  describe("Let's make some subs!", () => {
    test("Goto login card", async () => {
      await LoginUtils.login(config.login, config.pass);

      let login = await page.evaluate(() => {
        return document.querySelector(".gmFkV").textContent;
      });
      await expect(login).toBe("xxblackx_xbeautyxx");
    });
  });
});
