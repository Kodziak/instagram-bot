module.exports = {
  launch: {
    headless: false,
    devTools: true,
    slowMo: 10,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  browserContext: "default"
};
