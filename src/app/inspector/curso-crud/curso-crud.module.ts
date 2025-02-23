import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoCRUDPageRoutingModule } from './curso-crud-routing.module';

import { CursoCRUDPage } from './curso-crud.page';
import { AddCursoComponent } from 'src/Component/add-curso/add-curso.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CursoCRUDPageRoutingModule],
  declarations: [CursoCRUDPage, AddCursoComponent],
})
export class CursoCRUDPageModule {}
