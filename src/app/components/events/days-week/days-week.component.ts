import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-days-week',
  templateUrl: './days-week.component.html',
  styleUrls: ['./days-week.component.scss']
})
export class DaysWeekComponent implements OnInit {

  @Input() days = [];
  lClass : any; mClass : any; xClass : any; jClass : any; vClass : any; sClass : any; dClass : any;

  constructor() { }

  ngOnInit(): void {
    let count = 0
    this.days.forEach(day => {
      if (day)
      this.selectDay(count)

      count++;
    })
  }

  selectDay(dayNum: Number) {
    switch (dayNum) {
      case 0:
        this.lClass = "selected-day"
        break;
      case 1:
        this.mClass = "selected-day"
        break;
      case 2:
        this.xClass = "selected-day"
        break;
      case 3:
        this.jClass = "selected-day"
        break;
      case 4:
        this.vClass = "selected-day"
        break;
      case 5:
        this.sClass = "selected-day"
        break;
      case 6:
        this.dClass = "selected-day"
        break;
    }
  }

}
