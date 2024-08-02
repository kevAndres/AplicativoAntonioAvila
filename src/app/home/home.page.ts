import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
interface JwtPayload {
  nombre?: string;
  idRol?: string;
  // ... cualquier otra propiedad que esperes en tu token
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loginForm: FormGroup;


  
  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // Añade esta función para presentar alertas
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      translucent: true,
    });
    await loading.present();
  }
  async dismissLoading() {
    await this.loadingController.dismiss();
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.redirectBasedOnRole();
    }
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.presentLoading();
      this.authService.login(email, password).subscribe({
        next: (success) => {
          if (success) {
            console.log('Inicio de sesión exitoso');
            this.redirectBasedOnRole();
          } else {
            this.dismissLoading();
            console.log('Inicio de sesión fallido');
          }
        },
        error: (error) => {
          this.dismissLoading();
          console.error('Error en el inicio de sesión', error);
        },
        complete: () => {
          this.dismissLoading(); // Descarta el loading cuando la solicitud completa (ya sea éxito o error)
        }
      });
    }
  }

  redirectBasedOnRole() {
    // Aquí puedes mantener la lógica para redirigir al usuario según su rol
    const idRolPrefix = this.authService.getRoleIdPrefix();
    switch (idRolPrefix) {
      case 'REP':
        this.router.navigate(['/paguinaprincipalrepresentante']);
        break;
      case 'LIC':
        this.router.navigate(['/paguinainicial']);
        break;
      case 'INS':
        this.router.navigate(['/tabs/atrasos']);
        break;
        case 'ADM':
          this.router.navigate(['/inicioadmin/configuracion']);
          break;
      default:
        this.router.navigate(['/home']); // Ruta por defecto o manejo de error
        break;
    }
  }

  goToRegistroDocentes() {
    this.router.navigateByUrl('/registrodocentes'); // Asegúrate de que esta ruta está definida en tus rutas
  }
  goToRegistroRepresentantes() {
    this.router.navigateByUrl('/registrorepresentantes'); // Asegúrate de que esta ruta está definida en tus rutas
  }
}
