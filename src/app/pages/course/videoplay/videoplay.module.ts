import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { IonicModule } from '@ionic/angular';
// import { VgCoreModule } from 'videogular2/core';
// import { VgControlsModule } from 'videogular2/controls';
// import { VgOverlayPlayModule } from 'videogular2/overlay-play';
// import { VgBufferingModule } from 'videogular2/buffering';
// import { IonicModule } from '@ionic/angular'; // 版本问题 ionic3 以前是 ionic-angular

import { VideoplayPage } from './videoplay.page';

const routes: Routes = [
  {
    path: '',
    component: VideoplayPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // VgCoreModule,
    // VgOverlayPlayModule,
    // VgControlsModule,
    // VgBufferingModule,
    RouterModule.forChild(routes)
  ], 
  providers: [],
  declarations: [VideoplayPage]
})
export class VideoplayPageModule {}
