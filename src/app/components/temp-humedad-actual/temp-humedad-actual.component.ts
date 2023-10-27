import { Component, OnInit } from '@angular/core';
import { MeasuresService } from 'src/app/services/measures.service';
import { SensorDataService } from 'src/app/services/sensors.service';

@Component({
  selector: 'app-temp-humedad-actual',
  templateUrl: './temp-humedad-actual.component.html',
  styleUrls: ['./temp-humedad-actual.component.css']
})
export class TempHumedadActualComponent implements OnInit{
  arraySensores: any = [];
  T0A = []; //no funciona
  T0B = [];
  T1A = [];
  T1B = [];
  T1C = [];
  T2A = [];
  T2B = [];
  T3B = [];

  tempAct: any = [];
  humeAct: any = [];

  constructor( private measuresService: MeasuresService, private sensorsService:SensorDataService){}

  ngOnInit(): void {

    this.sensorsService.getSensors().subscribe(data =>{
      this.arraySensores = data;
      console.log('sensores', this.arraySensores)
    })

    this.measuresService.getMeasuresCurrentDay('T0B').subscribe(data =>{
      this.arraySensores =data;
      console.log('medidas', this.T0A);
    })

  }
  
  
  
}
