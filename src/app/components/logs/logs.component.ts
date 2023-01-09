import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataObservables } from 'src/app/services/dataObservables.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  logs = new Array();
  scrollHeight = 0;

  constructor(private dataObservables : DataObservables) {
    dataObservables.sharedLogs.subscribe((logs:any) =>{
      this.logs=logs;
      if (logs != "")
      this.logs = logs.reverse()
      console.log(this.logs)
      setTimeout(()=>{
        this.scrollHeight = Number(document.getElementById("divScrollLogs")?.scrollHeight);
      },50)
    })
  }

  ngOnInit(): void {
  }
}
