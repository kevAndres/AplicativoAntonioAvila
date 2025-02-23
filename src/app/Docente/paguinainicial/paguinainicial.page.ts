import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
import { MenuController } from '@ionic/angular';
import { HeaderServiceService } from 'src/Shares/Services/header-service.service';

interface Docente {
  asignatura_idasignatura: string;
  curso_idCurso: string;
  IdAsignacion: string;
}
@Component({
  selector: 'app-paguinainicial',
  templateUrl: './paguinainicial.page.html',
  styleUrls: ['./paguinainicial.page.scss'],
})
export class PaguinainicialPage {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Acerca de', url: '/about', icon: 'information-circle' },
    { title: 'Contacto', url: '/contact', icon: 'call' },
    // ... más páginas
  ];
  username: string = '';
  asignaturasdocente: any[] = [];
  AigCurso: Docente[] = [];
  public TitleHeader: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private EstudiantesService: EstudiantesService,
    private menu: MenuController,
    private HeaderServiceService: HeaderServiceService
  ) {
    this.TitleHeader = this.HeaderServiceService.appTitle;
  }

  //ngOnInit() {}
  logout() {
    this.EstudiantesService.clearUserData();
    this.authService.limpiarrepresentados();
  }
  ionViewDidEnter() {
    this.UserName();
    this.ChargeAsignacionAignaturas();
    this.authService.AutentificatorLogin();
  }
  ionViewWillEnter() {
    this.UserName();
    this.ChargeAsignacionAignaturas();
    this.menu.enable(true, 'first');
    this.authService.AutentificatorLogin();
  }
  ChargeAsignacionAignaturas() {
    this.EstudiantesService.getAsignaturasDocente().subscribe(
      (data) => {
        this.asignaturasdocente = data;
        // console.log('asignaturasdocente', this.asignaturasdocente);
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

  GetDataAsignaturaCurso(docente: Docente) {
    localStorage.setItem('asignatura', docente.asignatura_idasignatura);
    localStorage.setItem('curso', docente.curso_idCurso);
    localStorage.setItem('MateriaDocente', docente.IdAsignacion);

    // console.log(docente.asignatura_idasignatura);
    // console.log(docente.IdAsignacion);
  }
}
