import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const robot = require("@meadowsjared/robotjs");

export default function processImgs(answer) {
  // 鼠标当前位置
  let mouseX = answer.x;
  let mouseY = answer.y;
  // 移动鼠标到绘制起点
  robot.moveMouse(mouseX, mouseY);
  // 模拟鼠标左键按下（开始绘制）
  robot.mouseToggle("down");
  // 绘制
  if (answer.text == '<') {
    mouseX = mouseX - 50
    mouseY = mouseY + 50
    robot.moveMouse(mouseX, mouseY);
    mouseX = mouseX + 50
    mouseY = mouseY + 50
    robot.moveMouse(mouseX, mouseY);
  } else if (answer.text == '>') {
    mouseX = mouseX + 50
    mouseY = mouseY + 50
    robot.moveMouse(mouseX, mouseY);
    mouseX = mouseX - 50
    mouseY = mouseY + 50
    robot.moveMouse(mouseX, mouseY);
  }
  // 模拟鼠标左键抬起（结束绘制左半部分）
  robot.mouseToggle("up");
}