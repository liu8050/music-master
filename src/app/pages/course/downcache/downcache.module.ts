import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { IonicModule } from '@ionic/angular';

import { DowncachePage } from './downcache.page';

const routes: Routes = [
  {
    path: '',
    component: DowncachePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdMobileModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DowncachePage]
})
export class DowncachePageModule {}
