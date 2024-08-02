import { Component, OnInit } from '@angular/core';
import { APIURL } from '../../../Shares/UrlApi';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-pdf-fecha',
  templateUrl: './pdf-fecha.page.html',
  styleUrls: ['./pdf-fecha.page.scss'],
})
export class PdfFechaPage implements OnInit {
  url: string = APIURL
  selectedDate : string="";
  formattedDate: string="";
  constructor(private loadingController: LoadingController) { }

  ngOnInit() {
    this.selectedDate = new Date().toISOString();
  }

  async downloadFile(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'DESCARGANDO...',
    });

    await loading.present();

    const date = new Date(this.selectedDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    this.formattedDate = `${year}-${month}-${day}`;
    console.log(this.formattedDate);

    if (this.formattedDate) {
      const downloadUrl = `${this.url}/esquela/reportepdf/fecha/${this.formattedDate}`;

      // Use fetch to download the file and wait for the response
      try {
        const response = await fetch(downloadUrl);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `report_${this.formattedDate}.pdf`; // Assuming the file is a PDF, change accordingly
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          console.error('Download failed', response.statusText);
        }
      } catch (error) {
        console.error('Download error', error);
      } finally {
        loading.dismiss();
      }
    } else {
      console.log('Please select a date before downloading.');
      loading.dismiss();
    }
  }
}
