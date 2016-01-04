import Reg from './Reg';
import {join} from './Util';

window.generateRegex = generateRegex;

function generateRegex(callback, flags) {
  var reg = new Reg(callback, flags),
      str = reg.toString();
  return new RegExp(join(str), flags);
}
