import { Component, OnDestroy, Injectable, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
import { MenuController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface Docente {
  asignatura_idasignatura: string;
  curso_idCurso: string;
  IdAsignacion: string;
}

@Component({
  selector: 'app-atrasos',
  templateUrl: './atrasos.page.html',
  styleUrls: ['./atrasos.page.scss'],
})
export class AtrasosPage implements OnInit {
  formularioatrasos: FormGroup;
  username: string = '';
  cursos: any[] = [];
  Estudiantes: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private EstudiantesService: EstudiantesService,
    private menu: MenuController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {
    this.formularioatrasos = this.formBuilder.group({
      descripcion: [''],
      curso_idCurso: ['', [Validators.required]],
      EstudianteCurso: ['', [Validators.required]],
      cedula: [ '', [ this.numberValidator(),  Validators.minLength(10),  Validators.maxLength(10)] ],
    });
  }

  ngOnInit() {
    // Inicializar componentes
    this.UserName();
    this.loadCursos();
  }

  ionViewDidEnter() {
    this.UserName();
    this.loadCursos();
  }

  ionViewWillEnter() {
    this.UserName();
    this.loadCursos();
    this.menu.enable(false, 'first');
  }
  //Validador de numeros para el campo de la Cedula
  numberValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^[0-9]*$/.test(control.value);
      return valid ? null : { invalidNumber: { value: control.value } };
    };
  }
  //Alerta de Error
  async presentError(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  //Alerta de Confrimacion
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
  //Metodo  para registrar un atraso atravez del formulario de atrasos y la busqueda por cedula.
  registrarAtraso() {
   
      const descripcion = this.formularioatrasos.get('descripcion')!.value;
      this.authService.RegisterAtrasos({ descripcion }).subscribe({
        next: (response) => {
          // Manejo de la respuesta exitosa
          console.log(response);
          this.presentConfirmacion('Atraso registrado exitosamente');
          this.formularioatrasos.reset(); // Limpiar el formulario
        },
        error: (error) => {
          console.error('Error en el registro', error);
          let mensajeError =
            'Ocurrió un error al intentar registrar. Por favor, intenta de nuevo.';
          if (error.error && error.error.message) {
            mensajeError = error.error.message;
          }
          this.presentError(mensajeError);
        },
      });
    
  }
  //Metodo de carga de Cursos para el formulario.(todos los cursos)
  loadCursos() {
    this.EstudiantesService.getCursos().subscribe({
      next: (data) => {
        this.cursos = data;
      },
      error: (error) => {
        console.error('Error al cargar cursos', error);
      },
    });
  }
  //Metodo para obtener el Usuario
  UserName() {
    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }
  //Metodo para guardar el ID del curso cuando se selecciona el curso en el formulario
  GetDataAsignaturaCurso(event: any) {
    const cursoId = event.detail.value;
    localStorage.setItem('curso', cursoId);
    console.log(localStorage.getItem('curso'));

    // Llamar al método para cargar estudiantes del curso seleccionado
    this.loadEstudiantesCurso();
  }
  //Metodo para cargar los estudiantes  de un curso
  loadEstudiantesCurso() {
    this.EstudiantesService.getEstudiantesCurso().subscribe({
      next: (data) => {
        this.Estudiantes = data;
        // Aquí puedes llamar a GetDataIdEstudiante después de cargar los estudiantes, si es necesario
        if (this.Estudiantes.length > 0) {
          this.GetDataIdEstudiante(this.Estudiantes[0]);
        }
      },
      error: (Error) => {
        console.error('Error al cargar los estudiantes', Error);
      },
    });
  }
  //Metodo para relaizar busqueda de una estudiante por cedula en el formulario, y alertas para el registro del atraso
  async searchByCedula() {
    const cedula = this.formularioatrasos.get('cedula')?.value;
    if (cedula) {
      console.log(`Buscando estudiante con cédula: ${cedula}`);
      this.EstudiantesService.getIDESTfromCedula(cedula).subscribe(
        async (data: any) => {
          // Asegúrate de que data sea tratado como un objeto
          console.log('Respuesta del servicio:', data);

          // Verifica si data es un objeto y contiene la propiedad idEstudiantes
          if (data && data.idEstudiantes) {
            console.log('Estudiante encontrado:', data);
            localStorage.setItem('Estudiante', data.idEstudiantes); // Guarda el ID del estudiante en el localStorage
            console.log(
              'ID del estudiante guardado en localStorage:',
              localStorage.getItem('Estudiante')
            );
            const alert = await this.alertController.create({
              header: 'Registrar Atraso',
              message: `Registrar atraso de ${data.NombreEst} ${data.ApellidoEst} con cédula ${cedula}`,
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                },
                {
                  text: 'Confirmar',
                  handler: () => {
                    this.registrarAtraso();
                  },
                },
              ],
            });
            await alert.present();
          } else {
            console.error('No se encontró el estudiante');
            this.presentError(
              'No se encontró el estudiante con la cédula proporcionada.'
            );
          }
        },
        (error) => {
          console.error('Error en la solicitud al servicio:', error);
          this.presentError(
            'Error en la solicitud al servicio. Por favor, intenta de nuevo.'
          );
        }
      );
    } else {
      console.error('El campo cedula no puede estar vacío o nulo');
      this.presentError('El campo cédula no puede estar vacío o nulo');
    }
  }

  //Metodo que guarda el ID del estudiante para el envio a la API
  GetDataIdEstudiante(estudiante: any) {
    localStorage.setItem('Estudiante', estudiante.idEstudiantes);
    console.log(estudiante.idEstudiantes);
  }
}
