import { Component, NgZone } from '@angular/core';
import { PdfFilesService } from 'src/app/services/pdf-files.service';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent {
  selectedFile: any;
  selectedFileType: any ='';  // Valor predeterminado
  uploadResponse: any;
  pdfSrc: any;
  datos:any;
  
  ruta="../../../assets/Temperatura y humedad (1).pdf";

  constructor(private pdfFilesService: PdfFilesService, private zone: NgZone) {pdfDefaultOptions.assetsFolder = 'bleeding-edge';}

  onFileSelected(event:any): void {
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

  onDownloadByType(): void {
    if (this.selectedFileType) {
      this.pdfFilesService.downloadPdfByType(this.selectedFileType).subscribe(
        (data: ArrayBuffer) => {
          console.log('data', data);
          this.datos = data;
          // Convierte el ArrayBuffer a una cadena de datos URL
          const blob = new Blob([data], { type: 'application/pdf' });
          this.pdfSrc = URL.createObjectURL(blob);
        },
        (error: any) => {
          console.error('Error al cargar el PDF:', error);
        }
      );
    } else {
      console.error('No se ha seleccionado un tipo de archivo.');
    }
  }


}