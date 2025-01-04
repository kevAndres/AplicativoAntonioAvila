import { Component, OnDestroy, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
import { AuthService } from '../../services/auth.service';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { VistaUsuarioComponent } from 'src/Component/VistaUsuario/vista-usuario/vista-usuario.component';
import { HeaderServiceService } from 'src/Shares/Services/header-service.service';

@Component({
  selector: 'app-paguinaprincipalrepresentante',
  templateUrl: './paguinaprincipalrepresentante.page.html',
  styleUrls: ['./paguinaprincipalrepresentante.page.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class PaguinaprincipalrepresentantePage {
  representados: any[] = [];
  username: string = '';
  public TitleHeader: string;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private menu: MenuController,
    private EstudiantesService: EstudiantesService,
    private modalController: ModalController,
    private HeaderServiceService: HeaderServiceService
  ) {
    this.TitleHeader = this.HeaderServiceService.appTitle;
  }

  // ngOnInit() {
  //   // this.ChargeEstudents();
  // }

  ionViewDidEnter() {
    this.authService.AutentificatorLogin();
    this.ChargeEstudents();
  }
  ionViewWillEnter() {
    this.authService.AutentificatorLogin();
    this.ChargeEstudents();
    this.menu.enable(true, 'first');
  }

  ChargeEstudents() {
    this.subscriptions.add(
      this.EstudiantesService.getRepresentados().subscribe(
        (data) => {
          this.representados = data;
          console.log(
            'todso lso representados',
            JSON.stringify(this.representados)
          );
        },
        (error) => {
          console.error('Error al cargar los representados', error);
        }
      )
    );

    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }

  RegisterDirection() {
    this.router.navigate(['/registroestudiante']);
  }

  // ngOnDestroy() {
  //   // this.subscriptions.unsubscribe();
  // }

  GetDataIdEstudiante(estudiante: any) {
    localStorage.setItem('IdEstCurForEsquelas', estudiante.idEstudiantes);
    localStorage.setItem('NombreEstudiante', estudiante.NombreEst);
    localStorage.setItem('ApellidoEstudiante', estudiante.ApellidoEst);

    console.log(localStorage.getItem('IdEstCurForEsquelas'));
    console.log(localStorage.getItem('NombreEstudiante'));
    console.log(localStorage.getItem('ApellidoEstudiante'));
  }
  logout() {
    this.authService.limpiarrepresentados();
    this.EstudiantesService.clearUserData();
  }

  async showUserInfo() {
    const modal = await this.modalController.create({
      component: VistaUsuarioComponent,
    });
    return await modal.present();
  }
}
