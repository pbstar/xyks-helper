
import { createRequire } from 'module'; 
const require = createRequire(import.meta.url);
const { Window } = require("node-screenshots");

import processImgs from './src/process_imgs.js';
import answer from './src/answer.js';

let windows = Window.all();

windows.forEach((item) => {
  console.log({
    id: item.id,
    x: item.x,
    y: item.y,
    width: item.width,
    height: item.height,
  });
  if (item.id == "67724") {
    let image = item.captureImageSync();
    let items = [{
      x: 140,
      y: 145,
      width: 15,
      height: 30
    },{
      x: 140,
      y: 175,
      width: 15,
      height: 30
    }];
    processImgs(image, items).then(res => {
      console.log(res);

      answer()
    });
  }
});
// 截图
// 识别
// 计算
// 答题