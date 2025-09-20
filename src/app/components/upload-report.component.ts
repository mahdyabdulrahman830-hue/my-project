


// import { Component } from '@angular/core';
// import { TestService } from '../test.service';

// @Component({
//   selector: 'app-upload-report',
//   templateUrl: './upload-report.component.html',
//   styleUrls: ['./upload-report.component.css']
// })
// export class UploadReportComponent {
//   selectedFile: File | null = null;
//   uploadMessage: string = '';

//   constructor(private testService: TestService) {}

//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//     this.uploadMessage = '';
//      this.uploadedFileUrl = null;
//   }
//   uploadedFileUrl: string | null = null;
//   uploadReport() {
//     if (!this.selectedFile) {
//       this.uploadMessage = 'Please select a file first!';
//       return;
//     }

// this.testService.uploadReport(this.selectedFile).subscribe({
//       next: (res: any) => {
//         this.uploadMessage = `File uploaded successfully: ${res.file.filename}`;
//        this.uploadedFileUrl = `http://localhost:5000/uploads/${res.file.filename}`;
//       },
//       error: (err) => {
//         console.error(err);
//         this.uploadMessage = 'Upload failed!';
//           this.uploadedFileUrl = null;
//       }
//     });
//   }
// }


// import { Component } from '@angular/core';
// import { TestService } from '../test.service';

// @Component({
//   selector: 'app-upload-report',
//   templateUrl: './upload-report.component.html',
//   styleUrls: ['./upload-report.component.css']
// })
// export class UploadReportComponent {
//   selectedFile: File | null = null;
//   fileName: string = '';
//   uploadMessage: string = '';
//   uploadedFileUrl: string | null = null;

//   constructor(private testService: TestService) {}

//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//     this.fileName = this.selectedFile ? this.selectedFile.name : '';
//     this.uploadMessage = '';
//   }

//   uploadReport() {
//     if (!this.selectedFile) {
//       this.uploadMessage = 'Please select a file first!';
//       return;
//     }

//     this.testService.uploadReport(this.selectedFile).subscribe({
//       next: (res: any) => {
//         this.uploadMessage = `File uploaded successfully: ${res.file.filename}`;
//         this.uploadedFileUrl = `http://localhost:5000/uploads/${res.file.filename}`;
//       },
//       error: (err) => {
//         console.error(err);
//         this.uploadMessage = 'Upload failed!';
//         this.uploadedFileUrl = null;
//       }
//     });
//   }
// }



import { Component, EventEmitter, Output } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-upload-report',
  templateUrl: './upload-report.component.html',
  styleUrls: ['./upload-report.component.css']
})
export class UploadReportComponent {
  selectedFile: File | null = null;
  fileName: string = '';
  uploadMessage: string = '';

  @Output() fileUploaded = new EventEmitter<void>(); // لإعلام القائمة

  constructor(private testService: TestService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile ? this.selectedFile.name : '';
    this.uploadMessage = '';
  }

  uploadReport() {
    if (!this.selectedFile) {
      this.uploadMessage = 'Please select a file first!';
      return;
    }

    this.testService.uploadReport(this.selectedFile).subscribe({
      next: (res: any) => {
        this.uploadMessage = `File uploaded successfully: ${res.file.originalName}`;
        this.fileUploaded.emit(); // حدث القائمة
      },
      error: (err) => {
        console.error(err);
        this.uploadMessage = 'Upload failed!';
      }
    });
  }
}
