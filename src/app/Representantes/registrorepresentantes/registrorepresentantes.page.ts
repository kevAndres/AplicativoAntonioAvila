import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registrorepresentantes',
  templateUrl: './registrorepresentantes.page.html',
  styleUrls: ['./registrorepresentantes.page.scss'],
})
export class RegistrorepresentantesPage implements OnInit {
  formularioRepresentantes: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController,

  ) {
    this.formularioRepresentantes = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
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
async registrarRepresentante() {
  if (this.formularioRepresentantes.valid) {
    const loading = await this.presentLoading();

    // Construye el objeto de datos con la información del formulario
    const datosRegistro = {
      nombre: this.formularioRepresentantes.value.nombre,
      apellido: this.formularioRepresentantes.value.apellido,
      cedula: this.formularioRepresentantes.value.cedula,
      email: this.formularioRepresentantes.value.email,
      password: this.formularioRepresentantes.value.password,
      rol: 'representante',
    };

    // Llama al método register del servicio authService y pasa los datos
    this.authService.registerRepresentante(datosRegistro).subscribe({
      next: async (response) => {
        console.log('Registro exitoso', response);
        await loading.dismiss(); // Oculta el loading cuando se complete la operación
        this.presentConfirmacion('Registro Exitoso');
        this.router.navigate(['/home']);
      },
      error: async (error) => {
        console.error('Error en el registro', error);
        await loading.dismiss(); // Oculta el loading en caso de error
        let mensajeError = 'Ocurrió un error al intentar registrar. Por favor, intenta de nuevo.';
        if (error.error && error.error.message) {
          mensajeError = error.error.message; // Usa el mensaje de la respuesta
        }
        this.presentError(mensajeError);
      },
    });
  }
}
}
