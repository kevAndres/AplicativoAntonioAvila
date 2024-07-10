import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteXcursoPage } from './reporte-xcurso.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteXcursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteXcursoPageRoutingModule {}
