import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cell, DefaultEditor } from 'angular2-smart-table';
import { Settings } from 'angular2-smart-table/lib/lib/settings';
import { DataObservables } from 'src/app/services/dataObservables.service';
import { frontRoute } from 'src/app/app.component';
import { AddButtonComponent } from 'angular2-smart-table/lib/components/thead/cells/add-button.component';

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

      console.log("listado", this.sensors);

      this.sensors.forEach(sensor=>{
        
        this.data.push({
          estado: this.getStatus(sensor.battery, sensor.batteryLow, sensor.updatedAt, sensor.model),
          friendlyName: sensor.friendlyName,
          battery: this.getBattery(sensor.battery, sensor.batteryLow),
          model: sensor.model.model,
          description: sensor.model.description, 
          //'<a href="' + frontRoute + '/' + sensor.mac + '">Grafica</a>'  
          button: 'Grafica' 
        })      
      })
    })
  }

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
        renderComponent: CustomButtonComponent
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
}

@Component({
  styles: [
    ".details-table-button {background:#2EFB12; color:black; border:2px solid #2EFB12; border-radius:5px; padding:5px; transition: all ease-in-out .2s; font-weight: bold}",
    ".details-table-button:hover {background: transparent; color:#2EFB12}",
    ".details-table-button:disabled {opacity:.5; pointer-events:none}",
  ],
  template: '<button (click)="seeGraph()" class="details-table-button" disabled="true">Gráfica</button>',
})
export class CustomButtonComponent extends DefaultEditor implements AfterViewInit {
  value: any;
  @Input() rowData: any;

  constructor(private router: Router, private http: HttpClient) {
    super();
  }
  
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  seeGraph() {
    // Lógica personalizada al hacer clic en "Details"
    // console.log('Detalles de la fila:', this.rowData);
    // Navego al dashboard de usuario en funcion de si es seeder, evaluator o funder tengo unas u otras urls
    this.router.navigate(["/idea-details"], { queryParams: { id: this.rowData._id } });
  }
}

