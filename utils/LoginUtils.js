exports.login = async function(login, pass) {
  await page.waitForSelector(".HmktE");

  await page.waitForSelector('[name="username"]');
  await page.click('[name="username"]');
  await page.keyboard.type(login);

  await page.click('[name="password"]');
  await page.keyboard.type(pass);

  await page.waitForSelector(".Igw0E button .Igw0E");
  await page.click(".Igw0E button .Igw0E");
};

exports.openBrowserWithPage = async function(url, waitUntil) {
  waitUntil = waitUntil || ["load"];
  url = url || "https://google.com";

  await page.setViewport({ width: 1500, height: 900 });
  await page.goto(url, {
    waitUntil: waitUntil
  });
};
