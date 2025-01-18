import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { EsquelasService } from '../../services/getEsquelas/esquelas.service';

@Component({
  selector: 'app-vista-esquela-representante',
  templateUrl: './vista-esquela-representante.page.html',
  styleUrls: ['./vista-esquela-representante.page.scss'],
})
export class VistaEsquelaRepresentantePage {
  username: string = '';
  esquelas: any[] = [];

  constructor(
    private EstudiantesService: EstudiantesService,
    private menu: MenuController,
    private authService: AuthService,
    private esquelasService: EsquelasService
  ) {}

  ionViewDidEnter() {
    this.authService.AutentificatorLogin();
    this.getEsquelas();

    this.UserName();
  }
  ionViewWillEnter() {
    this.authService.AutentificatorLogin();
    this.getEsquelas();
    this.UserName();
    this.menu.enable(false, 'first');
  }

  UserName() {
    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }

  getEsquelas() {
    this.esquelasService.getEsquelasIdEstudiante().subscribe(
      (data) => {
        this.esquelas = data;
        console.log(this.esquelas);
      },
      (error) => {
        console.error('Error al obtener las esquelas:', error);
      }
    );
  }
}
