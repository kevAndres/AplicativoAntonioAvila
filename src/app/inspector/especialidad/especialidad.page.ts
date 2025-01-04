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
              especialidad_nombre: data.nombre,
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
}
