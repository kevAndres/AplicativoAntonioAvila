import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
import { Router } from '@angular/router';
import { APIURL } from '../../../Shares/UrlApi';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-pdf-curso',
  templateUrl: './pdf-curso.page.html',
  styleUrls: ['./pdf-curso.page.scss'],
})
export class PdfCursoPage implements OnInit {
  cursos: any[] = [];
  selectedCursoId: string ="";
  url: string = APIURL
  constructor(private alertController: AlertController,private EstudiantesService: EstudiantesService,private http: HttpClient,private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadCursos()
  }

  loadCursos() {
    this.EstudiantesService.getCursos().subscribe({
      next: (data) => {
        this.cursos = data;
      },
      error: (error) => {
        console.error('Error al cargar cursos', error);
      },
    });
  }
  async downloadFile(): Promise<void> {
    if (!this.selectedCursoId) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, seleccione un curso',
        buttons: ['OK']
      })
      await alert.present();
    }
    if (this.selectedCursoId) {
      const loading = await this.loadingController.create({
        message: 'DESCARGANDO, POR FAVOR ESPERAR ...',
      });
      await loading.present();
  
      try {
        const downloadUrl = `${this.url}/esquela/reportepdf/curso/${this.selectedCursoId}`;
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
