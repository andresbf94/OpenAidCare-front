import { Component, NgZone } from '@angular/core';
import { PdfFilesService } from 'src/app/services/pdf-files.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent {
  selectedFile: any;
  selectedFileType: any ='';  // Valor predeterminado
  uploadResponse: any;
  pdfContent: any;
  pdfUrl: any;

  constructor(private pdfFilesService: PdfFilesService, private zone: NgZone) {}

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
  this.pdfFilesService.downloadPdfByType(this.selectedFileType)
    .subscribe(response => {
      if (response && response.body instanceof ArrayBuffer) {
        this.pdfContent = new Uint8Array(response.body);

        // Utiliza NgZone para asegurarte de que el cambio se realiza dentro de la zona de Angular
        this.zone.run(() => {
          this.updatePdfUrl();
        });
      } else {
        console.error('Respuesta inválida o cuerpo no es un ArrayBuffer.');
      }
    }, error => {
      console.error('Error al descargar el PDF:', error);
    });
}

  private updatePdfUrl(): void {
    if (this.pdfContent) {
      const blob = new Blob([this.pdfContent], { type: 'application/pdf' });
      this.pdfUrl = URL.createObjectURL(blob);
    } else {
      this.pdfUrl = null;
    }
  }

}