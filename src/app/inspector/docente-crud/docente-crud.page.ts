import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Docente,
  InpectorServiceService,
  Jornada,
  NivelAcademicoGet,
} from '../services/inpector-service.service';
import {
  AlertController,
  IonSelect,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import {
  AuthService,
  userByRol,
  userPatch,
  userPost,
} from 'src/app/services/auth.service';
import { PostUserComponent } from 'src/Component/post-user/post-user.component';
import { EditUserComponent } from 'src/Component/edit-user/edit-user.component';
@Component({
  selector: 'app-docente-crud',
  templateUrl: './docente-crud.page.html',
  styleUrls: ['./docente-crud.page.scss'],
})
export class DocenteCrudPage implements OnInit {
  @ViewChild('roleSelect') roleSelect!: IonSelect;

  usuariosByRoles: any[] = [];
  usuariosByRolesCopy: any[] = [];
  allUsuarios: userByRol[] = [];
  roles: any[] = [];
  selectedRole: number | null = null; // Rol seleccionado
  selectedRoleName: string | null = null; // Nombre del rol seleccionado
  nivelesAcademicos: NivelAcademicoGet[] = [];
  jornadas: Jornada[] = [];

  constructor(
    private inspectorService: InpectorServiceService,
    private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private _authService: AuthService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.loadRoles();
    await this.loadNivelesAcademicos();
    await this.loadJornadas();
    await this.loadDocentes();
  }
  async loadDocentes() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this._authService.getUserByRol().subscribe(
      (docente) => {
        // Mapear `docente` para agregar el `rol_nombre`
        this.usuariosByRoles = docente.map((usuario) => {
          const role = this.roles.find((r) => r.rol_id === usuario.rol_id); // Busca el rol por `rol_id`
          return {
            ...usuario,
            rol_nombre: role ? role.rol_nombre : 'Sin rol asignado', // Asigna el nombre del rol
          };
        });

        // Copiar la lista completa de usuarios
        this.allUsuarios = [...this.usuariosByRoles];
        // console.log('usuarios', this.usuariosByRoles);

        loading.dismiss();
      },
      (error) => {
        console.error('Error loading courses', error);
        loading.dismiss();
      }
    );
  }

  openSelect() {
    if (this.roleSelect) {
      this.roleSelect.open(); // Abre el selector de roles
    } else {
      console.error(
        'El selector de roles no está inicializado. Verifica el ViewChild.'
      );
    }
  }

  async onRoleChange() {
    if (this.selectedRole) {
      const roleId = Number(this.selectedRole); // Convertir a número
      this.usuariosByRoles = this.allUsuarios.filter(
        (docente) => docente.rol_id === roleId
      );

      // Actualiza el nombre del rol seleccionado
      const selectedRole = this.roles.find((role) => role.rol_id === roleId);
      this.selectedRoleName = selectedRole ? selectedRole.rol_nombre : null;
    } else {
      this.usuariosByRoles = [...this.allUsuarios]; // Mostrar todos los usuarios
      this.selectedRoleName = 'Seleccione un Rol'; // Resetea el nombre del rol
    }
  }
  async presentError(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async loadRoles() {
    try {
      const roles = await this._authService.getRolesSelector().subscribe(
        (roles) => {
          this.roles = roles;
          // console.log('roles', this.roles);
        },
        (error) => {
          console.error('Error loading roles', error);
        }
      );
    } catch (error) {
      console.error('Error loading roles', error);
    }
  }
  async addDocente() {
    try {
      const modal = await this.modalCtrl.create({
        component: PostUserComponent,
        componentProps: {
          roles: this.roles,
          nivelAcademico: this.nivelesAcademicos,
          jornadas: this.jornadas,
        },
      });
      await modal.present();

      // Procesar datos devueltos desde el modal
      const { data } = await modal.onWillDismiss();
      // console.log('data', data);

      if (data) {
        if (
          data.nombre &&
          data.apellido &&
          data.cedula &&
          data.email &&
          data.password &&
          data.rol_id
        ) {
          const nuevoNivelAcademico: any = {
            nombre: data.nombre.toUpperCase(),
            apellido: data.apellido.toUpperCase(),
            cedula: data.cedula,
            password: data.password,
            email: data.email,
            rol_id: data.rol_id,
            nivel_academico_nivel_id: data.nivel_academico_nivel_id,
            jornada_jor_id: data.jornada_jor_id,
          };

          // Llamar al servicio para guardar el usuario
          this._authService.registerDocente(nuevoNivelAcademico).subscribe({
            next: () => {
              this.loadDocentes(); // Recargar docentes si se registra exitosamente
            },
            error: (err) => {
              console.error('Error del servidor:', err);
              if (err.error && err.error.message) {
                this.presentError(err.error.message); // Mostrar mensaje del servidor
              } else {
                this.presentError('Ocurrió un error al registrar el usuario.'); // Mensaje genérico
              }
            },
          });
        } else {
          this.presentError('Ingrese todos los datos');
          console.error('Formulario incompleto');
        }
      }
    } catch (error) {
      console.error('Error al agregar el Usuario', error);
    }
  }
  async editDocente(iduser: number) {
    try {
      // console.log('iduser', iduser);
      const user = await this.allUsuarios.find(
        (usuario) => usuario.iduser == iduser
      );
      // console.log('user', user);
      const modal = await this.modalCtrl.create({
        component: EditUserComponent,
        componentProps: {
          roles: this.roles,
          user: user,
        },
      });
      await modal.present();
      //const me = await this.mesajeEspera('Registrando...');

      // Procesar datos devueltos desde el modal
      const { data } = await modal.onWillDismiss();
      // console.log('dataaaaaaaaaaa', data);
      if (data) {
        if (data) {
          const nuevoNivelAcademico: userPatch = {
            iduser: iduser,
            nombre: data.nombre.toUpperCase(),
            apellido: data.apellido.toUpperCase(),
            //cedula: data.cedula,
            //password: data.password,
            email: data.email,
            rol_id: data.rol_id,
          };
          //me.present();
          // Llamar al servicio para guardar el usuario
          this._authService
            .updateUserByRol(nuevoNivelAcademico)
            .subscribe(() => {
              //me.dismiss();
              this.loadDocentes();
            });
        } else {
          this.presentError('Ingrese todos los datos');
          console.error('Formulario incompleto');
        }
      }
    } catch (error) {
      console.error('Error al editar el Usuario', error);
    }
  }
  async deleteDocente(iduser: number) {
    try {
      const alert = await this.alertCtrl.create({
        header: 'Eliminar Nivel Académico',
        message: '¿Estás seguro de eliminar este Usuario?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: () => {
              this.inspectorService.deleteDocente(iduser).subscribe({
                next: () => {
                  this.loadDocentes(); // Recargar lista de niveles académicos
                },
                error: (err) => {
                  //console.error('Error al eliminar el nivel académico:', err);
                  this.presentError(
                    'No se puede eliminar el usuario, por que tiene modulos asociados'
                  );
                },
              });
            },
          },
        ],
      });

      await alert.present();
    } catch (error) {
      this.presentError('Error al eliminar el usuario');
      console.error('Error al eliminar el usuario', error);
    }
  }
  async loadNivelesAcademicos(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.inspectorService.getNIvelesAcademicos().subscribe({
        next: (data) => {
          this.nivelesAcademicos = data;
          resolve(this.nivelesAcademicos); // Resuelve la promesa con los datos cargados
        },
        error: (error) => {
          reject(error); // Rechaza la promesa si hay un error
        },
      });
    });
  }
  async loadJornadas(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.inspectorService.getJornadas().subscribe({
        next: (data) => {
          this.jornadas = data;
          // console.log('Jornadas cargadas correctamente:', this.jornadas); // Debugging
          resolve(this.jornadas); // Resuelve la promesa con los datos cargados
        },
        error: (error) => {
          console.error('Error al cargar jornadas:', error);
          reject(error); // Rechaza la promesa si hay un error
        },
      });
    });
  }
}
