import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircle as faCircleOutline,
  faFloppyDisk,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import { faCheck, faPencil } from '@fortawesome/free-solid-svg-icons';
import { ITodo } from '../todo';
import { EditableModule } from '@ngneat/edit-in-place';

type TodoFormType = {
  [k in keyof Pick<ITodo, 'description' | 'title'>]: FormControl<string>;
};

@Component({
  selector: 'app-todo',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoComponent implements OnInit {
  @Input() todo: ITodo | undefined;

  @Output() toggleComplete = new EventEmitter<ITodo>();
  @Output() updateTodo = new EventEmitter<ITodo>();
  @Output() deleteTodo = new EventEmitter<ITodo>();

  faCheck = faCheck;
  faCircleOutline = faCircleOutline;
  faPencil = faPencil;
  faTrashCan = faTrashCan;
  faFloppyDisk = faFloppyDisk;

  todoForm!: FormGroup<TodoFormType>;

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      title: new FormControl(this.todo?.title || 'New To-Do', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
      description: new FormControl(
        this.todo?.description || 'To-do Description',
        {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(6)],
        }
      ),
    });
  }

  saveEdit() {
    if (this.todoForm.valid && this.todoForm.dirty) {
      this.triggerUpdate({
        ...this.todo,
        ...this.todoForm.value,
      });
    } else {
      console.log(`Form invalid, not saving`);
    }
  }

  cancelEdit() {
    this.todoForm.reset();
  }

  triggerToggleComplete() {
    this.triggerUpdate({
      ...this.todo,
      completed: !this.todo?.completed,
    });
  }

  triggerUpdate(todo: Partial<ITodo>) {
    if (!this.todo) {
      return;
    }
    this.updateTodo.emit({
      ...this.todo,
      ...todo,
    });
  }
}
