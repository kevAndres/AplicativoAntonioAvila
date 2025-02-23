import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../app/services/getProfile/profile.service'; // Ajusta la ruta según la ubicación de tu servicio
import {
  ModalController,
  AlertController,
  LoadingController,
} from '@ionic/angular'; // Importar ModalController y AlertController
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.scss'],
})
export class VistaUsuarioComponent implements OnInit {
  userInfo: any = null;
  QR: string = ''; // Inicializa como una cadena vacía para almacenar el QR

  constructor(
    private ProfileService: ProfileService,
    private modalController: ModalController,
    private alertController: AlertController, // Inyectar AlertController
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.fetchUserInfo();
  }

  async fetchUserInfo() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.ProfileService.getUsuario().subscribe(
      (data) => {
        //console.log('Datos recibidos:', data); // Verificar los datos recibidos
        this.userInfo = data;
        loading.dismiss();
      },
      (error) => {
        console.error('Error al obtener la información del usuario', error);
        loading.dismiss();
      }
    );
  }

  close() {
    this.modalController.dismiss(); // Cierra el modal
  }

  async ShowQR() {
    // Solicitar permisos antes de guardar el archivo
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) {
      return;
    }
    const loading = await this.loadingController.create({
      message: 'Generando..',
    });
    await loading.present();
    await this.ProfileService.getQR().subscribe(
      async (data) => {
        //console.log('QR Realizado:', data); // Verificar los datos recibidos
        this.QR = data.qrCodeDataURL;
        loading.dismiss();

        try {
          // Convertir dataURL a Blob
          const response = await fetch(this.QR);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64data = reader.result?.toString().split(',')[1];
            if (base64data && this.userInfo) {
              const userName =
                `${this.userInfo.NombreEst}_${this.userInfo.ApellidoEst}`.replace(
                  / /g,
                  '_'
                );

              await Filesystem.writeFile({
                path: `${userName}_QR.png`,
                data: base64data,
                directory: Directory.Documents,
              });

              // console.log('Archivo guardado correctamente');
              this.presentAlert(
                'Archivo guardado correctamente en la carpeta de documentos'
              );
            }
          };
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error('Error al guardar el archivo', error);
          this.presentAlert('Error al guardar el archivo: ' + error);
        }
      },
      (error) => {
        loading.dismiss();
        console.error('Error al Generar el QR', error);
        this.presentAlert('Error al Generar el QR: ' + error);
      }
    );
  }

  async requestPermissions() {
    if (Capacitor.isNativePlatform()) {
      const status = await Filesystem.requestPermissions();
      if (status.publicStorage !== 'granted') {
        this.presentAlert(
          'Necesitamos permisos de almacenamiento para guardar el QR.'
        );
        return false;
      }
    }
    return true;
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentError(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
