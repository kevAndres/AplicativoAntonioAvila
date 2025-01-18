import { Component, OnInit } from '@angular/core';
import {
  Especialidad,
  InpectorServiceService,
} from '../services/inpector-service.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.page.html',
  styleUrls: ['./especialidad.page.scss'],
})
export class EspecialidadPage implements OnInit {
  especialidades: Especialidad[] = [];

  constructor(
    private inspectorService: InpectorServiceService,
    private alertCtrl: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadEspecialidades();
  }
  async presentErrorAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: message ? message.error.message : 'Ups, algo salió mal',
      buttons: ['Ok'],
    });
    await alert.present();
  }
  async loadEspecialidades() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.inspectorService.getEspecialidades().subscribe(
      (especialidad) => {
        this.especialidades = especialidad;
        loading.dismiss();
      },
      (error) => {
        console.error('Error loading courses', error);
        loading.dismiss();
      }
    );
  }
  async addEspecialidad() {
    const alert = await this.alertCtrl.create({
      header: 'Agregar Una Especialidad',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre de le especialidad',
        },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: (data) => {
            const newDocente: Especialidad = {
              especialidad_id: 0,
              especialidad_nombre: data.nombre.toUpperCase(),
            };
            this.inspectorService.addEspecialidad(newDocente).subscribe(() => {
              this.loadEspecialidades();
            });
          },
        },
      ],
    });
    await alert.present();
  }
  async editEspecialidad(especialidad_id: number, especialidad_nombre: string) {
    try {
      const alert = await this.alertCtrl.create({
        header: 'Editar una Especialidad',
        inputs: [
          {
            name: 'nombre',
            type: 'text',
            placeholder: 'Nombre de la especialidad',
            value: especialidad_nombre.toUpperCase(),
          },
        ],
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          {
            text: 'Edit',
            handler: (data) => {
              const especialidad: Especialidad = {
                especialidad_id,
                especialidad_nombre: data.nombre.toUpperCase(),
              };
              this.inspectorService
                .updateEspecialidad(especialidad)
                .subscribe(() => {
                  this.loadEspecialidades();
                });
            },
          },
        ],
      });
      await alert.present();
    } catch (error) {
      this.presentErrorAlert(error);
    }
  }

  async deleteEspecialidad(especialidad_id: number) {
    try {
      const alert = await this.alertCtrl.create({
        header: 'Eliminar una Especialidad',
        message: `¿Está seguro de eliminar la especialidad? `,
        buttons: [
          { text: 'Cancelar', role: 'cancelar' },
          {
            text: 'Eliminar',
            handler: () => {
              this.inspectorService
                .deleteEspecialidad(especialidad_id)
                .subscribe(() => {
                  this.loadEspecialidades();
                });
            },
          },
        ],
      });
      await alert.present();
    } catch (error) {
      this.presentErrorAlert(error);
    }
  }
}
