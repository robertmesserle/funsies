import {Task} from '../models/task.ts';

export class TaskList {
  static tasks: Task[] = [];

  get tasks(): Task[] {
    return TaskList.tasks;
  }

  set tasks(tasks: Task[]): Task[] {
    TaskList.tasks = tasks;
  }

  add(name: string): void {
    this.tasks.push(new Task(name));
  }

  clearCompleted(): void {
    this.tasks = this.tasks.filter(task => !task.completed);
  }
}