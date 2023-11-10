import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumos-horas-bombas',
  templateUrl: './consumos-horas-bombas.component.html',
  styleUrls: ['./consumos-horas-bombas.component.css']
})
export class ConsumosHorasBombasComponent implements OnInit {

  numBombasPequenas:number = 2;
  numBombasGrandes:number = 1;
  consumoPequenaKWh:number = 2.5;
  consumoGrandeKWh:number = 5;
  
  // Consumos y costos
  consumosCostos:any = [];
  horasMostrar: any ='';        // Contiene la opcion seleccionada en el input de la vista

  // Coste kwh por tramo (Actualizado 9-11-2023)
  p1 = 0.186825;
  p2 = 0.178444;
  p3 = 0.159173;
  p4 = 0.152751;
  p5 = 0.147035;
  p6 = 0.138419;
  
  // En cada mes en la posicion 0 se guarda la tarifa valle(la mas baja), en la 1 la llano (media) y en la 2 la punta (alta)
  tramosMeses = [ 
    [this.p6, this.p2, this.p1],    // enero
    [this.p6, this.p2, this.p1],    // febrero
    [this.p6, this.p3, this.p2],    // marzo
    [this.p6, this.p5, this.p4],    // abril
    [this.p6, this.p5, this.p4],    // mayo
    [this.p6, this.p4, this.p3],    // junio
    [this.p6, this.p2, this.p1],    // julio
    [this.p6, this.p4, this.p3],    // agosto
    [this.p6, this.p4, this.p3],    // septiembre
    [this.p6, this.p5, this.p4],    // octubre
    [this.p6, this.p3, this.p2],    // noviembre
    [this.p6, this.p2, this.p1],    // diciembre  
  ]

  // Los festivos, y fines de semana siempre es p6
  festivoSyD = this.p6;
  
  ngOnInit(): void{

    console.log('valle', this.obtenerHorasValle());
    console.log('punta', this.obtenerHorasPunta());
    console.log('llano', this.obtenerHorasLlano());
    console.log('obtenertramosHoras', this.filtrarHorasTramos())
    console.log(' horas tramos', this.obtenerHorasTramos() );
    this.recalcularConsumosCostos();
    console.log('consumosCostos', this.consumosCostos)
  }

  // 1. Obtiene los tramos por hora en funcion del mes actual
  filtrarHorasTramos() {
    let horasCostos:any= [];
  
    if (this.horasMostrar === 'todas') {
      horasCostos = this.obtenerTodasLasHoras();
    } else if (this.horasMostrar === 'valle') {
      horasCostos = this.obtenerHorasValle();
    } else if (this.horasMostrar === 'llano') {
      horasCostos = this.obtenerHorasLlano();
    } else if (this.horasMostrar === 'punta') {
      horasCostos = this.obtenerHorasPunta();
    }
    return horasCostos;
  }
  // Da todas la horas
  obtenerTodasLasHoras() {
    const horasTramos = this.obtenerHorasTramos();
    return horasTramos;
  }

  // Filtra las horas en el tramo Valle
  obtenerHorasValle() {
    const horasTramos = this.obtenerHorasTramos();
    const horasValle: any = [];  
    const horasValleArray = ['00-01', '01-02', '02-03', '03-04', '04-05', '05-06', '06-07', '07-08'];
  
    horasTramos.forEach(element => {
      if (horasValleArray.includes(element.hora)) {
        horasValle.push(element);
      }
    });
    return horasValle;
  }

  // Filtrar las horas en el tramo Llano
  obtenerHorasLlano() { 
    const horasTramos = this.obtenerHorasTramos();
    const horasLlano: any = [];
    const horasLlanoArray = ['08-09', '09-10', '14-15', '15-16', '16-17', '17-18', '22-23', '23-00'];
  
    horasTramos.forEach(element => {
      if (horasLlanoArray.includes(element.hora)) {
        horasLlano.push(element);
      }
    });
    return horasLlano;
  }

  // Filtrar las horas en el tramo Punta
  obtenerHorasPunta() {
    const horasTramos = this.obtenerHorasTramos();
    const horasPunta: any = [];
    const horasPuntaArray = ['10-11', '11-12', '12-13', '13-14', '18-19', '19-20', '20-21', '21-22'];
  
    horasTramos.forEach(element => {
      if (horasPuntaArray.includes(element.hora)) {
        horasPunta.push(element);
      }
    });
    return horasPunta; 
  }

  obtenerHorasTramos() {
    // Implementa la lógica para obtener todas las horas del día
    const fechaActual = new Date();
    const numeroMes = fechaActual.getMonth();
    const tramosMesActual = this.tramosMeses[numeroMes];

    const horasTramos = [
      { hora: '00-01', tramo: this.tramosMeses[numeroMes][0] }, // Tramo Valle
      { hora: '01-02', tramo: this.tramosMeses[numeroMes][0] },
      { hora: '02-03', tramo: this.tramosMeses[numeroMes][0] },
      { hora: '03-04', tramo: this.tramosMeses[numeroMes][0] },
      { hora: '04-05', tramo: this.tramosMeses[numeroMes][0] },
      { hora: '05-06', tramo: this.tramosMeses[numeroMes][0] },
      { hora: '06-07', tramo: this.tramosMeses[numeroMes][0] },
      { hora: '07-08', tramo: this.tramosMeses[numeroMes][0] },
      { hora: '08-09', tramo: this.tramosMeses[numeroMes][1] }, // Tramo Llano
      { hora: '09-10', tramo: this.tramosMeses[numeroMes][1] },
      { hora: '10-11', tramo: this.tramosMeses[numeroMes][2] }, // Tramo Punta
      { hora: '11-12', tramo: this.tramosMeses[numeroMes][2] },
      { hora: '12-13', tramo: this.tramosMeses[numeroMes][2] },
      { hora: '13-14', tramo: this.tramosMeses[numeroMes][2] },
      { hora: '14-15', tramo: this.tramosMeses[numeroMes][1] }, // Tramo Llano
      { hora: '15-16', tramo: this.tramosMeses[numeroMes][1] },
      { hora: '16-17', tramo: this.tramosMeses[numeroMes][1] },
      { hora: '17-18', tramo: this.tramosMeses[numeroMes][1] },
      { hora: '18-19', tramo: this.tramosMeses[numeroMes][2] }, // Tramo Punta
      { hora: '19-20', tramo: this.tramosMeses[numeroMes][2] },
      { hora: '20-21', tramo: this.tramosMeses[numeroMes][2] },
      { hora: '21-22', tramo: this.tramosMeses[numeroMes][2] },
      { hora: '22-23', tramo: this.tramosMeses[numeroMes][1] }, // Tramo Llano
      { hora: '23-00', tramo: this.tramosMeses[numeroMes][1] },
    ];
    return horasTramos;
  }

  recalcularConsumosCostos() {
    const horasCostos = this.filtrarHorasTramos();
    this.consumosCostos = [];

    for (let i = 0; i < horasCostos.length; i++) {
      const hora = horasCostos[i].hora;
      const costoHora = horasCostos[i].tramo;

      const consumoPequenas = this.consumoPequenaKWh * this.numBombasPequenas;
      const consumoGrandes = this.consumoGrandeKWh * this.numBombasGrandes;
      const consumoTotal = consumoPequenas + consumoGrandes;

      const costoPequenas = consumoPequenas * costoHora;
      const costoGrandes = consumoGrandes * costoHora;
      const costoTotal = costoPequenas + costoGrandes;

      this.consumosCostos.push({
        hora: hora,
        numBombasPequenas: this.numBombasPequenas,
        numBombasGrandes: this.numBombasGrandes,
        consumoEstimadoPequenas: consumoPequenas,
        consumoEstimadoGrandes: consumoGrandes,
        consumoEstimadoTotal: consumoTotal,
        costeEstimadoPequenas: costoPequenas,
        costeEstimadoGrandes: costoGrandes,
        costeEstimadoTotal: costoTotal
      });
    }
  }
  
  
}
