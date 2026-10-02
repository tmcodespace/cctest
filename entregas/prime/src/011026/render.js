const path = require('path');
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');
const OUT = require('path').resolve(__dirname, '../../2026/OUT/01');
const MAP = {
  'feed-1': 'FEED_011026_1_1A', 'feed-2': 'FEED_011026_1_2A', 'feed-3': 'FEED_011026_1_3A',
  'feed-4': 'FEED_011026_1_4A', 'feed-5': 'FEED_011026_1_5A',
  'li-cover': 'ARTG_011026_1A', 'story': 'STRY_011026_1A',
};
(async () => {
  require('fs').mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1300, height: 2200 }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.join(__dirname, 'alzheimer.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(800);
  const fam = await p.evaluate(() => document.fonts.check('700 40px Montserrat'));
  console.log('Montserrat loaded:', fam);
  for (const [id, name] of Object.entries(MAP)) {
    await p.locator('#' + id).screenshot({ path: `${OUT}/${name}.jpg`, type: 'jpeg', quality: 95 });
    console.log(name);
  }
  await b.close();
})();
