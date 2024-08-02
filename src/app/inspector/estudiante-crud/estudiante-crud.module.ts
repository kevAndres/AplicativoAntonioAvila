import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudianteCrudPageRoutingModule } from './estudiante-crud-routing.module';

import { EstudianteCrudPage } from './estudiante-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudianteCrudPageRoutingModule
  ],
  declarations: [EstudianteCrudPage]
})
export class EstudianteCrudPageModule {}
