import {makeArray, join} from './Util';
import Base from './Base';

export default class Set extends Base {
  constructor(data) {
    super(data, '[', ']');
    this.flags.not = false;
  }
  not() {
    this.flags.not = true;
    return this;
  }
}
