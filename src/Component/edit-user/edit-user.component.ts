import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NivelAcademicoGet } from 'src/app/inspector/services/inpector-service.service';
import { rolGet, userPatch } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  @Input() roles: rolGet[] = []; // Recibir jornadas como entrada desde el componente padre
  @Input() user!: userPatch;

  nivel: {
    iduser: number | null;
    nombre: string;
    apellido: string;
    email: string;
    rol_id: number | null;
  } = {
    iduser: null,
    nombre: '',
    apellido: '',
    email: '',
    rol_id: null,
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Inicializa los valores del formulario con los datos de la asignatura
    this.nivel = {
      iduser: this.user?.iduser ?? null,
      nombre: this.user?.nombre || '',
      apellido: this.user?.apellido || '',
      email: this.user?.email || '',
      rol_id: this.user?.rol_id ?? null,
    };
    console.log('nivel', this.nivel);
  }

  // Cerrar el modal sin enviar datos
  closeModal() {
    this.modalCtrl.dismiss();
  }

  // Enviar los datos al componente principal
  submitData() {
    //console.log('curso', this.curso);
    this.modalCtrl.dismiss(this.nivel);
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
