import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
import { Router } from '@angular/router';
import { APIURL } from '../../../Shares/UrlApi';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-reporte-xcurso',
  templateUrl: './reporte-xcurso.page.html',
  styleUrls: ['./reporte-xcurso.page.scss'],
})
export class ReporteXcursoPage implements OnInit {
  cursos: any[] = [];
  selectedCursoId: string ="";
  url: string = APIURL
  constructor(private EstudiantesService: EstudiantesService,private http: HttpClient) { }

  ngOnInit() {
   this.loadCursos();
  }
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
  downloadFile(): void {
    if (this.selectedCursoId) {
      const downloadUrl = `${this.url}/atraso/reporte/curso/${this.selectedCursoId}`;
      window.location.href = downloadUrl;
    } else {
      console.log('Please select a fruit before downloading.');
    }
  }
}
