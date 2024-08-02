import { Component, OnInit } from '@angular/core';
import { inspector, InpectorServiceService,} from '../../inspector/services/inpector-service.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-inspector-crud',
  templateUrl: './inspector-crud.page.html',
  styleUrls: ['./inspector-crud.page.scss'],
})
export class InspectorCrudPage implements OnInit {
  inspectores: inspector[] = [];
  constructor(
    private inspectorService: InpectorServiceService,
    private alertCtrl: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadInspectores();
  }
  async loadInspectores() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.inspectorService.getInspector().subscribe(
      (docente) => {
        this.inspectores = docente;
        loading.dismiss();
      },
      (error) => {
        console.error('Error loading inspectores', error);
        loading.dismiss();
      }
    );
  }

  async addInspector() {
    const alert = await this.alertCtrl.create({
      header: 'Agregar Inspector',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre' },
        { name: 'apellido', type: 'text', placeholder: 'Apellido ' },
        { name: 'cedula', type: 'text', placeholder: 'Cedula' },
        { name: 'email', type: 'text', placeholder: 'Email' },
        { name: 'password', type: 'password', placeholder: 'Contraseña' },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: (data) => {
            const newInspector: inspector = { iduser: 0, rol: 'inspector', ...data };
            this.inspectorService.addInspector(newInspector).subscribe(() => {
              this.loadInspectores();
            });
          },
        },
      ],
    });
    await alert.present();
  }
  async editInspector(inspector: inspector) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Docente',
      inputs: [
        { name: 'nombre', type: 'text', value: inspector.nombre },
        { name: 'apellido', type: 'text', value: inspector.apellido },
        { name: 'cedula', type: 'text', value: inspector.cedula },
        { name: 'email', type: 'text', value: inspector.email },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data) => {
            const updateInspector: inspector = { iduser: inspector.iduser, ...data };
            this.inspectorService.updateDocente(updateInspector).subscribe(() => {
              this.loadInspectores();
            });
          },
        },
      ],
    });
    await alert.present();
  }
  deleteInspector(iduser: number) {
    this.inspectorService.deleteInspector(iduser).subscribe(() => {
      this.loadInspectores();
    });
  }
}
