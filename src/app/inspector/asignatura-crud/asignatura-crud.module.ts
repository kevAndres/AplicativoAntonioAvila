import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaturaCrudPageRoutingModule } from './asignatura-crud-routing.module';

import { AsignaturaCrudPage } from './asignatura-crud.page';
import { EditAsignaturaComponent } from 'src/Component/edit-asignatura/edit-asignatura.component';
import { PostAsignaturaComponent } from 'src/Component/post-asignatura/post-asignatura.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaturaCrudPageRoutingModule,
  ],
  declarations: [
    AsignaturaCrudPage,
    EditAsignaturaComponent,
    PostAsignaturaComponent,
  ],
})
export class AsignaturaCrudPageModule {}
