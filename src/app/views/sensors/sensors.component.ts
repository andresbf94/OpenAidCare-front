import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Cell, DefaultEditor, EditConfirmEvent } from 'angular2-smart-table';
import { Settings } from 'angular2-smart-table/lib/lib/settings';
import { SensorDataService } from '../../services/sensors.service';
import { GraphsService } from 'src/app/services/graphs.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss'],
})

export class SensorsComponent implements OnInit {
  sensors = new Array();
  prueba: string = '';
  data: any = [];
  graphUrl: SafeResourceUrl = '';
  loading: boolean = false;
  @ViewChild('content', { static: false }) content!: TemplateRef<any>;

  // En el constructor cargo los datos de los sensores

  constructor(private medidasService: SensorDataService, private graphService: GraphsService, private sanitizer: DomSanitizer, private modalService: NgbModal, private customButtonComponent: CustomButtonComponent) {
    this.medidasService.getSensors().subscribe((sensors: any) => {
      this.sensors = sensors;

      this.data = new Array();

      console.log('listado', this.sensors);

      this.sensors.forEach((sensor) => {

        switch (sensor.mac.trim()) {
          // Sensores temperatura y humedad
          case '0x00158d0008984738':
          case '0x00124b002503776b':
          case '0x00124b0024cd1b52':
          case '0x00124b0024ce2b1f':
          case '0x00124b002502bd80':
          case '0x00124b0025033b99':
          case '0x00124b00246ccb6e':
          case '0x00124b00246c6b74':
          case '0x00124b002502e233':
          // Sensores presencia
          case '0x00124b00251c554a':
          case '0x00124b00288fd901':
          case '0x00124b002450f476':

            this.data.push({
              estado: this.getStatus(
                sensor.battery,
                sensor.batteryLow,
                sensor.updatedAt,
                sensor.model
              ),
              friendlyName: sensor.friendlyName,
              battery: this.getBattery(sensor.battery, sensor.batteryLow),
              mac: sensor.mac,
              description: sensor.model.description,
              button: 'Grafica',
            });
            break;
          default:
        }
      });
    });
  }
  // 'Configuracion' de la smart-table
  settings: Settings = {

    columns: {
      estado: {
        title: 'Estado',
        isEditable: false,
      },

      friendlyName: {
        title: 'Friendly Name',
        isEditable: true,
      },

      battery: {
        title: 'Bateria',
        isEditable: false,
      },

      mac: {
        title: 'Mac',
        isEditable: false,
      },

      description: {
        title: 'Descripcion',
        isEditable: false,
      },
      button: {
        title: '',
        type: 'custom',
        isEditable: false,
        renderComponent: CustomButtonComponent,
        componentInitFunction: CustomButtonComponent.componentInit,

      },
    },

    mode: 'inline',

    edit: {
      confirmSave: true,
      editButtonContent: 'Editar',
      saveButtonContent: 'Guardar',
      cancelButtonContent: 'Cancelar'

    },

    actions: {
      columnTitle: '',
      add: false,
      delete: false,
    },

    pager: {
      perPage: 12,
    },

    hideSubHeader: true,
  };
  // Funcion para abrir y centrar el modal
  openVerticallyCentered(content: any) {
    this.loading = true; // Comienza la carga
    this.modalService.open(content, { centered: true, size: 'xl' });
    var myIframe = document.getElementById('iframeGraph');
    myIframe?.addEventListener("load",  () => {
      this.loading = false;
    });
  }
  ngOnInit(): void {
    this.graphService.graphUrl$.subscribe(url => {
      const safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.graphUrl = safeUrl;
    });
    this.graphService.graphButtonClicked.subscribe((sensorData: any) => {
      // Abre el modal cuando se hace clic en el botón de la gráfica
      this.openVerticallyCentered(this.content);
      // Aquí puedes usar sensorData para cargar la gráfica correspondiente
      // sensorData contiene los datos del sensor que se hizo clic
    });
  }
  // Obtiene el estado de los sensores ON/OFF
  getStatus(
    battery: null | number,
    batteryLow: null | number,
    updatedAt: string,
    model: any
  ) {
    if (model.values.includes('power')) {
      var updatedAtDate = new Date(updatedAt);
      var actualDate = new Date();
      if (
        actualDate.getDate() - updatedAtDate.getDate() > 5 ||
        actualDate.getMonth() != updatedAtDate.getMonth()
      )
        return 'OFF';
      else return 'ON';
    } else {
      if (battery === null || battery === undefined) {
        if (batteryLow === null || batteryLow === undefined) {
          return 'OFF';
        } else {
          var updatedAtDate = new Date(updatedAt);
          var actualDate = new Date();
          if (
            actualDate.getDate() - updatedAtDate.getDate() > 5 ||
            actualDate.getMonth() != updatedAtDate.getMonth()
          )
            return 'OFF';
          else return 'ON';
        }
      } else {
        var updatedAtDate = new Date(updatedAt);
        var actualDate = new Date();
        if (
          actualDate.getDate() - updatedAtDate.getDate() > 5 ||
          actualDate.getMonth() != updatedAtDate.getMonth()
        )
          return 'OFF';
        else return 'ON';
      }
    }
  }
  // Obtiene el porcentaje de bateria de los sensores
  getBattery(battery: null | number, batteryLow: null | number) {
    if (battery === null || battery === undefined) {
      if (batteryLow === null || batteryLow === undefined) {
        return '---';
      } else {
        return batteryLow + '%';
      }
    } else {
      return battery + '%';
    }
  }
  // Modifica el friendly name en la BD
  updateFriendlyName(event: EditConfirmEvent) {
    this.graphService.putFriendlyName(event.newData.friendlyName, event.data.mac).subscribe({
      next: response => { console.log(response) },
      error: error => { console.log(error) }
    });

    return event.confirm.resolve(event.newData);
  }
  // Envia al servicio los datos necesarios para la url que muestra las graficas
  allSensorsGraphs() {
    const macAddresses = [
      '0x00158d0008984738',
      '0x00124b002503776b',
      '0x00124b0024cd1b52',
      '0x00124b0024ce2b1f',
      '0x00124b002502bd80',
      '0x00124b0025033b99',
      '0x00124b00246ccb6e',
      '0x00124b00246c6b74',
      '0x00124b002502e233'
    ];
    const showTemperature = 't';
    const showMinMax = 's';
    const startDate = '2023-09-01';

    // Get the graph data
    this.graphService.getGraph(macAddresses, showTemperature, showMinMax, startDate)
      .subscribe({
        next: (response: any) => {
          this.graphService.graphButtonClicked.emit(this);
        },
        error: (response: any) => {

        }
      })
  }

}

// COMPONENTE BOTON GRAFICA

@Component({
  selector: 'app-custom-button',
  styles: [
    '.details-table-button {background:#5698da; color:black; border:2px solid #5698da; border-radius:5px; padding:5px; transition: all ease-in-out .2s; font-weight: bold}',
    '.details-table-button:hover {background: transparent; color:#5698da}',
    '.details-table-button:disabled {opacity:.5; pointer-events:none}'
  ],
  template:
    '<button (click)="sensorGraph(); onButtonClick()" class="details-table-button">Gráfica</button>',
})

export class CustomButtonComponent extends DefaultEditor {

  public row: any;

  constructor(private graphService: GraphsService) {
    super();
  }

  sensorGraph() {
    const macAddresses = new Array();
    macAddresses.push(this.row.mac);
    const showTemperature = 't';
    const showMinMax = 's';
    const startDate = '2023-10-01';

    this.graphService.getGraph(
      macAddresses,
      showTemperature,
      showMinMax,
      startDate
    );
  }
  onButtonClick() {
    this.graphService.graphButtonClicked.emit(this.row); // Emitir el evento con los datos del sensor
  }

  static componentInit(instance: CustomButtonComponent, cell: Cell) {
    instance.row = cell.getRow().getData();
  }

}
