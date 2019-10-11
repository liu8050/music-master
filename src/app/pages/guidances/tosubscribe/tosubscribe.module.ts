// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Routes, RouterModule } from '@angular/router';

// import { IonicModule } from '@ionic/angular';

// import { TosubscribePage } from './tosubscribe.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: TosubscribePage
//   }
// ];

// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonicModule,
//     RouterModule.forChild(routes)
//   ],
//   declarations: [TosubscribePage]
// })
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile'
import { TosubscribePage } from './tosubscribe.page'
import { ToastService } from 'ng-zorro-antd-mobile'
const routes: Routes = [
  {
    path: '',
    component: TosubscribePage
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgZorroAntdMobileModule,
    RouterModule.forChild(routes)
  ],
  // ToastService
  declarations: [TosubscribePage, TosubscribePage]
})
export class TosubscribePageModule {}
