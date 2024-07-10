import { Component, OnInit } from '@angular/core';
import { APIURL } from '../../../Shares/UrlApi';
import { HttpClient } from '@angular/common/http';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
@Component({
  selector: 'app-reporte-xestudiante',
  templateUrl: './reporte-xestudiante.page.html',
  styleUrls: ['./reporte-xestudiante.page.scss'],
})
export class ReporteXestudiantePage implements OnInit {
  cursos: any[] = [];
  estudiantes: any[] = [];
  selectedCursoId: string | null = null;
  selectedEstudianteId: string | null = null;
  url: string = APIURL

  constructor(private EstudiantesService: EstudiantesService,private http: HttpClient) { }

  ngOnInit() {
    this.loadCursos()
  }
  loadCursos() {
    this.EstudiantesService.getCursos().subscribe((data: any) => {
      this.cursos = data;
    }, error => {
      console.error('Error al obtener los cursos', error);
    });
  }
 

  onCursoChange(event: any) {
    const cursoId = event.detail.value;
    this.EstudiantesService.getEstudiantes(cursoId).subscribe((data: any) => {
      this.estudiantes = data;
    }, error => {
      console.error('Error al obtener los estudiantes', error);
    });
  }
  

  downloadFile(): void {
    if (this.selectedEstudianteId) {
      const downloadUrl = `${this.url}/atraso/reporte/estudiante/${this.selectedEstudianteId}`;
      window.location.href = downloadUrl;
    } else {
      console.log('Please select a fruit before downloading.');
    }
  }
}
