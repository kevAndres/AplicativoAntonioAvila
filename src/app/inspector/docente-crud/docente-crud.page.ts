import { Component, OnInit } from '@angular/core';
import { Docente, InpectorServiceService } from '../services/inpector-service.service';
import { AlertController, LoadingController  } from '@ionic/angular';
@Component({
  selector: 'app-docente-crud',
  templateUrl: './docente-crud.page.html',
  styleUrls: ['./docente-crud.page.scss'],
})
export class DocenteCrudPage implements OnInit {
  docentes: Docente[] = [];
  constructor(private inspectorService:InpectorServiceService, private alertCtrl: AlertController,private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadDocentes()
  }
  async loadDocentes() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.inspectorService.getDocentes().subscribe(
      docente => {
        this.docentes = docente;
        loading.dismiss();
      },
      error => {
        console.error('Error loading courses', error);
        loading.dismiss();
      }
    );
  }

  async addDocente() {
    
    const alert = await this.alertCtrl.create({
      header: 'Agregar Docente',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre' },
        { name: 'apellido', type: 'text', placeholder: 'Apellido ' },
        { name: 'cedula', type: 'text', placeholder: 'Cedula' },
        { name: 'email', type: 'text', placeholder: 'Email' },
        { name: 'password', type: 'password', placeholder: 'Contraseña' }
    
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: (data) => {
           
            const newDocente: Docente = { iduser: 0,rol: 'docente', ...data };
            this.inspectorService.addDocente(newDocente).subscribe(() => {
              this.loadDocentes();
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async editDocente(docente: Docente) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Docente',
      inputs: [
        { name: 'nombre', type: 'text', value: docente.nombre },
        { name: 'apellido', type: 'text', value: docente.apellido },
        { name: 'cedula', type: 'text', value: docente.cedula },
        { name: 'email', type: 'text', value: docente.email}
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data) => {
            const updateDocente: Docente = { iduser: docente.iduser, ...data };
            this.inspectorService.updateDocente(updateDocente).subscribe(() => {
              this.loadDocentes();
            });
          }
        }
      ]
    });
    await alert.present();
  }
  deleteDocente(iduser: number) {
    this.inspectorService.deleteDocente(iduser).subscribe(() => {
      this.loadDocentes();
    });
  }
}
