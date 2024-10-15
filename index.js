
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Monitor } = require("node-screenshots");

import processImgs from './src/process_imgs.js';
import answer from './src/answer.js';

let monitors = Monitor.all();
const start = (item) => {
  let image = item.captureImageSync();
  let items = [{
    x: 195,
    y: 275,
    width: 50,
    height: 30,
    text: ''
  }, {
    x: 310,
    y: 275,
    width: 50,
    height: 30,
    text: ''
  }];
  let ans = {
    x: 200,
    y: 500,
    text: ''
  }
  processImgs(image, items).then(res => {
    let res1 = res[0].text;
    let res2 = res[1].text;
    // 判断结果是否为数字
    if (!res1.match(/^[0-9]+$/) || !res2.match(/^[0-9]+$/)) {
      return;
    }
    res1 = parseInt(res1);
    res2 = parseInt(res2);
    if (res1 > res2) ans.text = '>';
    else if (res1 < res2) ans.text = '<';
    console.log('res1:' + res1 + ';res2:' + res2 + ';ans:' + ans.text);
    answer(ans)
  });
}
if (monitors.length > 0) {
  console.log('-----------初始化完毕------------')
  setInterval(() => {
    start(monitors[0]);
  }, 900);
}