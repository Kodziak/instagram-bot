exports.login = async function(login, pass) {
  await page.waitForSelector(".HmktE");

  await page.focus('.-MzZI [name="username"]');
  await page.type('.-MzZI [name="username"]', login);

  await page.focus('.-MzZI [name="password"]');
  await page.type('.-MzZI [name="password"]', pass);

  await page.waitForSelector(".Igw0E button .Igw0E");
  await page.click(".Igw0E button .Igw0E");
};

exports.openBrowserWithPage = async function(url, waitUntil) {
  waitUntil = waitUntil || ["load"];
  url = url || "https://google.com";

  await page.goto(url, {
    waitUntil: waitUntil
  });
};
