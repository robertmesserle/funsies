import {makeArray, join} from './Util';
import Group from './Group';
import Base from './Base';

export default class Str extends Base {
  constructor(data) {
    super(data);
  }
  hasFlags() {
    for (let val in this.flags) {
      if (this.flags[val]) return true;
    }
  }
  toString() {
    var str = join(this.data);
    if (this.hasFlags() && str.length > 1) {
      let grp = new Group(this.data);
      grp.flags = this.flags;
      return grp.toString();
    } else {
      return super.toString();
    }
  }
}
