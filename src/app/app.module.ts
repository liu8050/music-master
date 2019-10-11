import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from "@angular/http";
import { Platform } from '@ionic/angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors/index';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import {BaseService} from './service/base.service';
import {DbService} from './service/db.service';
import {AuthService} from './service/auth.service';
import {FirstOpen} from './service/firstOpen.service';
import {HttpService} from './service/http.service';
import {IsLogined} from './service/isLogined.service';
import {RequestService} from './service/request.service';
import {UploadServiceService} from './service/upload-service.service';
import {CourseService} from './structs/course.service';
import {MastersService} from './structs/masters.service';
import {NewsService} from './structs/news.service';
import {OrderService} from './structs/order.service';
import {UserService} from './structs/user.service';
import {VideoService} from './structs/video.service';
import { Device } from '@ionic-native/device/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
// import { JPush } from '@jiguang-ionic/jpush/ngx';
// import { JpushUtil } from './utils/JpushUrl';

// import { LoadingComponent } from './components/loading/loading.component';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { from } from 'rxjs';
// import { GradeStarComponent } from './grade-star/grade-star.component';
// import { NewsslotComponent } from './newsslot/newsslot.component';
// import { NothingsComponent } from './components/nothings/nothings.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            HttpModule,
            // IonicModule.forRoot({mode: 'ios'}),md
            IonicModule.forRoot({mode: 'ios'}),
            IonicStorageModule.forRoot({
              name: 'm9db',
              driverOrder: ['sqlite']
              // driverOrder: ['indexeddb', 'sqlite', 'websql']
            }),
            AppRoutingModule, BrowserAnimationsModule, FormsModule, HttpClientModule, NgZorroAntdMobileModule],
  providers: [
      StatusBar, SplashScreen, File, FileTransfer, FileTransferObject, Device, Keyboard, UserService,Platform,
      BaseService, DbService, AuthService, FirstOpen, HttpService, IsLogined, RequestService,
      UploadServiceService, CourseService, MastersService, NewsService, OrderService, VideoService,
      httpInterceptorProviders,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})

// @NgModule({
//   declarations: [AppComponent],
//   entryComponents: [],
//   imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
//   providers: [
//     StatusBar,
//     SplashScreen,
//     httpInterceptorProviders,
//     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
//   ],
//   bootstrap: [AppComponent]
// })
export class AppModule {}
