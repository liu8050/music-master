import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {EmailComponent} from '../../../components/email/email.component';
import { IonicModule } from '@ionic/angular';

import { MyorderPage } from './myorder.page';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
const routes: Routes = [
  {
    path: '',
    component: MyorderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgZorroAntdMobileModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyorderPage, EmailComponent], entryComponents: [EmailComponent]
})
export class MyorderPageModule {}
