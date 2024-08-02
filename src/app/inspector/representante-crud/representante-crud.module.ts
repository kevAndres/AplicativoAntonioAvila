import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepresentanteCrudPageRoutingModule } from './representante-crud-routing.module';

import { RepresentanteCrudPage } from './representante-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepresentanteCrudPageRoutingModule
  ],
  declarations: [RepresentanteCrudPage]
})
export class RepresentanteCrudPageModule {}
