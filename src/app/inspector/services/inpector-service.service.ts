import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIURL } from '../../../Shares/UrlApi';

export interface Asignatura {
  idasignatura: number;
  nombre: string;
  descripcion: string;
}
export interface AsignaturaPost {
  asig_nombre: string;
  nivel_id: number;
  jornada_id: number;
}
export interface AsignaturaUpdate {
  asig_id: number;
  asig_nombre: string;
  nivel_id: number;
  jornada_id: number;
}
export interface AsignaturaGet {
  asig_id: number;
  asig_nombre: string;
  nivel_id: number;
  jornada_id: number;
  jornada: Jornada;
  nivel_academico: NivelAcademicoGet;
}

export interface Curso {
  idCurso: number;
  curso: string;
  paralelo: string;
  especialidad: string;
}
export interface Docente {
  iduser: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  rol: string;
}
export interface Admin {
  iduser: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  rol: string;
}
export interface inspector {
  iduser: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  rol: string;
}
export interface Representante {
  iduser: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  rol: string;
}
export interface Estudiante {
  idEstudiantes: number;
  NombreEst: string;
  ApellidoEst: string;
  cedula: string;
  representantes_idrepresentantes: string;
  curso_idCurso: number[];
}
export interface Curso {
  idCurso: number;
  curso: string;
  paralelo: string;
  especialidad: string;
}
export interface CursoGet {
  curso_id: number;
  nivel_curso: string;
  paralelo_curso: string;
  especialidad: Especialidad;
  nivel_academico: NivelAcademicoGet;
}
export interface CursoPost {
  nivel_curso: string;
  paralelo_curso: string;
  especialidad_id: number;
  jor_id: number;
  nivel_id: number;
}
export interface Especialidad {
  especialidad_nombre: string;
}
export interface Jornada {
  jor_nombre: string;
}
export interface NivelAcademicoPost {
  nivel_descripcion: string;
  jor_id: number;
}

export interface NivelAcademicoGet {
  nivel_id: number;
  nivel_descripcion: string;
  jornada: Jornada;
}
@Injectable({
  providedIn: 'root',
})
export class InpectorServiceService {
  private apiUrl = APIURL;
  constructor(private http: HttpClient) {}

  getCursos(): Observable<CursoGet[]> {
    return this.http.get<CursoGet[]>(`${this.apiUrl}/curso/all`);
  }

  addCurso(curso: CursoPost): Observable<CursoPost> {
    return this.http.post<CursoPost>(`${this.apiUrl}/curso/register`, curso);
  }
  updateCurso(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(
      `${this.apiUrl}/curso/cursos/${curso.idCurso}`,
      curso
    );
  }
  deleteCurso(curso_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/curso/delete/${curso_id}`);
  }

  //METODOS DE LAS ASIGNATURAS
  getAsignaturas(): Observable<AsignaturaGet[]> {
    return this.http.get<AsignaturaGet[]>(`${this.apiUrl}/asignatura/all`);
  }

  addAsignatura(asignatura: AsignaturaPost): Observable<AsignaturaPost> {
    return this.http.post<AsignaturaPost>(
      `${this.apiUrl}/asignatura/register`,
      asignatura
    );
  }
  deleteAsignatura(asig_id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/asignatura/delete/${asig_id}`
    );
  }
  updateAsignatura(
    aignaturaUpdate: AsignaturaUpdate
  ): Observable<AsignaturaUpdate> {
    return this.http.patch<AsignaturaUpdate>(
      `${this.apiUrl}/asignatura/patch`,
      aignaturaUpdate
    );
  }
  //METODOS DEL DOCENTE EN CONFIGURACION
  addDocente(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(`${this.apiUrl}/user/register`, docente);
  }
  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${this.apiUrl}/docente/user/all`);
  }
  updateDocente(docente: Docente): Observable<Docente> {
    return this.http.put<Docente>(
      `${this.apiUrl}/docente/update/${docente.iduser}`,
      docente
    );
  }
  deleteDocente(iduser: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/docente/delete/${iduser}`);
  }
  getAllDocentes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/docente/maestro/all`);
  }
  //METODOS DEL REPRESENTANTE EN CONFIGURACION
  addRepresenta(representante: Representante): Observable<Representante> {
    return this.http.post<Representante>(
      `${this.apiUrl}/user/register`,
      representante
    );
  }
  getRepresentantes(): Observable<Representante[]> {
    return this.http.get<Representante[]>(
      `${this.apiUrl}/representante/user/all`
    );
  }
  updateRepresentate(representante: Representante): Observable<Representante> {
    return this.http.put<Representante>(
      `${this.apiUrl}/representante/update/${representante.iduser}`,
      representante
    );
  }
  deleteRepresentate(iduser: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/representante/delete/${iduser}`
    );
  }
  //METODOS DEL ESTUDIANTE EN CONFIGURACION
  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/estudiante/all`);
  }
  updateEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(
      `${this.apiUrl}/docente/update/${estudiante.idEstudiantes}`,
      estudiante
    );
  }
  deleteEstudiante(idEstudiantes: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/estudiante/delete/${idEstudiantes}`
    );
  }
  //METODOS DEL INSPECTOR EN CONFIGURACION/ADMIN
  addInspector(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}/user/register`, admin);
  }
  getInspector(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}/inspector/user/all`);
  }
  updateInspector(admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(
      `${this.apiUrl}/inspector/update/${admin.iduser}`,
      admin
    );
  }
  //revisar este metodo
  deleteInspector(iduser: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/inspector/delete/${iduser}`);
  }

  //METODOS DE LA ESPECIALIDAD
  addEspecialidad(especialidad: Especialidad): Observable<Docente> {
    return this.http.post<Docente>(
      `${this.apiUrl}/especialidad/register`,
      especialidad
    );
  }
  getEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.apiUrl}/especialidad/all`);
  }
  // updateDocente(docente: Docente): Observable<Docente> {
  //   return this.http.put<Docente>(
  //     `${this.apiUrl}/docente/update/${docente.iduser}`,
  //     docente
  //   );
  // }
  // deleteDocente(iduser: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/docente/delete/${iduser}`);
  // }
  // getAllDocentes(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/docente/maestro/all`);
  // }
  //METODOS DE LA JORNADA
  addJornada(jornada: Jornada): Observable<Jornada> {
    return this.http.post<Jornada>(`${this.apiUrl}/jornada/registrar`, jornada);
  }
  getJornadas(): Observable<Jornada[]> {
    return this.http.get<Jornada[]>(`${this.apiUrl}/jornada/all`);
  }
  // updateDocente(docente: Docente): Observable<Docente> {
  //   return this.http.put<Docente>(
  //     `${this.apiUrl}/docente/update/${docente.iduser}`,
  //     docente
  //   );
  // }
  // deleteDocente(iduser: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/docente/delete/${iduser}`);
  // }
  // getAllDocentes(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/docente/maestro/all`);
  // }

  //METODOS DE LOS NIVELES ACADEMICOS
  addNivelAcademico(
    nivel_academico: NivelAcademicoPost
  ): Observable<NivelAcademicoPost> {
    return this.http.post<NivelAcademicoPost>(
      `${this.apiUrl}/nivel-academico/register`,
      nivel_academico
    );
  }
  getNIvelesAcademicos(): Observable<NivelAcademicoGet[]> {
    return this.http.get<NivelAcademicoGet[]>(
      `${this.apiUrl}/nivel-academico/all`
    );
  }
  // updateDocente(docente: Docente): Observable<Docente> {
  //   return this.http.put<Docente>(
  //     `${this.apiUrl}/docente/update/${docente.iduser}`,
  //     docente
  //   );
  // }
  // deleteDocente(iduser: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/docente/delete/${iduser}`);
  // }
  // getAllDocentes(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/docente/maestro/all`);
  // }
}
