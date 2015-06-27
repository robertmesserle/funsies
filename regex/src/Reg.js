import Set from './Set';
import Group from './Group';
import Str from './Str';
import {join} from './Util';

export default class Reg {
  constructor(callback, flags) {
    this.flags = flags;
    this.cleanupSteps = [];
    this.setup();
    this.regex = callback();
    this.cleanup();
  }
  setup() {
    this.func('literal', Str);
    this.func('group', Group);
    this.func('set', Set);
    this.vari('numbers', '0-9');
    this.vari('letters', {
      toString: () => this.flags.indexOf('i') < 0 ? 'A-Za-z' : 'a-z',
      uppercase: 'A-Z',
      lowercase: 'a-z'
    });
    this.vari('start', '^');
    this.vari('end', '$');
    this.vari('space', '\\s');
    this.vari('word', '\\w');
  }
  cleanup() {
    this.cleanupSteps.forEach(fn => fn());
  }
  toString() {
    return this.regex;
  }
  func(key, obj) {
    var backup = window[key];
    this.cleanupSteps.push(() => window[key] = backup);
    window[key] = function () { return new obj(arguments); };
  }
  vari(key, val) {
    var backup = window[key];
    this.cleanupSteps.push(() => window[key] = backup);
    window[key] = val;
  }
}
