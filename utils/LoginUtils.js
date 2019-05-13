exports.login = async function(login, pass) {
  await page.waitForSelector(".HmktE");

  await page.type('.-MzZI [name="username"]', login);
  await page.type('.-MzZI [name="password"]', pass);

  await page.waitForSelector(".Igw0E button .Igw0E");
  await page.click(".Igw0E button .Igw0E");
};
