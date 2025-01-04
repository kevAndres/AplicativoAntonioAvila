import { Component, OnInit } from '@angular/core';
import {
  InpectorServiceService,
  Jornada,
} from '../services/inpector-service.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.page.html',
  styleUrls: ['./jornada.page.scss'],
})
export class JornadaPage implements OnInit {
  jornadas: Jornada[] = [];

  constructor(
    private inspectorService: InpectorServiceService,
    private alertCtrl: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadJornadas();
  }

  async loadJornadas() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.inspectorService.getJornadas().subscribe(
      (jornada) => {
        this.jornadas = jornada;
        loading.dismiss();
      },
      (error) => {
        console.error('Error cargando las jornadas', error);
        loading.dismiss();
      }
    );
  }
  async addJornada() {
    const alert = await this.alertCtrl.create({
      header: 'Agregar Una Jornada',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre de le Jornada',
        },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: (data) => {
            const newJornada: Jornada = {
              jor_nombre: data.nombre,
            };
            this.inspectorService.addJornada(newJornada).subscribe(() => {
              this.loadJornadas();
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
