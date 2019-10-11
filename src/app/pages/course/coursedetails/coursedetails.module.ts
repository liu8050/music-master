import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../components'
import { IonicModule } from '@ionic/angular';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { QQSDK } from '@ionic-native/qqsdk/ngx';
import {OverlayModule, OverlayContainer, FullscreenOverlayContainer} from "@angular/cdk/overlay";
import { ActionSheet, Toast } from 'ng-zorro-antd-mobile';
import { CoursedetailsPage } from './coursedetails.page';

const routes: Routes = [
  {
    path: '',
    component: CoursedetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    NgZorroAntdMobileModule,
    OverlayModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ActionSheet,Toast,QQSDK
  ],
  declarations: [CoursedetailsPage]
})
export class CoursedetailsPageModule {}
