import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocenteCrudPageRoutingModule } from './docente-crud-routing.module';

import { DocenteCrudPage } from './docente-crud.page';
import { PostUserComponent } from 'src/Component/post-user/post-user.component';
import { EditUserComponent } from 'src/Component/edit-user/edit-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocenteCrudPageRoutingModule,
  ],
  declarations: [DocenteCrudPage, PostUserComponent, EditUserComponent],
})
export class DocenteCrudPageModule {}
