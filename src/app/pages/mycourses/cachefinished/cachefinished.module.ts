import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CachefinishedPage } from './cachefinished.page';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
const routes: Routes = [
  {
    path: '',
    component: CachefinishedPage
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
  declarations: [CachefinishedPage]
})
export class CachefinishedPageModule {}
