
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Monitor } = require("node-screenshots");

import processImgs from './src/process_imgs.js';
import answer from './src/answer.js';

let monitors = Monitor.all();
const start = (item) => {
  let image = item.captureImageSync();
  let items = [{
    x: 140,
    y: 145,
    width: 100,
    height: 30
  }, {
    x: 140,
    y: 175,
    width: 150,
    height: 30
  }];
  let ans = {
    x: 140,
    y: 215,
    text: ''
  }
  processImgs(image, items).then(res => {
    console.log(res);

    // answer(ans)
  });
}
if (monitors.length > 0) {
  console.log('-----------初始化完毕------------')
  setInterval(() => {
    start(monitors[0]);
  }, 5000);
}