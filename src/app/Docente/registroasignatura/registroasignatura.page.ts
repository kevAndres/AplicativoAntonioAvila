import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
import { AlertController, IonRouterOutlet } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { HeaderServiceService } from 'src/Shares/Services/header-service.service';

@Component({
  selector: 'app-registroasignatura',
  templateUrl: './registroasignatura.page.html',
  styleUrls: ['./registroasignatura.page.scss'],
})
export class RegistroasignaturaPage {
  asignaturas: any[] = [];
  cursos: any[] = [];
  asignaturasdocente: any[] = [];
  selectedAsignatura?: string;
  username: string = '';
  formularioAsignatura: FormGroup;
  public TitleHeader: string;

  constructor(
    private EstudiantesService: EstudiantesService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private AuthService: AuthService,
    private router: Router,
    private menu: MenuController,
    private HeaderServiceService: HeaderServiceService
  ) {
    this.TitleHeader = this.HeaderServiceService.appTitle;
    this.formularioAsignatura = this.formBuilder.group({
      asignatura_idasignatura: ['', [Validators.required]],
      curso_idCurso: ['', [Validators.required]],
    });
  }
  async presentError(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  //ngOnInit() {}
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

  ionViewDidEnter() {
    this.AuthService.AutentificatorLogin();
    this.UserName();
    this.loadAsignaturas();
    this.loadCursos();
  }
  ionViewWillEnter() {
    this.AuthService.AutentificatorLogin();
    this.UserName();
    this.loadAsignaturas();
    this.loadCursos();
    this.menu.enable(false, 'first');
  }
  loadAsignaturas() {
    this.EstudiantesService.getAsignaturasPorNivelAcademicoJornada().subscribe({
      next: (data) => {
        this.asignaturas = data;
        // console.log('asignatruas de la paguina del docente', this.asignaturas);
      },
      error: (error) => {
        console.error('Error al cargar las asignaturas', error);
      },
    });
  }
  loadCursos() {
    this.EstudiantesService.getCursosParams().subscribe({
      next: (data) => {
        this.cursos = data;
        // console.log('cursos', this.cursos);
      },
      error: (error) => {
        console.error('Error al cargar cursos', error);
      },
    });
  }
  RegisterAsignatura() {
    if (this.formularioAsignatura.valid) {
      this.AuthService.registerAsignatura(
        this.formularioAsignatura.value
      ).subscribe({
        next: (Response) => {
          //console.log(Response.message);
          //this.presentConfirmacion(Response.message);
          this.router.navigate(['/paguinainicial']);
        },
        error: (Error) => {
          console.error('Error en el registro', Error);
          let mensajeError =
            'Ocurrió un error al intentar registrar. Por favor, intenta de nuevo.';
          if (Error.error && Error.error.message) {
            mensajeError = Error.error.message;
          }
          this.presentError(mensajeError);
        },
      });
    }
  }

  ChargeAsignacionAignaturas() {
    this.EstudiantesService.getAsignaturasDocente().subscribe(
      (data) => {
        this.asignaturasdocente = data;
      },
      (Error) => {
        console.error(
          'Error al cargar las asignaciones  de asignaturas del docente',
          Error
        );
      }
    );
  }
  UserName() {
    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }
}
