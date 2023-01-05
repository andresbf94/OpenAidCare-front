import { Component, OnInit } from '@angular/core';
import { DataObservables } from 'src/app/services/dataObservables.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events = new Array();

  constructor(private dataObservables: DataObservables) {
    dataObservables.sharedEvents.subscribe((events: any) => {
      this.events = events
    })
  }

  ngOnInit(): void {
  }

}
