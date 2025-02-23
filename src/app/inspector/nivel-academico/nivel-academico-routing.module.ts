import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NivelAcademicoPage } from './nivel-academico.page';

const routes: Routes = [
  {
    path: '',
    component: NivelAcademicoPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NivelAcademicoPageRoutingModule {}
