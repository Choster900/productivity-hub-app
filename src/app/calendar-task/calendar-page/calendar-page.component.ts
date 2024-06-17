import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styles: ``
})
export class CalendarPageComponent implements OnInit {
  isLoading = true;
  showContent = false;
  ngOnInit() {
    // Simulate loading time
    this.loadData();
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
}
