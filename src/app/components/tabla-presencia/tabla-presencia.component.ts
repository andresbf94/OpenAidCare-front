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
  temperaturas = [];

  datosM0:any= [];
  datosM1:any=[];
  datosM2:any= [];

  constructor(private measuresService: MeasuresService) {}

  ngOnInit(): void {

    this.measuresService.getMeasuresLastWeek('M0').subscribe(data => {
      if (Array.isArray(data.measures)) {
        this.measures = data.measures;
        this.datosM0 = this.procesarDatos(this.measures).reverse();
      } else {
        console.error('Los datos recibidos no son un array válido.');
      }
    });
  
    this.measuresService.getMeasuresLastWeek('M1').subscribe(data => {
      if (Array.isArray(data.measures)) {
        this.measures = data.measures;
        this.datosM1 = this.procesarDatos(this.measures).reverse();
      } else {
        console.error('Los datos recibidos no son un array válido.');
      }
    });
  
    this.measuresService.getMeasuresLastWeek('M2').subscribe(data => {
      if (Array.isArray(data.measures)) {
        this.measures = data.measures;
        this.datosM2 = this.procesarDatos(this.measures).reverse();
      } else {
        console.error('Los datos recibidos no son un array válido.');
      }
    });

    this.measuresService.getMeasuresLastWeek('T0B').subscribe(data => {
      this.temperaturas=data;
      console.log('temperaturas array' , this.temperaturas);
    })

  }

  //Extrae un array con la fecha, la primera y la ultima vez que la puerta se abrió.

    procesarDatos(data: any) {

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
    const currentDate = new Date();
  
    if (
      parsedDate.getDate() === currentDate.getDate() &&
      parsedDate.getMonth() === currentDate.getMonth() &&
      parsedDate.getFullYear() === currentDate.getFullYear()
    ) {
      return 'hoy';
    }
  
    return format(parsedDate, 'EEEE', { locale: es });
  }

  // Función para formatear la fecha
  formatDate(date: string): string {
    const parsedDate = new Date(date);
    return format(parsedDate, 'dd/MM/yyyy', { locale: es });
  }

  sumarHoras(hora: string): string {
    const [horas, minutos, segundos] = hora.split(':').map(Number);
    const fechaActual = new Date(); // Obtiene la fecha y hora actual en la zona horaria del cliente
  
    // Establece la hora obtenida del parámetro
    fechaActual.setHours(horas, minutos, segundos);
  
    // Establece la zona horaria a España
    const options: Intl.DateTimeFormatOptions = { timeZone: 'Europe/Madrid', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    
    // Obtiene la hora localizada en España
    const horaEspaña = fechaActual.toLocaleTimeString('es-ES', options);
    return horaEspaña;
  }
}
