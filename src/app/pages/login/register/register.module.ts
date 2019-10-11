import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile'
import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import { QQSDK } from '@ionic-native/qqsdk/ngx'

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
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
  providers: [QQSDK],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
