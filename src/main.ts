import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'review' | 'done';
  isEditing: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Task Management</h1>
      
      <div class="add-task">
        <input 
          type="text" 
          [(ngModel)]="newTaskTitle" 
          placeholder="Enter new task"
          (keyup.enter)="addTask()"
        >
        <button (click)="addTask()">Add Task</button>
      </div>

      <div class="board">
        <!-- Todo Column -->
        <div class="column">
          <h2>Todo</h2>
          <div *ngFor="let task of getTasks('todo')" class="task">
            <div *ngIf="!task.isEditing" class="task-content">
              <h3>{{ task.title }}</h3>
              <p class="description">{{ task.description || 'No description' }}</p>
              <button class="edit-button" (click)="startEditing(task)">Edit</button>
            </div>
            <div *ngIf="task.isEditing" class="task-edit">
              <input 
                type="text" 
                [(ngModel)]="task.title" 
                placeholder="Task title"
                class="edit-input"
              >
              <textarea 
                [(ngModel)]="task.description" 
                placeholder="Add description"
                class="edit-textarea"
              ></textarea>
              <button class="save-button" (click)="saveEditing(task)">Save</button>
            </div>
            <div class="button-group">
              <button class="move-button" (click)="moveTask(task, 'inprogress')">
                → In Progress
              </button>
              <button class="move-button" (click)="moveTask(task, 'review')">
                → Review
              </button>
              <button class="move-button" (click)="moveTask(task, 'done')">
                → Done
              </button>
            </div>
          </div>
        </div>

        <!-- In Progress Column -->
        <div class="column">
          <h2>In Progress</h2>
          <div *ngFor="let task of getTasks('inprogress')" class="task">
            <div *ngIf="!task.isEditing" class="task-content">
              <h3>{{ task.title }}</h3>
              <p class="description">{{ task.description || 'No description' }}</p>
              <button class="edit-button" (click)="startEditing(task)">Edit</button>
            </div>
            <div *ngIf="task.isEditing" class="task-edit">
              <input 
                type="text" 
                [(ngModel)]="task.title" 
                placeholder="Task title"
                class="edit-input"
              >
              <textarea 
                [(ngModel)]="task.description" 
                placeholder="Add description"
                class="edit-textarea"
              ></textarea>
              <button class="save-button" (click)="saveEditing(task)">Save</button>
            </div>
            <div class="button-group">
              <button class="move-button" (click)="moveTask(task, 'todo')">
                → Todo
              </button>
              <button class="move-button" (click)="moveTask(task, 'review')">
                → Review
              </button>
              <button class="move-button" (click)="moveTask(task, 'done')">
                → Done
              </button>
            </div>
          </div>
        </div>

        <!-- Review Column -->
        <div class="column">
          <h2>Review</h2>
          <div *ngFor="let task of getTasks('review')" class="task">
            <div *ngIf="!task.isEditing" class="task-content">
              <h3>{{ task.title }}</h3>
              <p class="description">{{ task.description || 'No description' }}</p>
              <button class="edit-button" (click)="startEditing(task)">Edit</button>
            </div>
            <div *ngIf="task.isEditing" class="task-edit">
              <input 
                type="text" 
                [(ngModel)]="task.title" 
                placeholder="Task title"
                class="edit-input"
              >
              <textarea 
                [(ngModel)]="task.description" 
                placeholder="Add description"
                class="edit-textarea"
              ></textarea>
              <button class="save-button" (click)="saveEditing(task)">Save</button>
            </div>
            <div class="button-group">
              <button class="move-button" (click)="moveTask(task, 'todo')">
                → Todo
              </button>
              <button class="move-button" (click)="moveTask(task, 'inprogress')">
                → In Progress
              </button>
              <button class="move-button" (click)="moveTask(task, 'done')">
                → Done
              </button>
            </div>
          </div>
        </div>

        <!-- Done Column -->
        <div class="column">
          <h2>Done</h2>
          <div *ngFor="let task of getTasks('done')" class="task">
            <div *ngIf="!task.isEditing" class="task-content">
              <h3>{{ task.title }}</h3>
              <p class="description">{{ task.description || 'No description' }}</p>
              <button class="edit-button" (click)="startEditing(task)">Edit</button>
            </div>
            <div *ngIf="task.isEditing" class="task-edit">
              <input 
                type="text" 
                [(ngModel)]="task.title" 
                placeholder="Task title"
                class="edit-input"
              >
              <textarea 
                [(ngModel)]="task.description" 
                placeholder="Add description"
                class="edit-textarea"
              ></textarea>
              <button class="save-button" (click)="saveEditing(task)">Save</button>
            </div>
            <div class="button-group">
              <button class="move-button" (click)="moveTask(task, 'todo')">
                → Todo
              </button>
              <button class="move-button" (click)="moveTask(task, 'inprogress')">
                → In Progress
              </button>
              <button class="move-button" (click)="moveTask(task, 'review')">
                → Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class   App {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  nextId: number = 1;

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.tasks.push({
        id: this.nextId++,
        title: this.newTaskTitle,
        description: '',
        status: 'todo',
        isEditing: false
      });
      this.newTaskTitle = '';
    }
  }

  getTasks(status: 'todo' | 'inprogress' | 'review' | 'done'): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  moveTask(task: Task, newStatus: 'todo' | 'inprogress' | 'review' | 'done') {
    task.status = newStatus;
  }

  startEditing(task: Task) {
    task.isEditing = true;
  }

  saveEditing(task: Task) {
    task.isEditing = false;
  }
}

bootstrapApplication(App);