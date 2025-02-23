import { Component, OnInit } from '@angular/core';
import { APIURL } from '../../../Shares/UrlApi';
import { HttpClient } from '@angular/common/http';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
import { LoadingController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  username: string = '';
  cursos: any[] = [];

  estudiantes: any[] = [];
  selectedCursoId: string | null = null;
  selectedEstudianteId: string | null = null;
  url: string = APIURL;
  asignaturasdocente: any[] = [];
  selectedAsignatura: string | null = null;
  asignacionId: string | null = null;
  constructor(
    private alertController: AlertController,
    private EstudiantesService: EstudiantesService,
    private http: HttpClient,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.ChargeAsignacionAignaturas();
    this.UserName();
  }
  UserName() {
    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }
  ChargeAsignacionAignaturas() {
    this.EstudiantesService.getAsignaturasDocente().subscribe(
      (data) => {
        this.asignaturasdocente = data;
        // console.log(
        //   'estos son los cursos',
        //   JSON.stringify(this.asignaturasdocente)
        // );
      },
      (Error) => {
        console.error(
          'Error al cargar las asignaciones  de asignaturas del docente',
          Error
        );
      }
    );
  }

  onCursoChange(event: any) {
    this.asignacionId = event.detail.value.IdAsignacion;
    const idCurso = event.detail.value.curso_idCurso;
    this.EstudiantesService.getEstudiantes(idCurso).subscribe(
      (data: any) => {
        this.estudiantes = data;
        // console.log(this.estudiantes);
      },
      (error) => {
        console.error('Error al obtener los estudiantes', error);
      }
    );
  }

  async downloadFile(): Promise<void> {
    if (!this.selectedCursoId) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, seleccione un estudiante',
        buttons: ['OK'],
      });
      await alert.present();
    }
    if (this.selectedEstudianteId) {
      const loading = await this.loadingController.create({
        message: 'DESCARGANDO, POR FAVOR ESPERAR ...',
      });
      await loading.present();
      try {
        const downloadUrl = `${this.url}/esquela/reportepdf/asignacionEstudiante/${this.asignacionId}/${this.selectedEstudianteId}`;

        window.location.href = downloadUrl;
      } catch (error) {
        console.error('Download failed', error);
      } finally {
        this.selectedCursoId = null;
        this.selectedEstudianteId = null;
        await loading.dismiss();
      }
    }
  }
}
