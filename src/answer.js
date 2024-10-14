import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const robot = require("@meadowsjared/robotjs");

export default function processImgs(res) {
  robot.typeString("Hello World");
}