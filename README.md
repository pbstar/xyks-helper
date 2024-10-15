## 小猿口算辅助工具（nodejs 版）

github 地址：https://github.com/pbstar/xyks-helper

### 实现原理

通过屏幕截图截取到题目区域的两个数字，然后通过 ocr 识别出数字，最后通过计算得出答案，并通过模拟鼠标绘制答案。

### 依赖插件

- node-screenshots：屏幕截图
- tesseract.js：ocr 识别
- robotjs：模拟鼠标绘制

### 实现步骤

#### 1. 截取屏幕

通过 node-screenshots 插件截取屏幕，截取到题目区域的两个数字，并保存到本地。

```javascript
let monitors = Monitor.all(); // 获取所有显示器
let image = monitors[0].captureImageSync(); // 截取屏幕
let newImage = img.cropSync(item.x, item.y, item.width, item.height); // 截取题目数字区域
fs.writeFileSync(`./src/imgs/${index}.png`, newImage.toPngSync()); // 保存截图到本地
```

#### 2. ocr 识别

通过 tesseract.js 插件对截取到的图片进行 ocr 识别，识别出数字。

```javascript
Tesseract.recognize(
  `./src/imgs/${index}.png`,
  "eng" // 语言代码
).then(({ data: { text } }) => {
  console.log(text); // 输出识别结果
});
```

#### 3. 计算答案

通过计算得出答案。

#### 4. 模拟鼠标绘制

通过 robotjs 插件模拟鼠标绘制答案。

```javascript
robot.moveMouse(mouseX, mouseY); // 移动鼠标到指定位置
robot.mouseToggle("down"); // 模拟鼠标按下
robot.moveMouse(sx, sy); // 移动鼠标到指定位置
robot.mouseToggle("up"); // 模拟鼠标抬起
```

### 使用方法

#### 1. 安装依赖

```
npm install
```

#### 2. 运行程序

```
node index.js
```
