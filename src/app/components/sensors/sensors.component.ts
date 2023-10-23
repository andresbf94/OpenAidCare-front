import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cell, DefaultEditor } from 'angular2-smart-table';
import { Settings } from 'angular2-smart-table/lib/lib/settings';
import { DataObservables } from 'src/app/services/dataObservables.service';
import { frontRoute } from 'src/app/app.component';
import { AddButtonComponent } from 'angular2-smart-table/lib/components/thead/cells/add-button.component';
import { SensorDataService } from '../../services/sensor-data.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {

  sensors = new Array()
  prueba:string = '';
  data: any = [];
  
  constructor(private dataObservables: DataObservables) {
    dataObservables.sharedSensors.subscribe((sensors: any) => {
      this.sensors = sensors
     
      dataObservables.setSensorsData(sensors)

      console.log("listado", this.sensors);

      this.sensors.forEach(sensor=>{
        /*if (sensor.mac==( "0x00158d0008984738" || "0z00124b002503776b" || "0z00124b0024cd1b52" || "0z00124b0024ce2b1f" || "0z00124b002502bd80" || "0z00124b0025033b99" ||"0z00124b00246ccb6e" || "0z00124b00246c6b74" || "0z00124b002502e233" || "0z00124b00251c554a" || "0z00124b00288fd901" || "0z00124b002450f476" ) ){ */
        if (sensor.model.description=="Sensor de temperatura y humedad"){
         this.data.push({
          estado: this.getStatus(sensor.battery, sensor.batteryLow, sensor.updatedAt, sensor.model),
          friendlyName: sensor.friendlyName,
          battery: this.getBattery(sensor.battery, sensor.batteryLow),
          mac: sensor.mac,
          description: sensor.model.description,  
          button: 'Grafica' 
        })    
        }
      })
    })
  }
  buttonIndex: number = 0;
  settings: Settings = {
    
    columns: {
      estado: {
        title: 'Estado',
        isEditable:false,
      },

      friendlyName: {
        title: 'Friendly Name', 
        isEditable: true, 
      },

      battery: {
        title: 'Bateria',
        isEditable:false,
        
      },
      mac: {
        title: 'Mac',
        isEditable:false,
        
      },
      description: {
        title: 'Descripcion',
        isEditable:false,

      },
      button: {
        title: '',
        type: 'custom',
        isEditable:false,
        renderComponent: CustomButtonComponent,
        componentInitFunction: (instance) => {
          this.buttonIndex++;
          instance.index=this.buttonIndex
        }
      },
    },

    actions: {    
      columnTitle: '' ,
      add: false,
      delete:false,      
    },

    edit: {
      editButtonContent: 'Editar'
    },
    pager:{
      perPage: 10
    },
    hideSubHeader: true,
  };

  ngOnInit(): void {
  }

  getStatus(battery: null | number, batteryLow: null | number, updatedAt: string, model: any) {
    if (model.values.includes("power")) {
      var updatedAtDate = new Date(updatedAt);
      var actualDate = new Date();
      if (((actualDate.getDate() - updatedAtDate.getDate()) > 5) || (actualDate.getMonth() != updatedAtDate.getMonth()))
        return "OFF";
      else
        return "ON";
    } else {
      if (battery === null || battery === undefined) {
        if (batteryLow === null || batteryLow === undefined) {
          return "OFF";
        } else {
          var updatedAtDate = new Date(updatedAt);
          var actualDate = new Date();
          if (((actualDate.getDate() - updatedAtDate.getDate()) > 5) || (actualDate.getMonth() != updatedAtDate.getMonth()))
            return "OFF";
          else
            return "ON";
        }
      } else {
        var updatedAtDate = new Date(updatedAt);
        var actualDate = new Date();
        if (((actualDate.getDate() - updatedAtDate.getDate()) > 5) || (actualDate.getMonth() != updatedAtDate.getMonth()))
          return "OFF";
        else
          return "ON";
      }
    }
  }

  getBattery(battery: null | number, batteryLow: null | number) {
    if (battery === null || battery === undefined) {
      if (batteryLow === null || batteryLow === undefined) {
        return "---";
      } else {
        return batteryLow + "%";
      }
    } else {
      return battery + "%";
    }
  }
  
}

@Component({

  selector: 'app-custom-button',
  styles: [
    ".details-table-button {background:#5698da; color:black; border:2px solid #5698da; border-radius:5px; padding:5px; transition: all ease-in-out .2s; font-weight: bold}",
    ".details-table-button:hover {background: transparent; color:#5698da}",
    ".details-table-button:disabled {opacity:.5; pointer-events:none}",
  ],
  template: '<button (click)="seeDetails()" class="details-table-button">Gráfica</button>',
})


export class CustomButtonComponent extends DefaultEditor  {
  
  private sensorsData: any;
  private index: number|any;
  private sensorData: any;
 
  constructor(private router: Router, private http: HttpClient, private observable: DataObservables, private sensorDataService:SensorDataService ) {
    super();
    observable.sharedSensorsData.subscribe(sensorsData => this.sensorsData= sensorsData);
  }
  
  seeDetails() { 

    this.sensorData=this.sensorsData[this.index]
    console.log("boton:", this.sensorData)
    
    const macAddresses = new Array();
    macAddresses.push(this.sensorData.mac) 
    const showTemperature = 't';
    const showMinMax =  's';
    const startDate = '2023-01-01';
    

    this.sensorDataService.getSensorData(macAddresses, showTemperature, showMinMax, startDate);
    
  }
}


