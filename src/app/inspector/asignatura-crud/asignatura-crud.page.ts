import { Component, OnInit } from '@angular/core';
import {
  InpectorServiceService,
  Asignatura,
  AsignaturaGet,
  Jornada,
  NivelAcademicoGet,
  AsignaturaUpdate,
  AsignaturaPost,
} from '../services/inpector-service.service';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { EditAsignaturaComponent } from 'src/Component/edit-asignatura/edit-asignatura.component';
import { PostAsignaturaComponent } from 'src/Component/post-asignatura/post-asignatura.component';
@Component({
  selector: 'app-asignatura-crud',
  templateUrl: './asignatura-crud.page.html',
  styleUrls: ['./asignatura-crud.page.scss'],
})
export class AsignaturaCrudPage implements OnInit {
  asignaturas: Asignatura[] = [];
  asignaturasGet: AsignaturaGet[] = [];
  asignaturaUpdate: AsignaturaUpdate[] = [];
  jornadas: Jornada[] = [];
  nivelesAcademicos: NivelAcademicoGet[] = [];
  constructor(
    private inspectorService: InpectorServiceService,
    private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loadAsignaturas();
    this.loadJornadas();
    this.loadNivelesAcademicos();
  }

  async mesajeEspera(message: string) {
    const loading = await this.loadingController.create({
      message: message ? message : 'Cargando...',
    });
    return loading;
  }
  async loadAsignaturas() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.inspectorService.getAsignaturas().subscribe(
      (asignatura) => {
        this.asignaturasGet = asignatura;
        loading.dismiss();
      },
      (error) => {
        console.error('Error loading asignaturas', error);
        loading.dismiss();
      }
    );
  }
  async addAsignatura() {
    const modal = await this.modalCtrl.create({
      component: PostAsignaturaComponent, // Componente del modal
      componentProps: {
        jornadas: this.jornadas,
        nivelAcademico: this.nivelesAcademicos,
      },
    });
    await modal.present();
    const me = await this.mesajeEspera('Registrando...');

    // Procesar datos devueltos desde el modal
    const { data } = await modal.onWillDismiss();
    if (data) {
      if (data.asig_nombre && data.nivel_id && data.jornada_id) {
        const nuevoNivelAcademico: AsignaturaPost = {
          asig_nombre: data.asig_nombre,
          nivel_id: data.nivel_id,
          jornada_id: data.jornada_id,
        };
        me.present();
        // Llamar al servicio para guardar el nivel académico
        this.inspectorService
          .addAsignatura(nuevoNivelAcademico)
          .subscribe(() => {
            me.dismiss();
            this.loadAsignaturas();
          });
      } else {
        this.presentError('Ingrese todos los datos');
        console.error('Formulario incompleto');
      }
    }
  }
  async deleteAsignatura(asig_id: number) {
    const me = await this.mesajeEspera('Procesando...');
    me.present();
    await this.inspectorService.deleteAsignatura(asig_id).subscribe(() => {
      me.dismiss();
      this.loadAsignaturas();
    });
  }
  async presentError(message: string) {
    const alert = await this.alertCtrl.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async editAsignatura(asig_id: number) {
    const asig = this.asignaturasGet.find((asig) => asig.asig_id == asig_id);
    // console.log('asig', asig);
    const modal = await this.modalCtrl.create({
      component: EditAsignaturaComponent, // Componente del modal
      componentProps: {
        jornadas: this.jornadas, // Pasar jornadas dinámicamente al modal
        nivelAcademico: this.nivelesAcademicos,
        asignatura: asig,
      },
    });

    await modal.present();
    if (asig) {
      // Procesar datos devueltos desde el modal
      const { data } = await modal.onWillDismiss();
      const me = await this.mesajeEspera('Actualizando...');
      if (data) {
        if (data) {
          // if (data.nivel_curso <= 0) {
          //   this.presentError('EL CURSO NO PUEDE SER MENOR O IGUAL A 0');
          //   return;
          // }
          const nuevoNivelAcademico: AsignaturaUpdate = {
            asig_id: asig.asig_id,
            asig_nombre: data.asig_nombre,
            nivel_id: data.nivel_id,
            jornada_id: data.jornada_id,
          };
          me.present();
          // console.log('dataaaaaaaaaaa', data);
          this.inspectorService.updateAsignatura(data).subscribe(() => {
            me.dismiss();
            this.loadAsignaturas();
          });
        }
      }
    } else {
      this.presentError('Ingrese todos los datos');
      console.error('Formulario incompleto');
    }
  }
  async loadJornadas(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.inspectorService.getJornadas().subscribe({
        next: (data) => {
          this.jornadas = data;
          // console.log('Jornadas cargadas correctamente:', this.jornadas); // Debugging
          resolve(this.jornadas); // Resuelve la promesa con los datos cargados
        },
        error: (error) => {
          console.error('Error al cargar jornadas:', error);
          reject(error); // Rechaza la promesa si hay un error
        },
      });
    });
  }

  async loadNivelesAcademicos(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.inspectorService.getNIvelesAcademicos().subscribe({
        next: (data) => {
          this.nivelesAcademicos = data;
          // console.log(
          //   'ESPECIALIDADES cargadas correctamente:',
          //   this.nivelesAcademicos
          // ); // Debugging
          resolve(this.nivelesAcademicos); // Resuelve la promesa con los datos cargados
        },
        error: (error) => {
          console.error('Error al cargar jornadas:', error);
          reject(error); // Rechaza la promesa si hay un error
        },
      });
    });
  }
}
