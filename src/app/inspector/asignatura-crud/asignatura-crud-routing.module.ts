import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignaturaCrudPage } from './asignatura-crud.page';

const routes: Routes = [
  {
    path: '',
    component: AsignaturaCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignaturaCrudPageRoutingModule {}
