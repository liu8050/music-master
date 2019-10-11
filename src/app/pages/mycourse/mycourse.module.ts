import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components'
import { MycoursePage } from './mycourse.page';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
const routes: Routes = [
  {
    path: '',
    component: MycoursePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    NgZorroAntdMobileModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MycoursePage]
})
export class MycoursePageModule {}
