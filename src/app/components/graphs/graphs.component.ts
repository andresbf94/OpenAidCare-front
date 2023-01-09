import { Component, OnInit } from '@angular/core';
import { DataObservables } from 'src/app/services/dataObservables.service';
declare global {
  interface Window {
    PLOTLYENV: any;
  }
}
declare var Plotly:any;

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  constructor(private dataObservables : DataObservables) { 
    dataObservables.sharedGraphs.subscribe(graph => {
      eval(graph)
    })
  }

  ngOnInit(): void {
  }
}
