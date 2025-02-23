import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NivelAcademicoGet } from 'src/app/inspector/services/inpector-service.service';

@Component({
  selector: 'app-edit-niveles-academicos',
  templateUrl: './edit-niveles-academicos.component.html',
  styleUrls: ['./edit-niveles-academicos.component.scss'],
})
export class EditNivelesAcademicosComponent implements OnInit {
  @Input() jornadas: any[] = []; // Recibir jornadas como entrada desde el componente padre
  @Input() nivelAcademico!: NivelAcademicoGet;

  nivel: {
    nivel_id: number | null;
    nivel_descripcion: string;
    jor_id: number | null;
  } = {
    nivel_id: null,
    nivel_descripcion: '',
    jor_id: null,
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Inicializa los valores del formulario con los datos de la asignatura
    this.nivel = {
      nivel_id: this.nivelAcademico?.nivel_id ?? null,
      nivel_descripcion: this.nivelAcademico?.nivel_descripcion || '',
      jor_id: this.nivelAcademico?.jornada.jor_id ?? null,
    };
    // console.log('nivel', this.nivel);
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
