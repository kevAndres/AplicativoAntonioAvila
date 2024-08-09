import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MenuController } from '@ionic/angular';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
import { HeaderServiceService } from 'src/Shares/Services/header-service.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.page.html',
  styleUrls: ['./filtros.page.scss'],
})
export class FiltrosPage implements OnInit {
  username: string = '';
  public TitleHeader: string;

  atrasosByInspector: any[] = [];
  constructor(private authService: AuthService,
    private EstudiantesService: EstudiantesService,
    private HeaderServiceService: HeaderServiceService

  ) {
    this.TitleHeader = this.HeaderServiceService.appTitle;

   }

  ngOnInit() {
  }
  logout() {
    this.EstudiantesService.clearUserData();
    this.authService.limpiarrepresentados();
  }
  ionViewDidEnter() {
    this.UserName();
    this.authService.AutentificatorLogin();

  }
  ionViewWillEnter() {
    this.UserName();
    this.authService.AutentificatorLogin();

  }
  UserName() {
    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }
}
