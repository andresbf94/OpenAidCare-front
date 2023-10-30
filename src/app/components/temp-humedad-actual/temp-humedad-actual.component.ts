import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MeasuresService } from 'src/app/services/measures.service';
import { SensorDataService } from 'src/app/services/sensors.service';

interface MediaPlanta {
  temperatura: number;
  humedad: number;
}

@Component({
  selector: 'app-temp-humedad-actual',
  templateUrl: './temp-humedad-actual.component.html',
  styleUrls: ['./temp-humedad-actual.component.css']
})
export class TempHumedadActualComponent implements OnInit {
  macsBaja = ['0x00124b002503776b', '0x00124b00246c6b74'];
  macsPrimera = ['0x00124b0024cd1b52', '0x00124b0024ce2b1f', '0x00124b002502bd80'];
  macsSegunda = ['0x00124b00246ccb6e'];
  macsExterior = ['0x00124b002502e233'];

  mediasPlantaBaja: MediaPlanta = { temperatura: 0, humedad: 0 };
  mediasPrimeraPlanta: MediaPlanta = { temperatura: 0, humedad: 0 };
  mediasSegundaPlanta: MediaPlanta = { temperatura: 0, humedad: 0 };
  mediasExterior: MediaPlanta = { temperatura: 0, humedad: 0 };

  constructor(private measuresService: MeasuresService, private sensorsService: SensorDataService) {}

  ngOnInit(): void {
    this.sensorsService.getSensors().subscribe((sensors: any) => {
      const observables = sensors
        .filter((sensor: any) => this.macsBaja.concat(this.macsPrimera, this.macsSegunda, this.macsExterior).includes(sensor.mac))
        .map((sensor: any) => this.measuresService.getMeasuresCurrentDay(sensor.friendlyName));

      forkJoin(observables).subscribe((results: any) => {
        results.forEach((sensorData: any) => {
          const measures = sensorData.measures;
  
          if (measures && measures.length > 0) {
            const lastMeasure = measures[measures.length - 1];
            const humedad = parseFloat(lastMeasure.data[0]);
            const temperatura = parseFloat(lastMeasure.data[1]);
  
            const mac = sensorData.sensor.mac;
  
            if (this.macsBaja.includes(mac)) {
              this.mediasPlantaBaja.temperatura += temperatura;
              this.mediasPlantaBaja.humedad += humedad;
            } else if (this.macsPrimera.includes(mac)) {
              this.mediasPrimeraPlanta.temperatura += temperatura;
              this.mediasPrimeraPlanta.humedad += humedad;
            } else if (this.macsSegunda.includes(mac)) {
              this.mediasSegundaPlanta.temperatura += temperatura;
              this.mediasSegundaPlanta.humedad += humedad;
            } else if (this.macsExterior.includes(mac)) {
              this.mediasExterior.temperatura += temperatura;
              this.mediasExterior.humedad += humedad;
            }
          }
        });
  
        const sensoresBaja = this.macsBaja.length;
        const sensoresPrimera = this.macsPrimera.length;
        const sensoresSegunda = this.macsSegunda.length;
        const sensoresExterior = this.macsExterior.length;
  
        this.mediasPlantaBaja.temperatura /= sensoresBaja;
        this.mediasPlantaBaja.humedad /= sensoresBaja;
        this.mediasPrimeraPlanta.temperatura /= sensoresPrimera;
        this.mediasPrimeraPlanta.humedad /= sensoresPrimera;
        this.mediasSegundaPlanta.temperatura /= sensoresSegunda;
        this.mediasSegundaPlanta.humedad /= sensoresSegunda;
        this.mediasExterior.temperatura /= sensoresExterior;
        this.mediasExterior.humedad /= sensoresExterior;
  
        console.log('Media de temperaturas y humedad para Planta Baja:', this.mediasPlantaBaja);
        console.log('Media de temperaturas y humedad para Primera Planta:', this.mediasPrimeraPlanta);
        console.log('Media de temperaturas y humedad para Segunda Planta:', this.mediasSegundaPlanta);
        console.log('Media de temperaturas y humedad para Exterior:', this.mediasExterior);
      });
    });
  }
  getNombrePlanta(planta: MediaPlanta): string {
    if (planta === this.mediasPlantaBaja) {
      return 'Planta Baja';
    } else if (planta === this.mediasPrimeraPlanta) {
      return 'Primera Planta';
    } else if (planta === this.mediasSegundaPlanta) {
      return 'Segunda Planta';
    } else if (planta === this.mediasExterior) {
      return 'Exterior';
    }
    return '';
  }

  getClasePlanta(planta: any): string {
    if (planta === this.mediasPlantaBaja) {
      return 'plantaBaja';
    } else if (planta === this.mediasPrimeraPlanta) {
      return 'primeraPlanta';
    } else if (planta === this.mediasSegundaPlanta) {
      return 'segundaPlanta';
    } else if (planta === this.mediasExterior) {
      return 'exterior';
    }
    return ''; // Si no coincide con ninguna planta, devuelve una cadena vacía
  }
}
