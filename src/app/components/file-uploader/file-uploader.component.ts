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

    constructor(private pdfFilesService: PdfFilesService) {}

    ngOnInit(): void {
        this.load5Years();
        this.loadPdfFiles('luz');
        console.log('files', this.pdfFiles);
    }

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
    }

    onUpload(): void {
        if (!this.selectedFile || !this.selectedFileType || !this.selectedMonth || !this.selectedYear) {
            // Mostrar mensaje de error
            this.showError = true;
            return;
        }

        // Reiniciar el estado de showError si no hay errores
        this.showError = false;

        // Resto de la lógica de carga del archivo
        this.pdfFilesService.uploadFile(
            this.selectedFile, 
            this.selectedFileType,
            this.selectedMonth, 
            this.selectedYear)
            .subscribe(response => {
                this.uploadResponse = response;
                console.log(response);
                this.loadPdfFiles('gas');
                this.loadPdfFiles('luz');
            });
    }

    loadPdfFiles(type: string): void {
        this.pdfFilesService.getPdfByType(type).subscribe(
            (response: any) => {
                this.pdfFiles = response.files;
                console.log('Archivos PDF cargados:', this.pdfFiles);
            },
            (error) => {
                console.error('Error al cargar archivos PDF:', error);
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
          response => {
            this.loadPdfFiles('gas');
            this.loadPdfFiles('luz');
            console.log('Respuesta del servidor:', response);
          },
          error => {
            console.error('Error al eliminar el archivo:', error);
          }
        );
    }
}