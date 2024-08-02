import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registrodocentes',
  templateUrl: './registrodocentes.page.html',
  styleUrls: ['./registrodocentes.page.scss'],
})
export class RegistrodocentesPage {
  formularioDocente: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {
    // Aquí inicializamos el FormGroup utilizando el FormBuilder
    this.formularioDocente = this.formBuilder.group({
      // Definimos un FormControl para cada campo con sus validaciones
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Suponiendo cédula de 10 dígitos
      email: ['', [Validators.required, Validators.email]],
     // asignatura: ['', [Validators.required]],
      //rol: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
//metodo de alerta de error
  async presentError(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Por favor, espere...',
    });
    await loading.present();
    return loading;
  }

//metodo de alerta de confirmacion de registro
  async presentConfirmacion(message: string) {
    const alert = await this.alertController.create({
      header: 'INFO',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  // Este método se llamará cuando el formulario se intente enviar
  async registrarDocente() {
    if (this.formularioDocente.valid) {
      const loading = await this.presentLoading();
      // Construye el objeto de datos con la información del formulario
      const datosRegistro = {
        nombre: this.formularioDocente.value.nombre,
        apellido: this.formularioDocente.value.apellido,
        cedula: this.formularioDocente.value.cedula,
        email: this.formularioDocente.value.email,
        //asignatura: this.formularioDocente.value.password,
        rol: 'docente',
        password: this.formularioDocente.value.password,
      };

      // Llama al método register del servicio authService y pasa los datos
      this.authService.registerDocente(datosRegistro).subscribe({
        next: async (response) => {
          
          console.log('Registro exitoso', response);
          await loading.dismiss();
          this.presentConfirmacion('Resgistro Exitoso');
          // Navega a la ruta que desees tras un registro exitoso, por ejemplo '/login'
          this.router.navigate(['/home']);
        },
        error: async (error) => {
          console.error('Error en el registro', error);
          await loading.dismiss();
          let mensajeError =
            'Ocurrió un error al intentar registrar. Por favor, intenta de nuevo.';
          if (error.error && error.error.message) {
            mensajeError = error.error.message; // Usa el mensaje de la respuesta
          }
          this.presentError(mensajeError);
        },
      });
    }
  }
}
