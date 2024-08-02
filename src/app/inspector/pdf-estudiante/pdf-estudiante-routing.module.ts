import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdfEstudiantePage } from './pdf-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: PdfEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdfEstudiantePageRoutingModule {}
