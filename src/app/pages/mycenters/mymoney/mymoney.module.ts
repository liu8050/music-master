import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';

import { IonicModule } from '@ionic/angular';

import { MymoneyPage } from './mymoney.page';

const routes: Routes = [
  {
    path: '',
    component: MymoneyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    // ActionSheetService,ToastService,PickerService,
    InAppPurchase
  ],
  declarations: [MymoneyPage]
})
export class MymoneyPageModule {}
