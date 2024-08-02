import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioadminPageRoutingModule } from './inicioadmin-routing.module';

import { InicioadminPage } from './inicioadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioadminPageRoutingModule
  ],
  declarations: [InicioadminPage]
})
export class InicioadminPageModule {}
