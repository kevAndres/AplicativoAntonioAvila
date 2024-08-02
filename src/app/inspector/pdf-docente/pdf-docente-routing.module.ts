import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdfDocentePage } from './pdf-docente.page';

const routes: Routes = [
  {
    path: '',
    component: PdfDocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdfDocentePageRoutingModule {}
