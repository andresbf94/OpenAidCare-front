import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SensorDataService } from 'src/app/services/sensor-data.service';


@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.css']
})
export class SensorDetailsComponent {

  constructor(private route: ActivatedRoute, private sensorDataService: SensorDataService) { }

}
