export default class EscapedString {
  constructor(data) {
    this.data = data.replace(/[\.\[\]\(\)\+\*\{\}\,]/g, '\\$&');
  }
  toString() {
    return this.data;
  }
}
