import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { serverRoute } from 'src/app/app.component';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {

  houses = new Array();

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get(serverRoute + "api/houses").subscribe({
      next: res => {
        console.log(res)
        Object.values(res).forEach(house =>{
          this.houses.push(house);
        })
      },
      error: error => {
        console.error(error);
      }
    })
  }

  selectHouse(code: string) {
    var actualCode = localStorage.getItem("oaidc-houseID")
    document.getElementById("house-" + actualCode)?.setAttribute("class", "houseTR");
    document.getElementById("house-" + code)?.setAttribute("class", "houseTR selected");
    document.getElementById("casasBts")?.setAttribute("style", "heigth: 0px; opacity: 0%")
    document.getElementById("casasBts")?.setAttribute("class", "transition");
    setTimeout(() => {
      document.getElementById("casasBts")?.setAttribute("style", "heigth: 200px; opacity: 100%")
    }, 100)
    localStorage.setItem("oaidc-houseID", code)
  }

}
