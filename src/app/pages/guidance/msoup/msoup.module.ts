import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {Device} from  'mediasoup-client'
import { IonicModule } from '@ionic/angular';

import { MsoupPage } from './msoup.page';

const routes: Routes = [
  {
    path: '',
    component: MsoupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers:[Device],
  declarations: [MsoupPage]
})
export class MsoupPageModule {}
