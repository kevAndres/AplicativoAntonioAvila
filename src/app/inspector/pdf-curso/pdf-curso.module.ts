import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdfCursoPageRoutingModule } from './pdf-curso-routing.module';

import { PdfCursoPage } from './pdf-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfCursoPageRoutingModule
  ],
  declarations: [PdfCursoPage]
})
export class PdfCursoPageModule {}
