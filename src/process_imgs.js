import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { fileURLToPath } from 'url';
const fs = require("fs");
const path = require("path");
const Tesseract = require('tesseract.js');
const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);
const dirPath = path.join(__dirname, 'imgs');
console.log(dirPath);

export default function processImgs(img, items) {
  return new Promise((resolve, reject) => {
    let okNumber = 0;
    items.forEach((item, index) => {
      let newImage = img.cropSync(item.x, item.y, item.width, item.height);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
      fs.writeFileSync(`./src/imgs/${index}.png`, newImage.toPngSync());
      Tesseract.recognize(
        `./src/imgs/${index}.png`,
        'eng', // 语言代码
      ).then(({ data: { text } }) => {
        // 去掉空格换行符号等
        text = text.replace(/[\r\n\s]/g, '');
        item.text = text;
        okNumber++;
        if (okNumber === items.length) {
          resolve(items);
        }
      }).catch(err => {
        console.error(err);
      });
    })
  })
}