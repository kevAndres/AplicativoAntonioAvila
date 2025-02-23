import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { APIURL } from '../../Shares/UrlApi'; // Importa la constante API_URL desde el archivo api-config
import { JornadaSelectorModalComponent } from 'src/Component/jornada-selector-modal/jornada-selector-modal.component';

interface JwtPayload {
  idRol?: string;
  user?: {
    nombre?: string;
    apellido?: string;
  };

  // ... cualquier otra propiedad que esperes en tu token
}
export interface rolGet {
  rol_id: number;
  rol_nombre: string;
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
interface EsquelaData {
  motivo: string;

  descripcion: string;
  Evidencia?: string | ArrayBuffer | null; // Hacer opcional el campo de evidencia
  cita?: string; // Hacer opcional el campo de evidencia
}

export interface userByRol {
  iduser: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  rol_id: number;
}
export interface userPost {
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  rol_id: number;
}
export interface userPatch {
  iduser: number;
  nombre: string;
  apellido: string;
  //cedula: string;
  email: string;
  rol_id: number;
}
interface JornadaLogin {
  iddocente: number;
  user_iduser: number;
  nivel_academico_nivel_id: number;
  jornada_jor_id: number;
  nivel_academico: {
    nivel_id: number;
    nivel_descripcion: string;
    nivel_estado: boolean;
    jor_id: number;
  };
  jornada: {
    jor_id: number;
    jor_nombre: string;
    jor_estado: boolean;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrlregister: string = APIURL; // Variable para almacenar la URL de la API
  private representadosSubject = new BehaviorSubject<any[]>([]);

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {}

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      translucent: true,
    });
    await loading.present();
  }
  async dismissLoading() {
    await this.loadingController.dismiss();
  }
  // Método para login
  async login(email: string, password: string): Promise<boolean> {
    const body = { email, password };
    this.presentLoading();
    try {
      const response: any = await this.http
        .post(`${this.apiUrlregister}/user/login`, body)
        .toPromise();

      if (response && response.token) {
        //console.log('tokennuevo', response.token.token);

        let numJornadas = 0;
        const jornadas = response.token.token;

        // Contar jornadas
        for (const key of jornadas) {
          if (key.iddocente) {
            numJornadas++;
          }
        }

        if (numJornadas >= 1) {
          this.dismissLoading();
          const newTokenWithJornada = await this.showJornadaModal(jornadas); // Esperar selección de jornada
          if (newTokenWithJornada && newTokenWithJornada.token) {
            localStorage.setItem('token', newTokenWithJornada.token); //guarda el token en localStorage
            const decodedToken: any = jwtDecode(newTokenWithJornada.token);
            if (decodedToken && decodedToken.idRol) {
              localStorage.setItem('roles', decodedToken.user.idRol); // Guarda el rol completo en localStorage
              localStorage.setItem('rolePrefix', decodedToken.idRol); // Guarda el prefijo del rol en localStorage
            }
            return true;
          } else {
            console.error('No se seleccionó ninguna jornada.');
            return false;
          }
        } else {
          localStorage.setItem('token', response.token.token); //guarda el token en localStorage
        }

        //console.log('numJornadas', numJornadas);
        //localStorage.setItem('token', response.token.token); //guarda el token en localStorage
        const decodedToken: any = jwtDecode(response.token.token);
        if (decodedToken && decodedToken.idRol) {
          localStorage.setItem('roles', decodedToken.user.idRol); // Guarda el rol completo en localStorage
          localStorage.setItem('rolePrefix', decodedToken.idRol); // Guarda el prefijo del rol en localStorage
        }
        this.dismissLoading();

        return true; // Inicio de sesión exitoso
      } else {
        console.error('El response no contiene un token válido.');
        return false;
      }
    } catch (error) {
      console.error('Error en el login:', error);

      const isHttpError = (err: any): err is { error: { message: string } } =>
        err && err.error && typeof err.error.message === 'string';

      const mensajeError = isHttpError(error)
        ? error.error.message
        : 'Ocurrió un error al intentar iniciar sesión. Por favor, intenta de nuevo.';

      await this.presentAlert(mensajeError); // Mostrar alerta
      return false;
    }
  }

  async showJornadaModal(jornadas: any[]) {
    const modal = await this.modalController.create({
      component: JornadaSelectorModalComponent,
      componentProps: {
        jornadas, // Pasar las jornadas como entrada
        endpointUrl: `${this.apiUrlregister}/user/login/docente`, // Pasar el endpoint como prop
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      // console.log('token con la jornada seleccionada:', data);
      this.dismissLoading();

      return data;
    } else {
      // console.log('El usuario cerró el modal sin seleccionar.');
    }
  }
  completeLogin(response: any): void {
    if (response && response.token) {
      // console.log('Token recibido:', response.token);

      // Guardar el token en localStorage
      localStorage.setItem('token', response.token);
      // console.log('Token guardado en localStorage.');

      // Decodificar el token para obtener información adicional (opcional)
      const decodedToken: any = jwtDecode(response.token);

      // Guardar información adicional del usuario si está presente
      if (decodedToken && decodedToken.user) {
        const user = decodedToken.user;
        localStorage.setItem('userId', user.iduser);
        localStorage.setItem('userName', user.nombre);
        localStorage.setItem('userRole', decodedToken.idRol);
        // console.log('Información del usuario guardada:', user);
      }

      // Redirigir al usuario al dashboard o a la página inicial
      this.router.navigate(['/dashboard']); // Asegúrate de configurar correctamente la ruta del dashboard
      // console.log('Redirigiendo al dashboard...');
    } else {
      console.error('El response no contiene un token válido.');
      this.presentAlert('Error: No se pudo completar el inicio de sesión.');
    }
  }

  isLoggedIn(): boolean {
    // Verifica si el token de sesión está presente en el almacenamiento local
    return !!localStorage.getItem('token');
  }

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private decodeToken(): JwtPayloadGetToken | null {
    const token = this.getToken();
    try {
      return token ? jwtDecode<JwtPayloadGetToken>(token) : null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  // Si el usuario no está logueado, redirigirlo a la página de inicio de sesión
  public AutentificatorLogin(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
  getRoles(): string[] {
    const roles = localStorage.getItem('rolePrefix');
    return roles ? [roles] : [];
  }
  getRoleIdPrefix(): string {
    const rolePrefix = localStorage.getItem('rolePrefix');
    return rolePrefix ? rolePrefix : '';
  }

  //metodo para registrar representantes
  registerRepresentante(data: {
    nombre: string;
    apellido: string;
    cedula: string;
    email: string;
    password: string;
    rol_id: number;
  }): Observable<any> {
    return this.http.post(`${this.apiUrlregister}/user/register`, data);
  }

  //metodo para registrar docentes
  registerDocente(data: {
    email: string;
    apellido: string;
    nombre: string;
    password: string;
    cedula: string;
    rol_id: number;
    nivel_id?: number;
    jor_id?: number;
  }): Observable<any> {
    return this.http.post(`${this.apiUrlregister}/user/register`, data);
  }
  //metodos para registrar estudiantes
  registerEstudiante(data: {
    NombreEst: string;
    ApellidoEst: string;
    cedula: string;
    curso_id: string;
  }): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token. Por favor inicia sesión.');
    }
    const body = {
      ...data,
      token, // Agrega el token al cuerpo de la solicitud
    };
    // Asegúrate de que apiUrl es la variable correcta que contiene la base de la URL de tu API.
    return this.http.post(`${this.apiUrlregister}/estudiante/register`, body);
  }
  registerAsignatura(data: {
    asignatura_idasignatura: string;
    curso_idCurso: string;
  }): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token. Por favor inicia sesión.');
    }
    const body = {
      ...data,
      token, // Agrega el token al cuerpo de la solicitud
    };
    return this.http.post(
      `${this.apiUrlregister}/docente/asignacionMateria`,
      body
    );
  }

  registerEsquela_API(data: EsquelaData): Observable<any> {
    const token = localStorage.getItem('token');
    const estudiantes_idEstudiantes = Number(
      localStorage.getItem('Estudiante')
    );
    const asignación_docente_materia_idAsignacion = Number(
      localStorage.getItem('MateriaDocente')
    );

    if (!token) {
      // Mejor manejo del error con Observable para integrarse en la cadena de observables
      return throwError(
        () => new Error('No hay token. Por favor inicia sesión.')
      );
    }

    const body = {
      ...data,
      token,
      estudiantes_idEstudiantes,
      asignación_docente_materia_idAsignacion,
    };
    // console.log('Datos del formulario:', JSON.stringify(body));
    return this.http
      .post(`${this.apiUrlregister}/esquela/registrar`, body)
      .pipe(
        catchError((error) => {
          // Manejo de errores HTTP
          console.error('Error al registrar la esquela', error);
          return throwError(() => new Error('Error al registrar la esquela'));
        })
      );
  }
  getRepresentados(): Observable<any> {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.idRol) {
      return this.http.get(
        `${this.apiUrlregister}/estudiante/representante/${decodedToken.idRol}`
      );
    } else {
      throw new Error('No token available or token is invalid');
    }
  }

  RegisterAtrasos(data: { descripcion: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const estudiantes_idEstudiantes = Number(
      localStorage.getItem('Estudiante')
    );

    if (!token) {
      return throwError(new Error('No hay token. Por favor inicia sesión.'));
    }

    if (!estudiantes_idEstudiantes) {
      return throwError(new Error('No hay estudiante seleccionado.'));
    }

    const body = {
      token,
      estudiantes_idEstudiantes,
      descripcion: data.descripcion, // Ajusta esto para enviar la descripción correctamente
    };

    return this.http.post(`${this.apiUrlregister}/atraso/register`, body).pipe(
      catchError((error) => {
        console.error('Error al registrar atraso', error);
        return throwError(error);
      })
    );
  }

  limpiarrepresentados(): void {
    // Resetear los BehaviorSubjects o cualquier otra variable de estado
    this.representadosSubject.next([]);
    localStorage.removeItem('token'); // Remueve el token del localStorage
    localStorage.removeItem('roles');
    localStorage.removeItem('rolePrefix');
    localStorage.removeItem('Estudiante');
    localStorage.removeItem('MateriaDocente');
    localStorage.removeItem('IdEstCurForEsquelas');
    localStorage.removeItem('curso');

    // Aquí también podrías limpiar cualquier otro estado o almacenamiento local
    // console.log('Todos los datos de usuario han sido borrados.');
  }

  //METODOS PARA OBTENER USUARIOS POR ROLES
  getUserByRol(): Observable<userByRol[]> {
    return this.http.get<userByRol[]>(`${this.apiUrlregister}/user/all/`);
  }
  updateUserByRol(data: userPatch): Observable<userPatch[]> {
    return this.http.patch<userPatch[]>(
      `${this.apiUrlregister}/user/patch/`,
      data
    );
  }

  //Obtener todos los roles
  getRolesSelector(): Observable<any> {
    const user = this.decodeToken() ?? { user: { rol_id: 4 } };

    const rol_id = user.user?.rol_id ?? 4; // Uso seguro de `?.` para evitar errores
    return this.http.get(`${this.apiUrlregister}/rol/all/`, {
      params: { id: rol_id },
    });
  }
}
