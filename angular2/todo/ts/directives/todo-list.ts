import {Component} from 'angular2/core';
import {TodoItem} from './todo-item.ts';
import {TaskList} from '../services/task-list.ts';
import {Task} from '../models/task.ts';

@Component({
    selector: 'todo-list',
    providers: [ TaskList ],
    directives: [ TodoItem ],
    styles: [`
        todo-item, .no-tasks {
            font-family: sans-serif;
            font-size: 12px;
            text-transform: uppercase;
            background: white;
            display: block;
        }
        todo-item:nth-of-type(odd) {
            background: #f0f0f0;
        }
        .no-tasks {
            padding: 12px;
        }
    `],
    template: `
        <todo-item *ngFor="#task of tasks" [task]="task"></todo-item>
        <div class="no-tasks" *ngIf="tasks.length == 0">No tasks yet...</div>
    `
})

export class TodoList {
    constructor(
        private _taskList: TaskList
    ) {}

    get tasks(): Task[] {
        return this._taskList.tasks;
    }
}
