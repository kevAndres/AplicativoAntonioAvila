import { Component, OnInit } from '@angular/core';
import { APIURL } from '../../../Shares/UrlApi';
import { HttpClient } from '@angular/common/http';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
import { LoadingController,AlertController  } from '@ionic/angular';
@Component({
  selector: 'app-reporte-xestudiante',
  templateUrl: './reporte-xestudiante.page.html',
  styleUrls: ['./reporte-xestudiante.page.scss'],
})
export class ReporteXestudiantePage implements OnInit {
  cursos: any[] = [];
  estudiantes: any[] = [];
  selectedCursoId: string | null = null;
  selectedEstudianteId: string | null = null;
  url: string = APIURL

  constructor( private alertController: AlertController,private EstudiantesService: EstudiantesService,private http: HttpClient,private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadCursos()
  }
  loadCursos() {
    this.EstudiantesService.getCursos().subscribe((data: any) => {
      this.cursos = data;
    }, error => {
      console.error('Error al obtener los cursos', error);
    });
  }
 

  onCursoChange(event: any) {
    const cursoId = event.detail.value;
    this.EstudiantesService.getEstudiantes(cursoId).subscribe((data: any) => {
      this.estudiantes = data;
    }, error => {
      console.error('Error al obtener los estudiantes', error);
    });
  }
  

  async downloadFile(): Promise <void> {
    if (!this.selectedCursoId) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, seleccione un estudiante',
        buttons: ['OK']
      });
      await alert.present();
    }
    if (this.selectedEstudianteId) {
      const loading = await this.loadingController.create({
        message: 'DESCARGANDO, POR FAVOR ESPERAR ...',
      });
      await loading.present();
      try {
        const downloadUrl = `${this.url}/atraso/reporte/estudiante/${this.selectedEstudianteId}`;
      window.location.href = downloadUrl;
      } catch (error) {
        console.error('Download failed', error);
      }finally {
        await loading.dismiss();
      }
      
    } 
  }
}
