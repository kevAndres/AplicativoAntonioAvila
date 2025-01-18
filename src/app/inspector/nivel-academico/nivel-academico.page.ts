import { Component, OnInit } from '@angular/core';
import {
  InpectorServiceService,
  Jornada,
  NivelAcademicoGet,
  NivelAcademicoPatch,
  NivelAcademicoPost,
} from '../services/inpector-service.service';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { RegistroNivelAcademicoComponent } from 'src/Component/regsitro-nivel-academico/regsitro-nivel-academico.component';
import { EditNivelesAcademicosComponent } from 'src/Component/edit-niveles-academicos/edit-niveles-academicos.component';

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

  async ngOnInit() {
    await this.loadNivelesAcademicos();
    await this.loadJornadas();
  }

  async presentError(message: string) {
    const alert = await this.alertCtrl.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
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
        //console.error('Error cargando los Niveles Academicos', error);
        loading.dismiss();
      }
    );
  }
  async addNivelAcademico() {
    // Cargar jornadas dinámicamente antes de mostrar el modal

    const modal = await this.modalCtrl.create({
      component: RegistroNivelAcademicoComponent, // Componente del modal
      componentProps: {
        jornadas: this.jornadas, // Pasar jornadas dinámicamente al modal
      },
    });
    await modal.present();

    // Procesar datos devueltos desde el modal
    const { data } = await modal.onWillDismiss();
    if (data) {
      if (data.nivel_descripcion && data.jor_id) {
        const nuevoNivelAcademico: NivelAcademicoPost = {
          nivel_descripcion: data.nivel_descripcion.toUpperCase(),
          jor_id: data.jor_id,
        };
        // Llamar al servicio para guardar el nivel académico
        this.inspectorService
          .addNivelAcademico(nuevoNivelAcademico)
          .subscribe(() => {
            this.loadNivelesAcademicos(); // Recargar la tabla
          });
      } else {
        this.presentError('Ingrese todos los datos');
        //console.error('Formulario incompleto');
      }
    }
  }

  async loadJornadas(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.inspectorService.getJornadas().subscribe({
        next: (data) => {
          this.jornadas = data;
          resolve(this.jornadas); // Resuelve la promesa con los datos cargados
        },
        error: (error) => {
          //console.error('Error al cargar jornadas:', error);
          reject(error); // Rechaza la promesa si hay un error
        },
      });
    });
  }
  async editNivelAcademico(nivel_id: number) {
    const nivel = this.nivelesAcademicos.find(
      (nivel) => nivel.nivel_id == nivel_id
    );
    console.log('asig', nivel);
    const modal = await this.modalCtrl.create({
      component: EditNivelesAcademicosComponent, // Componente del modal
      componentProps: {
        jornadas: this.jornadas, // Pasar jornadas dinámicamente al modal
        nivelAcademico: nivel,
      },
    });

    await modal.present();
    if (nivel) {
      // Procesar datos devueltos desde el modal
      const { data } = await modal.onWillDismiss();
      //const me = await this.mesajeEspera('Actualizando...');
      if (data) {
        if (data) {
          const nuevoNivelAcademico: NivelAcademicoPatch = {
            nivel_id: nivel.nivel_id,
            nivel_descripcion: data.nivel_descripcion.toUpperCase(),
            jor_id: data.jor_id,
          };
          // me.present();
          //console.log('dataaaaaaaaaaa', data);
          this.inspectorService.updateNivelAcademico(data).subscribe(() => {
            //me.dismiss();
            this.loadNivelesAcademicos();
          });
        }
      }
    } else {
      this.presentError('Ingrese todos los datos');
      console.error('Formulario incompleto');
    }
  }
  async deleteNivelAcademico(nivel_id: number) {
    try {
      const alert = await this.alertCtrl.create({
        header: 'Eliminar Nivel Académico',
        message: '¿Estás seguro de eliminar este Nivel Académico?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: () => {
              this.inspectorService.deleteNivelAcademico(nivel_id).subscribe({
                next: () => {
                  this.loadNivelesAcademicos(); // Recargar lista de niveles académicos
                },
                error: (err) => {
                  //console.error('Error al eliminar el nivel académico:', err);
                  this.presentError(
                    'No se puede eliminar el nivel académico, por que tiene modulos asociados'
                  );
                },
              });
            },
          },
        ],
      });

      await alert.present();
    } catch (error) {
      //console.error('Error al mostrar el diálogo:', error);
      this.presentError('Error al eliminar el nivel académico');
    }
  }
}
