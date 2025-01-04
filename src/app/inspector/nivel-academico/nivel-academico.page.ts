import { Component, OnInit } from '@angular/core';
import {
  InpectorServiceService,
  Jornada,
  NivelAcademicoGet,
  NivelAcademicoPost,
} from '../services/inpector-service.service';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { RegistroNivelAcademicoComponent } from 'src/Component/regsitro-nivel-academico/regsitro-nivel-academico.component';

@Component({
  selector: 'app-nivel-academico',
  templateUrl: './nivel-academico.page.html',
  styleUrls: ['./nivel-academico.page.scss'],
})
export class NivelAcademicoPage implements OnInit {
  nivelesAcademicos: NivelAcademicoGet[] = [];
  jornadas: Jornada[] = [];

  constructor(
    private inspectorService: InpectorServiceService,
    private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private modalCtrl: ModalController // Inyectar ModalController aquí
  ) {}

  ngOnInit() {
    this.loadNivelesAcademicos();
  }

  async loadNivelesAcademicos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.inspectorService.getNIvelesAcademicos().subscribe(
      (nivelAcademico) => {
        this.nivelesAcademicos = nivelAcademico;
        loading.dismiss();
      },
      (error) => {
        console.error('Error cargando los Niveles Academicos', error);
        loading.dismiss();
      }
    );
  }
  async addNivelAcademico() {
    // Cargar jornadas dinámicamente antes de mostrar el modal
    await this.loadJornadas();
    const modal = await this.modalCtrl.create({
      component: RegistroNivelAcademicoComponent, // Componente del modal
      componentProps: {
        jornadas: this.jornadas, // Pasar jornadas dinámicamente al modal
      },
    });
    await modal.present();

    // Procesar datos devueltos desde el modal
    const { data } = await modal.onWillDismiss();
    console.log('fdatas', data);
    if (data) {
      if (data.nivel_descripcion && data.jor_id) {
        const nuevoNivelAcademico: NivelAcademicoPost = {
          nivel_descripcion: data.nivel_descripcion,
          jor_id: data.jor_id,
        };
        // Llamar al servicio para guardar el nivel académico
        this.inspectorService
          .addNivelAcademico(nuevoNivelAcademico)
          .subscribe(() => {
            this.loadNivelesAcademicos(); // Recargar la tabla
          });
      } else {
        console.error('Formulario incompleto');
      }
    }
  }

  async loadJornadas(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.inspectorService.getJornadas().subscribe({
        next: (data) => {
          this.jornadas = data;
          console.log('Jornadas cargadas correctamente:', this.jornadas); // Debugging
          resolve(this.jornadas); // Resuelve la promesa con los datos cargados
        },
        error: (error) => {
          console.error('Error al cargar jornadas:', error);
          reject(error); // Rechaza la promesa si hay un error
        },
      });
    });
  }
}
