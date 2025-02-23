import { Component, OnInit } from '@angular/core';
import { GetAtrasosService } from '../../../app/services/getAtrasos/get-atrasos.service';
import { EstudiantesService } from 'src/app/services/getestudiantes/estudiantes.service';
import { AuthService } from '../../../app/services/auth.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { FullscreenImageModalComponent } from '../../../Component/VistaEvidenciaFull/fullscreen-image-modal/fullscreen-image-modal.component';

interface Esquela {
  motivo: string;
  fechaEnvio: string;
  descripcion: string;
  evidencia: string;
  detailsVisible: boolean;
}

@Component({
  selector: 'app-vista-atrasos-representante',
  templateUrl: './vista-atrasos-representante.component.html',
  styleUrls: ['./vista-atrasos-representante.component.scss'],
})
export class VistaAtrasosRepresentanteComponent implements OnInit {
  atrasos: any[] = [];
  username: string = '';
  Nombreestudiante: string;
  Apellidosestudiante: string;
  detailsVisible = false;

  constructor(
    private atrasosservice: GetAtrasosService,
    private EstudiantesService: EstudiantesService,
    private authService: AuthService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {
    this.Nombreestudiante = '';
    this.Apellidosestudiante = '';
  }

  async ngOnInit() {
    this.authService.AutentificatorLogin();

    this.Nombreestudiante =
      localStorage.getItem('NombreEstudiante') || 'Nombre';
    this.Apellidosestudiante =
      localStorage.getItem('ApellidoEstudiante') || 'Apellido';
    await this.getEsquelas();
    await this.getRepresentante();
  }

  async getEsquelas() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    this.atrasosservice.getAtrasosIdEstudiante().subscribe(
      (data: any[]) => {
        this.atrasos = data.map((item) => ({
          ...item,
          detailsVisible: false, // Añadimos la propiedad detailsVisible
        }));
        loading.dismiss();

        console.log(this.atrasos);
      },
      (error) => {
        console.error('Error al obtener los atrasos :', error);
        loading.dismiss();
      }
    );
  }

  getRepresentante() {
    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }

  async toggleDetails(selectedEsquela: Esquela) {
    await this.atrasos.forEach((atrasos) => {
      atrasos.detailsVisible =
        atrasos === selectedEsquela ? !atrasos.detailsVisible : false;
    });
  }
  async openFullscreenImage(image: string) {
    const modal = await this.modalController.create({
      component: FullscreenImageModalComponent,
      componentProps: { image },
    });

    return await modal.present();
  }
}
