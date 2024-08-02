import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdfCursoPage } from './pdf-curso.page';

const routes: Routes = [
  {
    path: '',
    component: PdfCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdfCursoPageRoutingModule {}
