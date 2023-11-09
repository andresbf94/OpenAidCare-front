import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumos-horas-bombas',
  templateUrl: './consumos-horas-bombas.component.html',
  styleUrls: ['./consumos-horas-bombas.component.css']
})
export class ConsumosHorasBombasComponent implements OnInit {

  numBombasPequenas:number = 0;
  numBombasGrandes:number = 0;
  consumoPequenaKWh:number = 2.5;
  consumoGrandeKWh:number = 5;

  consumoEstimadoPequenas = this.consumoPequenaKWh * this.numBombasPequenas;
  consumoEstimadoGrandes = this.consumoGrandeKWh * this.numBombasGrandes;
  consumoEstimadoTotal = this.consumoEstimadoGrandes + this.consumoEstimadoPequenas;

  //costeEstimado = consumo * precio;
  costeReal = undefined;
  costeRealTotal = undefined;

  p1 = 0.186825;
  p2 = 0.178444;
  p3 = 0.159173;
  p4 = 0.152751;
  p5 = 0.147035;
  p6 = 0.138419;

  //En cada mes en la posicion 0 se guarda la tarifa valle(la mas baja), en la 1 la llano (media) y en la 2 la punta (alta)

  enero= [this.p6, this.p2, this.p1];
  febrero = [this.p6, this.p2, this.p1];
  marzo = [this.p6, this.p3, this.p3];
  abril = [this.p6, this.p5, this.p4];
  mayo = [this.p6, this.p5, this.p4];
  junio = [this.p6, this.p4, this.p3];
  julio = [this.p6, this.p2, this.p1];
  agosto = [this.p6, this.p4, this.p3];
  septiembre = [this.p6, this.p4, this.p3];
  octubre = [this.p6, this.p5, this.p4];
  noviembre = [this.p6, this.p3, this.p3];
  diciembre = [this.p6, this.p2, this.p1];
  festivoSyD = this.p6;

   


 //preciosHoras = [{00-01: valle},{{00-02}} ]


  ngOnInit(): void{
    
  }

  // Funcion para obtener el nombre del mes y asi saber que tarifas aplicar

  obtenerNombreMes(): string {
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
  
    const fechaActual = new Date();
    const numeroMes = fechaActual.getMonth();
    const nombreMes = meses[numeroMes];
    
    return nombreMes;
  }
  
  
  
}
