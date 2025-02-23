import { Component, Input } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jornada-selector-modal',
  templateUrl: './jornada-selector-modal.component.html',
  styleUrls: ['./jornada-selector-modal.component.scss'],
})
export class JornadaSelectorModalComponent {
  @Input() jornadas: any[] = []; // Recibe las jornadas como entrada
  @Input() endpointUrl: string = ''; // URL del endpoint

  selectedJornada: any;
  isLoading: boolean = false; // Para indicar si la llamada está en curso

  constructor(
    private modalController: ModalController,
    private http: HttpClient,
    private loadingController: LoadingController
  ) {}
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      translucent: true,
    });
    await loading.present();
  }
  async dismissLoading() {
    await this.loadingController.dismiss();
  }
  // Cerrar el modal
  dismissModal() {
    this.modalController.dismiss();
  }

  // Manejar la selección de jornada
  onJornadaSelected(event: any) {
    this.selectedJornada = event.detail.value;
  }

  // Confirmar selección y llamar al endpoint
  async confirmSelection() {
    if (this.selectedJornada) {
      // console.log('Seleccionada jornada:', this.selectedJornada.iddocente);
      this.isLoading = true; // Mostrar indicador de carga
      this.presentLoading();
      const url = `${this.endpointUrl}/${this.selectedJornada.iddocente}`;
      await this.http.get(url).subscribe(
        (response) => {
          //console.log('Respuesta del servidor:', response);
          this.isLoading = false; // Ocultar indicador de carga
          this.dismissLoading();
          this.modalController.dismiss(response); // Cerrar el modal y devolver la selección
        },
        (error) => {
          this.dismissLoading();
          //console.error('Error al llamar al endpoint:', error);
          this.isLoading = false; // Ocultar indicador de carga
        }
      );
    } else {
      //console.log('No se seleccionó ninguna jornada.');
    }
  }
}
