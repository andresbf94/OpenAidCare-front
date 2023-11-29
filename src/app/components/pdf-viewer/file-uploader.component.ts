import { Component, OnInit } from '@angular/core';
import { PdfFilesService } from 'src/app/services/pdf-files.service';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
    selectedFile: any;
    selectedFileType: any = '';  // Valor predeterminado
    selectedMonth: any = '';
    selectedYear: any = '';
    uploadResponse: any;
    pdfFiles: any[] = [];
    pdfViewerSrc: any;
    years: any;
    showError: boolean = false;
    errorMessage: any = '';
    luzActiva: boolean = true;
    gasActiva: boolean = false;

    selectedYearToGet:any;
    uniqueYears:any;
    selectedType= 'luz';
    currentYear = new Date().getFullYear();
    
    constructor(private pdfFilesService: PdfFilesService) {}

    ngOnInit(): void {
        this.load5Years();
        this.getUniqueYears();
        this.loadFiles('luz', this.currentYear);

      
        console.log('years', this.uniqueYears);
        console.log('files', this.pdfFiles);
    }

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
    }

    onUpload(): void {
      if (!this.selectedFile || !this.selectedMonth || !this.selectedYear) {
        // Mostrar mensaje de error
        this.showError = true;
        return;
      }
      // Reiniciar el estado de showError y errorMessage si no hay errores
      this.showError = false;
    
      // Establecer automáticamente el tipo de archivo en función de la pestaña activa
      if(this.luzActiva === true){
        this.selectedFileType = 'luz';
      } else if (this.gasActiva === true){
        this.selectedFileType = 'gas';
      }
        
      // Resto de la lógica de carga del archivo
      this.pdfFilesService.uploadFile(
        this.selectedFile,
        this.selectedFileType,
        this.selectedMonth,
        this.selectedYear
      ).subscribe(
        (response: any) => {
          this.uploadResponse = response;
          console.log(response);
          this.errorMessage = '';
          if(this.luzActiva){
            this.loadFiles('luz', this.selectedYear);
          } else {
            this.loadFiles('gas', this.selectedYear);
          }
          this.getUniqueYears()
        },
        (error: any) => {
          this.errorMessage = error.error?.mensaje || 'Error desconocido.';
        }
      );
    }
    // Carga todos los archivos de luz o gas en las variables pdfFilesLuz y pdfFilesGas
    
    openPdfViewer(base64Src: string): void {
        this.pdfViewerSrc = base64Src;
    }

    load5Years(): void {
        const currentYear = new Date().getFullYear();
        this.years = Array.from({ length: 6 }, (_, index) => currentYear - index);
        // Esto generará un array con el año actual y los últimos 5 años
    }

    deleteFile(fileId: string, type: string): void {
      this.pdfFilesService.deleteFile(fileId).subscribe(
        (response: any) => {
          if (type === 'luz'){
            this.loadFiles(type, 2023);
          } else {
            this.loadFiles(type, 2023);
          }
          this.getUniqueYears();
          console.log('Respuesta del servidor:', response);
        },
        (error: any) => {
          console.error('Error al eliminar el archivo:', error);
        }
      );
    }

    luzGasActivation(){
      if(this.luzActiva === true){
        this.luzActiva = false;
        this.gasActiva = true;
      } else {
        this.luzActiva = true;
        this.gasActiva = false;
      }
      this.changeType();
    }

    getUniqueYears(): void {
      this.pdfFilesService.getUniqueYears(this.selectedType).subscribe(
        (response: number[]) => {
          this.uniqueYears = response;
          console.log('Años únicos:', this.uniqueYears);
        },
        (error: any) => {
          console.error(`Error al obtener años únicos para el tipo ${this.selectedFileType}:`, error);
        }
      );
    }

    loadFiles(type:string, year:number): void {
      this.pdfFilesService.getPdfByTypeAndYear(type, year).subscribe(
        (response: any) => {
          this.pdfFiles = response.files;
          console.log('Archivos cargados:', this.pdfFiles);
        },
        (error: any) => {
          console.error('Error al cargar archivos:', error);
        }
      );  
    }

    changeType(){
      if(this.luzActiva){
        this.selectedType = 'luz';
      }
      else {this.selectedType = 'gas'}
    }
}