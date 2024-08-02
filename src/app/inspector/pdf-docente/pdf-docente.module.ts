import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdfDocentePageRoutingModule } from './pdf-docente-routing.module';

import { PdfDocentePage } from './pdf-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfDocentePageRoutingModule
  ],
  declarations: [PdfDocentePage]
})
export class PdfDocentePageModule {}
