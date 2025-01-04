import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.scss'],
})
export class AddCursoComponent {
  @Input() jornadas: any[] = []; // Recibir jornadas como entrada desde el componente padre
  @Input() especialidades: any[] = []; // Recibir jornadas como entrada desde el componente padre
  @Input() nivelAcademico: any[] = [];

  curso = {
    nivel_curso: null,
    paralelo_curso: '',
    especialidad_id: null,
    jor_id: null,
    nivel_id: null,
  };

  constructor(private modalCtrl: ModalController) {}

  // Cerrar el modal sin enviar datos
  closeModal() {
    this.modalCtrl.dismiss();
  }

  // Enviar los datos al componente principal
  submitData() {
    this.modalCtrl.dismiss(this.curso);
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
}
