import { Component, OnInit } from '@angular/core';
import { ToDoService } from './shared/to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  providers: [ToDoService]
})
export class ToDoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private toDoService: ToDoService) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(x => {
          const y = x.payload.toJSON();
          y['$key'] = x.key;
          this.toDoListArray.push(y);
        });
        this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }

  onAdd(title: any) {
    this.toDoService.addTitle(title.value);
    title.value = null;
  }

  checkorUncheck($key, flag) {
    if (flag === true) {
      flag = false;
    } else if (flag === false) {
      flag = true;
    }
    this.toDoService.checkedOrUnchecked($key, flag);
  }

  onDelete(key) {
    this.toDoService.removeTitle(key);
  }


}
