import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UploadReportComponent } from './components/upload-report/upload-report.component';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { OCRResultComponent } from './components/ocr-result/ocr-result.component';
import { TestService } from './test.service';

@NgModule({
  declarations: [
    AppComponent,
    UploadReportComponent,
    ReportsListComponent,
    OCRResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
