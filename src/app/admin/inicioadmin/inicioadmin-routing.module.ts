import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioadminPage } from './inicioadmin.page';

const routes: Routes = [
  {
    path: '',
    component: InicioadminPage,
    children: [
      {
        path: 'configuracion',
        loadChildren: () => import('../configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
      },
     
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioadminPageRoutingModule {}
