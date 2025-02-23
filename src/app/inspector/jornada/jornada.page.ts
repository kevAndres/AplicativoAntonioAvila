import { Component, OnInit } from '@angular/core';
import {
  InpectorServiceService,
  Jornada,
  JornadaPatch,
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
  mesajeEspera(message?: string) {
    const loading = this.loadingController.create({
      message: message ? message : 'Cargando...',
    });
    return loading;
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
              jor_id: 0,
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
  async editJornada(jor_id: number, jor_nombre: string) {
    // Mostrar mensaje de espera mientras se procesa la actualización
    const alert = await this.alertCtrl.create({
      header: 'Editar Jornada',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre de la Jornada',
          value: jor_nombre.toUpperCase(), // Mostrar el nombre en mayúsculas por defecto
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Edit',
          handler: async (data) => {
            // Validar que el campo no esté vacío
            if (!data.nombre || data.nombre.trim() === '') {
              console.error('El nombre no puede estar vacío.');
              return false; // Mantener el alerta abierto si falla la validación
            }

            // Crear un nuevo objeto Jornada con el texto convertido a mayúsculas
            const newJornada: Jornada = {
              jor_id,
              jor_nombre: data.nombre.toUpperCase(),
            };

            try {
              // Mostrar el mensaje de espera
              const mensajeEspera = await this.mesajeEspera('Actualizando...');
              await mensajeEspera.present();

              // Llamar al servicio para actualizar la jornada
              await this.inspectorService.updateJornada(newJornada).toPromise();
              // Cerrar el mensaje de espera
              await mensajeEspera.dismiss();
              // Recargar la lista de jornadas
              this.loadJornadas();

              return true; // Cerrar el alerta
            } catch (error) {
              console.error('Error al actualizar la jornada:', error);

              // Mostrar mensaje de error al usuario
              const mensajeError = await this.mesajeEspera(
                'Error al actualizar.'
              );
              await mensajeError.present();
              setTimeout(() => mensajeError.dismiss(), 2000);

              return false; // Mantener el alerta abierto
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteJornada(jor_id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Jornada',
      message: '¿Estás seguro de eliminar esta Jornada?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.inspectorService.deleteJornada(jor_id).subscribe(() => {
              this.loadJornadas();
            });
          },
        },
      ],
    });
    await alert.present();
  }
  convertToUppercase(event: any): void {
    const input = event.target.value;

    // Convierte el valor a mayúsculas
    event.target.value = input.toUpperCase();

    // Si estás usando ngModel, actualiza el modelo manualmente
    // this.curso.nivel_curso = event.target.value;
  }
}
