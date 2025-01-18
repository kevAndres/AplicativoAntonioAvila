import { Component, OnInit } from '@angular/core';
import {
  InpectorServiceService,
  Curso,
  CursoGet,
  Jornada,
  CursoPost,
  Especialidad,
  NivelAcademicoGet,
} from '../services/inpector-service.service';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { AddCursoComponent } from 'src/Component/add-curso/add-curso.component';

@Component({
  selector: 'app-curso-crud',
  templateUrl: './curso-crud.page.html',
  styleUrls: ['./curso-crud.page.scss'],
})
export class CursoCRUDPage implements OnInit {
  cursos: CursoGet[] = [];
  jornadas: Jornada[] = [];
  especialidades: Especialidad[] = [];
  nivelesAcademicos: NivelAcademicoGet[] = [];

  constructor(
    private inspectorService: InpectorServiceService,
    private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private modalCtrl: ModalController // Inyectar ModalController aquí
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      await Promise.all([
        this.loadCursos(),
        this.loadJornadas(),
        this.loadEspecialidades(),
        this.loadNivelesAcademicos(),
      ]);
      console.log('Datos cargados exitosamente');
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  async presentError(message: string) {
    const alert = await this.alertCtrl.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async loadCursos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.inspectorService.getCursos().subscribe(
      (cursos) => {
        this.cursos = cursos;
        loading.dismiss();
      },
      (error) => {
        console.error('Error loading courses', error);
        loading.dismiss();
      }
    );
  }

  async addCurso() {
    const modal = await this.modalCtrl.create({
      component: AddCursoComponent, // Componente del modal
      componentProps: {
        jornadas: this.jornadas, // Pasar jornadas dinámicamente al modal
        especialidades: this.especialidades,
        nivelAcademico: this.nivelesAcademicos,
      },
    });
    await modal.present();
    // Procesar datos devueltos desde el modal
    const { data } = await modal.onWillDismiss();
    console.log('fdatas', data);
    if (data) {
      if (
        data.nivel_curso &&
        data.especialidad_id &&
        data.jor_id &&
        data.paralelo_curso &&
        data.nivel_id
      ) {
        if (data.nivel_curso <= 0) {
          this.presentError('EL CURSO NO PUEDE SER MENOR O IGUAL A 0');
          return;
        }
        const nuevoNivelAcademico: CursoPost = {
          nivel_id: data.nivel_id,
          nivel_curso: data.nivel_curso,
          especialidad_id: data.especialidad_id,
          jor_id: data.jor_id,
          paralelo_curso: data.paralelo_curso.toUpperCase(),
        };
        // Llamar al servicio para guardar el nivel académico
        this.inspectorService.addCurso(nuevoNivelAcademico).subscribe(() => {
          this.loadCursos(); // Recargar la tabla
        });
      } else {
        this.presentError('Ingrese todos los datos');
        console.error('Formulario incompleto');
      }
    }
  }
  async editCurso(curso: Curso) {
    const alert = await this.alertCtrl.create({
      header: 'Edit Curso',
      inputs: [
        { name: 'curso', type: 'text', value: curso.curso },
        { name: 'paralelo', type: 'text', value: curso.paralelo },
        { name: 'especialidad', type: 'text', value: curso.especialidad },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data) => {
            const updatedCurso: Curso = { idCurso: curso.idCurso, ...data };
            this.inspectorService.updateCurso(updatedCurso).subscribe(() => {
              this.loadCursos();
            });
          },
        },
      ],
    });
    await alert.present();
  }
  async deleteCurso(curso_id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Curso',
      message: '¿Estás seguro de eliminar este Curso?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.inspectorService.deleteCurso(curso_id).subscribe(() => {
              this.loadCursos();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async loadJornadas(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.inspectorService.getJornadas().subscribe({
        next: (data) => {
          this.jornadas = data;
          console.log('Jornadas cargadas correctamente:', this.jornadas); // Debugging
          resolve(this.jornadas); // Resuelve la promesa con los datos cargados
        },
        error: (error) => {
          console.error('Error al cargar jornadas:', error);
          reject(error); // Rechaza la promesa si hay un error
        },
      });
    });
  }
  async loadEspecialidades(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.inspectorService.getEspecialidades().subscribe({
        next: (data) => {
          this.especialidades = data;
          console.log(
            'ESPECIALIDADES cargadas correctamente:',
            this.especialidades
          ); // Debugging
          resolve(this.especialidades); // Resuelve la promesa con los datos cargados
        },
        error: (error) => {
          console.error('Error al cargar jornadas:', error);
          reject(error); // Rechaza la promesa si hay un error
        },
      });
    });
  }
  async loadNivelesAcademicos(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.inspectorService.getNIvelesAcademicos().subscribe({
        next: (data) => {
          this.nivelesAcademicos = data;
          console.log(
            'ESPECIALIDADES cargadas correctamente:',
            this.nivelesAcademicos
          ); // Debugging
          resolve(this.nivelesAcademicos); // Resuelve la promesa con los datos cargados
        },
        error: (error) => {
          console.error('Error al cargar jornadas:', error);
          reject(error); // Rechaza la promesa si hay un error
        },
      });
    });
  }
}
