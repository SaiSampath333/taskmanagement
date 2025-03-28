import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges {
  @Input() editTask: Task | null = null;
  task: Task = { title: '', description: '', completed: false };

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editTask'] && this.editTask) {
      this.task = { ...this.editTask };
    }
  }

  onSubmit() {
    if (this.editTask && this.editTask.id) {
      this.taskService.updateTask(this.editTask.id, this.task).subscribe(() => this.resetForm());
    } else {
      this.taskService.createTask(this.task).subscribe(() => this.resetForm());
    }
  }

  resetForm() {
    this.task = { title: '', description: '', completed: false };
    this.editTask = null;
  }
}
