import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { MastershowPage } from './mastershow.page';
import { ComponentsModule } from '../../../components'
const routes: Routes = [
  {
    path: '',
    component: MastershowPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgZorroAntdMobileModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MastershowPage]
})
export class MastershowPageModule {}
