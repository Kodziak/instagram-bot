module.exports = {
  launch: {
    headless: false,
    devtools: true,
    slowMo: 10,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  },
  browserContext: "default"
};
