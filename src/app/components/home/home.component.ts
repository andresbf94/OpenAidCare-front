import { Component, OnInit } from '@angular/core';
import { MeasuresService } from '../../services/measures.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  measures: object = {}; //que contendra 'measures' y 'sensor', el primero lo almacenaremos en 'measuresArray'
  measuresArray = new Array(); // que contendra un array de objetos
  measuresArrayData: [] = []; // array de strings, cuya unica entrada solo contiene true o false

  friendlyName: string = 'M0';

  constructor(private measuresService: MeasuresService) {}

  ngOnInit(): void {
    this.obtenerMedidas();
  }

  obtenerMedidas() {
    this.measuresService.getMeasures(this.friendlyName).subscribe((data) => {
      this.measures = data;
      console.log('objeto measures', this.measures);

      this.measuresArray = data.measures;
      console.log('array de objetos measures: ', this.measuresArray);
      this.measuresArray.forEach((element) => {
        console.log(element.data[0]);
      });
    });
  }
}
