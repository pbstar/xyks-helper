import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const robot = require("@meadowsjared/robotjs");

//模仿手写笔记画图
const drow = (sx, sy, x, y) => {
  //把一段线拆分成很多弯曲小段，模拟手写
  for (let i = 0; i < 4; i++) {
    let dx = (x - sx) / 4;
    let dy = (y - sy) / 4;
    if (i < 2) {
      sx = sx + dx + dx / 5;
      sy = sy + dy + dy / 5
    } else {
      sx = sx + dx - dx / 5;
      sy = sy + dy - dy / 5
    }
    robot.moveMouse(sx, sy);
  }
}

export default function answer(ans) {
  // 鼠标当前位置
  let mouseX = ans.x;
  let mouseY = ans.y;
  // 移动鼠标到绘制起点
  robot.moveMouse(mouseX, mouseY);
  // 模拟鼠标左键按下（开始绘制）
  robot.mouseToggle("down");
  // 绘制
  if (ans.text == '<') {
    mouseX = mouseX - 30
    mouseY = mouseY + 30
    drow(mouseX + 30, mouseY - 30, mouseX, mouseY);
    mouseX = mouseX + 30
    mouseY = mouseY + 30
    drow(mouseX - 30, mouseY - 30, mouseX, mouseY);
  } else if (ans.text == '>') {
    mouseX = mouseX + 30
    mouseY = mouseY + 30
    drow(mouseX - 30, mouseY - 30, mouseX, mouseY);
    mouseX = mouseX - 30
    mouseY = mouseY + 30
    drow(mouseX + 30, mouseY - 30, mouseX, mouseY);
  }
  // 模拟鼠标左键抬起
  robot.mouseToggle("up");
}