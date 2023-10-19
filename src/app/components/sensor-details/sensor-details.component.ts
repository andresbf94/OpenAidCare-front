import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SensorDataService } from 'src/app/services/sensor-data.service';


@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.css']
})
export class SensorDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private sensorDataService: SensorDataService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const macAddresses = params['mac'];
      const showTemperature = params['s_th'] === 't';
      const showHumidity = params['s_th'] === 'h';
      const showMinMax = params['min_max'] === 's';
      const startDate = params['f_ini'];
      const endDate = params['f'];

      // Realiza la solicitud HTTP utilizando el servicio SensorDataService
      this.sensorDataService.getSensorData(macAddresses, showTemperature, showHumidity, showMinMax, startDate, endDate)
        .subscribe(data => {
          // Construye la URL de la API con los detalles específicos del sensor
          const apiURL = `https://openaidcare-python.herokuapp.com/oac?h_id=${macAddresses}&s_th=${showTemperature ? 't' : ''}&s_th=${showHumidity ? 'h' : ''}&min_max=${showMinMax ? 's' : 'n'}&f_ini=${startDate}&f=${endDate}`;

          // Abre una nueva ventana o pestaña del navegador con la URL de la API
          window.open(apiURL, '_blank');
        });
    });
  }
}
