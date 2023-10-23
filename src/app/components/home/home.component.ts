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
  activacion:any ='';

  friendlyName: string = 'M0';

  constructor(private measuresService: MeasuresService) {}

  ngOnInit(): void {
    this.obtenerMedidas();
  }

  obtenerMedidas() {

    const fechaFiltro = new Date('2023-08-16T00:00:00.000Z'); // Define la fecha de filtro

    this.measuresService.getMeasures(this.friendlyName).subscribe((data) => {
      this.measures = data;
      console.log('objeto measures', this.measures);
  
      this.measuresArray = data.measures;
      console.log('array de objetos measures: ', this.measuresArray);
  
      // Filtra los elementos por fecha
      const activacionesDelDia = this.measuresArray.filter((element) => {
        const fechaElemento = new Date(element.date);
        // Compara si la fecha del elemento coincide con la fecha de filtro
        return (
          fechaElemento.getUTCFullYear() === fechaFiltro.getUTCFullYear() &&
          fechaElemento.getUTCMonth() === fechaFiltro.getUTCMonth() &&
          fechaElemento.getUTCDate() === fechaFiltro.getUTCDate()
        );
      });
  
      // Ahora activacionesDelDia contiene los elementos del día específico
      console.log('Activaciones del día:', activacionesDelDia);
    });
  }
}
