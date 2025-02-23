import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { APIURL } from '../../../Shares/UrlApi'; // Importa la constante API_URL desde el archivo api-config
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EsquelasService {
  constructor(private http: HttpClient) {}

  getEsquelasIdEstudiante(): Observable<any> {
    return this.http.get(
      `${APIURL}/esquela/estudiante/${localStorage.getItem(
        'IdEstCurForEsquelas'
      )}`
    );
  }
  //Metodo para obtener todas las esquelas  del docente por curso impartido con su respectiva materia o asignatura
  getEsquelasIdAsignacionDocenteMateria(): Observable<any> {
    return this.http.get(
      `${APIURL}/esquela/docenteAsignacion/${localStorage.getItem(
        'MateriaDocente'
      )}`
    );
  }
  //metodo   que trae las esquelas con el nuevo estado de la esquela
  getUpdateEsquelasIdEstudiante(IdEsquela: number): Observable<any> {
    return this.http.put(
      //`${APIURL}/esquela/cambiar-estado/${localStorage.getItem('IdEsquela')}`,
      `${APIURL}/esquela/cambiar-estado/${IdEsquela}`,
      {}
    );
    // console.log('request', request.subscribe);
    // return request;
  }
}
