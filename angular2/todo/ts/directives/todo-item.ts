import {Component, Input} from 'angular2/core';
import {Task} from '../models/task.ts';

@Component({
  selector: 'todo-item',
  styles: [
    `
    label {
      display: block;
      padding: 18px 12px 18px 36px;
      cursor: pointer;
      position: relative;
      line-height: 24px;
    }
    .completed {
      text-decoration: line-through;
    }
    input {
      position: absolute;
      left: 12px;
      top: 30px;
      transform: translateY(-50%);
      margin: 0;
    }
  `
  ],
  template: `
    <label>
      <input type="checkbox" [(ngModel)]="task.completed">
      <span class="task-name" [class.completed]="task.completed">{{ task.name }}</span>
    </label>
  `
})

export class TodoItem {
  @Input() task: Task;
}