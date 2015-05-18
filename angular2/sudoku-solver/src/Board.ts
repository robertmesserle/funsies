/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, For, If} from 'angular2/angular2';

interface BoardData {
  cells: Cell[];
  rows:  Cell[][];
}

@Component({ selector: 'board' })
@View({
  template: `
    <h1>Sudoku Solver</h1>
    <p>
      Status:
      <span *if="!complete" style="color: orangered;">Incomplete</span>
      <span *if="complete && !valid" style="color: orangered;">Invalid</span>
      <span *if="complete && valid" style="color: seagreen;">Complete + Valid</span>
    </p>
    <nav *if="!empty">
      <label>Options:</label>
      <a href="javascript:;" (click)="reset()">Reset</a>
      <a *if="!complete" href="javascript:;" (click)="solve(0, 0, 0, true)">Solve</a>
    </nav>
    <nav *if="empty">
      <label>Fill with:</label>
      <a href="javascript:;" (click)="fillWithEasy()">Easy 1</a>
      <a href="javascript:;" (click)="fillWithDifficult(1)">Difficult 1</a>
      <a href="javascript:;" (click)="fillWithDifficult(2)">Difficult 2</a>
      <a href="javascript:;" (click)="fillWithImpossible(1)">Impossible 1</a>
      <a href="javascript:;" (click)="fillWithImpossible(2)">Impossible 2</a>
      <a href="javascript:;" (click)="fillWithString()">Custom</a>
    </nav>
    <br/>
    <table>
      <tr *for="#row of data.rows">
        <td *for="#cell of row" [class.user]="cell.user">
          <a href="javascript:;"
              *for="#value of cell.candidates.replace(cell.value, '').split('')"
              (click)="cell.handleClick(value)">{{value}}</a>
          <label *if="cell.value">{{cell.value}}</label>
        </td>
      </tr>
    </table>
  `,
  directives: [ For, If ]
})

class Board {
  static root: Board;
  data: BoardData;

  constructor() {
    if (!Board.root) Board.root = this;
    this.reset();
  }

  get empty () {
    for (let i in this.data.cells) {
      if (this.data.cells[i].value) return false;
    }
    return true;
  }

  get complete () {
    for (let i in this.data.cells) {
      if (!this.data.cells[i].value) return false;
    }
    return true;
  }

  get valid() {
    return this.validateBy('row') && this.validateBy('col') && this.validateBy('sec');
  }

  solve(attempt = 0, cellNumber = 0, depth = 0, root = false) {
    let board = this.clone();
    let set = board.data.cells.filter(cell => !cell.value);
    let cell = set[cellNumber];
    if (!cell) return;
    let index = board.data.cells.indexOf(cell);
    let value = cell.candidates.charAt(attempt);
    let candidates = cell.candidates;
    cell.value = value;
    handleSolveAttempt(this, board);
    if (root && !this.valid) alert('I have failed you!');
    function handleSolveAttempt(parent:Board, board:Board) {
      if (board.complete) {
        if (board.valid) {
          parent.data.cells[index].value = value;
        } else {
          parent.data.cells[index].removeCandidate(value);
          parent.solve();
        }
      } else {
        if (attempt < candidates.length - 1) parent.solve(attempt + 1, cellNumber);
        else if (cellNumber < set.length - 1) parent.solve(0, cellNumber + 1);
        else if (depth === 0) {
          board.solve(0, 0, depth + 1);
          handleSolveAttempt(parent, board);
        }
      }
    }
  }

  reset() {
    this.data = Board.createCells();
  }

  fillWithEasy() {
    this.fillBoard('-----8--4-84-16------5--1--1-38--9--6-8---4-3--2--95-1--7--2------78-26-2--3-----');
  }

  fillWithDifficult(number:number) {
    switch (number) {
      case 1: return this.fillBoard('86--2-------7---59-------------6-8---4---------53----7----------2----6----75-9---');
      case 2: return this.fillBoard('----8-2-4--------5-826-4------8---3--6-9-2-4--7---5------3-962-7--------1-3-4----');
    }
  }

  fillWithImpossible(number:number) {
    switch (number) {
      case 1: return this.fillBoard('1----7-9--3--2---8--96--5----53--9---1--8---26----4---3------1--4------7--7---3--');
      case 2: return this.fillBoard('8----------36------7--9-2---5---7-------457-----1---3---1----68--85---1--9----4--');
    }
  }

  fillWithString() {
    this.fillBoard(prompt('Enter a string using `-` for empty squares'));
  }

  fillBoard(str:string) {
    this.reset();
    this.data.cells.forEach((cell, index) => {
      let char = str.charAt(index);
      if (!isNaN(Number(char))) cell.handleClick(str.charAt(index));
    });
  }

  clone() {
    let board = new Board();
    board.data.cells.forEach((cell, index) => cell.cloneFrom(this.data.cells[index]));
    return board;
  }

  validateBy(type:string) {
    for (var i = 0; i < 9; i++) {
      let set = this.data.cells.filter(cell => getCellType(cell, type) === i);
      let values = set.map(cell => cell.value);
      if (values.sort().join('') !== '123456789') return false;
    }
    return true;
    function getCellType(cell:Cell, type:string) {
      switch (type) {
        case 'row': return cell.row;
        case 'col': return cell.col;
        case 'sec': return cell.sec;
      }
    }
  }

  static createCells() {
    let data:BoardData = { cells: [], rows: [], cols: [] };
    //-- pre-populate rows and cols with arrays
    for (let i = 0; i < 9; i++) {
      data.rows[i] = [];
    }
    //-- generate all 81 cells
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        let section = parseInt(String(Math.floor(row / 3)) + String(Math.floor(col / 3)), 3);
        let cell = new Cell(row, col, section);
        data.cells.push(cell);
        data.rows[row][col] = cell;
      }
    }
    //-- add siblings to each cell
    data.cells.forEach(cell => cell.siblings = data.cells.filter(c => c !== cell
        && (c.row == cell.row || c.col == cell.col || c.sec == cell.sec)));
    return data;
  }
}

class Cell {
  private _value: string;
  private _candidates: string;
  private _siblings: Cell[];
  private _siblingRow: Cell[];
  private _siblingCol: Cell[];
  private _siblingSec: Cell[];
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

  set value (value) {
    if (isNaN(Number(value))) return;
    this._value = value;
    this.candidates = '';
    this.siblings.forEach(cell => {
      cell.siblings.splice(cell.siblings.indexOf(this), 1);
      cell.removeCandidate(value);
    });
  }

  get value() {
    return this._value;
  }

  set candidates(value) {
    if (this._candidates === value) return;
    this._candidates = value;
    this.siblings && this.siblings.forEach(cell => cell.checkIfLastOption());
  }

  get candidates() {
    return this._candidates;
  }

  set siblings(value) {
    this._siblings = value;
    this._siblingRow = this.siblings.filter(cell => cell.row == this.row);
    this._siblingCol = this.siblings.filter(cell => cell.col == this.col);
    this._siblingSec = this.siblings.filter(cell => cell.sec == this.sec);
  }

  get siblings() {
    return this._siblings;
  }

  cloneFrom(cell:Cell) {
    this._value = cell.value;
    this._candidates = cell.candidates;
  }

  handleClick(value:string) {
    this.user = true;
    this.value = value;
  }

  removeCandidate(value:string) {
    this.candidates = this.candidates.replace(value, '');
    if (this.candidates.length == 1) this.value = this.candidates;
    this.checkIfLastOption();
  }

  static findInSet(haystack:Array<Cell>, needle:string) {
    let found = false;
    for (let i in haystack) {
      if (haystack[i].candidates.indexOf(needle) >= 0
          || haystack[i].value === needle) found = true;
    }
    return found;
  }

  checkIfLastOption() {
    if (!this.siblings) return;
    for (let index in this.candidates.split('')) {
      let candidate = this.candidates.charAt(index);
      if (!Cell.findInSet(this._siblingRow, candidate)
          || !Cell.findInSet(this._siblingCol, candidate)
          || !Cell.findInSet(this._siblingSec, candidate)) {
        this.value = candidate;
        return;
      }
    }
  }

}

bootstrap(Board);
