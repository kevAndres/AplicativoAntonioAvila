import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-regsitro-nivel-academico',
  templateUrl: './regsitro-nivel-academico.component.html',
  styleUrls: ['./regsitro-nivel-academico.component.scss'],
})
export class RegistroNivelAcademicoComponent {
  @Input() jornadas: any[] = []; // Recibir jornadas como entrada desde el componente padre

  nivelAcademico = {
    nivel_descripcion: '',
    jor_id: null,
  };

  constructor(private modalCtrl: ModalController) {}

  // Cerrar el modal sin enviar datos
  closeModal() {
    this.modalCtrl.dismiss();
  }

  // Enviar los datos al componente principal
  submitData() {
    this.modalCtrl.dismiss(this.nivelAcademico);
  }
}
