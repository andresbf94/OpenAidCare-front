import { Component, Input } from '@angular/core';
import { MeasuresService } from '../../services/measures.service';
import { eachDayOfInterval, endOfDay, format, startOfDay, subDays } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-tabla-presencia',
  templateUrl: './tabla-presencia.component.html',
  styleUrls: ['./tabla-presencia.component.css']
})

export class TablaPresenciaComponent {

  @Input() sensor: any;
  measures: object = {};
  measuresArray = new Array();
  primeraActivacion: any;
  ultimaActivacion: any;
  diasSemanaFecha: string[] = [];
  medidasPorFecha: { fecha: string; medidas: any[] }[] = [];
  // Objeto para almacenar medidas por fecha

  constructor(private measuresService: MeasuresService) {}

  ngOnInit(): void {
    const fechaActual = new Date();
    const fechaInicio = startOfDay(subDays(fechaActual, 6));
    const fechaFin = endOfDay(fechaActual);

    const diasSemanaFyH = eachDayOfInterval({ start: fechaInicio, end: fechaFin });

    this.diasSemanaFecha = diasSemanaFyH.map(date => format(date, 'yyyy-MM-dd', { locale: es }));

    // Itera sobre los días y obtiene las medidas para cada día
    this.diasSemanaFecha.forEach((fecha: string) => {
      this.obtenerMedicionesDia(fecha, this.sensor);
      console.log('Medidas del día:', this.medidasPorFecha);
    });
  }

  obtenerMedicionesDia(fecha: string, Friendlyname: string) {
    const fechaFiltro = new Date(`${fecha}T00:00:00.000Z`);
  
    this.measuresService.getMeasures(Friendlyname).subscribe((data) => {
      this.measures = data;
      this.measuresArray = data.measures;
  
      const activacionesDelDia = this.measuresArray.filter((element) => {
        const fechaElemento = new Date(element.date);
        return (
          fechaElemento.getUTCFullYear() === fechaFiltro.getUTCFullYear() &&
          fechaElemento.getUTCMonth() === fechaFiltro.getUTCMonth() &&
          fechaElemento.getUTCDate() === fechaFiltro.getUTCDate()
        );
      });
  
      if (activacionesDelDia.length > 0) {
        this.primeraActivacion = activacionesDelDia[0];
        this.ultimaActivacion = activacionesDelDia[activacionesDelDia.length - 1];
        // Obtén las medidas del campo 'data' de 'primeraActivacion'
        this.medidasPorFecha.push({fecha: fecha, medidas: [(activacionesDelDia[0]),(activacionesDelDia[activacionesDelDia.length - 1])]})

      } else {
        // Si no hay activaciones, almacena un objeto vacío en el arreglo de objetos por fecha
        this.medidasPorFecha.push({ fecha: fecha, medidas: [] });
      }

    });
  }

  formatearHora(fecha: string): string {
    const horaFormateada = new Date(fecha);
    return format(horaFormateada, 'HH:mm:ss', { locale: es });
  }
  formatearFecha(fecha: string): string {
    const fechaFormateada = new Date(fecha);
    return format(fechaFormateada, 'dd-MM-yyyy', { locale: es });
  }
}
