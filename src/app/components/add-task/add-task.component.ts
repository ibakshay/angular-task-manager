import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from '../../interface';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  text: string;
  day: string;
  reminder: boolean = false;
  showAddTask: boolean;

  @Output() onAddingTask: EventEmitter<Task> = new EventEmitter();

  constructor(private uiService: UiService) {
    this.uiService.onToggle().subscribe(value => this.showAddTask = value);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task');
      return;
    }
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    };
    this.onAddingTask.emit(newTask);
    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
