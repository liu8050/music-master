import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// import { ActionSheetService, ToastService,PickerService } from 'ng-zorro-antd-mobile';
import {OverlayModule, OverlayContainer, FullscreenOverlayContainer} from "@angular/cdk/overlay";
import { IonicModule } from '@ionic/angular';
import { QQSDK } from '@ionic-native/qqsdk/ngx';
import { MycenterPage } from './mycenter.page';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
const routes: Routes = [
  {
    path: '',
    component: MycenterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OverlayModule,
    NgZorroAntdMobileModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    // ActionSheetService,ToastService,PickerService,
    QQSDK
  ],
  declarations: [MycenterPage]
})
export class MycenterPageModule {}
