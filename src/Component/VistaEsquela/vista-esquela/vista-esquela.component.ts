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

  async ngOnInit() {
    await this.getEsquelas();
    await this.authService.AutentificatorLogin();

    this.Nombreestudiante =
      localStorage.getItem('NombreEstudiante') || 'Nombre';
    this.Apellidosestudiante =
      localStorage.getItem('ApellidoEstudiante') || 'Apellido';
    await this.getRepresentante();
  }

  async getEsquelas() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    await this.esquelasService.getEsquelasIdEstudiante().subscribe(
      (data: any[]) => {
        this.esquelas = data.map((item) => ({
          ...item,
          detailsVisible: false, // Añadimos la propiedad detailsVisible
          imageVisible: false, // Añadimos la propiedad imageVisible
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
    // localStorage.setItem('IdEsquela', esquela.idEsquela);
    // console.log(localStorage.getItem('IdEsquela'));

    // Ocultar los detalles de todas las esquelas, excepto de la que se hace clic
    console.log('data para las  esquelas', esquela);
    await this.esquelas.forEach((esquela) => {
      if (esquela.idEsquela !== esquela.idEsquela) {
        esquela.detailsVisible = false;
      }
    });
    const index = this.esquelas.findIndex(
      (e) => e.idEsquela === esquela.idEsquela
    );

    //VERIFICA SI TIENE IMAGEN
    if (this.esquelas[index].Evidencia != null) {
      this.esquelas[index].imageVisible = true;
    }
    // Verificar si los detalles están actualmente visibles para la esquela seleccionada
    if (!esquela.detailsVisible) {
      if (esquela.estado_esquela != 'VISTO') {
        // Llamar al servicio para actualizar el estado de la esquela
        await this.esquelasService
          .getUpdateEsquelasIdEstudiante(esquela.idEsquela)
          .subscribe(
            (updatedEsquela: any) => {
              if (
                updatedEsquela &&
                updatedEsquela.idEsquela === esquela.idEsquela
              ) {
                if (index !== -1) {
                  // Solo actualizar el campo estado_esquela
                  this.esquelas[index].estado_esquela =
                    updatedEsquela.estado_esquela;
                  // Mostrar los detalles de esta esquela
                  this.esquelas[index].detailsVisible = true;
                }
                loading.dismiss();
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

              console.error(
                'Error al actualizar el estado de la esquela:',
                error
              );
            }
          );
        loading.dismiss();
      } else {
        this.esquelas[index].detailsVisible = true;
        loading.dismiss();
      }
    } else {
      // Si ya están visibles, ocultarlos al hacer clic en la misma esquela
      esquela.detailsVisible = false;
      this.esquelas[index].imageVisible = false;
      loading.dismiss();
    }
  }
  async openFullscreenImage(image: string): Promise<string> {
    if (image.length > 0) {
      const modal = await this.modalController.create({
        component: FullscreenImageModalComponent,
        componentProps: { image },
      });

      await modal.present();
      return 'MODAL PRESENTADO'; // Indica que el modal se presentó correctamente
    }
    return 'IMAGEN VACIA';
  }
}
