import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumos-horas-bombas',
  templateUrl: './consumos-horas-bombas.component.html',
  styleUrls: ['./consumos-horas-bombas.component.css']
})
export class ConsumosHorasBombasComponent {
  // Constantes
  numBombas:number = 0;
  consumoKWh:number = 0;
  
  // Variables
  consumosCostos:any = [];
  consumosCostosTotales:any = [];
  horasSeleccionadas: any = [];
  horasCostos:any= [];
  seleccionActual:any;

  // Coste kwh por tramo (Actualizado 9-11-2023)
  p1 = 0.186825;
  p2 = 0.178444;
  p3 = 0.159173;
  p4 = 0.152751;
  p5 = 0.147035;
  p6 = 0.138419;

  // Objeto que contiene los estados de los botones
  estadosBotones:any= {
    todas: false,
    valle: false,
    punta: false,
    llano: false,
    seleccionadas: false
  }
    
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

  //Obtiene los tramos por hora en funcion del mes actual
  filtrarHorasTramos(opcion: string) {
    if (opcion === 'todas') {
      this.horasCostos = this.obtenerTodasLasHoras();
    } else if (opcion === 'valle') {
      this.horasCostos = this.obtenerHorasValle();
    } else if (opcion === 'llano') {
      this.horasCostos  = this.obtenerHorasLlano();
    } else if (opcion === 'punta') {
      this.horasCostos  = this.obtenerHorasPunta();
    } else if (opcion === 'seleccionadas') {
      this.horasCostos  = this.obtenerHorasSeleccionadas();
    }
  }

  // Da todas la horas
  obtenerTodasLasHoras() {
    const horasTramos = this.obtenerHorasTramos();
    return horasTramos;
  }

  // Devuelve las horas seleccionadas
  obtenerHorasSeleccionadas() {
    const horasTramos = this.obtenerHorasTramos();
    const horasSeleccionadas: any[] = [];
    const horasSeleccionadasArray = this.horasSeleccionadas.map((element: { hora: string, tramo: number }) => element.hora);
  
    horasTramos.forEach(element => {
      if (horasSeleccionadasArray.includes(element.hora)) {
        horasSeleccionadas.push(element);
      }
    }); 
    return horasSeleccionadas;
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
    const horasLlanoArray = ['08-09', '09-10', '14-15', '15-16', '16-17', '17-18', '22-23', '23-24'];
  
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
      { hora: '23-24', tramo: this.tramosMeses[numeroMes][1] },
    ];
    return horasTramos;
  }

  sumarConsumosCostos(consumosCostos: any[]) {
    this.consumosCostosTotales = [];
    // Inicializamos las variables de suma
    let sumaConsumoEstimadoBombas = 0;
    let sumaCosteEstimadoBombas = 0;
  
    // Iteramos sobre los consumos y costos y sumamos los valores
    for (const consumo of consumosCostos) {
      sumaConsumoEstimadoBombas += consumo.consumoEstimadoBombas;
      sumaCosteEstimadoBombas += consumo.costeEstimadoBombas;
    }
  
    this.consumosCostosTotales.push({
      sumaConsumoEstimadoBombas: sumaConsumoEstimadoBombas,
      sumaCosteEstimadoBombas: sumaCosteEstimadoBombas
    });
  }
  
  recalcularConsumosCostos() {
    this.consumosCostos = [];
  
    for (let i = 0; i < this.horasCostos.length; i++) {
      const hora = this.horasCostos[i].hora;
      const costoHora = this.horasCostos[i].tramo;
  
      const consumoBombas = this.consumoKWh * this.numBombas;
      const costoBombas = consumoBombas * costoHora;
  
      this.consumosCostos.push({
        hora: hora,
        numBombas: this.numBombas,
        consumoEstimadoBombas: consumoBombas,
        costeEstimadoBombas: costoBombas
      });
    } 
    // Llamada a la función para obtener la suma de consumos y costos
    const resultadosSuma = this.sumarConsumosCostos(this.consumosCostos);
  }

  obtenerHorasDia() {
    const horasDia = [];
    for (let i = 0; i < 24; i++) {
      const horaInicio = i < 10 ? `0${i}` : `${i}`;
      const horaFin = i + 1 < 10 ? `0${i + 1}` : `${i + 1}`;
      horasDia.push(`${horaInicio}-${horaFin}`);
    }
    return horasDia;
  }

  onButtonChange(hora: string): void {
  const index = this.horasSeleccionadas.findIndex((element: { hora: string; }) => element.hora === hora);

    if (index !== -1) {
      // Si la hora ya está en el array, quítala
      this.horasSeleccionadas.splice(index, 1);
    } else {
      // Si la hora no está en el array, agrégala con su tramo
      const tramo = this.obtenerTramoPorHora(hora);
      this.horasSeleccionadas.push({ hora, tramo });
    }
  }
  
  obtenerTramoPorHora(hora: string): number {
    // Busca el tramo correspondiente a la hora
    const horaEnTramos = this.obtenerHorasTramos().find((element) => element.hora === hora);
  
    // Retorna el tramo si se encuentra, de lo contrario, retorna 0 (puede ajustarse según la lógica deseada)
    return horaEnTramos ? horaEnTramos.tramo : 0;
  }
  desplegado= false;

  plegar(){
    this.desplegado = false;
    this.horasSeleccionadas=[];
  }

  desplegar() {
    this.desplegado = !this.desplegado;
    this.horasSeleccionadas=[];
  }

  obtenerClasePorTramo(tramo: any): string {
    // Implementa la lógica para asignar la clase según el tramo
    if (tramo === this.p1) {
      return 'P1';
    } else if (tramo === this.p2) {
      return 'P2';
    } else if (tramo === this.p3) {
      return 'P3';
    } else if (tramo === this.p4) {
      return 'P4';
    } else if (tramo === this.p5) {
      return 'P5';
    } else if (tramo === this.p6) {
      return 'P6';
    } else {
      // Si no coincide con ningún tramo conocido, puedes manejarlo de otra manera o devolver una clase predeterminada
      return 'clase-predeterminada';
    }
  }

  isHoraSeleccionada(hora: string): boolean {
    return this.horasSeleccionadas.some((h: { hora: string; }) => h.hora === hora);
  }
  
  obtenerMesActualNumero(){
    const fecha = new Date;
    const mes = fecha.getMonth();
    return mes;
  }

  obtenerMesActualNombre(): string {
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const fechaActual = new Date();
    const nombreMes = meses[fechaActual.getMonth()];

    return nombreMes;
  }

  // Funcion para cambiar que boton esta seleccionado
  seleccionarBoton(boton: any) {
    // Deselecciona todos los botones
    Object.keys(this.estadosBotones).forEach(key => {
      this.estadosBotones[key] = false;
    });
  
    // Selecciona el botón clicado
    this.estadosBotones[boton] = true;
  
    // Registra la selección actual
    this.seleccionActual = boton;
  
    // No llames a las funciones aquí
  }
  
  calcularRegistros() {
    // Pasa la selección actual como argumento
    this.filtrarHorasTramos(this.seleccionActual);
    this.recalcularConsumosCostos();
  }
  
  obtenerDiasEnMesActual() {
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1; // Los meses comienzan desde 0 (enero) hasta 11 (diciembre)
    const ultimoDiaMes = new Date(añoActual, mesActual, 0).getDate();
  
    return ultimoDiaMes;
  }
  
}