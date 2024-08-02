import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudianteCrudPage } from './estudiante-crud.page';

const routes: Routes = [
  {
    path: '',
    component: EstudianteCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteCrudPageRoutingModule {}
