import { Component, OnInit } from '@angular/core';
import { EsquelasService } from '../../../app/services/getEsquelas/esquelas.service';
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
  selector: 'app-vista-esquela',
  templateUrl: './vista-esquela.component.html',
  styleUrls: ['./vista-esquela.component.scss'],
})
export class VistaEsquelaComponent implements OnInit {
  esquelas: any[] = [];
  username: string = '';
  Nombreestudiante: string;
  Apellidosestudiante: string;
  detailsVisible = false;

  constructor(
    private esquelasService: EsquelasService,
    private EstudiantesService: EstudiantesService,
    private authService: AuthService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {
    this.Nombreestudiante = '';
    this.Apellidosestudiante = '';
  }

  ngOnInit() {
    this.getEsquelas();
    this.authService.AutentificatorLogin();

    this.Nombreestudiante =
      localStorage.getItem('NombreEstudiante') || 'Nombre';
    this.Apellidosestudiante =
      localStorage.getItem('ApellidoEstudiante') || 'Apellido';
    this.getRepresentante();
  }

  async getEsquelas() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.esquelasService.getEsquelasIdEstudiante().subscribe(
      (data: any[]) => {
        this.esquelas = data.map((item) => ({
          ...item,
          detailsVisible: false, // Añadimos la propiedad detailsVisible
        }));
        loading.dismiss();
      },
      (error) => {
        loading.dismiss();

        console.error('Error al obtener las esquelas:', error);
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

  async toggleDetails(esquela: any) {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    localStorage.setItem('IdEsquela', esquela.idEsquela);
    console.log(localStorage.getItem('IdEsquela'));

    // Ocultar los detalles de todas las esquelas, excepto de la que se hace clic
    this.esquelas.forEach((esquela) => {
      if (esquela.idEsquela !== esquela.idEsquela) {
        esquela.detailsVisible = false;
      }
    });

    // Verificar si los detalles están actualmente visibles para la esquela seleccionada
    if (!esquela.detailsVisible) {
      // Llamar al servicio para actualizar el estado de la esquela
      this.esquelasService.getUpdateEsquelasIdEstudiante().subscribe(
        (updatedEsquela: any) => {
          if (
            updatedEsquela &&
            updatedEsquela.idEsquela === esquela.idEsquela
          ) {
            const index = this.esquelas.findIndex(
              (e) => e.idEsquela === esquela.idEsquela
            );
            if (index !== -1) {
              // Solo actualizar el campo estado_esquela
              this.esquelas[index].estado_esquela =
                updatedEsquela.estado_esquela;
              // Mostrar los detalles de esta esquela
              this.esquelas[index].detailsVisible = true;
              loading.dismiss();
            }
          } else {
            loading.dismiss();

            console.error(
              'La esquela no coincide o no existe:',
              updatedEsquela
            );
          }
        },
        (error) => {
          loading.dismiss();

          console.error('Error al actualizar el estado de la esquela:', error);
        }
      );
      loading.dismiss();
    } else {
      // Si ya están visibles, ocultarlos al hacer clic en la misma esquela
      loading.dismiss();

      esquela.detailsVisible = false;
    }
  }
  async openFullscreenImage(image: string): Promise<string> {
    const modal = await this.modalController.create({
      component: FullscreenImageModalComponent,
      componentProps: { image },
    });

    await modal.present();
    return 'MODAL PRESENTADO'; // Indica que el modal se presentó correctamente
  }
}
