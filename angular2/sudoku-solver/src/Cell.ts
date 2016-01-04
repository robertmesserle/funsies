export class Cell {
  private _value: string;
  private _candidates: string;
  private _siblings: Cell[];
  private _siblingRow: Cell[];
  private _siblingCol: Cell[];
  private _siblingSec: Cell[];
  focus: boolean;
  row: number;
  col: number;
  sec: number;
  user: boolean;

  constructor(row: number, col: number, sec: number) {
    this.row = row;
    this.col = col;
    this.sec = sec;
    this.candidates = '123456789';
  }

  set value(value) {
    if (isNaN(Number(value)))
      return;
    this._value = value;
    this.candidates = '';
    this.siblings.forEach(cell => {
      cell.siblings.splice(cell.siblings.indexOf(this), 1);
      cell.removeCandidate(value);
    });
  }

  get value() { return this._value; }

  set candidates(value) {
    if (this._candidates === value)
      return;
    this._candidates = value;
    this.siblings && this.siblings.forEach(cell => cell.checkIfLastOption());
  }

  get candidates() { return this._candidates; }

  set siblings(value) {
    this._siblings = value;
    this._siblingRow = this.siblings.filter(cell => cell.row == this.row);
    this._siblingCol = this.siblings.filter(cell => cell.col == this.col);
    this._siblingSec = this.siblings.filter(cell => cell.sec == this.sec);
  }

  get siblings() { return this._siblings; }

  cloneFrom(cell: Cell) {
    this._value = cell.value;
    this._candidates = cell.candidates;
  }

  handleClick(value: string) {
    this.user = true;
    this.value = value;
  }

  removeCandidate(value: string) {
    this.candidates = this.candidates.replace(value, '');
    if (this.candidates.length == 1)
      this.value = this.candidates;
    this.checkIfLastOption();
  }

  static findInSet(haystack: Array<Cell>, needle: string) {
    let found = false;
    for (let i in haystack) {
      if (haystack[i].candidates.indexOf(needle) >= 0 ||
          haystack[i].value === needle)
        found = true;
    }
    return found;
  }

  checkIfLastOption() {
    if (!this.siblings)
      return;
    for (let index in this.candidates.split('')) {
      let candidate = this.candidates.charAt(index);
      if (!Cell.findInSet(this._siblingRow, candidate) ||
          !Cell.findInSet(this._siblingCol, candidate) ||
          !Cell.findInSet(this._siblingSec, candidate)) {
        this.value = candidate;
        return;
      }
    }
  }
}
