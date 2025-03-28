import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[] = [];
  @Output() edit = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe(tasks => this.tasks = tasks);
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task.id!, task).subscribe(() => this.loadTasks());
  }

  editTask(task: Task) {
    this.edit.emit(task);
  }

  deleteTask(id?: number) {
    if (id) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }
}
