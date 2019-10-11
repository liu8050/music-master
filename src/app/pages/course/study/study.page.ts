import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../service/http.service'
import { CourseService } from '../../../structs/course.service'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavController } from '@ionic/angular'
import { UserService } from '../../../structs/user.service'
import {BaseService} from '../../../service/base.service'
import { ActionSheetService, ToastService } from 'ng-zorro-antd-mobile';
import { en_US, ru_RU, zh_CN, sv_SE, da_DK } from 'ng-zorro-antd-mobile';
import to from 'await-to-js';
import { Md5 } from 'ts-md5/dist/md5';
import { QQSDK, QQShareOptions } from '@ionic-native/qqsdk/ngx';
import { File } from '@ionic-native/file/ngx';

import { StatusBar } from '@ionic-native/status-bar/ngx' //手机状态颜色
// import { AudioProvider } from 'ionic-audio';
declare var Wechat: any;
declare var WeiboSDK: any;

@Component({
  selector: 'app-study',
  templateUrl: './study.page.html',
  styleUrls: ['./study.page.scss'],
})

export class StudyPage implements OnInit {
  islh=false;//是否为刘海屏
// @ViewChild('audioPlayer') audioPlayer: any;  //取得audioPlayer的元素

  Id = this.router.snapshot.paramMap.get('Id');//获取课程ID
  Index = this.router.snapshot.paramMap.get('Index');//获取课程索引
  playindex = this.router.snapshot.paramMap.get('playindex');//获取课件索引
  plays:any;//当前课件组
  cplayid=0;
  audioplay=true;
  audiotime="";
  myaudioPlayer:any;
  videourl=null;
  isowner=false;//是否已经购买了此课程
  course:any;
  baseFromUrl="";
  cplay:any;//当前需要播放的资源
  constructor(
    private statusBar: StatusBar,
    private httpService: HttpService,
    private courseService: CourseService,
    private Router: Router,
    private baseService:BaseService,
    private router: ActivatedRoute,
    private navCtrl: NavController,
    private userService:UserService,
    private qq: QQSDK,
    // private _audioProvider: AudioProvider,
    private _actionSheet: ActionSheetService, private _toast: ToastService,
    private sanitizer: DomSanitizer) { 
      let turl=this.Router.getCurrentNavigation().extractedUrl.toString();
      this.baseFromUrl=turl.substr(0,turl.indexOf("/study"))//解决回退问题
    }

  ngOnInit() {
   
    let h_m=window.screen.height;
    let w_m=window.screen.width;
    if(h_m/w_m>18/9){
      this.islh=true;
    }
  }


  ionViewDidEnter(){
    this.load_courseInfo();
    if(this.userService.islogin){
      let tm=false;
      this.userService.mycourse.forEach(item => {
        if(item.product_id==this.Id){
          tm=true;//已经购买课程
        }

      });
      if(!tm){
        this.isowner=true;
      }
    }
  }


  //data-init-start
  async load_courseInfo() { // 获取课程详情
    let r, err;
    let filters = Object.assign({}, this.courseService.filters);
    filters.id = this.Id;
    [err, r] = await to(this.httpService.request(filters, this.courseService.uriInfo));
    console.log(r)
    if (r.code == 20000) {

      this.course = r["data"];
      this.course.content = this.sanitizer.bypassSecurityTrustHtml(r['data'].content);
      if(this.course.kj[this.Index].children.length>0&&this.course.kj[this.Index].children!=null){
        // console.log(1)
        this.course.kj[this.Index].children.forEach(element => {
          console.log(element.name.slice('.mp4'))
          
        });
        console.log( this.course.kj[this.Index].children)
      }
      
      console.log()
      this.plays=this.course.kj[this.Index];
      // this.cplay=this.plays.children[this.playindex];
      this.play(this.plays.children[this.playindex]);
      console.log(this.plays.children)
    }
  }


  play(item){
     this.cplay=null;
  if(item.issf=='0'||!this.isowner){
    setTimeout(() => {
      this.cplay=item;
    this.cplayid=item.id;
    }, 200);
    
  //   if(this.cplay.file.indexOf("http")!=-1){//
  //   // let downinfo=this.userService.CheckCache(Md5.hashStr(item.file).toString());
  //   let downinfo=this.userService.CheckCachebyid(Md5.hashStr(item.file).toString(),this.Id);
  //   if(downinfo!=null&&downinfo.localuri!=null){
  //     this.cplay.file=downinfo.localuri;
  //     if(this.baseService.platform=="Android"){
  //     let t=this.baseService.saveDir;
  //     let f=downinfo.localuri.replace(t+"/","")
  //     this.baseService.myalert(downinfo.localuri+":"+t+"::"+f)
  //     this.file.checkFile(t,f).then((s)=>{
  //       this.baseService.myalert(JSON.stringify(s))
  //     }).catch((e)=>{
  //       this.baseService.myalert(JSON.stringify(e))
  //     })

  //     this.file.checkFile(this.file.externalRootDirectory+"/Amusicmaster",f).then((s)=>{
  //       this.baseService.myalert(JSON.stringify(s))
  //     }).catch((e)=>{
  //       this.baseService.myalert(JSON.stringify(e))
  //     })
  //   }
  //   }
  // }


    // tv.stop();

    if(item.type=="视频"){
    let tv:any;
    tv=document.getElementById('showvideo')
    tv.src=item.file;

    if ('srcObject' in tv) {
      tv.srcObject = item.file;
    }
    else {
      tv.src = item.file;
    }
		tv.play();

    }
  }else{
    this.baseService.presentToast("付费课程，请购买后学习","danger");
  }

  }

  ionViewWillLeave(){
    let tv:any;
    // tv=document.getElementById('showvideo')//离开页面停止播放
    // au=document.getElementById('audioPlayer')//离开页面停止播放
    
    // tv.stop();
    this.cplay=null;
    this.statusBar.styleDefault()
    if (this.baseService.platform == 'iOS') {
      this.statusBar.backgroundColorByName('black')
      this.statusBar.styleDefault()
    }
   }

  godown(){
    if(this.isowner){
      this.baseService.presentToast("付费课程，请购买后再缓存","danger");
    }else{
      this.Router.navigateByUrl(this.baseFromUrl+'/downcache/'+this.Id)
    }
  }


  showShareActionSheet = () => {
    ActionSheetService.showShareActionSheetWithOptions(
      {
        options: this.baseService.shareDataList,
        message: '分享音乐大师',
        locale: zh_CN
      },
      buttonIndex => {
  return new Promise(resolve => {
  //Toast.info('closed after 1000ms');
  // alert(buttonIndex);
  this.shareAPP(buttonIndex);
  setTimeout(resolve, 0);
});
}
);
}



shareAPP(index){

  // this.shareDataList[index];
  // this.baseService.myalert(index);



  if(index==-1) return;

  if(index==0){

    let args:any = {};
      args.url = this.baseService.shareData.url;
      args.title = this.baseService.shareData.title;
      args.description = this.baseService.shareData.description;
      args.image =  this.baseService.shareData.thumb;
      WeiboSDK.shareToWeibo(function () {
        // alert('share success');
      }, function (failReason) {
        // alert(failReason);
      }, args);


  }


  if(index==1){
  Wechat.share({
    message: {
        title:  this.baseService.shareData.title,
        description:  this.baseService.shareData.description,
        thumb:  this.baseService.shareData.thumb,
        mediaTagName: this.baseService.shareData.title,
        messageExt: this.baseService.shareData.title,
        // messageAction: "<action>dotalist</action>",
        media: {
          type: Wechat.Type.WEBPAGE,
          webpageUrl: this.baseService.shareData.url
      }
    },
    scene: Wechat.Scene.TIMELINE   // share to Timeline
}, function () {
}, function (reason) {
});
}
if(index==2){
      Wechat.share({
        message: {
            title: this.baseService.shareData.title,
            description: this.baseService.shareData.description,
            thumb: this.baseService.shareData.thumb,
            mediaTagName: this.baseService.shareData.title,
            messageExt: this.baseService.shareData.title,
            // messageAction: "<action>dotalist</action>",
            media: {
              type: Wechat.Type.WEBPAGE,
              webpageUrl: this.baseService.shareData.url
          }
        },
        scene: Wechat.Scene.SESSION   // share to Timeline
    }, function () {
    }, function (reason) {
    });
    }

if(index==3){

  const options: QQShareOptions = {
    client: this.qq.ClientType.QQ,
    scene: this.qq.Scene.QQ,
    title: this.baseService.shareData.title,
    url: this.baseService.shareData.url,
    image: this.baseService.shareData.thumb,
    description: this.baseService.shareData.description,
    // flashUrl:  'http://stream20.qqmusic.qq.com/30577158.mp3',
  }

  this.qq.shareNews(options)
 .then(() => {
 })
 .catch(error => {
 });

}


}


  goback(){
    this.navCtrl.back();
    // this.navCtrl.navigateBack();
  }

}
