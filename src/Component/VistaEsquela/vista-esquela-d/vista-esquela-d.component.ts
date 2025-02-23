import { Component, OnInit } from '@angular/core';
import { EsquelasService } from '../../../app/services/getEsquelas/esquelas.service';
import { EstudiantesService } from 'src/app/services/getestudiantes/estudiantes.service';
import { AuthService } from '../../../app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { FullscreenImageModalComponent } from '../../../Component/VistaEvidenciaFull/fullscreen-image-modal/fullscreen-image-modal.component';
interface Esquela {
  motivo: string;
  fechaEnvio: string;
  descripcion: string;
  evidencia: string;
  detailsVisible: boolean;
  evidenciavisible: boolean;
}
@Component({
  selector: 'app-vista-esquela-d',
  templateUrl: './vista-esquela-d.component.html',
  styleUrls: ['./vista-esquela-d.component.scss'],
})
export class VistaEsquelaDComponent implements OnInit {
  esquelas: any[] = [];
  username: string = '';
  Nombreestudiante: string;
  Apellidosestudiante: string;
  detailsVisible = false;

  constructor(
    private esquelasService: EsquelasService,
    private EstudiantesService: EstudiantesService,
    private authService: AuthService,
    private modalController: ModalController
  ) {
    this.Nombreestudiante = '';
    this.Apellidosestudiante = '';
  }

  ngOnInit() {
    this.authService.AutentificatorLogin();

    this.Nombreestudiante =
      localStorage.getItem('NombreEstudiante') || 'Nombre';
    this.Apellidosestudiante =
      localStorage.getItem('ApellidoEstudiante') || 'Apellido';
    this.getEsquelas();
    this.getRepresentante();
  }

  getEsquelas() {
    this.esquelasService.getEsquelasIdAsignacionDocenteMateria().subscribe(
      (data: any[]) => {
        this.esquelas = data.map((item) => ({
          ...item,
          detailsVisible: false, // Añadimos la propiedad detailsVisible
          evidenciavisible: false, // Añadimos la propiedad evidenciavisible
        }));
        // console.log(this.esquelas);
      },
      (error) => {
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

  toggleDetails(selectedEsquela: Esquela) {
    this.esquelas.forEach((esquela) => {
      esquela.detailsVisible =
        esquela === selectedEsquela ? !esquela.detailsVisible : false;
      // Si los detalles son visibles, valida la evidencia
      if (esquela.detailsVisible) {
        esquela.showEvidencia = esquela.Evidencia !== null;
      } else {
        esquela.showEvidencia = false;
      }
    });
  }
  // async openFullscreenImage(image: string) {
  //   if (!image || image.length === 0) {
  //     return 'NO EXISTE EVIDENCIA';
  //   }
  //   const modal = await this.modalController.create({
  //     component: FullscreenImageModalComponent,
  //     componentProps: { image },
  //   });

  //   return await modal.present();
  // }
  async openFullscreenImage(image: string): Promise<string> {
    // Verifica si la imagen no existe o es una cadena vacía
    if (!image || image.trim().length === 0) {
      return 'NO EXISTE EVIDENCIA';
    }

    // Crea y presenta el modal solo si hay una imagen válida
    const modal = await this.modalController.create({
      component: FullscreenImageModalComponent,
      componentProps: { image },
    });

    await modal.present();
    return 'MODAL PRESENTADO'; // Indica que el modal se presentó correctamente
  }
}
