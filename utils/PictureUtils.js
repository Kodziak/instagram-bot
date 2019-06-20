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
  const HEART_FILLED_SELECTOR = "glyphsSpriteHeart__filled__24__red_5 u-__7";

  let isHeartFilled = await page.evaluate(selector => {
    return document.querySelector(".dCJp8").firstElementChild.classList.contains(selector);
  }, HEART_FILLED_SELECTOR);

  if (!isHeartFilled) {
    await page.waitForSelector('[aria-label="Like"]');
    await page.click('[aria-label="Like"]');
    await page.waitFor(RANDOM_TIME);
  }
};

exports.followUser = async function(page) {
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
};
