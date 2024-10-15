
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Monitor } = require("node-screenshots");

import processImgs from './src/process_imgs.js';
import answer from './src/answer.js';

let monitors = Monitor.all();
const start = (win) => {
  let image = win.captureImageSync();
  let items = [{
    x: 192,
    y: 270,
    width: 50,
    height: 40,
    text: ''
  }, {
    x: 310,
    y: 270,
    width: 50,
    height: 40,
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
    console.log('res1:' + res1 + ';res2:' + res2);
    // 判断结果是否包含数字
    const regex = /\d/;
    if (!regex.test(res1) || !regex.test(res2)) {
      setTimeout(() => {
        start(win);
      }, 2000);
      return;
    }
    res1 = parseInt(res1);
    res2 = parseInt(res2);
    if (res1 > res2) ans.text = '>';
    else if (res1 < res2) ans.text = '<';
    answer(ans).then(() => {
      console.log('res1:' + res1 + ';res2:' + res2 + ';ans:' + ans.text);
      setTimeout(() => {
        start(win);
      }, 500);
    })
  });
}
if (monitors.length > 0) {
  console.log('-----------初始化完毕------------')
  start(monitors[0]);
}