import { Component, OnInit } from '@angular/core';
import { ApiWeatherService } from 'src/app/services/api-weather.service';

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
  rachasMaximas: any = [];
  cotasNieve: any = [];
  humedadRelativa: any = [];

  constructor(private apiWeatherService: ApiWeatherService) {}

  ngOnInit() {
    this.apiWeatherService.datosDias$.subscribe((datosResponse: any) => {
      if (datosResponse && datosResponse.length > 0) {
        this.datos = datosResponse;
        this.temperaturas = this.extraerTemperaturas(this.datos);
        this.precipitaciones = this.extraerPrecipitaciones(this.datos);
        this.estadosCielo = this.extraerEstadosCielo(this.datos);
        this.vientos = this.extraerVientos(this.datos);
        this.rachasMaximas = this.extraerRachasMaximas(this.datos);
        this.cotasNieve = this.extraerCotasNieve(this.datos);
        this.humedadRelativa = this.extraerHumedadRelativa(this.datos);

        console.log("Temperaturas:");
        console.log(this.temperaturas);
        console.log("Precipitaciones:");
        console.log(this.precipitaciones);
        console.log("Estados Cielo:");
        console.log(this.estadosCielo);
        console.log("Vientos:");
        console.log(this.vientos);
        console.log("Rachas Máximas:");
        console.log(this.rachasMaximas);
        console.log("Cotas de Nieve:");
        console.log(this.cotasNieve);
        console.log("Humedad Relativa:");
        console.log(this.humedadRelativa);
        
      } else {
        console.error('Datos no válidos:', datosResponse);
      }
    });

    this.apiWeatherService.prediccionDiaria();
    this.apiWeatherService.prediccionHoraria();
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

  extraerRachasMaximas(datos: any): any[] {
    return datos[0].prediccion.dia.flatMap((dia: any) => {
      return dia.rachaMax.map((racha: any) => {
        return {
          fecha: dia.fecha,
          valor: racha.value,
          periodo: racha.periodo
        };
      });
    });
  }

  extraerCotasNieve(datos: any): any[] {
    return datos[0].prediccion.dia.flatMap((dia: any) => {
      return dia.cotaNieveProv.map((cota: any) => {
        return {
          fecha: dia.fecha,
          valor: cota.value
        };
      });
    });
  }

  extraerHumedadRelativa(datos: any): any[] {
    return datos[0].prediccion.dia.flatMap((dia: any) => {
      return {
        fecha: dia.fecha,
        maxima: dia.humedadRelativa.maxima,
        minima: dia.humedadRelativa.minima
      };
    });
  }
}