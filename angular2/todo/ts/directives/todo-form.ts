import {Component} from 'angular2/core';
import {TaskList} from '../services/task-list.ts';

@Component({
    selector: 'todo-form',
    providers: [ TaskList ],
    styles: [`
        form {
            display: block;
        }
        input {
            display: block;
            width: 100%;
            box-sizing: border-box;
            padding: 18px 12px;
            font-family: sans-serif;
            font-size: 12px;
            text-transform: uppercase;
            border: 1px solid #ccc;
            border-radius: 3px;
        }
    `],
    template: `
        <form (submit)='addTask(task, $event)'>
            <input type='text' #task placeholder="New task...">
        </form>
    `
})

export class TodoForm {
    constructor(
        private _taskList: TaskList
    ) {}

    addTask(input: HTMLInputElement, event: Event) {
        event.preventDefault();
        if (input.value) this._taskList.add(input.value);
        input.value = '';
    }
}