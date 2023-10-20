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
        if (sensor.model.description=="Sensor de temperatura y humedad"){
         this.data.push({
          estado: this.getStatus(sensor.battery, sensor.batteryLow, sensor.updatedAt, sensor.model),
          friendlyName: sensor.friendlyName,
          battery: this.getBattery(sensor.battery, sensor.batteryLow),
          model: sensor.model.model,
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
        type: 'html',
        isEditable: true, 
      },

      battery: {
        title: 'Bateria',
        isEditable:false,
        
      },
      model: {
        title: 'Modelo',
        isEditable:false,
        type: 'html',
        
      },
      description: {
        title: 'Descripcion',
        isEditable:false,

      },
      button: {
        title: 'Button',
        type: 'custom',
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
    }
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
    ".details-table-button {background:#2EFB12; color:black; border:2px solid #2EFB12; border-radius:5px; padding:5px; transition: all ease-in-out .2s; font-weight: bold}",
    ".details-table-button:hover {background: transparent; color:#2EFB12}",
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
    console.log(this.sensorData)
    
    const macAddresses = new Array();
    macAddresses.push(this.sensorData.mac) 
    const showTemperature = 't';
    const showHumidity = 'h';
    const showMinMax =  's';
    const startDate = '2023-10-01';
    const endDate = '2023-10-19';

    this.sensorDataService.getSensorData(macAddresses, showTemperature, showMinMax, startDate, endDate);
    
  }
}


