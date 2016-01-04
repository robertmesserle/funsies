import {Component} from 'angular2/core';
import {TodoList} from './todo-list.ts';
import {TodoForm} from './todo-form.ts';
import {TaskList} from '../services/task-list.ts';
import {Task} from '../models/task.ts';

@Component({
    selector: 'todo-app',
    providers: [ TaskList ],
    directives: [ TodoList, TodoForm ],
    styles: [`
        h1 {
            margin: 24px 0 0;
            font-family: 'Helvetica Neue', sans-serif;
            font-size: 48px;
            font-weight: 100;
            text-align: center;
        }
        h2 {
            margin: 0 0 24px;
            font-family: sans-serif;
            font-size: 12px;
            text-align: center;
            text-transform: uppercase;
        }
        todo-list {
            display: block;
            overflow: hidden;
            border: 1px solid #eee;
            margin: 24px 0;
            border-radius: 3px;
        }
        .center {
            text-align: center;
        }
        .center a {
            font-family: sans-serif;
            font-size: 12px;
            text-transform: uppercase;
            display: block;
            padding: 12px;
            background: hsl(220, 70%, 50%);
            color: white;
            text-decoration: none;
            border-radius: 20px;
            box-sizing: border-box;
            width: 300px;
            margin: 0 auto;
            transition: background 0.35s ease;
        }
        .center a:hover {
            background: hsl(220, 70%, 70%);
        }
        todo-form {
            display: block;
        }
        hr {
            border: none;
            background: #ccc;
            width: 300px;
            height: 1px;
            display: block;
            margin: 24px auto;
        }
    `],
    template: `
        <h1>Todo App</h1>
        <h2>{{ completed }} out of {{ total }} tasks completed.</h2>
        <todo-list *ngIf="total"></todo-list>
        <div class="center" *ngIf="completed">
            <a href (click)="clearCompleted($event)">{{ clearCompletedMessage }}</a>
        </div>
        <hr *ngIf="total">
        <todo-form></todo-form>
    `
})

export class TodoApp {
    constructor(
        private _taskList: TaskList
    ) {}

    get completed(): number {
        return this._taskList.tasks.reduce((value: number, item: Task) => {
            if (item.completed) ++value;
            return value;
        }, 0);
    }

    get total(): number {
        return this._taskList.tasks.length;
    }

    get clearCompletedMessage(): string {
        return this.completed > 1
            ? `Clear ${this.completed} completed tasks`
            : `Clear completed task`;
    }

    clearCompleted(event: Event): void {
        event.preventDefault();
        this._taskList.clearCompleted();
    }
}