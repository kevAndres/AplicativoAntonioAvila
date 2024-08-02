import { Component, OnInit } from '@angular/core';
import { APIURL } from '../../../Shares/UrlApi';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import {InpectorServiceService} from '../services/inpector-service.service'
@Component({
  selector: 'app-pdf-docente',
  templateUrl: './pdf-docente.page.html',
  styleUrls: ['./pdf-docente.page.scss'],
})
export class PdfDocentePage implements OnInit {
  docentes: any[] = [];
  url: string = APIURL
  selectedDocenteId: string ="";
  constructor(private alertController: AlertController,private http: HttpClient,private loadingController: LoadingController, private inpectorServiceService:InpectorServiceService) { }

  ngOnInit() {
    this.loadDocentes()
  }

  loadDocentes() {
    this.inpectorServiceService.getAllDocentes().subscribe({
      next: (data) => {
        this.docentes = data;
      },
      error: (error) => {
        console.error('Error al cargar cursos', error);
      },
    });
  }

  async downloadFile(): Promise<void> {
    if (!this.selectedDocenteId) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, seleccione un docente',
        buttons: ['OK']
      })
      await alert.present();
    }
    if (this.selectedDocenteId) {
      const loading = await this.loadingController.create({
        message: 'DESCARGANDO, POR FAVOR ESPERAR ...',
      });
      await loading.present();
  
      try {
        const downloadUrl = `${this.url}/esquela/reportepdf/docente/${this.selectedDocenteId}`;
        window.location.href = downloadUrl;
      } catch (error) {
        console.error('Download failed', error);
      } finally {
        await loading.dismiss();
      }
    } else {
      console.log('Please select a curso before downloading.');
    }
  }
}
