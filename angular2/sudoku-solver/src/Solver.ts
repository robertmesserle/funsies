/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, NgFor, NgIf} from 'angular2/angular2';
import {Board} from './Board';

@Component({selector : 'solver'})
@View({
  templateUrl : 'Solver.html',
  styleUrls : [ 'Solver.css' ],
  directives : [ NgFor, NgIf ]
})
class Solver {
  board: Board;
  constructor() { this.board = new Board(); }
}
bootstrap(Solver);
