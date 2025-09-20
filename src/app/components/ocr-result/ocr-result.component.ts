import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ocr-result',
  templateUrl: './ocr-result.component.html',
  styleUrls: ['./ocr-result.component.css']
})
export class OCRResultComponent {
  @Input() ocrText: string = '';
}
