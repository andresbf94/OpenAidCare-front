import { Component, OnInit } from '@angular/core';
import { MeasuresService } from '../../services/measures.service';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  measures: object = {}; // contendra 'measures' y 'sensor', el primero lo almacenaremos en 'measuresArray'
  measuresArray = new Array(); // contendra un array de objetos cada objeto es una toma de medida
  primeraActivacion: any;
  ultimaActivacion: any;
  
  constructor(private measuresService: MeasuresService) {}

  ngOnInit(): void {
    this.obtenerMedidas('2023', '04', '05', 'M0');
    const fechaActual = new Date;
    const fechaInicioSemana = startOfWeek(fechaActual);
    const fechaFinSemana = endOfWeek(fechaActual);
    const diasDeLaSemana = eachDayOfInterval({ start: fechaInicioSemana, end: fechaFinSemana });
    console.log("ini:", fechaFinSemana);
    console.log("fin:", fechaInicioSemana);
    console.log("dias:", diasDeLaSemana);
  }

  obtenerMedidas(año:string, mes:string, dia:string, Friendlyname:string) {

    const fechaFiltro = new Date(`${año}-${mes}-${dia}T00:00:00.000Z`); // Define la fecha de filtro

    this.measuresService.getMeasures(Friendlyname).subscribe((data) => {
      this.measures = data;
  
      this.measuresArray = data.measures;
      
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

      if (activacionesDelDia.length > 0) {   //Si ha registros coge el primero y el ultimo
        this.primeraActivacion = activacionesDelDia[0];
        this.ultimaActivacion = activacionesDelDia[activacionesDelDia.length - 1];
        console.log("primera activacion", this.primeraActivacion);
        console.log("ultima activacion" , this.ultimaActivacion);

      } else {
        this.primeraActivacion = null;
        this.ultimaActivacion = null;
      } 

    });
  }
  
  formatearFechaHora(fecha: string): string {
    const fechaFormateada = new Date(fecha);
    return format(fechaFormateada, 'dd/MM/yyyy HH:mm:ss', { locale: es });
  }
}
