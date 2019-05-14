const LoginUtils = require("../utils/LoginUtils");
const config = require("../config.js");

describe("Instagram-bot.", () => {
  const page = "https://www.instagram.com/";
  const loginPage = "https://www.instagram.com/accounts/login/";

  beforeAll(async () => {
    await LoginUtils.openBrowserWithPage(loginPage);
    jest.setTimeout(10 * 1000);
  });

  describe("Let's make some subs!", () => {
    test("Goto login card", async () => {
      console.log(config.login, config.pass);
      await LoginUtils.login(config.login, config.pass);
    });
  });
});
