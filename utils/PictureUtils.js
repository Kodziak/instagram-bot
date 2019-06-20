const RANDOM_TIME = 2000 + Math.floor(Math.random() * 250);

// Google Sheet dependencies
const GoogleSpreadsheet = require("google-spreadsheet");
const { promisify } = require("util");
const creds = require("../g-credentials.json");

exports.spreadSheet = async function(followed) {
  const doc = new GoogleSpreadsheet("1518O0UfylfzujNqenkoGnpjBPnNMJ4EttLXpIY3g2hM");
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];

  // Add row to sheet depends on headers.
  await promisify(sheet.addRow)(followed);
};

exports.commentPhoto = async function(page, username) {
  let nicknameComments = await page.$$(".FPmhX");
  let arrComments = await page.evaluate(() => {
    let arr = [];

    document.querySelectorAll(".FPmhX").forEach(el => {
      arr.push(el.textContent);
    });

    return arr;
  });

  let picOwner = await page.$eval(".BrX75", el => el.textContent);
  if (!arrComments.includes(username)) {
    await page.type(".Ypffh", `Excellent picture🔥 Make them more ${picOwner} 🔥`);
    await page.waitFor(2000);
    await page.click('[type="submit"]');
  }
};

exports.likePhoto = async function(page) {
  const HEART_FILLED_SELECTOR = "glyphsSpriteHeart__filled__24__red_5";

  let isHeartFilled = await page.evaluate(selector => {
    return document.querySelector(".ltpMr .dCJp8").firstElementChild.classList.contains(selector);
  }, HEART_FILLED_SELECTOR);

  console.log(isHeartFilled);

  if (!isHeartFilled) {
    await page.waitForSelector('[aria-label="Like"]');
    await page.click('[aria-label="Like"]');
    await page.waitFor(RANDOM_TIME);
  }
};

exports.followUser = async function(page) {
  const FOLLOWED_USER_SELECTOR = "_8A5w5";

  let isFollowing = await page.evaluate(selector => {
    return document.querySelector(".M9sTE .sqdOP").classList.contains(selector);
  }, FOLLOWED_USER_SELECTOR);

  let followed = await exports.followedUserData(page);

  if (!isFollowing) {
    await page.waitForSelector(".M9sTE .sqdOP");
    await page.click(".M9sTE .sqdOP");
    await exports.spreadSheet(followed);

    await page.waitFor(RANDOM_TIME);
  }
};

exports.followedUserData = async function(page) {
  let nickname = await page.$eval(".PdwC2 .FPmhX", el => el.textContent);
  let date = new Date();
  date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  let followed = {};
  followed.nickname = nickname;
  followed.since = date;

  return followed;
};
