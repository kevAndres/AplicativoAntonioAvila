import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { APIURL } from '../../../Shares/UrlApi'; // Importa la constante API_URL desde el archivo api-config
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetAtrasosService {

  constructor(private http: HttpClient) { }
  //Metodo para obtener los atrasos por estudiante
  getAtrasosIdEstudiante(): Observable<any> {
    return this.http.get(`${APIURL}/atraso/estudiante/${localStorage.getItem('IdEstCurForEsquelas')}`);
  }
  //Metodo para obtener todas las esquelas  del docente por curso impartido con su respectiva materia o asignatura
  //getEsquelasIdAsignacionDocenteMateria(): Observable<any> {
    //return this.http.get(`${APIURL}/esquela/docenteAsignacion/${localStorage.getItem('MateriaDocente')}`);
  //}
}
