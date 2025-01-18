import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
interface JwtPayloadGetToken {
  user?: {
    iduser?: string;
    nombre?: string;
    apellido?: string;
    cedula?: string;
    email?: string;
    password?: string;
    rol_id?: number;
  };
  idRol?: string;
}
interface CursoGet {
  nivel_curso: number;
  paralelo_curso: string;
  especialidad: {
    especialidad_nombre: string;
  };
  nivel_academico: {
    nivel_descripcion: string;
  };
  jornada: {
    jor_nombre: string;
  };
}
interface representadosGet {
  idEstudiantes: number;
  NombreEst: string;
  ApellidoEst: string;
  cedula: string;
  idrepresentantes: number;
  curso_id: string;
  user: {
    nombre: string;
    apellido: string;
  };
  curso: {
    nivel_curso: number;
    paralelo_curso: string;
    especialidad: {
      especialidad_nombre: string;
    };
  };
  nivel_academico: {
    nivel_descripcion: string;
    jornada: {
      jor_nombre: string;
    };
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
    //console.log('token', localStorage.getItem('token'));
    return localStorage.getItem('token') || '';
  }

  private decodeToken(): any | null {
    const token = this.getToken();
    try {
      return token ? jwtDecode<any>(token) : null;
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

  getRepresentados(): Observable<representadosGet[]> {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.idRol) {
      return this.http
        .get<any>(
          `${this.apiUrl}/estudiante/representante/${decodedToken.user?.iduser}`
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
    // console.log('decodedToken', JSON.stringify(decodedToken));
    if (decodedToken && decodedToken.docente.iddocente) {
      return this.http
        .get<any>(
          `${this.apiUrl}/docenteMateria/docente/${decodedToken.docente.iddocente}`
        )
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
  getAsignaturasPorNivelAcademicoJornada(): Observable<any> {
    const decodedToken: any = this.decodeToken();
    //console.log('token desemciptado', JSON.stringify(decodedToken));
    const params = {
      jor_id: decodedToken.user.rol_id,
      nivel_id: decodedToken.docente.jornada_jor_id,
    };
    //console.log('params', params);
    return this.http.get(`${this.apiUrl}/asignatura/seccion`, { params });
  }
  getCursos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/curso/all`);
  }
  getCursosParams(): Observable<any> {
    const decodedToken: any = this.decodeToken();
    const params = {
      nivel_id: decodedToken.docente.nivel_academico_nivel_id,
    };
    return this.http.get(`${this.apiUrl}/curso/all/`, { params });
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
  registrarAtrasoFromCedula(
    estudiantes_idEstudiantes: string
  ): Observable<any> {
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
    return this.http
      .get<any>(`${this.apiUrl}/estudiante/cedula/${cedula}`)
      .pipe(
        catchError((error) => {
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
    //console.log('Todos los datos de usuario han sido borrados.');
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
