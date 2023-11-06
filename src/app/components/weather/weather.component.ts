import { Component, OnInit } from '@angular/core';
import { ApiWeatherService } from '../../../app/services/api-weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  datos: any = [];

  temperaturas: any = [];
  precipitaciones: any = [];
  estadosCielo: any = [];
  vientos: any = [];

  tiempoSemana: any = [];

  fechaActual = new Date;

  constructor(private apiWeatherService: ApiWeatherService) {}

  ngOnInit() {
    this.apiWeatherService.datosDias.subscribe((datosResponse: any) => {
      if (datosResponse && datosResponse.length > 0) {
        this.datos = datosResponse;
        this.temperaturas = this.extraerTemperaturas(this.datos);
        this.precipitaciones = this.extraerPrecipitaciones(this.datos);
        this.estadosCielo = this.extraerEstadosCielo(this.datos);
        this.vientos = this.extraerVientos(this.datos);

        console.log('todo', this.datos)
        console.log("Temperaturas:");           //fecha max min
        console.log(this.temperaturas);  
        console.log("Precipitaciones:");        // fecha periodo valor 
        console.log(this.precipitaciones);
        console.log("Estados Cielo:");          // fecha periodo descripcion
        console.log(this.estadosCielo);
        console.log("Vientos:");                //fecha direccion velocidad periodo
        console.log(this.vientos);
        this.extraerDatos();
      } else {
        console.error('Datos no válidos:', datosResponse);
      }
    });
   
    this.apiWeatherService.prediccionDiaria();
    this.apiWeatherService.prediccionHoraria();
    
    console.log('datos semana', this.tiempoSemana);
  }

  extraerTemperaturas(datos: any): any[] {
    return datos[0].prediccion.dia.map((dia: any) => {
      return {
        fecha: dia.fecha,
        maxima: dia.temperatura.maxima,
        minima: dia.temperatura.minima
      };
    });
  }

  extraerPrecipitaciones(datos: any): any[] {
    return datos[0].prediccion.dia.flatMap((dia: any) => {
      return dia.probPrecipitacion.map((periodo: any) => {
        return {
          fecha: dia.fecha,
          periodo: periodo.periodo,
          valor: periodo.value
        };
      });
    });
  }

  extraerEstadosCielo(datos: any): any[] {
    return datos[0].prediccion.dia.flatMap((dia: any) => {
      return dia.estadoCielo.map((estado: any) => {
        return {
          fecha: dia.fecha,
          periodo: estado.periodo,
          descripcion: estado.descripcion
        };
      });
    });
  }

  extraerVientos(datos: any): any[] {
    return datos[0].prediccion.dia.flatMap((dia: any) => {
      return dia.viento.map((viento: any) => {
        return {
          fecha: dia.fecha,
          direccion: viento.direccion,
          velocidad: viento.velocidad,
          periodo: viento.periodo
        };
      });
    });
  }

  extraerDatos() {
    // Filtra los datos por día y por periodo '00-24'
    let precipitaciones = this.precipitaciones.filter((item: { periodo: string | undefined; }) => item.periodo === undefined || item.periodo === '00-24');
    let estadosCielo = this.estadosCielo.filter((item: { periodo: string | undefined; }) => item.periodo === undefined || item.periodo === '00-24');
    let vientos = this.vientos.filter((item: { periodo: string | undefined; }) => item.periodo === undefined || item.periodo === '00-24');
  
    // Agrupa los datos por día
    this.tiempoSemana = this.datos[0].prediccion.dia.map((dia: { fecha: any; }) => {
      const fecha = dia.fecha;
      const temperaturasDia = this.temperaturas.find((temp: { fecha: any; }) => temp.fecha === fecha);
      const precipitacionesDia = precipitaciones.filter((precip: { fecha: any; }) => precip.fecha === fecha);
      const estadosCieloDia = estadosCielo.filter((estado: { fecha: any; }) => estado.fecha === fecha);
      const vientosDia = vientos.filter((viento: { fecha: any; }) => viento.fecha === fecha);
  
      return {
        fecha: fecha,
        temperaturas: temperaturasDia,
        precipitaciones: precipitacionesDia,
        estadosCielo: estadosCieloDia,
        vientos: vientosDia
      };
    });
  
    console.log('datos semana', this.tiempoSemana);
  }

  estadoCieloImagenes: any  = {
    
    '': '../../../assets/iconosTiempo/aguanieve.png',
    '': '../../../assets/iconosTiempo/calima.png',
    '': '../../../assets/iconosTiempo/chubasco_con_tormenta.png',
    '': '../../../assets/iconosTiempo/chubasco_con_tromenta_y_granizo.png',
    '': '../../../assets/iconosTiempo/chubasco_de_aguanieve.png',
    '': '../../../assets/iconosTiempo/chubasco_de_nieve_con_tormenta.png',
    '': '../../../assets/iconosTiempo/chubasco_de_nieve.png',
    'Muy nuboso con tormenta': '../../../assets/iconosTiempo/chubasco.png',
    '': '../../../assets/iconosTiempo/cielo_despejado.png',
    'Cubierto': '../../../assets/iconosTiempo/cubierto.png',
    '': '../../../assets/iconosTiempo/intervalos_nubosos.png',
    'Muy nuboso con lluvia': '../../../assets/iconosTiempo/lluvia.png',
    'Cubierto con lluvia': '../../../assets/iconosTiempo/muy_nuboso_con_lluvia_escasa.png',
    '': '../../../assets/iconosTiempo/muy_nuboso.png',
    '': '../../../assets/iconosTiempo/neblina.png',
    '': '../../../assets/iconosTiempo/niebla.png',
    '': '../../../assets/iconosTiempo/nieve_escasa.png',
    '': '../../../assets/iconosTiempo/nieve_itermitente.png',
    '': '../../../assets/iconosTiempo/nieve.png',
    '': '../../../assets/iconosTiempo/nubes_altas.png',
    '': '../../../assets/iconosTiempo/nuboso_con_lluvia_intermitente.png',
    '': '../../../assets/iconosTiempo/nuboso.png',
    'Intervalos nubosos con lluvia': '../../../assets/iconosTiempo/parcialmente_nuboso_con_lluvia_intermitente.png',
    '': '../../../assets/iconosTiempo/tormenta_con_granizo.png',
    '': '../../../assets/iconosTiempo/tormenta.png',
    
  };
  obtenerDiaSemana(fecha: string): string {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fechaDate = new Date(fecha);
    const diaSemana = fechaDate.getDay();
    return diasSemana[diaSemana];
  }
}