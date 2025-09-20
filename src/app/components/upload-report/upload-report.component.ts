


import { Component, EventEmitter, Output } from '@angular/core';
import { TestService } from '../../test.service';

@Component({
  selector: 'app-upload-report',
  templateUrl: './upload-report.component.html',
  styleUrls: ['./upload-report.component.css']
})
export class UploadReportComponent {
  selectedFile: File | null = null;
  uploadMessage: string = '';
  isLoading: boolean = false;

  @Output() fileUploaded = new EventEmitter<{ ocrText: string }>();

  constructor(private testService: TestService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadMessage = '';
  }

  uploadReport() {
    if (!this.selectedFile) {
      this.uploadMessage = 'Please select a file first!';
      return;
    }

    this.isLoading = true;
    this.testService.uploadReport(this.selectedFile).subscribe({
      next: (res: any) => {
        this.uploadMessage = 'File uploaded successfully!';
        const ocrText = res.extractedText || '';
        this.fileUploaded.emit({ ocrText });
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.uploadMessage = 'Upload failed! Please try again.';
        this.isLoading = false;
      }
    });
  }
}


