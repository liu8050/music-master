import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
// import { CheckboxM9Component } from './checkbox-m9/checkbox-m9.component';
import { GradeStarComponent } from './grade-star/grade-star.component';
import { NewsslotComponent } from './newsslot/newsslot.component'
import { NothingsComponent } from './nothings/nothings.component';
import { CouponComponent } from './coupon/coupon.component';
import { PreloadImageComponent } from './preload-image/preload-image.component';
import { AudioplayerComponent } from './audioplayer/audioplayer.component';
import { OrderlsComponent } from './orderls/orderls.component';
import { CoureslrComponent } from './coureslr/coureslr.component';
@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule
  ],

  declarations: [NothingsComponent, GradeStarComponent, NewsslotComponent, CouponComponent, PreloadImageComponent, AudioplayerComponent, OrderlsComponent, CoureslrComponent],
  // CheckboxM9Component,GradeStarComponent,NewsslotComponent,
  exports: [NothingsComponent, GradeStarComponent, NewsslotComponent, CouponComponent, PreloadImageComponent,AudioplayerComponent],
  entryComponents: [],
})
export class ComponentsModule { }
