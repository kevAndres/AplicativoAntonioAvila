import { Component, OnInit } from '@angular/core';
import { APIURL } from '../../../Shares/UrlApi';
@Component({
  selector: 'app-reporte-xfecha',
  templateUrl: './reporte-xfecha.page.html',
  styleUrls: ['./reporte-xfecha.page.scss'],
})
export class ReporteXfechaPage implements OnInit {
  url: string = APIURL
  selectedDate : string="";
  formattedDate: string="";


  ngOnInit() {
    this.selectedDate = new Date().toISOString();
  
  }

  downloadFile(): void {
    const date = new Date(this.selectedDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan desde 0
    const day = date.getDate().toString().padStart(2, '0');
    this.formattedDate = `${year}-${month}-${day}`;
    console.log(this.formattedDate)
    if (this.formattedDate) {
      const downloadUrl = `${this.url}/atraso/reporte/fecha/${this.formattedDate}`;
      window.location.href = downloadUrl;
    } else {
      console.log('Please select a fruit before downloading.');
    }
  }
}
