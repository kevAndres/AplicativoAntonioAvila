import { Component, OnInit } from '@angular/core';
import { InpectorServiceService, Curso } from '../services/inpector-service.service';
import { AlertController, LoadingController  } from '@ionic/angular';

@Component({
  selector: 'app-curso-crud',
  templateUrl: './curso-crud.page.html',
  styleUrls: ['./curso-crud.page.scss'],
})
export class CursoCRUDPage implements OnInit {
  cursos: Curso[] = [];
  constructor(private inspectorService:InpectorServiceService, private alertCtrl: AlertController,private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadCursos()
  }
  async loadCursos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.inspectorService.getCursos().subscribe(
      cursos => {
        this.cursos = cursos;
        loading.dismiss();
      },
      error => {
        console.error('Error loading courses', error);
        loading.dismiss();
      }
    );
  }

  async addCurso() {
    const alert = await this.alertCtrl.create({
      header: 'Add Curso',
      inputs: [
        { name: 'curso', type: 'text', placeholder: 'Curso' },
        { name: 'paralelo', type: 'text', placeholder: 'Paralelo' },
        { name: 'especialidad', type: 'text', placeholder: 'Especialidad' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: (data) => {
            const newCurso: Curso = { idCurso: 0, ...data };
            this.inspectorService.addCurso(newCurso).subscribe(() => {
              this.loadCursos();
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async editCurso(curso: Curso) {
    const alert = await this.alertCtrl.create({
      header: 'Edit Curso',
      inputs: [
        { name: 'curso', type: 'text', value: curso.curso },
        { name: 'paralelo', type: 'text', value: curso.paralelo },
        { name: 'especialidad', type: 'text', value: curso.especialidad }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data) => {
            const updatedCurso: Curso = { idCurso: curso.idCurso, ...data };
            this.inspectorService.updateCurso(updatedCurso).subscribe(() => {
              this.loadCursos();
            });
          }
        }
      ]
    });
    await alert.present();
  }
  deleteCurso(idCurso: number) {
    this.inspectorService.deleteCurso(idCurso).subscribe(() => {
      this.loadCursos();
    });
  }
}
