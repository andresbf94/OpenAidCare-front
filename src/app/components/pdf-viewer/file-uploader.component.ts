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
    pdfFilesLuz: any[] = [];
    pdfFilesGas: any[] = [];
    pdfViewerSrc: any;
    years: any;
    showError: boolean = false;
    errorMessage: any = '';
    luzActiva: boolean = true;
    gasActiva: boolean = false;

    uniqueLuzYears:any;
    uniqueGasYears:any;
    selectedLuzYear:any;
    selectedGasYear:any;

    filtredPdfLuz:any[] = [];
    filtredPdfGas:any[] = [];
    
    constructor(private pdfFilesService: PdfFilesService) {}

    ngOnInit(): void {
        this.load5Years();
        this.loadPdfFiles('luz');

        console.log('files', this.pdfFilesLuz);
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
          this.loadPdfFiles('gas');
          this.loadPdfFiles('luz');
        },
        (error: any) => {
          this.errorMessage = error.error?.mensaje || 'Error desconocido.';
        }
      );
    }
    // Carga todos los archivos de luz o gas en las variables pdfFilesLuz y pdfFilesGas
    loadPdfFiles(type: string): void {
      this.pdfFilesService.getPdfByType(type).subscribe(
        
        (response: any) => {
            if (type === 'luz') {
                this.pdfFilesLuz = response.files;
            } else if (type === 'gas') {
                this.pdfFilesGas = response.files;
            }
            this.getYearsPdfs();
            console.log(`Archivos PDF cargados para ${type}:`, response.files);
            console.log('pdfFilesLuz:', this.pdfFilesLuz); // Agregado para depuración
            
        },
        (error: any) => {
            this.pdfFilesLuz = [];
            this.pdfFilesGas = [];
            console.error(`Error al cargar archivos PDF para ${type}:`, error);
        }
      );
    }
  
    openPdfViewer(base64Src: string): void {
        this.pdfViewerSrc = base64Src;
    }

    load5Years(): void {
        const currentYear = new Date().getFullYear();
        this.years = Array.from({ length: 6 }, (_, index) => currentYear - index);
        // Esto generará un array con el año actual y los últimos 5 años
    }

    deleteFile(fileId: string): void {
        this.pdfFilesService.deleteFile(fileId).subscribe(
          (response: any) => {
            this.loadPdfFiles('gas');
            this.loadPdfFiles('luz');
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
    }
   
    getYearsPdfs(): void {
      this.uniqueGasYears = this.getUniqueYears(this.pdfFilesGas);
      this.uniqueLuzYears = this.getUniqueYears(this.pdfFilesLuz);
    
      console.log('Años únicos para Gas:', this.uniqueGasYears);
      console.log('Años únicos para Luz:', this.uniqueLuzYears);
    
      // Puedes almacenar estos arrays en propiedades del componente
      // y luego usarlos en tu plantilla para construir los desplegables.
    }
    
    // Función para obtener años únicos de un conjunto de archivos
    getUniqueYears(files: any[]): number[] {
      const uniqueYears: number[] = [];
      files.forEach(file => {
        if (file.year && !uniqueYears.includes(file.year)) {
          uniqueYears.push(file.year);
        }
      });
      return uniqueYears;
    }
    
    filtrarPdf(): void {
      const pdfsLuz = this.pdfFilesLuz.filter((element) => element.year === this.selectedLuzYear);
      const pdfGas = this.pdfFilesGas.filter((element) => element.year === this.selectedGasYear);
    
      this.filtredPdfLuz = pdfsLuz;
      this.filtredPdfGas = pdfGas;
    
      console.log('filtredPdfLuz', this.filtredPdfLuz);
      console.log('filtredPdfGas', this.filtredPdfGas);
    }
}