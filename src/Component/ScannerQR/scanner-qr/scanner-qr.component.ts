import {
  Component,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
  StartScanOptions,
  BarcodeScannedEvent,
} from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { EstudiantesService } from '../../../app/services/getestudiantes/estudiantes.service';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.component.html',
  styleUrls: ['./scanner-qr.component.scss'],
})
export class ScannerQRComponent implements AfterViewInit, OnDestroy {
  qrCodeData: string | null = null;
  estudiantes_idEstudiantes: string | null = null;
  private listener: any;
  public isTorchAvailable = false;

  constructor(
    private estudiantesService: EstudiantesService,
    private alertController: AlertController,
    private ngZone: NgZone
  ) {}

  async ngAfterViewInit() {
    const hasPermission = await this.checkCameraPermission();
    if (hasPermission) {
      await this.checkTorchAvailability();
      this.startScan();
    }
  }

  async ngOnDestroy() {
    await this.stopScan();
  }

  private async checkCameraPermission() {
    const permission = await BarcodeScanner.checkPermissions();
    if (permission.camera !== 'granted') {
      const response = await BarcodeScanner.requestPermissions();
      return response.camera === 'granted';
    }
    return true;
  }

  private async checkTorchAvailability() {
    const result = await BarcodeScanner.isTorchAvailable();
    this.isTorchAvailable = result.available;
  }

  private async startScan() {
    try {
      document.querySelector('body')?.classList.add('barcode-scanning-active');

      const options: StartScanOptions = {
        formats: [BarcodeFormat.QrCode],
        lensFacing: LensFacing.Back,
      };

      this.listener = await BarcodeScanner.addListener(
        'barcodeScanned',
        async (event: BarcodeScannedEvent) => {
          this.ngZone.run(() => {
            const barcodeData = event.barcode.displayValue;
            if (barcodeData) {
              this.qrCodeData = barcodeData;
              this.getEstudianteData(barcodeData);
              this.stopScan();
            }
          });
        }
      );

      await BarcodeScanner.startScan(options);
    } catch (error) {
      console.error('Error:', error);
      this.presentError('Error al iniciar el escaneo: ' + error);
    }
  }

  private async stopScan() {
    document.querySelector('body')?.classList.remove('barcode-scanning-active');
    await BarcodeScanner.stopScan();
    if (this.listener) {
      this.listener.remove();
    }
  }

  async getEstudianteData(codigo: string) {
    try {
      const estudiante = await this.estudiantesService.getEstudianteData(codigo).toPromise();
      this.estudiantes_idEstudiantes = estudiante.idEstudiantes; // Almacena el id del estudiante
      this.presentAlert(estudiante.NombreEst, estudiante.ApellidoEst, estudiante.cedula);
    } catch (error) {
      console.error('Error al obtener los datos del estudiante', error);
      this.presentError('Error al obtener los datos del estudiante: ' + error);
    }
  }

  async presentAlert(nombre: string, apellido: string, cedula: string) {
    const alert = await this.alertController.create({
      header: 'Registrar Atraso',
      message: `Registrar Atraso al estudiante ${nombre} ${apellido} con cédula ${cedula}.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.startScan();
          }
        },
        {
          text: 'OK',
          handler: () => {
            if (this.estudiantes_idEstudiantes) {
              this.registrarAtraso(this.estudiantes_idEstudiantes);
            } else {
              console.error('No se encontró el id del estudiante');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  registrarAtraso(estudiantes_idEstudiantes: string) {
    this.estudiantesService.registrarAtraso(estudiantes_idEstudiantes).subscribe({
      next: (response) => {
        console.log('Atraso registrado exitosamente', response);
        this.presentConfirmacion('Atraso registrado exitosamente');
        this.qrCodeData = null; // Reiniciar el valor del código QR para permitir un nuevo escaneo
        this.startScan();

      },
      error: (error) => {
        console.error('Error al registrar el atraso', error);
        this.presentError('Error al registrar el atraso');
        this.qrCodeData = null; // Reiniciar el valor del código QR para permitir un nuevo escaneo
        this.startScan();

      }
    });
  }

  async presentConfirmacion(message: string) {
    const alert = await this.alertController.create({
      header: 'INFO',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentError(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async toggleTorch(): Promise<void> {
    await BarcodeScanner.toggleTorch();
  }
}
