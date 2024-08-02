import { Component, OnInit } from '@angular/core';
import { Representante, InpectorServiceService } from '../services/inpector-service.service';
import { AlertController, LoadingController  } from '@ionic/angular';
@Component({
  selector: 'app-representante-crud',
  templateUrl: './representante-crud.page.html',
  styleUrls: ['./representante-crud.page.scss'],
})
export class RepresentanteCrudPage implements OnInit {
  representantes: Representante[] = [];
  constructor(private inspectorService:InpectorServiceService, private alertCtrl: AlertController,private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadRepresentantes()
  }
  async loadRepresentantes() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.inspectorService.getRepresentantes().subscribe(
      representante => {
        this.representantes = representante;
        loading.dismiss();
      },
      error => {
        console.error('Error loading courses', error);
        loading.dismiss();
      }
    );
  }
  async editRepresentante(representante: Representante) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Representante',
      inputs: [
        { name: 'nombre', type: 'text', value: representante.nombre },
        { name: 'apellido', type: 'text', value: representante.apellido },
        { name: 'cedula', type: 'text', value: representante.cedula },
        { name: 'email', type: 'text', value: representante.email}
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data) => {
            const updateRepresentante: Representante = { iduser: representante.iduser, ...data };
            this.inspectorService.updateRepresentate(updateRepresentante).subscribe(() => {
              this.loadRepresentantes();
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async addRepresentante() {
    
    const alert = await this.alertCtrl.create({
      header: 'Agregar Representante',
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
           
            const newRepresentante: Representante = { iduser: 0,rol: 'representante', ...data };
            this.inspectorService.addRepresenta(newRepresentante).subscribe(() => {
              this.loadRepresentantes();
            });
          }
        }
      ]
    });
    await alert.present();
  }
  deleteRepresentate(iduser: number) {
    this.inspectorService.deleteRepresentate(iduser).subscribe(() => {
      this.loadRepresentantes();
    });
  }
}
