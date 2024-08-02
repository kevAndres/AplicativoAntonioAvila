import { Component, OnInit } from '@angular/core';
import { Estudiante, InpectorServiceService } from '../services/inpector-service.service';
import { AlertController, LoadingController  } from '@ionic/angular';
@Component({
  selector: 'app-estudiante-crud',
  templateUrl: './estudiante-crud.page.html',
  styleUrls: ['./estudiante-crud.page.scss'],
})
export class EstudianteCrudPage implements OnInit {
  estudiantes: Estudiante[] = [];
  constructor(private inspectorService:InpectorServiceService, private alertCtrl: AlertController,private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadEstudiantes()
  }
  async loadEstudiantes() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.inspectorService.getEstudiantes().subscribe(
      estudiante => {
        this.estudiantes = estudiante;
        loading.dismiss();
      },
      error => {
        console.error('Error loading courses', error);
        loading.dismiss();
      }
    );
  }
  async editEstudiante(estudiante: Estudiante) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Estudiante',
      inputs: [
        { name: 'nombre', type: 'text', value: estudiante.NombreEst },
        { name: 'apellido', type: 'text', value: estudiante.NombreEst },
        { name: 'cedula', type: 'text', value: estudiante.cedula },
        { name: 'curso', type: 'text', value: estudiante.curso_idCurso}
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data) => {
            const updateEstudiante: Estudiante = { idEstudiantes: estudiante.idEstudiantes, ...data };
            this.inspectorService.updateEstudiante(updateEstudiante).subscribe(() => {
              this.loadEstudiantes();
            });
          }
        }
      ]
    });
    await alert.present();
  }
  deleteEstudiante(idEstudiantes: number) {
    this.inspectorService.deleteEstudiante(idEstudiantes).subscribe(() => {
      this.loadEstudiantes();
    });
  }
}
