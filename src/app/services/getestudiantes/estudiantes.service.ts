import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { APIURL } from '../../../Shares/UrlApi'; // Importa la constante API_URL desde el archivo api-config

interface JwtPayload {
  idRol?: string;
  user?: {
    nombre?: string;
    apellido?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  apiUrl: string = APIURL; // Variable para almacenar la URL de la API
  private userSubject = new BehaviorSubject<string | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private decodeToken(): JwtPayload | null {
    const token = this.getToken();
    try {
      return token ? jwtDecode<JwtPayload>(token) : null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUsername(): string {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.user) {
      const { nombre, apellido } = decodedToken.user;
      return `${nombre} ${apellido}`;
    }
    throw new Error('No token available or token is invalid');
  }

  getRepresentados(): Observable<any> {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.idRol) {
      return this.http
        .get<any>(
          `${this.apiUrl}/estudiante/representante/${decodedToken.idRol}`
        )
        .pipe(
          catchError((error) =>
            throwError(
              () =>
                new Error('Error al cargar los representados: ' + error.message)
            )
          )
        );
    } else {
      return throwError(
        () => new Error('No token available or token is invalid')
      );
    }
  }
  getAsignaturasDocente(): Observable<any[]> {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.idRol) {
      return this.http
        .get<any>(`${this.apiUrl}/docenteMateria/docente/${decodedToken.idRol}`)
        .pipe(
          catchError((error) =>
            throwError(
              () =>
                new Error('Error al cargar las asignaturas: ' + error.message)
            )
          )
        );
    } else {
      return throwError(
        () => new Error('No token available or token is invalid')
      );
    }
  }
  getAsignaturas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asignatura/all`);
  }
  getCursos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/curso/all`);
  }
  getEstudiantesCurso(): Observable<any[]> {
    return this.http.get<any>(
      `${this.apiUrl}/estudiante/curso/${localStorage.getItem('curso')}`
    );
  }
  getEsquelasEstudiante(): Observable<any[]> {
    return this.http.get<any>(
      `${this.apiUrl}/estudiante/curso/${localStorage.getItem('Estudiante')}`
    );
  }

  getEstudianteData(codigo: string): Observable<any> {
    return this.http.get(`${APIURL}/estudiante/${codigo}`).pipe(
      catchError((error) => {
        console.error('Error al obtener los datos del estudiante', error);
        return throwError(error);
      })
    );
  }
//Metodo para registrar atraso desde el scaneo QR
  registrarAtraso(estudiantes_idEstudiantes: string): Observable<any> {
    const token = this.getToken();
    const body = { estudiantes_idEstudiantes, token };
    return this.http.post(`${this.apiUrl}/atraso/register`, body).pipe(
      catchError((error) => {
        console.error('Error al registrar el atraso', error);
        return throwError(error);
      })
    );
  }
//Metodo para registrar atraso desde la busqueda por la cedula
  registrarAtrasoFromCedula(estudiantes_idEstudiantes: string): Observable<any> {
    const token = this.getToken();
    const body = { estudiantes_idEstudiantes, token };
    return this.http.post(`${this.apiUrl}/atraso/register`, body).pipe(
      catchError((error) => {
        console.error('Error al registrar el atraso', error);
        return throwError(error);
      })
    );
  }

  getIDESTfromCedula(cedula: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/estudiante/cedula/${cedula}`
    ).pipe(
      catchError(error => {
        console.error('Error en la solicitud al servicio:', error);
        return throwError(error);
      })
    );
  }
  
  

  clearUserData(): void {
    // Resetear los BehaviorSubjects o cualquier otra variable de estado
    this.userSubject.next(null);
    localStorage.removeItem('token'); // Remueve el token del localStorage
    localStorage.removeItem('curso'); // Remueve el curso del localStorage
    localStorage.removeItem('asignatura'); // Remueve la asignatura del localStorage
    localStorage.removeItem('Estudiante'); // Remueve el idEstudiante del localStorage
    console.log('Todos los datos de usuario han sido borrados.');
  }

  getAtrasosByInspector(): Observable<any[]> {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.idRol) {
      return this.http
        .get<any>(`${this.apiUrl}/atraso/all/${decodedToken.idRol}`)
        .pipe(
          catchError((error) =>
            throwError(
              () =>
                new Error('Error al cargar las asignaturas: ' + error.message)
            )
          )
        );
    } else {
      return throwError(
        () => new Error('No token available or token is invalid')
      );
    }
  }


  getEstudiantes(cursoId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/estudiante/curso/${cursoId}`);
  }
}
