import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  Asignatura,
  AsignaturaGet,
} from 'src/app/inspector/services/inpector-service.service';

@Component({
  selector: 'app-edit-asignatura',
  templateUrl: './edit-asignatura.component.html',
  styleUrls: ['./edit-asignatura.component.scss'],
})
export class EditAsignaturaComponent implements OnInit {
  @Input() jornadas: any[] = []; // Recibir jornadas como entrada desde el componente padre
  @Input() nivelAcademico: any[] = [];
  @Input() asignatura!: AsignaturaGet;

  curso: {
    asig_id: number | null;
    asig_nombre: string;
    nivel_id: number | null;
    jornada_id: number | null;
  } = {
    asig_id: null,
    asig_nombre: '',
    nivel_id: null,
    jornada_id: null,
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Inicializa los valores del formulario con los datos de la asignatura
    this.curso = {
      asig_id: this.asignatura?.asig_id ?? null,
      asig_nombre: this.asignatura?.asig_nombre || '',
      nivel_id: this.asignatura?.nivel_id ?? null,
      jornada_id: this.asignatura?.jornada_id ?? null,
    };
  }

  // Cerrar el modal sin enviar datos
  closeModal() {
    this.modalCtrl.dismiss();
  }

  // Enviar los datos al componente principal
  submitData() {
    // console.log('curso', this.curso);
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
    // this.curso.nivel_curso = event.target.value;
  }
}
