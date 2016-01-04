import {makeArray, join} from './Util';
import EscapedString from './EscapedString';

export default class Base {
  constructor(data, open = '', close = '') {
    this.flags = {
      some: false,
      any: false,
      min: false,
      max: false,
      optional: false
    };
    this.data = makeArray(data).map(this.escape);
    this.open = open;
    this.close = close;
  }
  escape(str) {
    return typeof str === 'string'
        ? new EscapedString(str)
        : str;
  }
  get some() {
    this.flags.some = true;
    this.flags.any = false;
    this.flags.min = false;
    this.flags.max = false;
    this.flags.optional = false;
    return this;
  }
  get any() {
    this.flags.any = true;
    this.flags.some = false;
    this.flags.min = false;
    this.flags.max = false;
    this.flags.optional = false;
    return this;
  }
  min(min) {
    return this.range(min, this.flags.max);
  }
  max(max) {
    return this.range(this.flags.min, max);
  }
  range(min, max) {
    this.flags.min = min;
    this.flags.max = max;
    this.flags.any = false;
    this.flags.some = false;
    this.flags.optional = false;
    return this;
  }
  get optional() {
    this.flags.optional = true;
    this.flags.any = false;
    this.flags.some = false;
    this.flags.min = false;
    this.flags.max = false;
    return this;
  }
  toString() {
    var str = join(this.data);
    if (str.length === 0) return '';
    return this.open +
        (this.flags.not ? '^' : '') +
        join(this.data) +
      this.close +
      (this.flags.any ? '*' : '') +
      (this.flags.optional ? '?' : '') +
      this.getRange() +
      (this.flags.some ? '+' : '');
  }
  getRange() {
    if (this.flags.min === false && this.flags.max === false) return '';
    var range = '{';
    range += this.flags.min === false ? '' : this.flags.min;
    range += ',';
    range += this.flags.max === false ? '' : this.flags.max;
    range += '}';
    return range;
  }
}
