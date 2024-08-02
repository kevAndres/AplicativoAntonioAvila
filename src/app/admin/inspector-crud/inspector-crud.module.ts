import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectorCrudPageRoutingModule } from './inspector-crud-routing.module';

import { InspectorCrudPage } from './inspector-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspectorCrudPageRoutingModule
  ],
  declarations: [InspectorCrudPage]
})
export class InspectorCrudPageModule {}
