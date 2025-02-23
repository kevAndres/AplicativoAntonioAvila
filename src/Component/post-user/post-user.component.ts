import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import {
  Jornada,
  NivelAcademicoGet,
} from 'src/app/inspector/services/inpector-service.service';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.scss'],
})
export class PostUserComponent {
  @Input() roles: any[] = []; // Recibir jornadas como entrada desde el componente padre
  @Input() jornadas: Jornada[] = []; // Recibir jornadas como entrada desde el componente padre
  @Input() nivelAcademico: NivelAcademicoGet[] = []; // Recibir jornadas como entrada desde el componente padre

  user = {
    email: '',
    apellido: '',
    nombre: '',
    password: '',
    cedula: '',
    rol_id: null,
    jornada_jor_id: null,
    nivel_academico_nivel_id: null,
  };

  constructor(
    private modalCtrl: ModalController,
    private loadingController: LoadingController
  ) {}
  isDocente: boolean = false;
  onRoleChange() {
    const selectedRol = this.roles.find(
      (rol) => rol.rol_id === this.user.rol_id
    );
    this.isDocente = selectedRol && selectedRol.rol_nombre === 'DOCENTE';

    // Limpiar valores de Jornada y Nivel Académico si no es "DOCENTE"
    if (!this.isDocente) {
      this.user.jornada_jor_id = null;
      this.user.nivel_academico_nivel_id = null;
    }
  }
  // Cerrar el modal sin enviar datos
  closeModal() {
    this.modalCtrl.dismiss();
  }

  // Enviar los datos al componente principal
  submitData() {
    this.modalCtrl.dismiss(this.user);
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
  validateCedula(event: any): void {
    const input = event.target.value;

    // Permitir solo números
    const numericValue = input.replace(/[^0-9]/g, '');

    // Limitar la longitud a 10 números
    this.user.cedula = numericValue.slice(0, 10);
    const charCode = event.key.charCodeAt(0);

    // Permitir solo números (códigos ASCII del 48 al 57)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Bloquea cualquier entrada que no sea un número
    }
  }
  emailError: string | null = null; // Para mostrar mensajes de error

  validateEmail(event: any): void {
    const email = event.target.value;

    // Validar formato básico de email en tiempo real
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.emailError = 'El formato del correo electrónico no es válido.';
    } else {
      this.emailError = null; // Limpiar el error si es válido
    }
  }

  checkEmail(): void {
    const email = this.user.email; // Usar directamente user.email

    // Validar formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.emailError = 'Por favor, ingrese un correo electrónico válido.';
    } else {
      this.emailError = null;
      // console.log('Correo válido:', email);
    }
  }

  showEmailGuidelines(): void {
    this.emailError =
      'Por favor, ingrese un correo en el formato correcto (ejemplo@dominio.com).';
  }
}
