import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SensorsComponent } from './components/sensors/sensors.component';
import { DataObservables } from './services/dataObservables.service';
export const serverRoute = "https://openaidcare-api.herokuapp.com/";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OpenAidCare-front';

  constructor(private httpClient: HttpClient, private dataObservables: DataObservables) {

  }

  mouseEnterOpenAidLogo() {
    document.getElementById("svg5")?.setAttribute("transform", "rotate(360)")
    var st = "" + document.getElementById("path365")?.getAttribute("style")
    document.getElementById("path365")?.setAttribute("style", "" + st?.replace("opacity: 1;", "opacity: 0.1;"))
    document.getElementById("svg5")?.setAttribute("width", "19mm")
    document.getElementById("svg5")?.setAttribute("height", "19mm")
  }

  mouseLeaveOpeanAidLogo() {
    document.getElementById("svg5")?.setAttribute("transform", "rotate(0)")
    var st = "" + document.getElementById("path365")?.getAttribute("style")
    document.getElementById("path365")?.setAttribute("style", "" + st?.replace("opacity: 0.1;", "opacity: 1;"))
    document.getElementById("svg5")?.setAttribute("width", "15mm")
    document.getElementById("svg5")?.setAttribute("height", "15mm")
  }

  showHouses() {
    document.getElementById("casasBts")?.setAttribute("class", "noVisible");
    document.getElementById("sensors")?.setAttribute("class", "noVisible");
    document.getElementById("events")?.setAttribute("class", "noVisible");
    document.getElementById("tables")?.setAttribute("class", "noVisible");
    document.getElementById("graphs")?.setAttribute("class", "noVisible");
    document.getElementById("logs")?.setAttribute("class", "noVisible");
    document.getElementById("bt-sensors")?.setAttribute("class", "lateralHomeBarSubDiv");
    document.getElementById("bt-events")?.setAttribute("class", "lateralHomeBarSubDiv");
    document.getElementById("bt-tables")?.setAttribute("class", "lateralHomeBarSubDiv");
    document.getElementById("bt-graphs")?.setAttribute("class", "lateralHomeBarSubDiv");
    document.getElementById("bt-logs")?.setAttribute("class", "lateralHomeBarSubDiv");
    document.getElementById("housesComponent")?.setAttribute("class", "");
    var actualCode = localStorage.getItem("oaidc-houseID")
    document.getElementById("house-" + actualCode)?.setAttribute("class", "houseTR");
  }

  houseBTClicked(component: string) {
    document.getElementById("housesComponent")?.setAttribute("class", "noVisible");
    document.getElementById("sensors")?.setAttribute("class", "noVisible");
    document.getElementById("events")?.setAttribute("class", "noVisible");
    document.getElementById("tables")?.setAttribute("class", "noVisible");
    document.getElementById("graphs")?.setAttribute("class", "noVisible");
    document.getElementById("logs")?.setAttribute("class", "noVisible");
    document.getElementById("bt-sensors")?.setAttribute("class", "lateralHomeBarSubDiv");
    document.getElementById("bt-events")?.setAttribute("class", "lateralHomeBarSubDiv");
    document.getElementById("bt-tables")?.setAttribute("class", "lateralHomeBarSubDiv");
    document.getElementById("bt-graphs")?.setAttribute("class", "lateralHomeBarSubDiv");
    document.getElementById("bt-logs")?.setAttribute("class", "lateralHomeBarSubDiv");
    document.getElementById("bt-" + component)?.setAttribute("class", "lateralHomeBarSubDiv active");
    document.getElementById(component)?.setAttribute("class", "");

    switch (component) {
      case "sensors":
        this.getSensors();
        break;
      case "events":
        this.getEvents();
        break;
      case "logs":
        this.getLogs();
        break;
    }
  }

  getSensors() {
    var actualCode = localStorage.getItem("oaidc-houseID")
    this.httpClient.get(serverRoute + "api/front/sensors/" + actualCode).subscribe({
      next: res => {
        this.dataObservables.setSensors(res);
      },
      error: error => {
        console.error(error);
      }
    })
  }

  getEvents() {
    var actualCode = localStorage.getItem("oaidc-houseID")
    this.httpClient.get(serverRoute + "api/events/" + actualCode).subscribe({
      next: res => {
        this.dataObservables.setEvents(res);
      },
      error: error => {
        console.error(error);
      }
    })
  }

  getLogs() {
    var actualCode = localStorage.getItem("oaidc-houseID")
    this.httpClient.get(serverRoute + "api/logs/" + actualCode).subscribe({
      next: res => {
        this.dataObservables.setLogs(res);
      },
      error: error => {
        console.error(error);
      }
    })
  }

}
