import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
import { MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MotivoEsquelas } from '../../../Shares/MotivoEsquelas';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HeaderServiceService } from 'src/Shares/Services/header-service.service';
import { LoadingController } from '@ionic/angular';

interface Estudiante {
  idEstudiantes: string;
}
@Component({
  selector: 'app-esquela',
  templateUrl: './esquela.page.html',
  styleUrls: ['./esquela.page.scss'],
})
export class EsquelaPage {
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;
  uploadMessage: string = '';
  base64Image: string | ArrayBuffer | null = null;
  public TitleHeader: string;
  formularioEsquela: FormGroup;
  username: string = '';
  Estudiantes: any[] = [];
  Motivos: string[] = MotivoEsquelas; // Inicializa el arreglo de opciones con los valores del archivo opciones.ts
  MotivoSeleccionado: string = ''; // Variable para almacenar la opción seleccionada del combo box
  AigCurso: Estudiante[] = [];
  showCalendar: boolean = false;
  minDate: string = new Date().toISOString();
  citaValue: string = '';
  constructor(
    private EstudiantesService: EstudiantesService,
    private menu: MenuController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private HeaderServiceService: HeaderServiceService
  ) {
    this.TitleHeader = this.HeaderServiceService.appTitle;
    this.formularioEsquela = this.formBuilder.group({
      EstudianteCurso: ['', [Validators.required]],
      motivo: ['', [Validators.required]],
      Descripcion: ['', [Validators.required, Validators.minLength(3)]],
      cita: [''], // Agrega el control de la fecha aquí
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Registrando...',
      translucent: true,
    });
    await loading.present();
  }
  async dismissLoading() {
    await this.loadingController.dismiss();
  }
  async presentError(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentConfirmacion(message: string) {
    const alert = await this.alertController.create({
      header: 'INFO',
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }
  //ngOnInit() {}

  ionViewDidEnter() {
    this.authService.AutentificatorLogin();
    this.UserName();
    this.loadEstudiantesCurso();
  }
  ionViewWillEnter() {
    this.authService.AutentificatorLogin();
    this.loadEstudiantesCurso();
    this.UserName();
    this.menu.enable(false, 'first');
  }

  toggleCalendar(event: any) {
    this.showCalendar = event.detail.checked;
    if (this.showCalendar) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const currentDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

      // Establecer el valor en el control de formulario
      this.formularioEsquela.get('cita')!.setValue(currentDate);
      console.log(
        'Valor de cita establecido a la fecha y hora actuales en América/Guayaquil:',
        currentDate
      );
    }
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  RegisterEsquela() {
    if (this.formularioEsquela.valid) {
      this.presentLoading();

      let citaFormateada = 'El docente emitente, no solicita cita';

      if (this.showCalendar) {
        const citaValue = this.formularioEsquela.get('cita')!.value;
        if (citaValue) {
          const date = new Date(citaValue);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Enero es 0
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          citaFormateada = `${day}/${month}/${year} ${hours}:${minutes}`;
        }
      }

      const formData: any = {
        motivo: this.formularioEsquela.get('motivo')!.value,
        descripcion: this.formularioEsquela.get('Descripcion')!.value,
        Evidencia: this.base64Image,
        cita: citaFormateada,
      };

      console.log('Datos del formulario:', formData); // Para depurar

      this.authService.registerEsquela_API(formData).subscribe({
        next: (response) => {
          console.log('Esquela registrada con éxito', response);
          this.dismissLoading();
          this.presentConfirmacion(response);
          this.router.navigate(['/paguinainicial']); // Navegar de regreso
        },
        error: (error) => {
          console.error('Error al registrar la Esquela', error);
          this.dismissLoading();
          this.presentError(error);
        },
        complete: () => {
          this.dismissLoading(); // Descarta el loading cuando la solicitud completa (ya sea éxito o error)
        },
      });
    } else {
      console.error('Datos no válidos');
      this.dismissLoading();
    }
  }

  loadEstudiantesCurso() {
    this.EstudiantesService.getEstudiantesCurso().subscribe({
      next: (data) => {
        this.Estudiantes = data;
      },
      error: (Error) => {
        console.error('Error al cargar los estudiantes', Error);
      },
    });
  }
  UserName() {
    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }
  GetDataIdEstudiante(estudiante: any) {
    localStorage.setItem('Estudiante', estudiante.idEstudiantes);
    console.log(estudiante.idEstudiantes);
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  uploadFile(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];

      // Comprobar si el archivo es de tipo imagen (JPEG o PNG)
      if (file.type.match(/image\/(jpeg|png)/)) {
        this.previewImage(file);
      } else {
        console.log('Solo se permiten imágenes JPEG o PNG.');
        this.base64Image = null; // Resetear la vista previa si el tipo de archivo no es correcto
      }
    }
  }

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.base64Image = reader.result as string; // Guarda el resultado en base64
      console.log(this.base64Image);
    };
    reader.readAsDataURL(file); // Convierte la imagen a base64
  }
}
