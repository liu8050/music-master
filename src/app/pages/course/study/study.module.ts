import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { QQSDK } from '@ionic-native/qqsdk/ngx';
import {OverlayModule, OverlayContainer, FullscreenOverlayContainer} from "@angular/cdk/overlay";
import { ActionSheet, Toast,NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../components'
// import { , WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';

import { StudyPage } from './study.page';

const routes: Routes = [
  {
    path: '',
    component: StudyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OverlayModule,
    ComponentsModule,
    NgZorroAntdMobileModule,
    RouterModule.forChild(routes),
    // IonicAudioModule.forRoot(defaultAudioProviderFactory), 
  ],
  providers: [
    ActionSheet,Toast,QQSDK,
  ],
  declarations: [StudyPage]
})
export class StudyPageModule {}
