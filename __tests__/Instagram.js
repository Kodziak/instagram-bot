const puppeteer = require("puppeteer");
const URL = "https://www.instagram.com/accounts/login/";
const URLTags = "https://www.instagram.com/explore/tags";
const LoginUtils = require("../utils/LoginUtils");
const PictureUtils = require("../utils/PictureUtils");
const config = require("../config.js");
const FOLLOWED_USER_SELECTOR = "_8A5w5";
const TAGS = ["girl", "code"];
const RANDOM_TIME = 2000 + Math.floor(Math.random() * 250);

// Google Sheet dependencies
const GoogleSpreadsheet = require("google-spreadsheet");
const { promisify } = require("util");
const creds = require("../g-credentials.json");

async function accessSpreadsheet(followed) {
  const doc = new GoogleSpreadsheet("1518O0UfylfzujNqenkoGnpjBPnNMJ4EttLXpIY3g2hM");
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];

  // Add row to sheet depends on headers.
  await promisify(sheet.addRow)(followed);
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

    test.each(TAGS)("Goto tag", async TAG => {
      await page.goto(`${URLTags}/${TAG}/`, {
        waitUntil: "load"
      });

      await page.waitForSelector(".Nnq7C");

      for (let row = 1; row < 4; row++) {
        for (let img = 1; img < 4; img++) {
          await page.waitForSelector(`.EZdmt .Nnq7C:nth-child(${row}) .v1Nh3:nth-child(${img}) .FFVAD`);

          await page.click(`.EZdmt .Nnq7C:nth-child(${row}) .v1Nh3:nth-child(${img}) .FFVAD`);

          await page.waitFor(RANDOM_TIME);

          //Click on heart
          await PictureUtils.likePhoto(page);

          //Follow user
          let isFollowing = await page.evaluate(selector => {
            return document.querySelector(".M9sTE .sqdOP").classList.contains(selector);
          }, FOLLOWED_USER_SELECTOR);

          let nickname = await page.$eval(".PdwC2 .FPmhX", el => el.textContent);
          let date = new Date();
          date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

          let followed = {};
          followed.nickname = nickname;
          followed.since = date;

          if (!isFollowing) {
            await page.waitForSelector(".M9sTE .sqdOP");
            await page.click(".M9sTE .sqdOP");
            await accessSpreadsheet(followed);

            await page.waitFor(RANDOM_TIME);
          }

          await PictureUtils.commentPhoto(page, "_jacos1_");

          await page.click(".ckWGn");
          await page.waitFor(RANDOM_TIME);
        }
      }
    });
  });
});

// TODO: Create a unfollow function after n days.
