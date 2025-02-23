import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { EsquelasService } from '../../services/getEsquelas/esquelas.service';

@Component({
  selector: 'app-vista-esquela-docente',
  templateUrl: './vista-esquela-docente.page.html',
  styleUrls: ['./vista-esquela-docente.page.scss'],
})
export class VistaEsquelaDocentePage {
  username: string = '';
  esquelas: any[] = [];
  constructor(
    private EstudiantesService: EstudiantesService,
    private menu: MenuController,
    private authService: AuthService,
    private esquelasService: EsquelasService
  ) {}

  //ngOnInit() {}
  ionViewDidEnter() {
    this.authService.AutentificatorLogin();

    this.UserName();
  }
  ionViewWillEnter() {
    this.authService.AutentificatorLogin();

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
    this.esquelasService.getEsquelasIdAsignacionDocenteMateria().subscribe(
      (data) => {
        this.esquelas = data;
        // console.log(this.esquelas);
      },
      (error) => {
        console.error('Error al obtener las esquelas:', error);
      }
    );
  }
}
