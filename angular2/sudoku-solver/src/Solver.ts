/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, For, If} from 'angular2/angular2';
import {Board} from './Board';

@Component({ selector: 'solver' })
@View({
  template: `
    <h1>Sudoku Solver in Angular2</h1>
    <p>
      Status:
      <span *if="!board.complete" style="color: orangered;">Incomplete</span>
      <span *if="board.complete && !board.valid" style="color: orangered;">Invalid</span>
      <span *if="board.complete && board.valid" style="color: seagreen;">Complete + Valid</span>
    </p>
    <nav *if="!board.empty">
      <label>Options:</label>
      <a href="javascript:;" (click)="board.reset()">Reset</a>
      <a *if="!board.complete" href="javascript:;" (click)="board.solve(0, 0, 0, true)">Solve</a>
    </nav>
    <nav *if="board.empty">
      <label>Fill with:</label>
      <a href="javascript:;" (click)="board.fillWithEasy()">Easy 1</a>
      <a href="javascript:;" (click)="board.fillWithDifficult(1)">Difficult 1</a>
      <a href="javascript:;" (click)="board.fillWithDifficult(2)">Difficult 2</a>
      <a href="javascript:;" (click)="board.fillWithImpossible(1)">Impossible 1</a>
      <a href="javascript:;" (click)="board.fillWithImpossible(2)">Impossible 2</a>
      <a href="javascript:;" (click)="board.fillWithString()">Custom</a>
    </nav>
    <br/>
    <table>
      <tr *for="#row of board.data.rows">
        <td *for="#cell of row" [class.user]="cell.user">
          <span *for="#value of [1, 2, 3, 4, 5, 6, 7, 8, 9]"
              [class.invisible]="cell.candidates.indexOf(value) < 0 || cell.value || cell.focus">
            {{value}}
          </span>
          <input type="number" min="1" max="9"
            [value]="cell.value"
            (change)="board.handleValue(cell.value = $event.target.value)"
            (focus)="cell.focus = true"
            (blur)="cell.focus = false"/>
        </td>
      </tr>
    </table>
  `,
  directives: [ For, If ]
})
class Solver {
  board: Board;
  constructor() {
    this.board = new Board();
  }
}
bootstrap(Solver);
