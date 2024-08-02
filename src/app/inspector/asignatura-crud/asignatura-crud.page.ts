import { Component, OnInit } from '@angular/core';
import { InpectorServiceService, Asignatura } from '../services/inpector-service.service';
import { AlertController, LoadingController  } from '@ionic/angular';
@Component({
  selector: 'app-asignatura-crud',
  templateUrl: './asignatura-crud.page.html',
  styleUrls: ['./asignatura-crud.page.scss'],
})
export class AsignaturaCrudPage implements OnInit {
  asignaturas: Asignatura[] = [];
  constructor(private inspectorService:InpectorServiceService, private alertCtrl: AlertController,private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadAsignaturas()
  }
  async loadAsignaturas() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.inspectorService.getAsignaturas().subscribe(
      asignatura => {
        this.asignaturas = asignatura;
        loading.dismiss();
      },
      error => {
        console.error('Error loading courses', error);
        loading.dismiss();
      }
    );
  }
  async addAsignatura() {
    const alert = await this.alertCtrl.create({
      header: 'Agregar Asignatura',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre' },
        { name: 'descripcion', type: 'text', placeholder: 'Descripcion' }
    
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: (data) => {
            const newAsignatura: Asignatura = { idasignatura: 0, ...data };
            this.inspectorService.addAsignatura(newAsignatura).subscribe(() => {
              this.loadAsignaturas();
            });
          }
        }
      ]
    });
    await alert.present();
  }
  deleteAsignatura(idAsignatura: number) {
    this.inspectorService.deleteAsignatura(idAsignatura).subscribe(() => {
      this.loadAsignaturas();
    });
  }
}
