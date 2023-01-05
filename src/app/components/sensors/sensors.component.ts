import { Component, OnInit } from '@angular/core';
import { DataObservables } from 'src/app/services/dataObservables.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {

  sensors = new Array()

  constructor(private dataObservables: DataObservables) {
    dataObservables.sharedSensors.subscribe((sensors: any) => {
      this.sensors = sensors
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
