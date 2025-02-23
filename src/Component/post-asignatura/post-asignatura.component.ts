import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-post-asignatura',
  templateUrl: './post-asignatura.component.html',
  styleUrls: ['./post-asignatura.component.scss'],
})
export class PostAsignaturaComponent {
  @Input() jornadas: any[] = []; // Recibir jornadas como entrada desde el componente padre
  @Input() nivelAcademico: any[] = [];

  asignatura = {
    asig_nombre: '',
    nivel_id: null,
    jornada_id: null,
  };

  constructor(
    private modalCtrl: ModalController,
    private loadingController: LoadingController
  ) {}

  // Cerrar el modal sin enviar datos
  closeModal() {
    this.modalCtrl.dismiss();
  }

  // Enviar los datos al componente principal
  submitData() {
    this.modalCtrl.dismiss(this.asignatura);
  }
  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);

    // Permitir solo números (códigos ASCII del 48 al 57)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Bloquea cualquier entrada que no sea un número
    }
  }
  convertToUppercase(event: any): void {
    const input = event.target.value;

    // Convierte el valor a mayúsculas
    event.target.value = input.toUpperCase();

    // Si estás usando ngModel, actualiza el modelo manualmente
    //this.curso.nivel_curso = event.target.value;
  }
  async mesajeEspera(message?: string) {
    const loading = await this.loadingController.create({
      message: message ? message : 'Registrando...',
    });
    return loading;
  }
}
