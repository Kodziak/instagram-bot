const LoginUtils = require("../utils/LoginUtils");
const config = require("../config");

describe("Instagram-bot.", () => {
  const page = "https://www.instagram.com/";
  const loginPage = "https://www.instagram.com/accounts/login/";

  beforeAll(async () => {
    await page.goto(loginPage, {
      waitUntil: "load"
    });
  });

  describe("Let's make some subs!", () => {
    test("Goto login card", async () => {
      await LoginUtils.login(config.login, config.pass);
    });
  });
});
