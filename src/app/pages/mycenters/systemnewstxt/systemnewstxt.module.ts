import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SystemnewstxtPage } from './systemnewstxt.page';

const routes: Routes = [
  {
    path: '',
    component: SystemnewstxtPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SystemnewstxtPage]
})
export class SystemnewstxtPageModule {}
