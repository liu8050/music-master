import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './structs/user.service'
import {BaseService} from './service/base.service'
import {DbService} from './service/db.service';
import { Device } from '@ionic-native/device/ngx';
import to from 'await-to-js';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

declare var JPush:any;
declare var window:any;
declare var cordova:any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  diskCount=1;

  constructor(
    private platform:   Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    // private androidPermissions: AndroidPermissions,
    // private jpush: JPush,
    // private jpushUtil: JpushUtil,
    private file:File,
    private baseService:BaseService,
    private device:Device,
    private dbService:DbService

  ) {
    // this.device.uuid;
    // BaiduMobStat.onEvent("1", "开机事件");


    // this.jpush.init();
    // this.router.events.subscribe((event: NavigationEnd) => {
    // // 判断路由的事件类型（也就是路由的生命周期）
    //   if (event instanceof ActivationEnd) { // 当导航成功结束时执行
    //     console.log(event);
    //   }
    // });
    this.initializeApp();
    this.isfirst();
    


  }

  initializeApp() {
    this.platform.ready().then(() => {



      this.userService.init();//用户初始化
      // this.baseService.platform="iOS";
      let os = this.device.platform;
      this.baseService.platform=os;
      // this.baseService.myalert(this.baseService.platform)
     
      window.JPush.init();

        document.addEventListener('jpush.receiveNotification', (event: any) => {
          console.log(event, 'Receive notification');
          // alert('Receive notification: ' + JSON.stringify(event));
      }, false);

      /**打开消息触发 */
      document.addEventListener('jpush.openNotification', (event: any) => {
          console.log(event, 'open notification');
          // alert(' openNotification: ' + JSON.stringify(event));
      }, false);
      /**接收本地消息 */
      document.addEventListener('jpush.receiveLocalNotification', (event: any) => {
          console.log(event, 'receive local notification');
          // alert(' receiveLocalNotification: ' + JSON.stringify(event));
      }, false);
     
    //     setTimeout(() => {
    // this.splashScreen.hide();
    // }, 9000);
  //   setTimeout(()=> {
  //     navigator.splashscreen.hide();
  // }, 2000);
  
  if(os=="Android"){
    
  
    // //权限检查
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    // );
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO)
    // );
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_WIFI_STATE).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_WIFI_STATE)
    // );
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    // );
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    // );
  
    //this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
  
    this.diskCount=this.diskCount*1024*1024;
    this.initApp();
  
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();
    // this.statusBar.backgroundColorByHexString("#00ffffff");

    this.baseService.saveDir=this.file.externalApplicationStorageDirectory+this.baseService.baseDir;
    this.mkBaseDir_Android();
    }
  if(os=="iOS"){
    // this.initApp();
    // this.statusBar.backgroundColorByHexString("#33000000");
    // this.statusBar.backgroundColorByName("lightGray");
    // cordova.plugins.iosrtc.registerGlobals();
    this.diskCount=this.diskCount*1024*1024*1024;

    this.initApp();


    // this.statusBar.styleLightContent();
    // this.statusBar.styleBlackTranslucent();
    // this.statusBar.styleBlackOpaque();
    // this.statusBar.backgroundColorByName("red");
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleDefault();
    // this.statusBar.backgroundColorByName("red");
    // this.baseService.myalert("in:this.file.externalRootDirectory");
    // this.baseService.myalert("1:"+this.file.externalRootDirectory);
    // this.baseService.myalert("2:"+this.file.applicationStorageDirectory);
    // this.baseService.myalert("3:"+this.file.documentsDirectory);
    // this.baseService.myalert("4:"+this.file.cacheDirectory);
    // this.baseService.myalert("5:"+this.file.tempDirectory);
    // this.baseService.myalert("6:"+this.file.applicationDirectory);
    this.baseService.saveDir=this.file.dataDirectory+this.baseService.baseDir;
    this.mkBaseDir_IOS();

    }


    });
  }


  mkBaseDir_Android(){
    // this.baseService.myalert("externalApplicationStorageDirectory:11"+this.file.externalApplicationStorageDirectory)
    this.file.checkDir(this.file.externalApplicationStorageDirectory, this.baseService.baseDir).then(()=>{console.log("ok");}).catch(err =>{
    this.file.createDir(this.file.externalApplicationStorageDirectory,this.baseService.baseDir,false).then(()=>{console.log("createok")}).catch((e)=>{this.baseService.presentToast("创建缓存目录失败，请确认权限!","danger")})
    });

    // this.baseService.myalert(this.baseService.baseDir+":"+this.file.externalRootDirectory)
    // this.file.checkDir(this.file.externalApplicationStorageDirectory, this.baseService.baseDir).then((s)=>{



    // })
  }

  mkBaseDir_IOS(){
    this.file.checkDir(this.file.dataDirectory, this.baseService.baseDir).then(()=>{
      // this.baseService.myalert("dirok")
    }).catch(err =>{
      this.file.createDir(this.file.dataDirectory,this.baseService.baseDir,false).then((s)=>{console.log("createok");}).catch((e)=>{this.baseService.presentToast("创建缓存目录失败，请确认权限!","danger")})
    });
  }

  async initApp(){
   
    this.file.getFreeDiskSpace().then((s)=>{
      // if(s<AppConfig.Freediskspace){
        let freedisk:any=s/this.diskCount;
        freedisk=freedisk.toFixed(2);
        this.baseService.freedisk=freedisk;
      // }
    });

  }

  async isfirst(){
    let err,r;
    [err,r]=await to(this.dbService.getLocalVal("firstOpen"));
    this.baseService.firstOpen=r;
  }


}
