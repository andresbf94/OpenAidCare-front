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
    uploadResponse: any;
    pdfFiles: any[] = [];
    pdfViewerSrc: any;

    constructor(private pdfFilesService: PdfFilesService) {}

    ngOnInit(): void {}

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
    }

    onUpload(): void {
        if (this.selectedFile) {
            this.pdfFilesService.uploadFile(this.selectedFile, this.selectedFileType)
                .subscribe(response => {
                    this.uploadResponse = response;
                    console.log(response);
                });
        } else {
            console.error('No se ha seleccionado ningún archivo.');
        }
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
}