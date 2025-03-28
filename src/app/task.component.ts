import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from './task.service';

@Component({
  selector: 'app-task',
  template: `
    <div>
      <h2>Tasks</h2>
      <input #titleInput placeholder="Task Title">
      <input #descInput placeholder="Description">
      <button (click)="addTask(titleInput.value, descInput.value)">Add Task</button>
      <ul>
        <li *ngFor="let task of tasks">
          {{ task.title }} - {{ task.description }} 
          <button (click)="deleteTask(task.id)">Delete</button>
        </li>
      </ul>
    </div>
  `
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe(tasks => this.tasks = tasks);
  }

  addTask(title: string, description: string) {
    const task: Task = { title, description, completed: false };
    this.taskService.createTask(task).subscribe(() => this.loadTasks());
  }

  deleteTask(id?: number) {
    if (id) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }
}