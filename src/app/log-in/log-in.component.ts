import { Component, OnInit } from '@angular/core';
import { DataObservables } from '../services/dataObservables.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(private dataObservables : DataObservables) { }

  ngOnInit(): void {
  }

  login(){
    console.log("¿")
    this.dataObservables.setToken("token");
  }

}
