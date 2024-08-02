import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocenteCrudPageRoutingModule } from './docente-crud-routing.module';

import { DocenteCrudPage } from './docente-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocenteCrudPageRoutingModule
  ],
  declarations: [DocenteCrudPage]
})
export class DocenteCrudPageModule {}
