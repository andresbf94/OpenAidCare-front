import { Component, Input, OnInit } from '@angular/core';
import { MeasuresService } from '../../services/measures.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface SensorData {
  sensor: {
    // propiedades del sensor
  };
  measures: {
    data: string[];
    date: string;
  }[];
}

interface ProcessedData {
  fecha: string;
  primeraHora: string | null;
  ultimaHora: string | null;
}

@Component({
  selector: 'app-tabla-presencia',
  templateUrl: './tabla-presencia.component.html',
  styleUrls: ['./tabla-presencia.component.css']
})

export class TablaPresenciaComponent implements OnInit {
  measures:any  = [];
 
  datosM0:any= [];
  datosM1:any=[];
  datosM2:any= [];

  constructor(private measuresService: MeasuresService) {}

  ngOnInit(): void {

    this.measuresService.getMeasuresLastWeek('M0').subscribe(data => {
      if (Array.isArray(data.measures)) {
        this.measures = data.measures;
        console.log('datos intro funcion', this.measures);
        this.datosM0 = this.procesarDatos(this.measures);
        console.log('processedData', this.datosM0);
      } else {
        console.error('Los datos recibidos no son un array válido.');
      }
    });

    this.measuresService.getMeasuresLastWeek('M1').subscribe(data => {
      if (Array.isArray(data.measures)) {
        this.measures = data.measures;
        console.log('datos intro funcion', this.measures);
        this.datosM1 = this.procesarDatos(this.measures);
        console.log('processedData', this.datosM1);
      } else {
        console.error('Los datos recibidos no son un array válido.');
      }
    });

    this.measuresService.getMeasuresLastWeek('M2').subscribe(data => {
      if (Array.isArray(data.measures)) {
        this.measures = data.measures;
        console.log('datos intro funcion', this.measures);
        this.datosM2 = this.procesarDatos(this.measures);
        console.log('processedData', this.datosM2);
      } else {
        console.error('Los datos recibidos no son un array válido.');
      }
    });


  }

  //Extrae un array con la fecha, la primera y la ultima vez que la puerta se abrió.

  private procesarDatos(data: any) {
    const processedData: ProcessedData[] = [];
    const measures = data;
  
    const dateMap: { [key: string]: { primeraHora: string | null, ultimaHora: string | null } } = {};
  
    measures.forEach((measure: any) => {
      const { data, date } = measure;
      const currentDate = date.split('T')[0];
      const currentHour = date.split('T')[1].split('.')[0];
  
      if (data.includes('true')) {
        if (!(currentDate in dateMap)) {
          dateMap[currentDate] = { primeraHora: currentHour, ultimaHora: null };
        }
      }
  
      if (data.includes('false')) {
        if (currentDate in dateMap) {
          dateMap[currentDate].ultimaHora = currentHour;
        }
      }
    });
  
    // Convertir el objeto de mapa en un array de objetos
    for (const date in dateMap) {
      const { primeraHora, ultimaHora } = dateMap[date];
      processedData.push({ fecha: date, primeraHora, ultimaHora });
    }
  
    return processedData;
  }
  
  getDayWithDate(date: string): string {
    const parsedDate = new Date(date);
    return format(parsedDate, 'EEEE', { locale: es });
  }

  // Función para formatear la fecha
  formatDate(date: string): string {
    const parsedDate = new Date(date);
    return format(parsedDate, 'dd/MM/yyyy', { locale: es });
  }
  
  sumarHoras(hora: string): string {
    const [horas, minutos] = hora.split(':').map(Number);
    let nuevaHora = horas + 2;
  
    if (nuevaHora >= 24) {
      nuevaHora -= 24; // Restar 24 horas si la suma supera las 24 horas
    }
  
    return `${nuevaHora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  }
}
/*
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
*/