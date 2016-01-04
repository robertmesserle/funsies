import {makeArray, join} from './Util';
import Base from './Base';

export default class Group extends Base {
  constructor(data) {
    super(data, '(', ')');
  }
}
