import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as JsBarcode from 'jsbarcode';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  public doc: any;

  @ViewChild('pdfViewerAutoLoad', {static: false}) pdfViewerAutoLoad;

  constructor(private http: HttpClient) {
  }


  ngAfterViewInit(): void {

    const barcodeoptons = {
      format: 'CODE128',
      // width: 100,
      // height: 90,
      displayValue: true
    };
    JsBarcode('#barcode', '1234', barcodeoptons);
    const imgData = (document.getElementById('barcode') as HTMLCanvasElement).toDataURL('image/png', 1);

    this.doc = new jsPDF('p', 'mm', [297, 210]);

    // this.doc.setFontSize(40);
    // this.doc.text(35, 25, 'Paranyan loves jsPDF');
    this.doc.addImage(imgData, 'PNG', 0, 0, 10, 10);
    this.doc.addImage(imgData, 'PNG', 11, 0, 10, 10);

    this.pdfViewerAutoLoad.pdfSrc = this.doc.output('bloburl'); // pdfSrc can be Blob or Uint8Array
    this.pdfViewerAutoLoad.refresh(); // Ask pdf viewer to load/refresh pdf
  }

}
// npm install jsbarcode --save
// npm install ng2-pdfjs-viewer --save
// npm install jspdf --save
