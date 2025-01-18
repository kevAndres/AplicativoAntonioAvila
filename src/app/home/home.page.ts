import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { HeaderServiceService } from 'src/Shares/Services/header-service.service';

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
  public TitleHeader: string;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private HeaderServiceService: HeaderServiceService
  ) {
    this.TitleHeader = this.HeaderServiceService.appTitle;
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
  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      try {
        //await this.presentLoading();
        const success = await this.authService.login(email, password);
        if (success) {
          console.log('Inicio de sesión exitoso');
          this.redirectBasedOnRole();
        } else {
          console.log('Inicio de sesión fallido');
        }
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
      } finally {
        this.dismissLoading(); // Siempre ocultar el loading al finalizar
      }
    }
  }

  redirectBasedOnRole() {
    // Aquí puedes mantener la lógica para redirigir al usuario según su rol
    const idRolPrefix = this.authService.getRoleIdPrefix();
    switch (idRolPrefix) {
      case 'REPRESENTANTE':
        this.router.navigate(['/paguinaprincipalrepresentante']);
        break;
      case 'DOCENTE':
        this.router.navigate(['/paguinainicial']);
        break;
      case 'INSPECTOR':
        this.router.navigate(['/tabs/atrasos']);
        break;
      case 'ADMIN':
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
